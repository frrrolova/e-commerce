import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

const isDev = process.env.NODE_ENV === 'development';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  define: { global: 'window' },
  build: {
    sourcemap: isDev ? true : false,
  },
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src', 'components'),
    },
  },
});
