export function capitalize (string = ""){
    if (typeof string !== "string"){
        return ""
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range (start, end){  // фунц для опреде. диапозона выбранных элементов
    console.log(start, end)
    if (start > end) { // проверка если выборка идет справа налево, т.е. длина массива получится отрицательной
        [end, start] = [start, end] // чтобы этого не было поменяем значения, что не повлияет на длину массива
    }
    return new Array(end - start + 1) // определим длинну массива
        .fill(" ") // заполним его пустыми значениями, чтобы можно было map использовать
        .map((_, index) => start + index) 
}