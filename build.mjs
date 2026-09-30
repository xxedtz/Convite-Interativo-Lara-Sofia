import { build } from 'esbuild';
await build({ entryPoints: ['src/main.jsx'], bundle: true, minify: true, format: 'iife', jsx: 'automatic', outfile: 'dist/app.js',
  loader: { '.js': 'jsx', '.woff2': 'file' }, assetNames: 'fonts/[name]-[hash]', define: { 'process.env.NODE_ENV': '"production"' } });
console.log('ok');
