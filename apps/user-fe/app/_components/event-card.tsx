"use client";

import { StarIcon } from "lucide-react";

interface EventCardProps {
  eventName: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  eventType: string;
  ageRating: string;
  reviews: number;
  ticketPrice: number;
}

export function EventCard({
  eventName,
  date,
  time,
  venue,
  location,
  eventType,
  ageRating,
  reviews,
  ticketPrice,
}: EventCardProps) {
  return (
    <div className="bg-neutral-900 rounded-xl border border-neutral-800 hover:border-[#F8D48D]/50 transition-all duration-300 p-6 gap-2 h-full flex flex-col min-w-[340px]">
      <div className="flex flex-col justify-between">
        <h4 className="font-bold text-neutral-50 line-clamp-2 min-h-[4rem]">
          {eventName}
        </h4>
        <div className="flex flex-col">
          <span className="text-neutral-500 text-xs">Starting from</span>
          <p className="font-semibold text-[#F8D48D] text-xl">
            ₹{ticketPrice.toLocaleString()}{" "}
            <span className="text-neutral-50 text-xs font-normal">
              (excl. taxes)
            </span>
          </p>
        </div>
      </div>
      <div className="relative">
        <div className="border-t border-dashed border-neutral-800 my-6" />
        <div className="absolute -left-8 top-1/2 h-4 w-4 -mt-2 rounded-full bg-background" />
        <div className="absolute -right-8 top-1/2 h-4 w-4 -mt-2 rounded-full bg-background" />
      </div>
      {/* Middle Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col ">
          <h5 className="text-neutral-500 text-xs">Event Type</h5>
          <div className="font-medium min-h-[3rem]">{eventType}</div>
        </div>
        <div className="flex flex-col ">
          <h5 className="text-neutral-500 text-xs">Date</h5>
          <div className="font-medium min-h-[3rem]">{date}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col ">
          <h5 className="text-neutral-500 text-xs">Age Rating</h5>
          <div className="font-medium min-h-[3rem]">
            {ageRating === "mature"
              ? "18+"
              : ageRating === "teen"
                ? "15+"
                : "All Ages"}
          </div>
        </div>
        <div className="flex flex-col ">
          <h5 className="text-neutral-500 text-xs">Reviews</h5>
          <div className="font-medium flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => {
                const fillPercentage = Math.max(
                  0,
                  Math.min(1, reviews - (star - 1))
                );
                return (
                  <div key={star} className="relative">
                    <StarIcon className="w-4 h-4 text-neutral-700" />
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ width: `${fillPercentage * 100}%` }}
                    >
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400/50" />
                    </div>
                  </div>
                );
              })}
            </div>

            <span className="text-sm">{reviews.toFixed(1)}</span>
          </div>
        </div>
      </div>
      {/* Event Details */}
      <div className="flex flex-col">
        <p className="font-medium min-h-[1.5rem]">{time}</p>
        <p className="text-neutral-500 text-sm min-h-[1.5rem]">{venue}</p>
        <p className="text-neutral-500 text-sm min-h-[1.5rem]">{location}</p>
      </div>
    </div>
  );
}
