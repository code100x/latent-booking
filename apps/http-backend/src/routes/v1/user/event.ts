
import { Router } from "express";
import { client } from "@repo/db/client";

const router: Router = Router();

router.get("/", async (req, res) => {
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