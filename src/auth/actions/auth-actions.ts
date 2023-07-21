import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export const getUserSessionServer = async () => {
    const session = await getServerSession(authOptions)
    return session?.user
}