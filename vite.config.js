import { defineConfig } from 'vite'

export default defineConfig({
  base: './',  // Correct for GitHub Pages
  resolve: {
    dedupe: ['three']  // Keep this to prevent duplicate Three.js instances
  }
}) 