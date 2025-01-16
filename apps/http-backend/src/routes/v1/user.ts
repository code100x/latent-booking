
import { Router } from "express";
import { client } from "@repo/db/client"; 
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";
import { sendMessage } from "../../utils/twilio";
import { getToken, verifyToken } from "../../utils/totp";
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
    const totp = getToken(number, "AUTH");
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
        try {
            await sendMessage(`Your otp for logging into latent is ${totp}`, number)
        } catch(e) {
            res.status(500).json({
                message: "Could not send otp"
            })
            return   
        }
    }

    res.json({
        id: user.id
    })
});


router.post("/signin", async (req, res) => {
    const number = req.body.number;
    const totp = getToken(number, "AUTH");
    try {
        console.log(number)
        const user = await client.user.findFirstOrThrow({
            where: {
                number
            }
        });
        console.log("after nuimebnr" + number);
    
        console.log("env is " + process.env.NODE_ENV);
        // send topt to phone number
        if (process.env.NODE_ENV === "production") {
            console.log("inside send message")
            // send otp to user
            try {
                await sendMessage(`Your otp for logging into latent is ${totp}`, number)
            } catch(e) {
                res.status(500).json({
                    message: "Could not send otp"
                })
                return   
            }
        }
        
        res.json({
            message: "Otp sent"
        })
    } catch(e) {
        res.status(411).json({
            message: "User invalid"
        })
    }
});

router.post("/signin/verify", async (req, res) => {
    const parseData = VerifySignUpSchema.parse(req.body);
    if (!parseData) {
        res.json({
            message: "Invalid data"
        })
        return
    }
    const number = parseData.phoneNumber;   
    const otp = parseData.otp;
    
    if (process.env.NODE_ENV === "production" && !verifyToken(number, "AUTH", otp)) {
        res.json({
            message: "Invalid token"
        })
        return
    }
    
    const user = await client.user.findFirstOrThrow({
        where: {
            number
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
