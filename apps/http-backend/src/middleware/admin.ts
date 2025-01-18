import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { ADMIN_JWT_PASSWORD, SUPERADMIN_JWT_PASSWORD } from "../config";
import { middleware } from ".";

export const adminMiddleware: RequestHandler = middleware(ADMIN_JWT_PASSWORD, SUPERADMIN_JWT_PASSWORD)