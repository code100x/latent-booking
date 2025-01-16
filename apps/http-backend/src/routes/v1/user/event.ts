
import { Router } from "express";
import { client } from "@repo/db/client"; 
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";
import { sendMessage } from "../../utils/twilio";
import { getToken, verifyToken } from "../../utils/totp";

const router: Router = Router();

router.get("/events", async (req, res) => {
    const events = await client.event.findMany({
        where: {
            published: true,
            ended: false
        }
    });

    res.json({
        events
    })
});

export default router;