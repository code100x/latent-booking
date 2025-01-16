import { Router } from "express";
import jwt from "jsonwebtoken";


const router: Router = Router();

router.post("/signin", (req, res) => {
    const { email, password } = req.body; // added directly from in db
    // we have to zod valdation.
    const user; // db call;

    if(!user) {
        res.status(404).json({
            message: "User or password is incorrect"
        })
    };

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);

    return res.json({
        token
    })
})


export default router;