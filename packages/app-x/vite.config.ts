import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"

import { tanstackStart } from "@tanstack/react-start/plugin/vite"

import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react"
import babel from "@rolldown/plugin-babel"
import tailwindcss from "@tailwindcss/vite"

import { copyClientOutput } from "vite-plugin-copy"

const config = defineConfig({
  base: "/app-x/",
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart({
      spa: {
        enabled: true,
        prerender: {
          outputPath: "/index.html",
        },
      },
    }),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
    copyClientOutput({
      to: "../../dist/app-x",
    }),
  ],
})

export default config
