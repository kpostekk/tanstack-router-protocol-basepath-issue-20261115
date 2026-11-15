import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"

import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query"

import { getContext } from "./integrations/tanstack-query/root-provider"

export function getRouter() {
  const context = getContext()

  const router = createTanStackRouter({
    routeTree,
    context,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    basepath: "/app-x/",
    origin: typeof window !== "undefined" ? window.location.origin : undefined,
  })

  // Uncomment this block to enable workaround for non http protocols (like tauri://)
  const ALLOW_TAURI = true

  if (ALLOW_TAURI && typeof window !== "undefined" && window.location.protocol === "tauri:") {
    const buildLocation = router.buildLocation.bind(router)

    router.buildLocation = ((...args) => {
      const location = buildLocation(...args)
      const url = new URL(location.publicHref, window.location.href)

      // Normalize only URLs pointing to this same Tauri app.
      if (url.protocol === window.location.protocol && url.host === window.location.host) {
        return {
          ...location,
          publicHref: `${url.pathname}${url.search}${url.hash}`,
          external: false,
        }
      }

      return location
    }) as typeof router.buildLocation
  }

  setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient })

  return router
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
