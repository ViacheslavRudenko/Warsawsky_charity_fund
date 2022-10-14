import gulp from "gulp";
import rename from "gulp-rename";
import cleanCSS from "gulp-clean-css";
import babel from "gulp-babel";
import ugl from "gulp-uglify-es";
import concat from "gulp-concat";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import imagemin from "gulp-imagemin";
import htmlmin from "gulp-htmlmin";
import size from "gulp-size";
import newer from "gulp-newer";
import { deleteAsync } from "del";
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
import { create as bsCreate } from "browser-sync";
import ts from "gulp-typescript";

const browsersync = bsCreate();
const uglify = ugl.default;
const sass = gulpSass(nodeSass);

const paths = {
  html: {
    src: ["src/views/*.html"],
    dest: "dist/",
  },
  styles: {
    src: ["src/styles/styles.scss"],
    dest: "dist/css/",
  },
  scripts: {
    src: ["src/scripts/**/*.ts"],
    dest: "dist/js/",
  },
  images: {
    src: "src/img/**",
    dest: "dist/img/",
  },
};

function clean() {
  return deleteAsync(["dist/*", "!dist/img"]);
}

function html() {
  return gulp
    .src(paths.html.src)

    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browsersync.stream());
}

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(
      rename({
        basename: "style",
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browsersync.stream());
}

function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(
      ts({
        noImplicitAny: true,
      })
    )
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(
      size({
        showFiles: true,
      })
    )

    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browsersync.stream());
}

function img() {
  return gulp
    .src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(
      imagemin({
        progressive: true,
      })
    )
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(paths.images.dest));
}

function watch() {
  browsersync.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch(paths.html.dest).on("change", browsersync.reload);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, img);
}

export { clean, html, styles, scripts, img, watch };

export default gulp.series(
  clean,
  html,
  gulp.parallel(styles, scripts, img),
  watch
);
gulp.task("build", gulp.series([clean, styles, img, html, scripts]));
gulp.task("dev", gulp.series([clean, styles, img, html, scripts, watch]));
