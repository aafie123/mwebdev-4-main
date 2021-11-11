const gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    browserSync = require('browser-sync').create();

// werk directory paden
const path = {
    styleDirs: {
        // pattern: ** is alle directories
        //          * is alle karakter (hier namen met .scss)
        src: 'src/scss/**/*.scss',
        dest: 'dist/css'
    }
};

function style () {
    return (
        gulp.src(path.styleDirs.src)
            .pipe(sass())
            .on('error', sass.logError)
            .pipe(gulp.dest(path.styleDirs.dest))
            .pipe(browserSync.stream())
    );
}

function reload() {
    browserSync.reload();
}

function watch() {
    browserSync.init(
        {
            proxy: 'http://localhost/mwebdev-4/dist/'
        }
    );

    gulp.watch(path.styleDirs.src, style);
    gulp.watch('dist/index.html', reload);
}

//exports.default = style;
exports.default = watch;