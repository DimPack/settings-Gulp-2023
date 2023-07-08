import webpack from "webpack-stream"; //подключаємо webpack для того щоб експортувати файли js в синтаксисі ES6
// для того щоб в проекті збирались всі файли js 
// потрібно устанавлювати разом з webpack (npm i -D webpack webpack-steam)
export const js = () => {
    return app.gulp.src(app.path.src.js, {sourcemap: true}) // sourcemap: true карта ісходих файлів
        .pipe(app.plugins.plumber( // для увідомлень на віндовс
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(webpack({ // налаштування webpack
            mode: app.isBuild ? 'production' : 'development',
            output: {
                filename: 'app.min.js',
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js)) // перенос файлів з папки src до папки dist або назви проекту
        .pipe(app.plugins.browsersync.stream()); // моніторити файли постійн
}