import { User } from "@supabase/supabase-js";
import { createContext } from "react";

const AuthContext = createContext({
  user: null as null | undefined | User,
  loading: true,
  isConnected: false,
  openRoutes: [""],
  authRoutes: ["auth"],
});

export default AuthContext;
