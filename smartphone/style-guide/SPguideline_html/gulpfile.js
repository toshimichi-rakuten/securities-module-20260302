var gulp = require('gulp');
 
// browser Sync
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

// Static server
// gulp.task('browser-sync', function() {
//     browserSync({
//         server: {
//             baseDir: "./"
//         }
//     });
// });

var gulp = require('gulp'),
    browser = require('browser-sync'),
    fs = require('fs'),
    path = require('path'),
    iconvLite = require('iconv-lite'),
    util = require('util'),
    jschardet = require('jschardet'),
    url = require('url');

gulp.task('browser-sync', function() {
    browser({
    port: 8080,
    notify: false,
        server: {
            baseDir: './',
            middleware: [
              function (req, res, next) {
                // pathnameを取得
                var urlParse = url.parse(req.url);

                // .htmlなら
                if (/\.html$/.test(urlParse.pathname)) {

                  // データ取得
                  var data = fs.readFileSync(path.join(__dirname, './', urlParse.pathname));

                  // 文字コード判定
                  var charset = jschardet.detect(data);
                  if (charset.encoding == 'EUC-JP') {
                    var source = iconvLite.decode(new Buffer(data, 'binary'), "EUC_JP");
                    res.setHeader("Content-Type", "text/html; charset=UTF-8");
                    res.end(source);
                  } else {
                    next();
                  }
                // .jsなら
                } else if (/\.js$/.test(urlParse.pathname)) {

                  // データ取得
                  var data = fs.readFileSync(path.join(__dirname, './', urlParse.pathname));

                  // 文字コード判定
                  var charset = jschardet.detect(data);
                  if (charset.encoding == 'EUC-JP') {
                    var source = iconvLite.decode(new Buffer(data, 'binary'), "EUC_JP");
                    res.setHeader("Content-Type", "text/html; charset=UTF-8");
                    res.end(source);
                  } else {
                    next();
                  }
                } else {
                  next();
                }
              }
            ]

        }
    });
});




var frontNote = require('gulp-frontnote');
gulp.task('doc', function() {
    // console.log("doc");
  gulp.src('src/components/*.*')
    .pipe(frontNote({
      out: './doc',
      overview: './doc/assets/custom/top.md',
      css: ['/doc/assets/custom/custom.css','/member/assets/rex/css/rex-main.css']
    }));
});

// style.scssをタスクを作成する
gulp.task('sass', function () {
  // style.scssファイルを取得
  gulp.src('src/*.*')
    // Sassのコンパイルを実行
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    // cssフォルダー以下に保存
    .pipe(gulp.dest('./member/assets/rex/css/'));
});


gulp.task('default', ['browser-sync']);
 
// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});
 
// Watch scss AND html files, doing different things with each.
gulp.task('default', ['browser-sync'], function () {
    gulp.watch("./member/*.*", ['bs-reload']);
    // gulp.watch("./member/smt/*.html", ['bs-reload']);
    gulp.watch("./member/smt/*.*", ['bs-reload']);
    gulp.watch("./member/smt/sf/suds-assets/css/*.*", ['bs-reload']);
    gulp.watch("./src/*.*", ['sass','doc','bs-reload']);
    gulp.watch("./src/components/*.*", ['sass','doc','bs-reload']);

});