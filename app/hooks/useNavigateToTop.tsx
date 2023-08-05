import { useLocation, useNavigate, useNavigation } from "@remix-run/react";
import { useEffect, useLayoutEffect } from "react";

export const useNavigateToTop = () => {
  const navigate = useNavigate();

  const navigateAndReset = (to: string) => {
    navigate(to, { replace: true });
    window.scrollTo(0, 0);
  };

  return navigateAndReset;
};
