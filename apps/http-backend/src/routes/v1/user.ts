import {verifyToken, generateToken} from "authenticator";
import { Router } from "express";

const router: Router = Router();

router.post("/signup", (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const totp = generateToken(phoneNumber + "SIGNUP");
    // send toipt to phone number

    res.json({
        id: "1"
    })
});

router.post("/signup/verify", (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    if (!verifyToken(phoneNumber + "SIGNUP", req.body.otp)) {
        res.json({
            message: "Invalid token"
        })
        return
    }
    // set user to verified in db
    res.json({
        
    })

});


export default router;