//https://www.youtube.com/watch?v=jU88mLuLWlk&t=5132s налаштування взяли з цього уроку

// npm run dev - для запуску проекта під час розробки 
// npm run build - для запуску проекта у продакшин
// npm run svgSprive - для генерації іконок 
// npm run zip - для архівації проекту що йде на продакшин

//Основні модулі
import gulp from "gulp";
//Імпортуємо шляхи
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
};


//Імпортуємо задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js"; // важливо добавляти зразу 3 задачі для правильної послідовності виконання
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";


function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

export { svgSprive } // викликати будемо як окрема команда тому що вона буде потрібно рідно щоб її виконати просто будем викликати команду 

// послідовна обробка шрифтів 
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Основні задачі
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images)); // parallel виконання задач паралельно

//Побудова сценарію виконанння задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server)); // series виконання задач послідувально в gulp
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(mainTasks, zip);
//Експор двох сценаріїв
export { dev }
export { build }
export { deployZIP }

//Виконання сценарію по замовчуваню
gulp.task('default', dev); // запуск сценарію