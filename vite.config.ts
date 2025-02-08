import * as path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, ProxyOptions } from 'vite'
import vercel from 'vite-plugin-vercel'
import { apiRoutes } from './src/utils/constants.ts'

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const proxy: Record<string, string | ProxyOptions> | undefined = {}
  for (const route of Object.keys(apiRoutes)) {
    proxy[route] = {
      target: env.VITE_API_URL,
      changeOrigin: true,
      secure: false,
    }
  }

  return {
    plugins: [react(), vercel()],
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src').replace(/\\/g, '/') },
    },
    server: {
      proxy,
    },
    // vite proxy doesn't work on vercel
    vercel: {
      rewrites: [
        {
          source: '/users/:path*',
          destination: `${env.VITE_API_URL}/users/:path*`,
        },
        {
          source: '/posts/:path*',
          destination: `${env.VITE_API_URL}/posts/:path*`,
        },
        {
          source: '/comments/:path*',
          destination: `${env.VITE_API_URL}/comments/:path*`,
        },
        { source: '/(.*)', destination: '/' },
      ],
    },
  }
})
