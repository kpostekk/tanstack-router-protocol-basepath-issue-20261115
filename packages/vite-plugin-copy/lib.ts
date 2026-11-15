import { cp, rm } from "fs/promises"
import { resolve } from "path"
import type { Plugin } from "vite"

export type CopyOptions = {
  clean?: boolean
  from?: string
  to: string
}

export function copyClientOutput(opts: CopyOptions): Plugin {
  return {
    name: "copy-client-output",
    apply: "build",
    enforce: "post",
    buildApp: {
      order: "post",
      async handler(builder) {
        if (opts.clean ?? true) {
          await rm(resolve(builder.config.root, opts.to), { recursive: true, force: true })
        }

        await cp(
          resolve(builder.config.root, opts.from ?? "dist/client"),
          resolve(builder.config.root, opts.to),
          { recursive: true },
        )
      },
    },
  }
}
