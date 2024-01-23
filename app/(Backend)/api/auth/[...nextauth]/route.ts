import prisma from "@/prisma/Prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";

const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		EmailProvider({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			// Persist the OAuth access_token to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token from a provider.

			try {
				if (session.user?.name)
					//create a user database if not whenever user login with google
					await prisma.user.upsert({
						where: { email: session.user.email as string },
						update: {
							name: session.user.name as string,
						},
						create: {
							name: session.user.name as string,
							email: session.user.email as string,
						},
					});

				return session;
			} catch (err: any) {
				console.log("Error from route.ts inside auth", err.message);

				return session;
			}
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
