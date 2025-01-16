
import { Router } from "express";
import { creatAdmin } from "../../../controllers/test";
import { AdminType } from "@repo/db/client";
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

export default router;