
import { Router } from "express";
import { client } from "@repo/db/client";
import { userMiddleware } from "../../../middleware/user";

const router: Router = Router();

router.get("/", userMiddleware, async (req, res) => {
    const bookings = await client.booking.findMany({
        where: {
            userId: req.userId
        }
    });

    res.json({
        bookings
    })
});

export default router;