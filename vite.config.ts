import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      "@":normalizePath(path.resolve("./src")),
    }
  },
  plugins: [react()],
})
