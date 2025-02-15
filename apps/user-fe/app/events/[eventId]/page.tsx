"use client";
import Image from "next/image";
import { events } from "@/app/_components/eventsRow";
import { StarIcon } from "lucide-react";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import { TicketCard } from "@/app/_components/ticket-card";

interface TicketSelection {
  [key: string]: number;
}

export default function EventPage({ params }: { params: { eventId: string } }) {
  const [selectedTickets, setSelectedTickets] = useState<TicketSelection>({});
  const event = events.find((e) => e.bookingRef === params.eventId);

  if (!event) {
    return <div>Event not found</div>;
  }

  const ticketTypes = [
    { name: "VIP", price: 2000, available: 50 },
    { name: "Premium", price: 1500, available: 100 },
    { name: "Standard", price: 1000, available: 200 },
  ];

  const totalAmount = Object.entries(selectedTickets).reduce(
    (acc, [type, count]) => {
      const ticket = ticketTypes.find((t) => t.name === type);
      return acc + (ticket?.price || 0) * count;
    },
    0
  );

  const hasSelectedTickets = Object.values(selectedTickets).some(
    (count) => count > 0
  );

  return (
    <main className="min-h-screen max-w-7xl mx-auto flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 px-4 lg:px-6 ">
        {/* Left Column - Image and Basic Info */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src={event.image}
              alt={event.eventName}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-neutral-50 mb-4">
              {event.eventName}
            </h1>
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800">
                  {event.eventType}
                </span>
                <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800">
                  {event.ageRating === "mature"
                    ? "18+"
                    : event.ageRating === "teen"
                      ? "15+"
                      : "All Ages"}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const fillPercentage = Math.max(
                      0,
                      Math.min(1, event.reviews - (star - 1))
                    );
                    return (
                      <div key={star} className="relative">
                        <StarIcon className="w-6 h-6 text-neutral-700" />
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{ width: `${fillPercentage * 100}%` }}
                        >
                          <StarIcon className="w-6 h-6 text-yellow-400 fill-yellow-400/50" />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <span className="text-lg">{event.reviews.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm text-neutral-500 mb-1">Date</h3>
                <p className="text-lg">{event.date}</p>
              </div>
              <div>
                <h3 className="text-sm text-neutral-500 mb-1">Time</h3>
                <p className="text-lg">{event.time}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-neutral-500 mb-1">Venue</h3>
              <p className="text-lg">{event.venue}</p>
              <p className="text-neutral-500">{event.location}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Event Details */}
        <div className="flex flex-col gap-4">
          {/* Add Ticket Types Section */}
          <div className="space-y-4">
            <h3 className="text-sm text-neutral-500">Available Tickets</h3>
            <div className="space-y-3">
              {ticketTypes.map((ticket) => (
                <TicketCard
                  key={ticket.name}
                  name={ticket.name}
                  price={ticket.price}
                  available={ticket.available}
                  benefits={
                    ticket.name === "VIP"
                      ? "Priority Entry + Lounge Access"
                      : ticket.name === "Premium"
                        ? "Priority Entry"
                        : "Standard Entry"
                  }
                  selected={selectedTickets[ticket.name] || 0}
                  onSelect={(count) =>
                    setSelectedTickets((prev) => ({
                      ...prev,
                      [ticket.name]: count,
                    }))
                  }
                  showQuantityControls
                />
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 space-y-4 mt-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            {Object.entries(selectedTickets).map(([type, count]) => {
              if (count === 0) return null;
              const ticket = ticketTypes.find((t) => t.name === type);
              const amount = (ticket?.price || 0) * count;
              return (
                <div key={type} className="flex justify-between text-sm">
                  <span>
                    {type} x {count}
                  </span>
                  <span>₹{amount.toLocaleString()}</span>
                </div>
              );
            })}

            {!hasSelectedTickets && (
              <div className="text-sm text-neutral-500">
                No tickets selected
              </div>
            )}

            <div className="border-t border-neutral-800 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Subtotal</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">CGST (9%)</span>
                <span>₹{Math.round(totalAmount * 0.09).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">SGST (9%)</span>
                <span>₹{Math.round(totalAmount * 0.09).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Convenience Fee</span>
                <span>₹{(hasSelectedTickets ? 50 : 0).toLocaleString()}</span>
              </div>
              <div className="border-t border-neutral-800 pt-4 flex justify-between">
                <span className="font-medium">Total Amount</span>
                <span className="font-medium text-[#F8D48D]">
                  ₹
                  {(
                    totalAmount +
                    Math.round(totalAmount * 0.18) +
                    (hasSelectedTickets ? 50 : 0)
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            {hasSelectedTickets && (
              <Button
                className="py-6 text-lg"
                variant="outline"
                onClick={() => setSelectedTickets({})}
              >
                Clear Selection
              </Button>
            )}
            <Button
              className="flex-1 py-6 text-lg"
              variant="accent"
              disabled={!hasSelectedTickets}
            >
              {hasSelectedTickets ? "Proceed to Payment" : "Select Tickets"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
