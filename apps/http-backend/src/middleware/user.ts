import { RequestHandler } from "express";

import { JWT_PASSWORD } from "../config";
import { middleware } from ".";

export const userMiddleware: RequestHandler = middleware(JWT_PASSWORD)