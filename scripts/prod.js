require('esbuild').buildSync({
  entryPoints: ['src/main.ts'],
  bundle: true,
  minify: true,
  outfile: 'www/js/main.js'
})
