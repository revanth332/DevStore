import { decrypt } from "@/middleware";
import { cookies } from "next/headers"

export const getSession = async () => {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);
    return session;
}