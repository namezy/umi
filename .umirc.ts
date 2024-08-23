import { defineConfig } from 'umi'

export default defineConfig({
  // routes: [
  //   { path: "/", component: "index" },
  //   { path: "/docs", component: "docs" },
  // ],
  npmClient: 'yarn',
  dva: {},
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
  plugins: ['@umijs/plugins/dist/dva'],
})
