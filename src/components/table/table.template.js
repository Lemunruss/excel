const CODES = {
    A: 65,
    Z: 90
}

// function toCell(row, col){ // 1й Вариант добавления ячеек
//     return `
//     <div class="cell" contenteditable data-col="${col}" data-row="${row}"></div>
//     `
// }

    function toCell(row){ // 2й Вариант добавления ячеек через замыкания
        return function(_, col){
            return `
            <div 
            class="cell"
            contenteditable 
            data-col="${col}"
            data-type="cell"  
            data-id="${row}:${col}">
            </div>
            `
        } // в data-type статично добавляем атрибут cell для всех строк в т.ч. 0вой где A B C и тд. и крайней левой где 1, 2, 3
    }

function toColumn(col, index){
    return `
    <div class="column" data-type="resizable" data-col="${index}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow (index, content){
    const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ""
    return `
    <div class="row" data-type="resizable">
    <div class="row-info">
    ${index ? index : ""}
    ${resize}
    </div>
    <div class="row-data">${content}</div>
    </div>
    `
}

function toChar (_, index){
    return String.fromCharCode(CODES.A + index);
}

export function createTable (rowsCount = 15) {

    const colsCount = CODES.Z - CODES.A + 1;

    const rows = [];
    const cols = new Array(colsCount)
        .fill("")
        .map(toChar) // Функция не вызывается потому что она вызывается при вызове map на каждой итерации.
        .map(toColumn)
        .join("")

    rows.push(createRow(null, cols));
    for (let row = 0; row < rowsCount; row++){
        const cells = new Array(colsCount)
        .fill("")
        //.map((_, col) => toCell(row, col))  // Функция не вызывается потому что она вызывается при вызове map на каждой итерации. Для 1го варианта создания ячеек
        .map(toCell(row)) // Для 2го варианта создания ячеек
        .join("")
        rows.push(createRow(row+1, cells));
    }

    return rows.join ("");


}