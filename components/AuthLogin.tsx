import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import supabase from "../lib/supabaseClient";
export function AuthLogin({}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState<string | null>();

  const toast = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (!emailRegex.test(email)) {
      setErrorEmail("Email address is not valid");
      return;
    }
    setErrorEmail(null);
    return;
  };

  const emailChangedHandler = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value.toLowerCase());
    validateEmail(event.currentTarget.value);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    validateEmail(email);
    if (errorEmail) return;
    const res = await supabase.auth.signIn({ email });
    console.log(res);
    try {
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={6} border="2px" borderColor="green.300" mt={4}>
      <Center>
        <Heading>Login 👋</Heading>
      </Center>

      <form onSubmit={submitHandler}>
        <Stack mt={10}>
          <FormControl isInvalid={!!errorEmail}>
            <Input
              value={email}
              variant="outline"
              borderRadius={0}
              placeholder="Email"
              size="lg"
              onChange={emailChangedHandler}
            />
            <FormErrorMessage>{errorEmail}</FormErrorMessage>
          </FormControl>

          <Button
            isLoading={loading}
            borderRadius={0}
            size="lg"
            colorScheme="green"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
