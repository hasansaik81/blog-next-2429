// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   /** The base URL of the backend server */
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
// });







import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:5000",
});