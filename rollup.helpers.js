import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
//import flow from 'rollup-plugin-flow';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

export const DESTINATION_FOLDER = 'dist';
export const LIBRARY_FILE_NAME = 'vue-leaflet-icon-wrapper'; // dummy, replace with project name
export const LIBRARY_VAR_NAME = 'vue-leaflet-icon-wrapper'; // dummy, replace with project name

import VuePlugin from 'rollup-plugin-vue'

export const plugins = [
  resolve(),
  //flow(),
  babel({
    plugins: [
      '@babel/plugin-external-helpers',
      '@babel/plugin-transform-flow-strip-types',
      '@babel/plugin-syntax-object-rest-spread',
      'babel-plugin-transform-class-properties',
    ],
    exclude: 'node_modules/**',
    externalHelpers: true,
    babelrc: false,
  }),
  commonjs({
    namedExports: {
      'node_modules/ngeohash/main.js': [
        'encode',
        'decode',
        'decode_bbox'
      ]
    }
  }),
  VuePlugin(),
  json(),
];

export const cjsConfig = {
  input: 'src/index.js',
  output: [
    {
      file: 'index.js',
      sourcemap: true,
      exports: 'named',
      format: 'cjs',
    },
  ],
  plugins,
  external: [
  ],
};

const makeUMDConfig = (suffix = '', additionalPlugins = []) => ({
  input: 'src/index.js',
  output: [
    {
      file: `${DESTINATION_FOLDER}/${LIBRARY_FILE_NAME}${suffix}.js`,
      sourcemap: true,
      exports: 'named',
      name: LIBRARY_VAR_NAME,
      format: 'umd',
    },
  ],
  plugins: [...plugins, ...additionalPlugins],
});

export const umdConfig = makeUMDConfig();

export const umdMinConfig = makeUMDConfig('.min', [terser()]);
