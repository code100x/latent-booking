import { client } from "@repo/db/client";

export function getEvent(eventId: string, adminid?: string) {
    if (adminid) {
        return client.event.findUnique({
            where: {
                id: eventId,
                adminId: adminid
            },
            include: {
                seatTypes: true
            }
        })
    }

    return client.event.findUnique({
        where: {
            id: eventId
        },
        include: {
            seatTypes: true 
        }
    })
}