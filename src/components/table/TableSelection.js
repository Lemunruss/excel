import { $ } from "../../core/dom";

export class TableSelection { // класс отвечающий за работу с выделением ячеек
    static className = "selected"; 

    constructor (){
        this.group = []; // В этой переменной хранится массив выбранных ячеек
        this.current = null;
    }

    select ($el){ // метод на выбор 1 ячейки $el - экземпляр класса dom.
        this.clear(); // на каждом новым вызове select очищаем предыдущий массив элементов на который вызывали select, чтобы подсвечивалась только 1 ячейка
        this.group.push($el) // добавляем в массив выбранных ячеек элемент который выбран
        this.current = $el;
        $el.focus().addClass(TableSelection.className);
    }

    clear (){
        this.group.forEach($el => $el.removeClass(TableSelection.className)); // очищаем массив от элементов который уже имеют класс selected 
        this.group = []; // создаем новый массив
    }

    selectGroup($group =[]){ // метод на выбор нескольких ячеек
        this.clear();
        this.group = $group;
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }
}