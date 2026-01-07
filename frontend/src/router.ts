import { createRouter, createBrowserHistory } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";

const history = createBrowserHistory();

export const router = createRouter({
  routeTree,
  history,
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
