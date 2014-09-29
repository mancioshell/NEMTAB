({
    baseUrl: '../public/scripts/lib',
    mainConfigFile: '../public/scripts/main.js',
    preserveLicenseComments: false, //comment in production
    out: '../public/scripts/webapp.min.js',
    optimize: 'uglify2',
    include: ['../main']
})
