import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 4500,
    open: true,
  },
  resolve:{
    alias:{
      "@components": path.resolve(__dirname, "src/components"),
      "@scripts": path.resolve(__dirname,"src/scripts")
    }
  }
  
})
