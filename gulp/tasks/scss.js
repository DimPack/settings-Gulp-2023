import * as dartSass from 'sass'; // сам плагін scss
import gulpSass from 'gulp-sass'; // плагін для запуска його в gulp
import rename from 'gulp-rename'; //заміняє назву файлів scss на який нам потрібно
import cleanCss from 'gulp-clean-css'; // Зжатіє css
import webpcss from 'gulp-webpcss'; // виводить webp зображення (працює тільки з webp-converter@2.2.3)
import autoprefixer from 'gulp-autoprefixer'; // добавляє вендерні префікси
import GroupCssMediaQueries from 'gulp-group-css-media-queries' //Груперує медіа запроси

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {sourcemap: app.isDev})

        .pipe(app.plugins.plumber( // для увідомлень на віндовс
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(app.plugins.if(
            app.isBuild,
                GroupCssMediaQueries()
            )
        )
        .pipe(app.plugins.if(
            app.isBuild,
            webpcss(
                {
                    webpClass: ".webp", // якщо підтримує формат webp добавиться відповідний клас
                    noWebpClass: ".no-webp" // якщо ні то добавиться відповідний
                }
            )
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            autoprefixer({
                grid: true,
                overrideBrowserslist: ["last 3 versions"],
                cascade: true
            })
        ))
        //Якщо потрібен не зжатий файл то розкоментувати нижню строку
        .pipe(app.gulp.dest(app.path.build.css)) //НЕ зжимаємо файли 
        
        .pipe(app.plugins.if(
            app.isBuild,
            cleanCss()
        )) // зжимаємо файли 
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css)) // перенос файлів з папки src до папки dist або назви проекту
        .pipe(app.plugins.browsersync.stream()); // моніторити файли постійно
}       