//Загальні плагіни по GULP
import replace from "gulp-replace"; // Пошук та заміна
import plumber from "gulp-plumber"; // Обробка помилок
import notify from "gulp-notify"; // для виводу повідомлення про помилку
import browsersync from "browser-sync"; // плагін для запуску браузера і обновлення змін в ньому
import newer from "gulp-newer"; // перевірка обновлення картинок яких ще немає в папці dist
import ifPlugin from "gulp-if"; // отвітвленіє для задач галп для розробника і для продакшена


//Експорт Обє'кта
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer:newer,
    if: ifPlugin
}

