// Получаємо ім'я папки проекту
import * as nodePath from 'path'; // в package.json ми переключились на "type": "module", тому все можемо підключати модульнно
const rootFolder = nodePath.basename(nodePath.resolve());


const buildFolder = `./dist`; // Використовуємо назву текущого проекту може бути як по дефолку dist
const srcFolder = `./src`;

export const path = {
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
        files: `${buildFolder}/files/`,
    },
    src: {
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        scss: `${srcFolder}/scss/style.sass`, //якщо хочеш писати в scss просто перейменувати кінець файлу
        html: `${srcFolder}/*.html`,
        files: `${srcFolder}/files/**/*.*`, // цікавить всі документи і файли в src
        svgicons: `${srcFolder}/svgicons/*.svg`,
    }, 
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.sass`,//якщо хочеш писати в scss просто перейменувати кінець файлу
        html: `${srcFolder}/**/*.html`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
        files: `${srcFolder}/files/**/*.*`,
    }, 
    clean: buildFolder, 
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ''
}