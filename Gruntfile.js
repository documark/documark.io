module.exports = function (grunt) {
	var outputPath = 'build'
	var files      = {}

	files[outputPath + '/js/main.js'] = 'src/js/main.js'

	grunt.initConfig({
		watch: {
			css: {
				files: ['src/scss/**/*.scss'],
				tasks: ['exec:css']
			},
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['browserify:dist']
			},
		},
		browserify: {
			dist: {
				options: {
					transform: ['babelify']
				},
				files: files
			},
		},
		copy: {
			build: {
				files: [
					{ filter: 'isFile', expand: true, cwd: 'src/', src: 'index.html', dest: outputPath },
					{ filter: 'isFile', expand: true, cwd: 'src/', src: 'font/**/*', dest: outputPath },
					{ filter: 'isFile', expand: true, cwd: 'src/', src: 'pdf/**/*', dest: outputPath },
					{ filter: 'isFile', expand: true, cwd: 'src/', src: 'vendor/**/*', dest: outputPath },
				]
			},
		},
		exec: {
			build: {
				cmd: 'mkdir ' + outputPath + ' 2> /dev/null || true'
			},
			css: {
				cwd: 'src/scss',
				cmd: 'compass compile'
			},
		},
	})
	
	require('load-grunt-tasks')(grunt)

	grunt.registerTask('default', ['watch'])
	grunt.registerTask('build', ['exec:build', 'copy', 'exec:css', 'browserify'])
}
