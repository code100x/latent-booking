import { Router } from "express";
import { client } from "@repo/db/client";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../../config";
import { sendMessage } from "../../../utils/twilio";
import { getToken, verifyToken } from "../../../utils/totp";
import {
  SignInSchema,
  SignInVerifySchema,
  UserSignUpSchema,
  UserSignUpVerifySchema,
} from "@repo/common/types";

const router: Router = Router();

router.post("/signup", async (req, res) => {
  try {
    const parsedNumber = UserSignUpSchema.safeParse(req.body);
    if (!parsedNumber.success) {
      res.status(400).json({
        status: "error",
        message: "Invalid phone number format",
      });
      return;
    }

    const number = parsedNumber.data.number;
    const totp = getToken(number, "AUTH");

    const user = await client.user.upsert({
      where: { number },
      create: {
        number,
        name: "",
      },
      update: {},
    });

    if (process.env.NODE_ENV === "production") {
      try {
        await sendMessage(
          `Your otp for logging into latent is ${totp}`,
          number
        );
      } catch (e) {
        res.status(503).json({
          status: "error",
          message: "SMS service unavailable. Please try again later.",
        });
        return;
      }
    }

    res.status(201).json({
      status: "success",
      data: { id: user.id },
    });
    return;
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
    return;
  }
});

router.post("/signup/verify", async (req, res) => {
  try {
    const parsedData = UserSignUpVerifySchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({
        status: "error",
        message: "Invalid request data",
      });
      return;
    }

    const { number, totp: otp, name } = parsedData.data;

    if (
      process.env.NODE_ENV === "production" &&
      !verifyToken(number, "AUTH", otp)
    ) {
      res.status(401).json({
        status: "error",
        message: "Invalid or expired OTP",
      });
      return;
    }

    const user = await client.user.update({
      where: { number },
      data: {
        name,
        verified: true,
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_PASSWORD);

    res.status(200).json({
      status: "success",
      data: { token },
    });
    return;
  } catch (error) {
    if ((error as any)?.code === "P2025") {
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
      return;
    }
    console.error("Signup verification error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
    return;
  }
});

router.post("/signin", async (req, res) => {
  try {
    const parsedData = SignInSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({
        status: "error",
        message: "Invalid phone number format",
      });
      return;
    }

    const number = parsedData.data.number;
    const totp = getToken(number, "AUTH");

    try {
      await client.user.findFirstOrThrow({ where: { number } });
    } catch (e) {
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
      return;
    }

    if (process.env.NODE_ENV === "production") {
      try {
        await sendMessage(
          `Your otp for logging into latent is ${totp}`,
          number
        );
      } catch (e) {
        res.status(503).json({
          status: "error",
          message: "SMS service unavailable. Please try again later.",
        });
        return;
      }
    }

    res.status(200).json({
      status: "success",
      message: "OTP sent successfully",
    });
    return;
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
    return;
  }
});

router.post("/signin/verify", async (req, res) => {
  try {
    const parsedData = SignInVerifySchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({
        status: "error",
        message: "Invalid request data",
      });
      return;
    }

    const { number, totp: otp } = parsedData.data;

    if (
      process.env.NODE_ENV === "production" &&
      !verifyToken(number, "AUTH", otp)
    ) {
      res.status(401).json({
        status: "error",
        message: "Invalid or expired OTP",
      });
      return;
    }

    let user;
    try {
      user = await client.user.findFirstOrThrow({
        where: { number },
      });
    } catch (e) {
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_PASSWORD);

    res.status(200).json({
      status: "success",
      data: { token },
    });
    return;
  } catch (error) {
    console.error("Signin verification error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
    return;
  }
});

export default router;
