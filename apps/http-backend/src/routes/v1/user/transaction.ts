
import { Router } from "express";
import { client } from "@repo/db/client";
import { userMiddleware } from "../../../middleware/user";

const router: Router = Router();

router.get("/", userMiddleware, async (req, res) => {
    const transactions = await client.payment.findMany({
        where: {
            userId: req.userId
        }
    });

    res.json({
        transactions
    })
});

export default router;