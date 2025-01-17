import { Router } from "express";
import { client } from "@repo/db/client";
import { userMiddleware } from "../../../middleware/user";
import { CreateBookingSchema } from "@repo/common/types";
import { getRedisKey, incrCount } from "@repo/redis/client";

const router: Router = Router();

router.get("/", userMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });

      return;
    }

    const bookings = await client.booking.findMany({
      where: {
        userId: req.userId,
      },
    });

    res.json({
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch bookings",
    });
  }
});

router.post("/", userMiddleware, async (req, res) => {
  const { data, success } = CreateBookingSchema.safeParse(req.body);
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  if (!success) {
    res.status(400).json({
      message: "Invalid data",
    });
    return;
  }

  const event = await client.event.findUnique({
    where: {
      id: data.eventId,
    },
  });

  if (!event || event.startTime > new Date()) {
    res.status(404).json({
      message: "Event not found or already started",
    });
    return;
  }

  try {
    const counter = await incrCount(getRedisKey(`bookings-${data.eventId}`));
    const booking = await client.booking.create({
      data: {
        eventId: data.eventId,
        userId: userId,
        status: "Pending",
        sequenceNumber: counter,
        currentSequenceNumber: counter,
        seats: {
          create: data.seats.map((seat) => ({
            seatTypeId: seat.id,
            qr: "",
          })),
        },
        expiry: new Date(new Date().getTime() + event.timeoutInS * 1000),
      },
    });

    res.json({
      id: booking.id,
    });
  } catch (e) {
    res.status(500).json({
      message: "Could not create booking",
    });
  }
});

export default router;
