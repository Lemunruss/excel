import { range } from "@core/utils";

export function shouldResize (event){
    return event.target.dataset.resize;
}

export function isCell (event) {
    return event.target.dataset.type === "cell"; // добавляем проверку в массиве всех дата атрибутов (dataset), если type равно cell то
}

export function matrix ($target, $current){
    const target = $target.id(true); // вызовем на $target метод id из dom
    const current = $current.id(true); // вызовем  метод id из dom
    const cols = range(current.col, target.col); // с пом. range определяем массив в котором хранится набор значений выбранных колонок
    const rows = range(current.row, target.row); // с пом. range определяем массив в котором хранится набор значений выбранных рядов
    return cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`));
        return acc;
    }, [])
}

export function nextSelector (key, {col, row}){ // и через деструктурирование при вызове (id это объект!)заносим в переменные значения col and row
    const MIN_VAlUE = 0;
    switch (key) {
        case "Enter" :
        case "ArrowDown" : //Описываем через switch/case логику на нажатие разных клавиш из массива keys
            row++
            break
        case "Tab" :
        case "ArrowRight" :
            col++
            break
        case "ArrowLeft" :
            col = col - 1 < MIN_VAlUE ? MIN_VAlUE : col-1 //Проверка на случай выхода в отрицательные значения перехода в колонках
            break
        case  "ArrowUp" : 
            row = row - 1 < MIN_VAlUE ? MIN_VAlUE : row-1 //Проверка на случай выхода в отрицательные значения перехода в рядах
            break
    }

    return `[data-id = "${row}:${col}"]`
}