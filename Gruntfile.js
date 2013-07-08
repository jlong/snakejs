module.exports = function(grunt) {

  var fs = require('fs')
  ,   read = function(name) { return String(fs.readFileSync(name)); }
  ,   write = fs.writeFileSync
  ;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: "/*\n<%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today('mm-dd-yyyy') %>)\n\n" + read('src/intro.md') + "\n---\n\n" + read('src/license.md') + "*/\n",
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

  grunt.registerTask('readme', 'generate README.md from source comments', function() {
    grunt.task.requires('concat');

    function docs(name) {
      var source = read('src/' + name + '.js')
      ,   lines = source.split('\n')
      ,   comments = []
      ,   regexp = /^\s*\/\/\s?/
      ;

      for (var i = 0; i < lines.length; i++) {
        if (regexp.test(lines[i])) {
          comments.push(lines[i].replace(regexp, ''));
        }
      }

      return comments.join('\n');
    }

    write(
      'README.md',
      'Snake.js\n--------\n\n' +
      read('src/intro.md') +
      "\n\n### Selecting elements\n\n" +
      docs('query') +
      docs('all') +
      "\n\n### Retreiving IDs\n\n" +
      docs('identify') +
      "\n\n### Storing data\n\n" +
      docs('data') +
      "\n\n### Manipulating classes\n\n" +
      docs('class') +
      "\n\n### Getting dimensions and offset\n\n" +
      docs('dimensions') +
      docs('offset') +
      "\n\n### Adding and removing events\n\n" +
      docs('events') +
      docs('one') +
      "\n\n### DOM ready\n\n" +
      docs('ready') +
      "\n\n### MIT License\n\n" +
      read('src/license.md')
    );
  });

  grunt.registerTask('default', ['jshint', 'mocha', 'concat', 'uglify', 'readme']);

};
