import { client } from "@repo/db/client"; 
import jwt from "jsonwebtoken";
import { ADMIN_JWT_PASSWORD } from "../../config";

type TAdminType = "Creator" | "SuperAdmin";

export async function creatAdmin(number: string, name: string, type: TAdminType): Promise<string> {
    const admin = await client.admin.create({
        data: {
            number,
            name,
            verified: true,
            type
        }
    })

    const token = jwt.sign({
        userId: admin.id
    }, ADMIN_JWT_PASSWORD);

    return token;
}