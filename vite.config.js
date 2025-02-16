import { defineConfig } from 'vite'

export default defineConfig({
  base: './',  // This is important for GitHub Pages
  resolve: {
    alias: {
      'three': 'three',
      'three/examples/jsm/loaders/GLTFLoader': 'three/examples/jsm/loaders/GLTFLoader.js',
      'three/examples/jsm/loaders/DRACOLoader': 'three/examples/jsm/loaders/DRACOLoader.js'
    }
  },
  build: {
    rollupOptions: {
      external: [],  // Remove 'three' from external
    }
  }
}) 