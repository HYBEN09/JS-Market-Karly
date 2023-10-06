export default {
  root: 'client',
  server: {
    host: 'localhost',
    port: 3000,
  },
  build: {
    outDir: '../dist',
  },
  esbuild: {
    target: 'es2022',
  },
};
