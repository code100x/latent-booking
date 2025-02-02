
import { Router } from "express";
import { client } from "@repo/db/client";
import { RazorpayWebhookSchema } from "@repo/common/types";

const router: Router = Router();

router.post("/payment", async (req, res) => {
    const {success, data} = RazorpayWebhookSchema.safeParse(req.body);
    
    if (!success) {
        res.status(400).json({
            message: "Invalid data"
        })
        return
    }

    if (data.webhookSecret !== process.env.RAZORPAY_WEBHOOK_SECRET) {
        res.status(401).json({
            message: "Invalid secret"
        })
        return
    }

    try {
        // TODO other side of the db lock here
        await client.booking.update({
            where: {
                id: data.notes.bookingId
            },
            data: {
                paymentId: data.id,
                status: "Confirmed"
            }
        })

        res.json({})
    } catch(e) {
        res.status(500).json({
            message: "Could not create payment"
        })
    }
});

export default router; // wasn't exported