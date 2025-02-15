"use client";

import { Button } from "@repo/ui/button";
import { XIcon } from "lucide-react";

interface TicketCardProps {
  name: string;
  price: number;
  available: number;
  benefits: string;
  selected?: number;
  onSelect?: (count: number) => void;
  showQuantityControls?: boolean;
}

export function TicketCard({
  name,
  price,
  available,
  benefits,
  selected = 0,
  onSelect,
  showQuantityControls = false,
}: TicketCardProps) {
  return (
    <div className="bg-neutral-900 rounded-xl border border-neutral-800 hover:border-[#F8D48D]/50 transition-all duration-300 p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-xl font-semibold text-neutral-50">{name}</h4>
          <p className="text-sm text-neutral-500">{benefits}</p>
        </div>
        <span className="text-lg font-medium text-[#F8D48D]">
          ₹{price.toLocaleString()}
        </span>
      </div>

      <div className="relative">
        <div className="border-t border-dashed border-neutral-800 my-6" />
        <div className="absolute -left-8 top-1/2 h-4 w-4 -mt-2 rounded-full bg-background" />
        <div className="absolute -right-8 top-1/2 h-4 w-4 -mt-2 rounded-full bg-background" />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-neutral-500">
          {available} tickets available
        </div>
        {showQuantityControls && onSelect && (
          <div className="flex items-center gap-3">
            {selected > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-neutral-500 hover:text-neutral-300"
                onClick={() => onSelect(0)}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={() => onSelect(Math.max(0, selected - 1))}
            >
              -
            </Button>
            <span className="w-8 text-center">{selected}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onSelect(Math.min(available, selected + 1))}
            >
              +
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
