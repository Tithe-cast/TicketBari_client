"use client";

import { createAuthClient } from "better-auth/react";

// Points at the Express server where BetterAuth is mounted (/api/auth/*)
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const { useSession, signIn, signUp, signOut } = authClient;
