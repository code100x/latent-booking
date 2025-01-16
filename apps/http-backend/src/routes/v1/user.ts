import {verifyToken, generateToken} from "authenticator";
import { Router } from "express";
import { client } from "@repo/db/client"; 
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";
import { SignUpSchema, VerifySignUpSchema } from "../../types";

const router: Router = Router();

router.post("/signup", async (req, res) => {
    const parseData = SignUpSchema.parse(req.body);
    if (!parseData) {
        res.json({
            message: "Invalid data"
        })
        return
    }

    const name = parseData.name;
    const number = parseData.phoneNumber;

    const totp = generateToken(number + "SIGNUP");
    // send toipt to phone number

    const user = await client.user.upsert({
        where: {
            number: number
        },
        create: {
            number: number,
            name: name,
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
    const parseData = VerifySignUpSchema.parse(req.body);
    if (!parseData) {
        res.json({
            message: "Invalid data"
        })
        return
    }
    const number = parseData.phoneNumber;
    const name = parseData.name;
    const otp = parseData.otp;
    if (!verifyToken(number + "SIGNUP", otp)) {
        res.json({
            message: "Invalid token"
        })
        return
    }

    const user = await client.user.update({
        where: {
            number
        },
        data: {
            name,
            verified: true
        }
    })

    const token = jwt.sign({
        userId: user.id
    }, JWT_PASSWORD)

    res.json({
        token
    })

});


export default router;