import { Router } from "express";
import { client } from "@repo/db/client"; 
import { superAdminMiddleware } from "../../../middleware/superadmin";
import { UpdateEventSchema } from "@repo/common/types";

const router: Router = Router();

router.get("/", superAdminMiddleware, async (req, res) => {
    const events = await client.event.findMany();

    res.json({
        events
    })
});

router.put("/metadata/:eventId", superAdminMiddleware, async (req, res) => {
    const {data, success} = UpdateEventSchema.safeParse(req.body);
    const eventId = req.params.eventId ?? "";

    if (!success) {
        res.status(400).json({
            message: "Invalid data"
        })
        return
    }

    try {
        await client.event.update({
            where: {
                id: eventId
            },
            data: {
                name: data.name,
                desciprtion: data.description,
                startTime: data.startTime,
                locationId: data.location,
                banner: data.banner,
                published: data.published,
                ended: data.ended
            }
        })
    
        res.json({
            message: "Updated event"
        })
    } catch(e) {
        res.status(500).json({
            message: "Could not update event"
        })
    }

});



export default router;