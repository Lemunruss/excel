import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom"
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { shouldResize, isCell, matrix, nextSelector} from "./table.functions";
import { TableSelection } from "./TableSelection";

export class Table extends ExcelComponent {
    static className = "excel__table"

    constructor ($root, options){
        super ($root, {
            name: "Table",
            listeners: ["mousedown", "keydown", "input"],
            ...options 
        })
    }

    toHTML(){
        return createTable(20);
    }

    prepare (){
         this.selection = new TableSelection(); // экземпляр класса  TableSelection
    }

    init (){ // переназначаем  метод из ExcelComponent для создания нового экземпляра класса TableSelection - класс для работы с выделением ячеек
        super.init(); // вызываем базовый метод через супер чтобы сохранить стартовую логику назначения листенеров для компонентов      
                                                                     // $root экз. класса dom в котором хранятся методы работы с ячейками
        this.selectCell($cellthis.$root.find('[data-id="0:0"] ')) // в методе find передаем дата атрибут с параметрами соотв. ячейке А1
                                                                 // теперь она будет выделена при старте прил. автоматически. 
        this.$on("formula:input", text => {                 
            this.selection.current.text(text);
        })                                                
        this.$on("formula:done", fn => {
            this.selection.current.focus();
        })
    }   
    
    selectCell ($cell){
        this.selection.select($cell); 
        this.$emit("table:select", $cell);  
    }

    onMousedown (event){
        if (shouldResize(event)){ 
            resizeHandler(this.$root, event);
        } else if (isCell(event)){
            const $target = $(event.target) // обернем в класс dom event.target для того чтобы работал с методом .select и $target будет местом где произошло событие
            if (event.shiftKey){ // добавляем проверку на то какой метод будет работать selectGroup или select в зависимость от зажата ли клавиша shift
                const $cells = matrix($target,  this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells);
            } else {
                 this.selection.select($target); // select принимает в параметры элементы класса dom. 
            }                                   // что такое selection ???
        }       
    }

    onKeydown (event){ // создадит обработчик на нажатие клавиш
        const keys = ["Enter", "Tab", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]; // массив клавиш на нажатие которых будет срабатывать обработчик
        const {key} = event
        if (keys.includes(event.key) && !event.shiftKey){ // проверка есть ли в событии нажатия клавиша которая находится в массиве keys с помощью натив метода includes()
            event.preventDefault(); // убираем поведение по умолчанию при нажатии на клавиши из массива
            const id = this.selection.current.id(true) // парсим с помощью id() текущую выбранную ячейку 
            const $next = this.$root.find(nextSelector (key, id));
            this.selectCell($next)
            //this.selection.select($next); // выделяем выбранную ячейку некст
        }    
    }

    onInput(event) {
        this.$emit("table:input", $(event.target))
    }
}