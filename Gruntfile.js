module.exports = function(grunt) {

    grunt.initConfig({
        bower: {
            install: {
                //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'public/scripts/lib',
                    mainConfigFile: 'public/scripts/main.js',
                    preserveLicenseComments: false, //comment in production
                    out: 'public/scripts/webapp.min.js',
                    optimize: 'uglify2',
                    include: ['../main']
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-npm-install');
    grunt.loadNpmTasks('grunt-bower-installer');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('init', ['npm-install', 'bower:install']);
    grunt.registerTask('compile', ['requirejs:compile']);

    grunt.registerTask('start', ['nodemon']);
};
