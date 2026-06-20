"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "./AuthContext.js";
import { useSession, signIn, signUp, signOut } from "../lib/auth-client.js";

const TOKEN_KEY = "tb-access-token";

const AuthProvider = ({ children }) => {
  const { data: session, isPending: sessionLoading } = useSession();
  const [dbUser, setDbUser] = useState(null); // { role, fraud }
  const [authBootLoading, setAuthBootLoading] = useState(true);

  useEffect(() => {
    const syncWithBackend = async () => {
      if (!session?.user?.email) {
        localStorage.removeItem(TOKEN_KEY);
        setDbUser(null);
        setAuthBootLoading(false);
        return;
      }

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          {},
          { withCredentials: true }
        );

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/jwt`,
          {},
          { withCredentials: true }
        );
        localStorage.setItem(TOKEN_KEY, data.token);

        const roleRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/role/${session.user.email}`,
          { headers: { Authorization: `Bearer ${data.token}` } }
        );
        setDbUser(roleRes.data);
      } catch (error) {
        console.error("Auth sync failed:", error);
      } finally {
        setAuthBootLoading(false);
      }
    };

    setAuthBootLoading(true);
    syncWithBackend();
  }, [session?.user?.email]);

  const registerUser = (name, email, password) => signUp.email({ name, email, password });
  const loginUser = (email, password) => signIn.email({ email, password });
  const googleLogin = () =>
    signIn.social({ provider: "google", callbackURL: window.location.origin });

  const logOut = async () => {
    await signOut();
    localStorage.removeItem(TOKEN_KEY);
    setDbUser(null);
  };

  const authInfo = {
    user: session?.user || null,
    role: dbUser?.role || "user",
    fraud: dbUser?.fraud || false,
    loading: sessionLoading || authBootLoading,
    registerUser,
    loginUser,
    googleLogin,
    logOut,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
