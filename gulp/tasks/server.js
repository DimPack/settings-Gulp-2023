export const server = (done) => {
    app.plugins.browsersync.init({ //init запускаємо браузер сам плагін browsersync 
        server: {
            baseDir: `${app.path.build.html}` // звідки запускаємо проект
        },
        notify: false, // убираємо повідомлення в браузері
        port: 3000, // порт локального сервера
    });
}