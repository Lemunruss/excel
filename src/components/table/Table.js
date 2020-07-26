import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom"
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { shouldResize, isCell, matrix, nextSelector} from "./table.functions";
import { TableSelection } from "./TableSelection";
import { CHANGE_TEXT }  from "@/redux/types"
import * as actions from "@/redux/actions"
import { defaultStyles } from "../../constants";
import { parse } from "../../core/parse";

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
        return createTable(20, this.store.getState());
    }

    prepare (){
         this.selection = new TableSelection(); // экземпляр класса  TableSelection
    }

    init (){ // переназначаем  метод из ExcelComponent для создания нового экземпляра класса TableSelection - класс для работы с выделением ячеек
        super.init(); // вызываем базовый метод через супер чтобы сохранить стартовую логику назначения листенеров для компонентов      
                                                                     // $root экз. класса dom в котором хранятся методы работы с ячейками
        this.selectCell(this.$root.find('[data-id="0:0"] ')) // в методе find передаем дата атрибут с параметрами соотв. ячейке А1
                                                                 // теперь она будет выделена при старте прил. автоматически. 
        this.$on("formula:input", value => {
            this.selection.current
                .attr("data-value", value)
                .text(parse(value));
            this.updateTextInStore(value);
        })      

        this.$on("formula:done", () => {
            this.selection.current.focus();
        })

        // this.$subscribe(state =>{
        //     console.log("Table State", state);
        // })
        this.$on("toolbar:applyStyle", value =>{
            this.selection.applyStyle(value);
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })
    }   
    
    selectCell ($cell){
        this.selection.select($cell); 
        this.$emit("table:select", $cell);
        const styles = $cell.getStyles(Object.keys(defaultStyles));
        // console.log("Styles", styles);
        this.$dispatch(actions.changeStyles(styles));
    }
    
    async resizeTable (event){
        try {
            const data = await resizeHandler(this.$root, event);
            this.$dispatch(actions.tableResize(data));
        } catch (e){
            console.warn(e.message);
        }  
    }

    onMousedown (event){
        if (shouldResize(event)){ 
            this.resizeTable(event)
        } else if (isCell(event)){
            const $target = $(event.target) // обернем в класс dom event.target для того чтобы работал с методом .select и $target будет местом где произошло событие
            if (event.shiftKey){ // добавляем проверку на то какой метод будет работать selectGroup или select в зависимость от зажата ли клавиша shift
                const $cells = matrix($target,  this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells);
            } else {
                 this.selectCell($target); // select принимает в параметры элементы класса dom. 
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

    updateTextInStore (value){
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
         }))
    }

    onInput(event) {
      //  this.$emit("table:input", $(event.target))
        this.updateTextInStore($(event.target).text())
    }
}    