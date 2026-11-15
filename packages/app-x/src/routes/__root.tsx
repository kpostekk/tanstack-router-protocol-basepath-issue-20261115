import {
  ClientOnly,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools"

import appCss from "../styles.css?url"

import type { QueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const state = useRouterState()

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Keep the first client render aligned with the empty SPA shell. */}
        <ClientOnly fallback={<p>Waiting for client mount…</p>}>
          <div data-debug="client-content">
            <pre>
              {JSON.stringify(
                {
                  status: state.status,
                  pathname: state.location.pathname,
                  matches: state.matches.map((match) => ({
                    routeId: match.routeId,
                    status: match.status,
                    error: match.error ? String(match.error) : undefined,
                  })),
                },
                null,
                2,
              )}
            </pre>
            {children}
          </div>
        </ClientOnly>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  const navigate = Route.useNavigate()

  return <button onClick={() => navigate({ to: "/" })}>go to home</button>
}
