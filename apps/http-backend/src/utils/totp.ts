import { generateToken } from "authenticator";
import { TOPT_SECRET } from "../config";
import { verifyToken as verifyTokenLib } from "authenticator";

export function getToken(number: string, type: "AUTH") {
    return generateToken(number + type + TOPT_SECRET);
}

export function verifyToken(number: string, type: "AUTH", otp: string) {
    return verifyTokenLib(number + type + TOPT_SECRET,  otp)
}