import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const auth = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
});

export async function GET(request: Request) {
  return auth.handlers.GET(request);
}

export async function POST(request: Request) {
  return auth.handlers.POST(request);
}