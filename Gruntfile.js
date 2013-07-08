module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: "//\n\
// <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today('mm-dd-yyyy') %>)\n\
//\n\
// The lightweight querySelector and events library perfectly suited for widgets\n\
// and simple applications or websites.\n\
//\n\
// Browser support: IE8+ and other modern browsers (Chrome, Safari, Firefox).\n\
//\n\
// Originally created by UserVoice for our widget framework (http://uservoice.com).\n\
// Later extracted into a library by John W. Long (@johnwlong).\n\
//\n\
// ---\n\
//\n\
// Copyright (c) 2013 John W. Long. Portions contributed by Austin Taylor,\n\
// Jonathan Novak, and Mark Martin.\n\
//\n\
// Permission is hereby granted, free of charge, to any person obtaining a copy\n\
// of this software and associated documentation files (the \"Software\"), to deal\n\
// in the Software without restriction, including without limitation the rights\n\
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n\
// copies of the Software, and to permit persons to whom the Software is furnished\n\
// to do so, subject to the following conditions:\n\
//\n\
// The above copyright notice and this permission notice shall be included in all\n\
// copies or substantial portions of the Software.\n\
//\n\
// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n\
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n\
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n\
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n\
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n\
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n\
// SOFTWARE.\n\
//\n",
        separator: "\n"
      },
      dist: {
        src: [
          'src/prequel.js',
          'src/query.js',
          'src/all.js',
          'src/identify.js',
          'src/data.js',
          'src/class.js',
          'src/dimensions.js',
          'src/offset.js',
          'src/events.js',
          'src/one.js',
          'src/ready.js',
          'src/sequel.js'
        ],
        dest: 'dist/snake-<%= pkg.version %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("mm-dd-yyyy") %>) */\n'
      },
      dist: {
        files: {
          'dist/snake-<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    mocha: {
      all: ['test/**/*_test.html'],
      options: {
        reporter: 'Spec'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js!*equel.js', 'test/**/*.js'],
      options: {
        browser: true,
        laxcomma: true,
        multistr: true
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'mocha']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-git-authors');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', ['jshint', 'mocha']);

  grunt.registerTask('default', ['jshint', 'mocha', 'concat', 'uglify']);

};
