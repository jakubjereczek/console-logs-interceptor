import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslint(),
    dts({
      exclude: ['**/__tests__/*'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'lib',
    },
    build: {
      manifest: true,
      rollupOptions: {
        external: ['src/playground.ts'],
      },
    },
  },
});

// console debug
