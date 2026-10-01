import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // relative URLs, so the build works under any GitHub Pages path
  plugins: [react()],
})
