require('esbuild')
  .serve(
    {
      servedir: 'www'
    },
    {
      entryPoints: ['src/main.ts'],
      outdir: 'www/js',
      bundle: true
    }
  )
  .then((server) => {
    // console.log(server)
    console.log(`运行中： http://localhost:${server.port}`)
  })
