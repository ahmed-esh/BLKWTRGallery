import { defineConfig } from 'vite'

export default defineConfig({
  base: './',  // This is important for GitHub Pages
  resolve: {
    dedupe: ['three']  // Prevent multiple instances
  },
  build: {
    rollupOptions: {
      external: ['three'],
    }
  }
}) 