import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclude /api/* routes from locale middleware
  matcher: ["/((?!_next|_vercel|api|.*\\..*).*)"],
};
