var gulp = require('gulp');
var gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
 	gp_uglifycss = require('gulp-uglifycss'),
 	ngAnnotate = require('gulp-ng-annotate'),
	clean = require('gulp-clean');
var resourcelocation = 'WebContent/console/resources/',
	userlocation = 'assets/',
	bowerlocation = 'bower_components/';
//declare watch path
var paths = {
    watchpathjs: [userlocation + 'js/**/*.*'],
    watchpathcss: [userlocation + 'css/*.css'],
    watchpathimage: [userlocation + 'images/*.*'],
    watchpathangularjs: [userlocation + 'app/**/*.*']
};
//clean the resource folder
gulp.task('clean', function() {
    return gulp.src(resourcelocation)
        .pipe(clean({
            force: true
        }));
});
gulp.task('copyimages', function() {
    gulp.src([''+paths.watchpathimage])
        .pipe(gulp.dest(resourcelocation + 'images'));
	gulp.src([bowerlocation + 'jstree/src/themes/default/*.png',
		bowerlocation + 'jstree/src/themes/default/throbber.gif'])
		.pipe(gulp.dest(resourcelocation + 'css'));
});
//copy and compress all js files for theme and user both
gulp.task('compress-js', function () {
    gulp.src([bowerlocation + 'ace/assets/js/jquery-2.1.4.min.js',
			bowerlocation + 'ace/assets/js/bootstrap.min.js',
			bowerlocation + 'ace/assets/js/jquery.dataTables.min.js',
			bowerlocation + 'ace/assets/js/jquery.dataTables.bootstrap.min.js',
			bowerlocation + 'ace/assets/js/jquery.colorbox.min.js',	
			bowerlocation + 'jstree/dist/jstree.js',
			bowerlocation + 'ace/assets/js/ace-extra.min.js',
			bowerlocation + 'ace/assets/js/html5shiv.min.js',
			bowerlocation + 'ace/assets/js/respond.min.js',
			bowerlocation + 'ace/assets/js/ace-elements.min.js',
			bowerlocation + 'ace/assets/js/ace.min.js',
			bowerlocation + 'angular/angular.js',
			bowerlocation + 'angular-datatables/dist/angular-datatables.min.js',
            bowerlocation + 'angular-ui-router/release/angular-ui-router.min.js',	
            bowerlocation + 'ngstorage/ngStorage.min.js',
            bowerlocation + 'angular-resource/angular-resource.min.js',
            bowerlocation + 'angular-growl-v2/build/angular-growl.min.js',
            bowerlocation + 'angular-block-ui/dist/angular-block-ui.min.js',
            bowerlocation + 'ng-idle/angular-idle.min.js',
			bowerlocation + 'ng-js-tree/dist/ngJsTree.js',			
			bowerlocation + 'oclazyload/dist/ocLazyLoad.min.js',
			bowerlocation + 'checklist-model/checklist-model.js'])
            .pipe(gp_concat('concattheme.js'))
            .pipe(gp_rename('theme.min.js'))
            .pipe(gp_uglify())
            .pipe(gulp.dest(resourcelocation + 'js'));
	gulp.src([userlocation + 'js/*.js'])
            .pipe(gp_concat('concatapp.js'))
            .pipe(gp_rename('application.min.js'))
            .pipe(gp_uglify())
            .pipe(gulp.dest(resourcelocation + 'js'));
	gulp.src([userlocation + 'js/indi/*.js'])
            .pipe(gulp.dest(resourcelocation + 'js'));
});
gulp.task('compress-angularjs', function () {
	gulp.src([userlocation + 'app/*.js'])
            .pipe(gp_concat('angularapp.js'))
            .pipe(gulp.dest(resourcelocation + 'app'));
	gulp.src([userlocation + 'app/controllers/user/*.js'])
			.pipe(gp_concat('user.js'))
            .pipe(gulp.dest(resourcelocation + 'app/controllers'));
	gulp.src([userlocation + 'app/controllers/profile/*.js'])
			.pipe(gp_concat('profile.js'))
            .pipe(gulp.dest(resourcelocation + 'app/controllers'));
	gulp.src([userlocation + 'app/controllers/log/*.js'])
			.pipe(gp_concat('logger.js'))
            .pipe(gulp.dest(resourcelocation + 'app/controllers'));
	gulp.src([userlocation + 'app/controllers/notification/*.js'])
			.pipe(gp_concat('notification.js'))
            .pipe(gulp.dest(resourcelocation + 'app/controllers'));
	gulp.src([userlocation + 'app/controllers/dbadmin/*.js'])
			.pipe(gp_concat('dbadmin.js'))
            .pipe(gulp.dest(resourcelocation + 'app/controllers'));
	gulp.src([userlocation + 'app/directives/*.js'])
            .pipe(gulp.dest(resourcelocation + 'app/directives'));	
	gulp.src([userlocation + 'app/services/*.js'])
            .pipe(gulp.dest(resourcelocation + 'app/services'));    
});
gulp.task('compress-css', function () {
    gulp.src([bowerlocation + 'ace/assets/css/bootstrap.min.css',
			bowerlocation + 'ace/assets/font-awesome/4.5.0/css/font-awesome.min.css',
			bowerlocation + 'ace/assets/css/ace.min.css',
			bowerlocation + 'ace/assets/css/ace-skins.min.css',
			bowerlocation + 'ace/assets/css/ace-rtl.min.css',
			bowerlocation + 'ace/assets/css/ace-ie.min.css',			
			bowerlocation + 'angular-datatables/dist/css/angular-datatables.min.css',
			bowerlocation + 'datatables/media/css/dataTables.bootstrap.min.css',
			bowerlocation + 'datatables/media/css/jquery.dataTables.min.css',
			bowerlocation + 'angular-growl-v2/build/angular-growl.min.css',
			bowerlocation + 'angular-block-ui/dist/angular-block-ui.min.css',
			bowerlocation + 'jstree/src/themes/default/style.css'])
            .pipe(gp_concat('concatcss.css'))
            .pipe(gp_rename('theme.min.css'))
            .pipe(gp_uglifycss())
            .pipe(gulp.dest(resourcelocation + 'css'));
    gulp.src([userlocation + 'css/*.css'])
            .pipe(gp_concat('style.css'))
            .pipe(gp_rename('style.min.css'))
            .pipe(gp_uglifycss())
            .pipe(gulp.dest(resourcelocation + 'css'));
});
//watch when developing the application
gulp.task('watch', function() {
    gulp.watch(paths.watchpathimage, ['copyimages']);
    gulp.watch(paths.watchpathjs, ['compress-js']);
    gulp.watch(paths.watchpathcss, ['compress-css']);
	gulp.watch(paths.watchpathangularjs, ['compress-angularjs']);
});
gulp.task('copythemefont', function() {
    gulp.src([bowerlocation + 'ace/assets/fonts/*.*',
		userlocation + 'fonts/*.*'])
        .pipe(gulp.dest(resourcelocation + 'fonts'));
});
gulp.task('copyfont-awesomefont', function() {
    gulp.src([bowerlocation + 'ace/assets/font-awesome/4.5.0/fonts/*'])
        .pipe(gulp.dest(resourcelocation + 'fonts'));
});
//run sequential tasks
var runSequence = require('run-sequence');
gulp.task('default', function (callback) {
    runSequence('clean',
            ['compress-js', 'compress-angularjs', 'compress-css', 'copyimages'],
            ['copythemefont','copyfont-awesomefont'],
            callback);
});