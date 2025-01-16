<<<<<<< HEAD
import { generateToken, verifyToken } from "authenticator";
import { Router } from "express";
import jwt from "jsonwebtoken";
=======
import { Router } from "express";
import jwt from "jsonwebtoken";
import { adminMiddleware } from "../../middleware/admin-middleware";
import { CreateEventSchema, DeleteEventSchema, UpdateEventSchema } from "../../types";
import { client } from "@repo/db/client";
>>>>>>> recovered-branch


const router: Router = Router();

<<<<<<< HEAD
router.post("/signin", (req, res) => {
    const { phoneNumber } = req.body; // added directly from in db
    // we have to zod valdation.
    const user; // db call;

    if(!user) {
        res.status(404).json({
            message: "User or password is incorrect"
        })
    };

     const totp = generateToken(phoneNumber + "SIGNUP"); // send to phone number

    return res.json({
        msg: "OTP sent"
    })
})

router.post("/signin/verify", (req, res) => {
    const { phoneNumber, otp } = req.body;
    if (!verifyToken(phoneNumber + "SIGNUP", otp)) {
        res.status(400).json({
            message: "Invalid token"
        })
        return;
    }
    const user; // db call
    const token = jwt.sign({
        id: user.id
    }, "secret", {
        expiresIn: "1h"
    })
    return res.json({
        token
    })
})


export default router;
=======
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
>>>>>>> recovered-branch
