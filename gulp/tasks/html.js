//Плагіни та сценарії для обробки з html файлами
import fileinclude from "gulp-file-include"; // імпортуємо плагін
import webpHtmlNosvg from "gulp-webp-html-nosvg"; // обробка картинок у форматі webp
import versionNumber from "gulp-version-number" // потрібен для того щоб не кешувалися файли 

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber( // для увідомлень на віндовс
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(fileinclude())
        .pipe(app.plugins.replace(/@img\//g, 'img/')) // замість @img на img
        .pipe(app.plugins.if(
                app.isBuild,
                webpHtmlNosvg()
            )) //вставляє картинки формату webp в результаті dist 
        .pipe(app.plugins.if(
                app.isBuild,
                versionNumber({ // налаштування плагіну versionNumber
                    'value': '%DT%', // ключ являжться датою на часом (в більшості все буде працювати в продакшені)
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js',
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'
                    }
                })
        ))
        .pipe(app.gulp.dest(app.path.build.html)) // перенос файлів з папки src до папки dist або назви проекту
        .pipe(app.plugins.browsersync.stream());
}