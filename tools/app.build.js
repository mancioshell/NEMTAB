({
    baseUrl: '../public/scripts/lib',
    mainConfigFile: '../public/scripts/main.js',
    preserveLicenseComments: false, //comment in production
    out: 'webapp.min.js',
    optimize: 'uglify2',
    include: ['../main']
})
