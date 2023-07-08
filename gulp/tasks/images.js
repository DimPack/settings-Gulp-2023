import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.plumber( // для увідомлень на віндовс
            app.plugins.notify.onError({
                title: "IMG",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(app.plugins.newer(app.path.build.images)) // перевіряємо плагіном newer чи є картинки в папці dist
        .pipe(app.plugins.if(
                app.isBuild,
                webp()
            )
        ) // создаємо картинки формату webp

        .pipe(app.plugins.if(
                app.isBuild,
                app.gulp.dest(app.path.build.images)
            )
        ) // вигружаємо картинки в папку з результатом dist
        
        .pipe(app.plugins.if(
                app.isBuild,
                app.gulp.src(app.path.src.images)
            )
        ) // повертаємося до папки із ісходниками

        .pipe(app.plugins.if(
                app.isBuild,
                app.plugins.newer(app.path.build.images)
            )
        ) // та знову перевіряємо на обновлення
        //налаштування зжимання картинок
        .pipe(app.plugins.if(
            app.isBuild,
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3 // 0 - 7 на скільки силько потрібно зжимати зображення
            })
            )
        )
        .pipe(app.gulp.dest(app.path.build.images)) // перенос файлів з папки src до папки dist або назви проекту
        .pipe(app.gulp.src(app.path.src.svg))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.browsersync.stream());
}