import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/(api|trpc)(.*)"]);

// Middleware to protect routes
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});
