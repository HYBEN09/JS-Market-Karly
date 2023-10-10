import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'client',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'client/index.html'),
        login: path.resolve(__dirname, 'client/pages/login.html'),
        register: path.resolve(__dirname, 'client/pages/register.html'),
      },
    },
  },
  server: {
    host: 'localhost',
    port: 3000,
  },
  esbuild: {
    target: 'es2022',
  },
});
