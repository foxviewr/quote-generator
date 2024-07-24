export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/", "/quotes/:path*", "/tags/:path*", "/dashboard/:path*"]
};
