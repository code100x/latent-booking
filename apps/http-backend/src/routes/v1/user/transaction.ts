import { Router } from "express";
import { client } from "@repo/db/client";
import { userMiddleware } from "../../../middleware/user";

const router: Router = Router();

router.get("/", userMiddleware, async (req, res) => {
  try {
    const transactions = await client.payment.findMany({
      where: {
        userId: req.userId,
      },
    });

    res.status(200).json({
      transactions,
    });
    return;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({
      message: "Could not fetch transactions",
    });
    return;
  }
});

export default router;
