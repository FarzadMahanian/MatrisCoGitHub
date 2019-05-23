module.exports = function (grunt) {
    grunt.initConfig({

        appFolder: 'app/',
        distFolder: 'dist/',

        clean: ['<%= appFolder %>css/', '<%= distFolder %>', '<%= appFolder %>assets/css/'],

        sass: {
            development: {
                options: {
                    style: 'expanded',
                    lineNumber: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= appFolder %>sass/',
                    src: '*.scss',
                    dest: '<%= appFolder %>css/',
                    ext: '.css'
                }]
            }
        },

        copy: {
            main: {
                files: [
                    {src: ['<%= appFolder %>lib/semantic/dist/semantic.min.css'], dest: '<%= appFolder %>assets/css/semantic.min.css'},
                    {expand: true, cwd: '<%= appFolder %>lib/semantic/dist/', src: ['themes/default/**'], dest: '<%= appFolder %>assets/css/'}
                ]
            }
        },

        rtlcss: {
            development: {
                files: {
                    '<%= appFolder %>assets/css/semantic.min-rtl.css': '<%= appFolder %>lib/semantic/dist/semantic.min.css',
                    '<%= appFolder %>css/styles-rtl.css': '<%= appFolder %>css/styles.css'
                }
            },
            watch: {
                files: {
                    '<%= appFolder %>css/styles-rtl.css': '<%= appFolder %>css/styles.css'
                }
            }
        },

        watch: {
            css: {
                files: ['<%= appFolder %>sass/**/*.scss'],
                tasks: ['sass:development', 'rtlcss:watch']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-rtlcss');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('server', ['clean', 'rtlcss:development', 'copy', 'watch']);
};
