import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
      '~': resolve(__dirname, 'src'),
    },
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                $base-font-family: 'Lato', sans-serif;
                $base-font-color : #202930;
                $base-font-size: 14px;
                $base-background: #f6f8f9;

                $button-font-size: 12px;
                $responsive-base-font-size: 12px;
                $page-title-font-size : 20px;
                $mobile-align-left-padding: 16px;

                $h-primary:#009EF7; //blue  rgb(0, 158, 247)
                $h-primary-hover: #0095E8;
                $h-primary-text:#ffffff;

                $h-secondary: #fff;
                $secondary-font-color : #808285;
                $h-secondary-buttercup: #f6bb12;
                $h-secondary-pictonBlue: #43bdef;
                $h-secondary-red: #ea1914;
                $h-secondary-themePurple: #7766F7;

                $h-section: #7239EA;
                $h-column: #50CD89;
                $h-element: #009EF7;

                $sm-display: 576px;
                $md-display: 768px;
                $lg-display: 1024px;

                $table-border-color: #ced4da;
            `,
      },
    },
  },
});
