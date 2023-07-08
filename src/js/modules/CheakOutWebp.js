export function isWebp() { // функція яка перевіряє чи підтримується формат зображення webp якщо ТАК то додає певний клас і виводить картинку у форматі webp
    //Перевірка підтримки формату webp
    function testWebP(callback) {
        let webp = new Image();
        webp.onload = webp.onerror = function () {
            callback(webp.height == 2);
        };
        webp.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    //Добавляє класс до HTML webp або no_webp
    testWebP(function(support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}