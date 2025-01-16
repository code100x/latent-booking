import {verifyToken, generateToken} from "authenticator";
import { Router } from "express";
import { client } from "@repo/db/client"; 
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";

const router: Router = Router();

router.post("/signup", async (req, res) => {
    const number = req.body.phoneNumber;
    const totp = generateToken(number + "SIGNUP");
    // send toipt to phone number

    const user = await client.user.upsert({
        where: {
            number
        },
        create: {
            number,
            name: ""
        },
        update: {

        }
    })

    if (process.env.NODE_ENV === "production") {
        // send otp to user
        
    }

    res.json({
        id: user.id
    })
});

router.post("/signup/verify", async (req, res) => {
    const number = req.body.phoneNumber;
    const name = req.body.name;
    if (!verifyToken(number + "SIGNUP", req.body.otp)) {
        res.json({
            message: "Invalid token"
        })
        return
    }

    const userId = await client.user.update({
        where: {
            number
        },
        data: {
            name,
            verified: true
        }
    })

    const token = jwt.sign({
        userId
    }, JWT_PASSWORD)

    res.json({
        token
    })

});


export default router;