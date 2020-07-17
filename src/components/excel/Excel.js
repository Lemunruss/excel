import { $ } from "@core/dom";
import { Emitter } from "../../core/Emmiter";

export class Excel {
    constructor (selector, options){
        this.$el = $(selector);
        this.components = options.components || [];
        this.emitter = new Emitter() // Создаем экзмпляр класса Эмитер для связывания компонетов в общую среду слушателей событий
    }

    getRoot (){
        const $root = $.create("div", "excel");

        const componentOptions = { // Единоразовое создание Эмитера
            emitter: this.emitter
        }

        this.components = this.components.map(Component => {
            const $el = $.create("div", Component.className);
            const component = new Component($el, componentOptions); // связывание всех экзмепляров класса с эмитером
            $el.html(component.toHTML());
            $root.append($el);
            return component;
        } )

        return $root
    }

    render() {
        this.$el.append(this.getRoot());

        this.components.forEach(component => component.init());
    }

    destroy (){
       this.components.forEach(component => component.destroy()) 
    }
}