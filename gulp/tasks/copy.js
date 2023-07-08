export const copy = () => {
    return app.gulp.src(app.path.src.files)
        .pipe(app.gulp.dest(app.path.build.files)) // перенос файлів з папки src до папки dist або назви проекту
}