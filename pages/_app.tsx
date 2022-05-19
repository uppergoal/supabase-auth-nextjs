import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { useAuthUser } from "../hooks/useAuthUser";
import AuthContext from "../store/AuthContext";
import GuardAuth from "../components/GuardAuth";
import GuardLoading from "../components/GuardLoading";

function MyApp({ Component, pageProps }: AppProps) {
  const openRoutes = [""];
  const authRoutes = ["auth"];
  const { user, loading, isConnected } = useAuthUser();

  return (
    <ChakraProvider>
      <AuthContext.Provider
        value={{ user, loading, isConnected, openRoutes, authRoutes }}
      >
        <GuardLoading>
          <GuardAuth>
            <Component {...pageProps} />
          </GuardAuth>
        </GuardLoading>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
