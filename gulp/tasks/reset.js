import deleteAsync from "del"; // імпортуємо плагін

export const reset = () => {
    return deleteAsync(app.path.clean);
}
// помилка з The requested module 'del' does not provide an export named 'default' вирішилась командою npm install del@6
