import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslint()],
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
