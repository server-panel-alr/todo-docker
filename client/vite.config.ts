import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  publicDir: '/src/assets',
  server: {
    host: true,
    port: 3000,
  },
  build: { outDir: '../dist' },
  plugins: [react()],
});
