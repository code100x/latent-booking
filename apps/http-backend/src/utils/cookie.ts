import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import { Response } from "express";


export const setCookie = (res: Response, userid: string, statusCode: number, cookieType: "SIGNUP" | "LOGIN" | "VERIFY") => {

    const token = jwt.sign({
        userId: userid
    }, JWT_PASSWORD);

    const cookiePayloads: Record<string, string | boolean> = {
        success: true,
        id: userid,
    }

    if(cookieType === "LOGIN" || cookieType === "VERIFY"){
        cookiePayloads.token = token;
    }

    res
        .status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: Infinity,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production" ? true : false,
        })
        .json({
            success: true,
            id: userid,
        });
}