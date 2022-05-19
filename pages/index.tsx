import { AuthLogin } from "./../components/AuthLogin";
import { Button, Container, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import AuthLogout from "../components/AuthLogout";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import Link from "next/link";

export default function Home() {
  const { isConnected } = useContext(AuthContext);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Heading>Welcome to this public route</Heading>
          You are currently{" "}
          <Text fontWeight="bold">
            {isConnected ? "connected" : "not connected"}
          </Text>
          {isConnected ? (
            <AuthLogout />
          ) : (
            <Link href="/auth">
              <Button>Login</Button>
            </Link>
          )}
        </Container>
      </main>
    </div>
  );
}