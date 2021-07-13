import { defineConfig } from 'vite';
const path = require('path');
import svgLoader from 'vite-svg-loader';
import vue from '@vitejs/plugin-vue';
require('dotenv').config();
import configAlias from './config.alias.js';

// https://vitejs.dev/config/
export default defineConfig({
  // base: path.resolve(__dirname, './dist/'),
  base    : '/',
  plugins : [
    vue(),
    svgLoader({
      svgoConfig : {
        removeViewBox             : false,
        removeDimensions          : true,
        addAttributesToSVGElement : {
          attributes : [ `preserveAspectRatio="xMidYMid meet"` ]
        },
        convertShapeToPath : true,
        mergePaths         : false,
        convertPathData    : false
      },
      svgo : true
    })
  ],
  server : {
    host : process.env.DEV_SERVER_HOST || '127.0.0.1',
    port : process.env.DEV_SERVER_PORT || 3000
  }
});
