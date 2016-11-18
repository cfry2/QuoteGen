// Include gulp
var gulp = require('gulp');
 // Include plugins
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var prefixer = require('gulp-autoprefixer');
//var livereload = require('livereload');
 // Concatenate JS Files
gulp.task('scripts', function() {
    return gulp.src(['assets/js/main.js', 'assets/js/routes.js', 'assets/js/controllers/*.js'])
      .pipe(concat('app.js'))
      .pipe(gulp.dest('assets/js'));
});

gulp.task('sass', function()
{
	return sass('assets/SCSS/style.scss', {style: 'expanded'})
		.pipe(prefixer('last 2 version'))
		.pipe(gulp.dest('assets/css'))
		//.pipe(notify({message: 'sass compile complete'}));
});

gulp.task('watch', function(){
	gulp.watch('assets/**/*.js', ['scripts']);
	gulp.watch('assets/**/*.scss', ['sass']);
})
 // Default Task
gulp.task('default', ['scripts']);