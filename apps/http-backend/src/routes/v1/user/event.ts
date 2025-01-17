import { Router } from "express";
import { client } from "@repo/db/client";

const router: Router = Router();

router.get("/", async (req, res) => {
  try {
    const events = await client.event.findMany({
      where: {
        published: true,
        ended: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      status: "success",
      data: { events },
    });
    return;
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch events",
    });
    return;
  }
});

export default router;
