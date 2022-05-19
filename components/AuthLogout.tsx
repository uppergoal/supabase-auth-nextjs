import { Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import supabase from "../lib/supabaseClient";

export default function AuthLogout() {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const toast = useToast();

  const signoutHandler = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setLoading(false);
      await router.push("/");
    } catch (err: any) {
      setLoading(false);
      toast({
        title: "Error",
        description: err.response,
        status: "error",
      });
    }
  };

  return (
    <Button isLoading={loading} onClick={signoutHandler}>
      Signout
    </Button>
  );
}
