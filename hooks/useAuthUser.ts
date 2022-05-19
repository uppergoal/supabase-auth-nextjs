import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";
import axios from "axios";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const stateChange = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user);
      }
      if (event === "SIGNED_OUT") {
        setUser(null);
      }
      if (event === "TOKEN_REFRESHED") {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${session?.access_token}`;
      }
      //   if(event === 'PASSWORD_RECOVERY') {}
      if (event === "USER_DELETED") {
        setUser(null);
      }
      if (event === "USER_UPDATED") {
        setUser(session?.user);
      }
    });

    const user = supabase.auth.user();
    if (user) {
      setUser(user);
    }
    setIsConnected(!!user?.id);
    setLoading(false);

    return () => {
      stateChange.data?.unsubscribe();
    };
  }, []);

  return { user, loading, isConnected };
}
