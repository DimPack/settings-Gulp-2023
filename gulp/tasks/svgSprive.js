import svgSprite from "gulp-svg-sprite";

export const svgSprive = () => {
    return app.gulp.src(`${app.path.src.svgicons}`, {})
        .pipe(app.plugins.plumber( // для увідомлень на віндовс
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: `../icons/icons.svg`,
                    //создаємо сторінку з перерахуванням іконок
                    example: true
                }
            },
        }))
        .pipe(app.gulp.dest(`${app.path.build.images}`)); // перенос файлів з папки src до папки dist або назви проекту
}