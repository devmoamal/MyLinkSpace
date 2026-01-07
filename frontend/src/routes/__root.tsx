import * as React from "react";
import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import useTheme from "@/hooks/useTheme";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>404 Not Found</h1>
      </div>
    );
  },
});

function RootComponent() {
  const { theme } = useTheme();
  const location = useLocation();

  // Hide navbar on auth pages
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <React.Fragment>
      <div className={theme}>
        {!hideNavbar && <Navbar />}
        <Outlet />
      </div>
    </React.Fragment>
  );
}
