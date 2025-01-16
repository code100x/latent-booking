import { generateToken, verifyToken } from "authenticator";
import { Router } from "express";
import jwt from "jsonwebtoken";


const router: Router = Router();

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