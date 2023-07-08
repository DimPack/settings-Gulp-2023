import fs from 'fs'; // плагін для роботи з файловою системою node
import fonter from 'gulp-fonter'; // для перебразування шрифтів з формата otf на ttf та woff
import ttf2woff2 from 'gulp-ttf2woff2'; // для перебразування шрифтів в формат ttf2 та woff2

export const otfToTtf = () => {
    // шукаємо файли шрифтів .otf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`,{})
        .pipe(app.plugins.plumber( // для увідомлень на віндовс
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
      // Конвертація в .ttf
      .pipe(fonter({
        formats: ['ttf']
      }))
      //Вигружаємо в папку dist
      .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
    // шукаємо файли шрифтів .otf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`,{})
        .pipe(app.plugins.plumber( // для увідомлень на віндовс
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
      // Конвертація в .ttf
      .pipe(fonter({
        formats: ['woff']
      }))
      //Вигружаємо в папку dist
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      //Шукаю файли шрифтів .ttf
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
      //Конвертуємо в .woff2
      .pipe(ttf2woff2())
      //Вигружаємо в папку з результатом
      .pipe(app.gulp.dest(`${app.path.build.fonts}`)); 
}

export const fontsStyle = () => {
        //підключаємо файли шрифтів 
        let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
        //перевірка чи існує файли шрифтів
        fs.readdir(app.path.build.fonts, function(err, fontsFiles) {
            if (fontsFiles) {
                //перевірка чи файл стілей для підключення шрифтів існує
                if (!fs.existsSync(fontsFile)) {
                    //якщо файлу немає создає його 
                    fs.writeFile(fontsFile, '', cb);
                    let newFileOnly;
                    for (let i = 0; i < fontsFiles.length; i++) {
                        //Записує в підклучення шрифтів файла стилей
                        let fontsFileName = fontsFiles[i].split('.')[0];
                        if(newFileOnly !== fontsFileName) {
                            let fontName = fontsFileName.split('-')[0] ? fontsFileName.split('-')[0] : fontsFileName;
                            let fontWeight = fontsFileName.split('-')[1] ? fontsFileName.split('-')[1] : fontsFileName;
                            if (fontWeight.toLowerCase() === 'thin') {
                                fontWeight = 100;
                            } else if (fontWeight.toLocaleLowerCase() === 'extralight') {
                                fontWeight = 200;
                            } else if (fontWeight.toLocaleLowerCase() === 'light') {
                                fontWeight = 300;
                            } else if (fontWeight.toLocaleLowerCase() === 'medium') {
                                fontWeight = 500;
                            } else if (fontWeight.toLocaleLowerCase() === 'semibold') {
                                fontWeight = 600;
                            } else if (fontWeight.toLocaleLowerCase() === 'bold') {
                                fontWeight = 700;
                            } else if (fontWeight.toLocaleLowerCase() === 'extrabold' || fontWeight.toLocaleUpperCase() === 'heavy') {
                                fontWeight = 800;
                            } else if (fontWeight.toLocaleLowerCase() === 'black') {
                                fontWeight = 900;
                            } else {
                                fontWeight = 400;
                            }
                            fs.appendFile(fontsFile,`@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontsFileName}.woff2") format("woff2");\n\tsrc: url("../fonts/${fontsFileName}.woff") format("woff"); \n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                            newFileOnly = fontsFileName;
                        }
                    }
                } else {
                // якщо файл є виводимо повідомлення 
                console.log("Файл scss/fonts.scss вже існує. Для обновлення файлу потрібно його удалити!");
            }
        }
    });

    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { }
}