import { Router } from "express";
import { creatAdmin, AdminType } from "../../../controllers/test";
import { client } from "@repo/db/client";
import { JWT_PASSWORD } from "../../../config";
import jwt from "jsonwebtoken";

const router: Router = Router();

router.post("/create-admin", async (req, res) => {
    const number = req.body.number;
    const name = req.body.name;
    const token = await creatAdmin(number, name, AdminType.Creator); 

    res.json({
        token
    })
});

router.post("/create-super-admin", async (req, res) => {
    const number = req.body.number;
    const name = req.body.name;
    const token = await creatAdmin(number, name, AdminType.SuperAdmin); 

    res.json({
        token
    })
});

router.post("/create-user", async (req, res) => {
    const number = req.body.number;
    const name = req.body.name;
    const user = await client.user.create({
        data: {
            number,
            name
        }
    })

    const token = jwt.sign({
        userId: user.id
    }, JWT_PASSWORD);

    res.json({
        token
    })
});

export default router;
