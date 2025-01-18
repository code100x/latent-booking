import { client } from "@repo/db/client";

async function main() {
    const pendingEvents = await client.event.findMany({
        where: {
            published: true,
            ended: false,
            startTime: {
                gt: new Date()
            }
        }
    });

    pendingEvents.forEach(async event => {
        flushEvents(event);
    })
}

async function flushEvents(event: {id: string, processed: number}) {
    await clearUnpaidBookings(event.id);
    await allowNewBookings(event);
}

async function allowNewBookings(event: {id: string, processed: number}) {
    const eventId = event.id;
    const pendingBookings = await client.booking.findMany({
        where: {
            eventId,
            status: "Pending"
        },
        take: 100, // should decide what this would be
        orderBy: {
            sequenceNumber: "asc"
        },
        include: {
            seats: true
        }
    });

    if (pendingBookings.length === 0) {
        return;
    }

    const seatsMap = await getEmptySeatsMap(eventId);
    let allowedUpdatdBookings = [];
    let bookingsToMarkAsFilled = [];

    for (const booking of pendingBookings) {
        let isAllowed = true;
        let userMap = new Map<string, number>();
        for (const seat of booking.seats) {
            userMap.set(seat.id, (userMap.get(seat.id) ?? 0) + 1);
        }

        for (const [seatId, count] of userMap.entries()) {
            if ((seatsMap.get(seatId)?.currentlyAvailable ?? 0) < count) {
                isAllowed = false;
                break;
            }
        }

        if (!isAllowed) {
            let shouldRemoveFromDb = false;
            for (const [seatId, count] of userMap.entries()) {
                if ((seatsMap.get(seatId)?.available ?? 0) < count) {
                    shouldRemoveFromDb = true;
                    break;
                }
            }
            if (shouldRemoveFromDb) {
                bookingsToMarkAsFilled.push(booking);
            }
            continue;
        }

        allowedUpdatdBookings.push(booking);
    }

    if (allowedUpdatdBookings.length === 0 && bookingsToMarkAsFilled.length === 0) {
        return;
    }

   await client.$transaction([
        client.booking.updateMany({
            where: {
                id: {
                    "in": allowedUpdatdBookings.map(x => x.id)
                }
            }, 
            data: {
                status: "PendingPayment"
            }
        }),
        client.booking.updateMany({
            where: {
                id: {
                    "in": bookingsToMarkAsFilled.map(x => x.id)
                }
            }, 
            data: {
                status: "Filled"
            }
        }),
        client.event.update({
            where: {
                id: event.id
            },
            data: {
                processed: Math.max(...allowedUpdatdBookings.map(x => x.sequenceNumber), event.processed)  
            }
        })
    ])
}

async function clearUnpaidBookings(eventId: string) {
    const unpaidBookings = await client.booking.findMany({
        where: {
            eventId,
            status: "PendingPayment",
            expiry: {
                lt: new Date()
            }
        },
        include: {
            seats: true
        }
    });

    if (unpaidBookings.length === 0) {
        return;
    }

    const seatsMap = getUpdatedLockedSeats(unpaidBookings);

    // there is an edge case here, where the webhook is yet to update to processed when u update it to Timeout. 
    // We should lock the row before updating it.
    await client.$transaction([
        client.booking.updateMany({
            where: {
                id: {
                    "in": unpaidBookings.map(x => x.id)
                }
            }, 
            data: {
                status: "Timeout"
            }
        }),
         ...seatsMap.map(([seatId, count]) => client.seatType.updateMany({
            where: {
                id: seatId,
            },
            data: {
                locked: {
                    "decrement": count
                }
            }
        }))
    ])
}

function getUpdatedLockedSeats(unpaidBookings: {
    id: string;
    seats: {
       id: string;
       seatTypeId: string;
    }[]
}[]) {
    const seatsMap = new Map<string, number>();

    unpaidBookings.forEach(x => {
        x.seats.forEach(y => {
            seatsMap.set(y.seatTypeId, (seatsMap.get(y.seatTypeId) ?? 0) + 1);
        })
    })
    
    return Array.from(seatsMap.entries());
}

async function getEmptySeatsMap(eventId: string) {
    const seatsMap = new Map<string, {available: number, currentlyAvailable: number}>();
    // we can save this db call, have already called this before above
    const event = await client.event.findUnique({
        where: {
            id: eventId
        },
        include: {
            seatTypes: true
        }
    });

    event?.seatTypes.forEach(x => {
        seatsMap.set(x.id, {currentlyAvailable: x.capacity - x.locked - x.filled, available: x.capacity - x.filled });  
    })

    return seatsMap;
}

main();