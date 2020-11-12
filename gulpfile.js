var {watch, parallel, task, series} = require("gulp");
// var htmlmin = require("gulp-htmlmin");
// var sass = require("gulp-sass");
// var cleancss = require("gulp-clean-css");
// var sourcemaps = require("gulp-sourcemaps");
var {server} = require("gulp-connect");
var moveHTML = require("./move-html");
var processSass = require("./process-sass");

// function moveHTML () {
//     return src("./src/html/**/*.html") //og kopiere filen et andet sted hen
//     .pipe(sourcemaps.init())
//     .pipe(htmlmin({ collapseWhitespace: true }))
//     .pipe(sourcemaps.write("."))
//     .pipe(dest("./dist")) 
//     .pipe(connect.reload());
// }


// function processSass() {
//     return src("./src/sass/**/*.scss")
//     .pipe(sourcemaps.init())
//     .pipe(sass())
//     .pipe(cleancss({compatblity: "ie9"} ))
//     .pipe(sourcemaps.write(".")) //fortæller vi skal ligge den i samme mappe som i vores dest
//     .pipe(dest("./dist/assets/css"))
//     .pipe(connect.reload());
// }

function watchEverything() {
    watch("./src/html/**/*.html", 
    { ignoreInitial: false },
    moveHTML); //holder øje med om der er ændringer i nogen af vores filer i html automatiseret

    watch("./src/sass/**/*.scss", 
    { ignoreInitial: false },
    processSass);
}

function serve() {
    return server({
        root: "dist", 
        livereload: true,
        port: 80
});
}

task("default", parallel(serve, watchEverything));
task("build", series(moveHTML, processSass));
