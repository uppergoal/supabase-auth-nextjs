import { useRouter } from "next/router";
import { FC, useContext, useEffect } from "react";
import AuthContext from "../store/AuthContext";

type Props = {
  children?: React.ReactNode;
};

const GuardAuth: FC<Props> = ({ children }) => {
  const { isConnected, openRoutes, authRoutes } = useContext(AuthContext);
  const router = useRouter();

  const { pathname } = router;
  const p = pathname.split("/")[1];

  const isOnOpenRoute = openRoutes.includes(p);
  const isOnAuthRouteAndConnected = authRoutes.includes(p) && isConnected;
  const isOnAuthRouteAndNotConnected = authRoutes.includes(p) && !isConnected;
  const isOnProtectedRouteAndNotConnected = !isOnOpenRoute && !isConnected;

  useEffect(() => {
    if (isOnOpenRoute) return;
    if (isOnAuthRouteAndNotConnected) return;
    if (isOnAuthRouteAndConnected) {
      router.push("/");
      return;
    }
    router.push("/auth");
  }, [
    router,
    isOnOpenRoute,
    isOnAuthRouteAndConnected,
    isOnAuthRouteAndNotConnected,
  ]);

  if (isOnAuthRouteAndNotConnected) return <>{children}</>;
  if (isOnProtectedRouteAndNotConnected) return <></>;
  if (isOnAuthRouteAndConnected) return <></>;
  return <>{children}</>;
};

export default GuardAuth;
