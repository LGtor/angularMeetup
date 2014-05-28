var path = require('path');

var stylesheetsDir = 'styles/';

module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
				options: {
					port: 9001
				}
			}
		},
		concat: {
			js: {
				options: {
					separator: ';'
				},
				src: [
					'js/*.js'
				],
				dest: 'v'
			},
		},
		uglify: {
			options: {
				mangle: false
			},
			js: {
				files: {
					'js/main.min.js': ['js/main.js']
				}
			}
		},
		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					style: 'expanded'
				},
				files: {                         // Dictionary of files
					'styles/main.css': stylesheetsDir + 'main.scss'      // 'destination': 'source'
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 5 version', 'ie 7', 'ie 8', 'ie 9']
			},
			no_dest: {
				src: 'styles/main.css'
			}
		},
		watch: {
			js: {
				files: ['js/*.js'],
				tasks: ['concat:js', 'uglify:js'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['styles/*.scss'],
				tasks: ['sass', 'autoprefixer'],
				options: {
					livereload: true
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-jade');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// Run the server and watch for file changes
	grunt.registerTask('default', ['connect',  'concat', 'uglify', 'sass', 'autoprefixer', 'watch']);
};