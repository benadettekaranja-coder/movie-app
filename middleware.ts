import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin",
  },
});

export const config = {
  matcher: [
    "/((?!api/auth(?:/|$)|signin(?:/|$)|_next/static(?:/|$)|_next/image(?:/|$)|favicon\\.ico$|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif|css|js|map|woff2?|ttf)$).*)",
  ],
};
