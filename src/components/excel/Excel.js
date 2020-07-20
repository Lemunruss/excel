import { $ } from "@core/dom";
import { Emitter } from "../../core/Emmiter";
import { StoreSubscriber } from "@core/StoreSubscriber"

export class Excel {
    constructor (selector, options){
        this.$el = $(selector);
        this.components = options.components || [];
        this.store = options.store;
        this.emitter = new Emitter(); // Создаем экзмпляр класса Эмитер для связывания компонетов в общую среду слушателей 
        this.subscriber = new StoreSubscriber(this.store)
    }

    getRoot (){
        const $root = $.create("div", "excel");

        const componentOptions = { // Единоразовое создание Эмитера
            emitter: this.emitter,
            store: this.store
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
        this.subscriber.subscribeComponents(this.components);
        this.components.forEach(component => component.init());
    }

    destroy (){
       this.subscriber.unsubscribeFromStore();
       this.components.forEach(component => component.destroy());
    }
}