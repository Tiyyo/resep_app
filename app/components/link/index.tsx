import type { LinkProps } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { useNavigateToTop } from "~/hooks/useNavigateToTop";

interface LinkFixedProps extends LinkProps {
  children: React.ReactNode;
  to: string;
}

export default function LinkFixed({ children, to, ...props }: LinkFixedProps) {
  const navigateToTop = useNavigateToTop();

  const navigateAndReset = (e) => {
    e.preventDefault();
    console.log("navigateAndReset");
    navigateToTop(to);
  };

  return (
    <Link to={to} {...props} onClick={navigateAndReset}>
      {children}
    </Link>
  );
}
