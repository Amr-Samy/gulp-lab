const { src, dest, series, watch, parallel } = require("gulp");

const globs = {
  html: "project/**/*.html",
  css: "project/*.css",
  js: "project/js/*.js",
  img: "project/media/img/*",
};

const htmlmin = require("gulp-html-minifier-terser");

function htmlTask() {
  return src(globs.html)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest("dist"));
}
exports.h = htmlTask;

const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
function cssTask() {
  // read files
  return src(globs.css)
    .pipe(concat("style.min.css"))
    .pipe(cleanCSS())
    .pipe(dest("dist"));
}
exports.css = cssTask;

const terser = require("gulp-terser");
function jsTask() {
  return src(globs.js, { sourcemaps: true })
    .pipe(concat("script.min.js"))
    .pipe(terser())
    .pipe(dest("dist/js", { sourcemaps: "." }));
}
exports.js = jsTask;

const optimizeImages = require("gulp-optimize-images");
function imgTask() {
  return src(globs.img)
    .pipe(
      optimizeImages({
        compressOptions: {
          jpeg: {
            quality: 50,
            progressive: true,
          },
          png: {
            quality: 50,
            progressive: true,
            compressionLevel: 6,
          },
        },
      })
    )
    .pipe(dest("dist/media/img"));
}
exports.img = imgTask;

// function watchTask() {
//   watch(globs.html, htmlTask);
//   watch(globs.css, cssTask);
//   watch(globs.js, jsTask);
//   watch(globs.img, imgTask);
// }

//default //gulp
exports.default = series(
  parallel(htmlTask, cssTask, jsTask, imgTask)
  //   dummyTask,
  //   watchTask
);
