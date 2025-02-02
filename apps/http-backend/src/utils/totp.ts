import { generateToken } from "authenticator";
import { TOPT_SECRET } from "../config";
import { verifyToken as verifyTokenLib } from "authenticator";

type TokenType = "AUTH" | "ADMIN_AUTH";

export function getToken(number: string, type: TokenType) {
    return generateToken(number + type + TOPT_SECRET);
}

export function verifyToken(number: string, type: TokenType, otp: string) {
    const result = verifyTokenLib(number + type + TOPT_SECRET,  otp);
    console.log("result, ", result)
    return result;
}