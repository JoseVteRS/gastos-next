

import prisma from "@/lib/prisma";
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth';
import { Adapter } from "next-auth/adapters";

import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";


export const authOptions: NextAuthOptions = {
    // adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: 'select_account',
                    access_type: 'offline',
                    response_type: 'code',
                }
            }
        })
    ],

    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const useExists = await prisma.user.findUnique({ where: { email: user.email! } });
            if (!useExists)
                await prisma.user.create({
                    data: {
                        email: user.email ?? 'no-email',
                        name: user.name ?? 'no-name',
                        username: user.name ?? 'no-name',
                        password: 'no-password',
                    }
                });
            return true;
        },

        async jwt({ token, user, account, profile }) {
      
            const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });

            if (!dbUser) {
                NextResponse.redirect('https://josevte.com/api/auth/signin');
            };

            token.id = dbUser?.id ?? 'no-uuid';

            return token;
        },

        async session({ session, token, user }) {

            if (session?.user) {
                session.user.id = token.id;
            }

            return session;

        }

    },
    pages: {
        signIn: '/auth/signin',
    },
    debug: process.env.NODE_ENV === 'development' ? true : false,

}





const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };