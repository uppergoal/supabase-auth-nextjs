import { Box, Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import AuthContext from "../store/AuthContext";

type Props = {
  children?: React.ReactNode;
};

const GuardLoading: FC<Props> = ({ children }) => {
  const { loading, openRoutes } = useContext(AuthContext);
  const router = useRouter();
  const { pathname } = router;
  const firstPath = pathname.split("/")[1];
  const isOpenRoute = openRoutes.includes(firstPath);

  if (isOpenRoute) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <>
        <Box minH="100vh">
          <Center>
            <Spinner size="xl" />
          </Center>
        </Box>
      </>
    );
  }

  return <>{children}</>;
};

export default GuardLoading;
