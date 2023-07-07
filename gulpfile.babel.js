// gulpfile.babel.js
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const webp = require("gulp-webp");
const notify = require("gulp-notify");
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");

// File paths
const paths = {
  src: {
    scss: "src/scss/**/*.scss",
    js: "src/js/**/*.js",
    images: "src/images/**/*.{jpg,png}",
  },
  dist: {
    css: "dist/css",
    js: "dist/js",
    images: "dist/images",
  },
};

// Task: Compile SCSS into CSS, add vendor prefixes, generate source maps, and minify the CSS
gulp.task("styles", () => {
  return gulp
    .src(paths.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream())
    .pipe(notify({ message: "Styles task completed successfully" }));
});

// Task: Compile and minify JavaScript files using Babel
gulp.task("scripts", () => {
  return gulp
    .src(paths.src.js)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream())
    .pipe(notify({ message: "Scripts task completed successfully" }));
});

// Task: Convert images to WebP format
gulp.task("convert-webp", () => {
  return gulp
    .src(paths.src.images)
    .pipe(webp())
    .pipe(gulp.dest(paths.dist.images))
    .pipe(browserSync.stream())
    .pipe(notify({ message: "WebP conversion task completed successfully" }));
});

// Task: Optimize images
gulp.task("optimize-images", async () => {
  const imagemin = await import("gulp-imagemin");
  return gulp
    .src(paths.src.images)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.images))
    .pipe(browserSync.stream())
    .pipe(
      notify({ message: "Image optimization task completed successfully" })
    );
});

// Task: Watch for changes and run appropriate tasks
gulp.task("watch", () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    port: 3000,
  });

  gulp.watch(paths.src.scss, gulp.series("styles"));
  gulp.watch(paths.src.js, gulp.series("scripts"));
  gulp.watch(paths.src.images, gulp.series("convert-webp"));
  gulp.watch("./*.html").on("change", browserSync.reload);
});

// Default task: Build the project and watch for changes
gulp.task(
  "default",
  gulp.parallel("styles", "scripts", "convert-webp", "watch")
);
