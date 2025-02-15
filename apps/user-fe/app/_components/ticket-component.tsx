"use client";

interface TicketProps {
  eventName: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  section: string;
  seat: string;
  ticketHolder: string;
  bookingRef: string;
  eventType: string;
}

export function TicketComponent({
  eventName,
  date,
  time,
  venue,
  location,
  section,
  seat,
  ticketHolder,
  bookingRef,
  eventType,
}: TicketProps) {
  return (
    <div className="flex flex-col w-[300px] h-full">
      {/* Ticket Card */}
      <div className="bg-neutral-900 rounded-lg shadow-md p-6 space-y-4 h-full">
        <div className="flex flex-col">
          <div className="text-lg font-medium text-gray-400">{eventName}</div>
        </div>
        {/* Header */}
        <div className="flex justify-between">
          <div>
            <div className="text-gray-500 text-sm">Seat</div>
            <div className="font-medium">{seat}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Section</div>
            <div className="font-medium">{section}</div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex justify-between">
          <div>
            <div className="text-gray-500 text-sm">Event Type</div>
            <div className="font-medium">{eventType}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Date</div>
            <div className="font-medium">{date}</div>
          </div>
        </div>

        {/* Divider with dots */}
        <div className="relative">
          <div className="border-t border-dashed border-neutral-800 my-4" />
          <div className="absolute -left-8 top-1/2 h-4 w-4 -mt-2 rounded-full bg-background" />
          <div className="absolute -right-8 top-1/2 h-4 w-4 -mt-2 rounded-full bg-background" />
        </div>

        {/* Event Details */}
        <div className="flex flex-col">
          <div className="font-medium">{time}</div>
          <div className="text-sm text-gray-500">{venue}</div>
          <div className="text-xs text-gray-400">{location}</div>
        </div>

        {/* Attendee Details */}
        <div className="space-y-2">
          <div>
            <div className="text-gray-500 text-sm">Ticket Holder</div>
            <div className="font-medium">{ticketHolder}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Booking Ref</div>
            <div className="font-medium">{bookingRef}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
