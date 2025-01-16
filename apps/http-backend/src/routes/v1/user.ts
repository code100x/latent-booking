
import { Router } from "express";
import { client } from "@repo/db/client"; 
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";
<<<<<<< HEAD
import { SignUpSchema, VerifySignUpSchema } from "../../types";
=======
import { sendMessage } from "../../utils/twilio";
import { getToken, verifyToken } from "../../utils/totp";
>>>>>>> 4835732643a8d6184db29177f6e55afe18219b1d

const router: Router = Router();

router.post("/signup", async (req, res) => {
<<<<<<< HEAD
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
=======
    const number = req.body.number;
    const totp = getToken(number, "AUTH");
>>>>>>> 4835732643a8d6184db29177f6e55afe18219b1d
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

router.post("/signup/verify", async (req, res) => {
<<<<<<< HEAD
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
=======
    const number = req.body.number;
    const name = req.body.name;
    const otp = req.body.totp;

    if (process.env.NODE_ENV === "production" && !verifyToken(number, "AUTH", otp)) {
>>>>>>> 4835732643a8d6184db29177f6e55afe18219b1d
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

<<<<<<< HEAD

export default router;
=======
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
    const number = req.body.number;    
    const otp = req.body.totp;

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
>>>>>>> 4835732643a8d6184db29177f6e55afe18219b1d
