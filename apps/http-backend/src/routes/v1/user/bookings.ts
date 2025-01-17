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
        userId: userId,
      },
      include: {
        seats: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      status: "success",
      data: { bookings },
    });
    return;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch bookings",
    });
    return;
  }
});

router.post("/", userMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
      return;
    }

    const parsedData = CreateBookingSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({
        status: "error",
        message: "Invalid booking data",
        errors: parsedData.error.errors,
      });
      return;
    }

    const { data } = parsedData;

    const event = await client.event.findUnique({
      where: {
        id: data.eventId,
      },
    });

    if (!event) {
      res.status(404).json({
        status: "error",
        message: "Event not found",
      });
      return;
    }

    if (event.startTime <= new Date()) {
      res.status(400).json({
        status: "error",
        message: "Event has already started",
      });
      return;
    }

    if (!event.published || event.ended) {
      res.status(400).json({
        status: "error",
        message: "Event is not available for booking",
      });
      return;
    }

    // Get sequence number for booking
    const counter = await incrCount(getRedisKey(`bookings-${data.eventId}`));

    // Create booking with seats
    const booking = await client.booking.create({
      data: {
        eventId: data.eventId,
        userId: userId,
        status: "Pending",
        sequenceNumber: counter,
        seats: {
          create: data.seats.map((seat) => ({
            seatTypeId: seat.id,
            qr: "", // Consider generating QR code here
          })),
        },
        expiry: new Date(Date.now() + event.timeoutInS * 1000),
      },
      include: {
        seats: true,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        id: booking.id,
        expiresAt: booking.expiry,
        sequenceNumber: booking.sequenceNumber,
      },
    });
    return;
  } catch (error) {
    console.error("Error creating booking:", error);
    if ((error as any)?.code === "P2002") {
      res.status(409).json({
        status: "error",
        message: "Duplicate booking request",
      });
      return;
    }

    if ((error as any)?.code === "P2003") {
      res.status(400).json({
        status: "error",
        message: "Invalid seat type selected",
      });
      return;
    }

    res.status(500).json({
      status: "error",
      message: "Failed to create booking",
    });
    return;
  }
});

export default router;
