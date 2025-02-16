import { defineConfig } from 'vite'

export default defineConfig({
  base: './',  // This is correct for GitHub Pages
  resolve: {
    dedupe: ['three']  // Prevent multiple instances
  },
  build: {
    rollupOptions: {
      external: ['three'],
    }
  }
}) 