import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET
        // }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                const email = credentials?.email as string;
                const password = credentials?.password as string;

                const user = await prisma.user.findFirst({
                    where: {
                        email: email
                    }
                });
                if (!user || !user.password) {
                    return null
                };

                const passwordChecked = await bcrypt.compare(password, user.password);
                if (!passwordChecked) {
                    return null
                };
                return {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            }
        })
    ],
    pages: {
        signIn: "/signin"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }: any) {

            if (session.user) {
                session.user.id = token.id
            }

            return session
        }
    },
    session: {
        strategy: "jwt" as "jwt",
        maxAge: 30 * 24 * 60 * 60
    }
}