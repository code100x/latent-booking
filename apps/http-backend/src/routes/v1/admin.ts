import { Router } from "express";
import jwt from "jsonwebtoken";
import { adminMiddleware } from "../../middleware/admin-middleware";
import { CreateEventSchema, DeleteEventSchema, UpdateEventSchema } from "../../types";
import { client } from "@repo/db/client";


const router: Router = Router();

// add Signin from the kirat code

router.post('/event', adminMiddleware, async (req, res) => {
    const parseData = CreateEventSchema.parse(req.body);
    if (!parseData) {
        res.json({
            message: "Invalid data"
        })
        return
    }
    const name = parseData.name;
    const description = parseData.description;
    const banner = parseData.banner;

    try {

        const event = await client.event.create({
            data: {
                name: name,
                description: description,
                banner: banner
            }
        })

        res.json({
            id: event.id
        })
    } catch (e) {
        res.status(404).json({
            message: "Error creating event"
        })
    }
})

router.put('/event/:id', adminMiddleware, async (req, res) => {
    const parseData = UpdateEventSchema.parse(req.body);
    if (!parseData) {
        res.json({
            message: "Invalid data"
        })
        return
    }
    const id = parseData.id;
    const name = parseData.name;
    const description = parseData.description;
    const banner = parseData.banner;

    try {
        await client.event.update({
            where: {
                id: id
            },
            data: {
                name: name,
                description: description,
                banner: banner
            }
        })

        res.json({
            message: "Event updated"
        })
    } catch (e) {
        res.status(404).json({
            message: "Error updating event"
        })
    }
});

router.delete('/event/:id', adminMiddleware, async (req, res) => {
    const parseData = DeleteEventSchema.parse(req.params);
    if (!parseData) {
        res.json({
            message: "Invalid data"
        })
        return
    }
    const id = parseData.id;

    try {
        await client.event.delete({
            where: {
                id: id
            }
        })

        res.json({
            message: "Event deleted"
        })
    } catch (e) {
        res.status(404).json({
            message: "Error deleting event"
        })
    }
});


export default router;
