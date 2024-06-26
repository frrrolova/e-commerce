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
  server: {
    host: '0.0.0.0',
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
      '@shared': path.resolve(__dirname, 'src', 'shared'),
      '@client': path.resolve(__dirname, 'src', 'client'),
      '@core': path.resolve(__dirname, 'src', 'core'),
      '@store': path.resolve(__dirname, 'src', 'store'),
      '@enums': path.resolve(__dirname, 'src', 'enums'),
    },
  },
});
