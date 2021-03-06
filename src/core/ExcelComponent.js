import { DomListener } from "@/core/DomListener";

export class ExcelComponent extends DomListener{
    constructor ($root, options = {}){
        super($root, options.listeners)
        this.name = options.name || "";
        this.emitter = options.emitter;
        this.subscribe = options.subscribe || [];
        this.store= options.store;
        this.unsubscribers = [];
        //this.storeSub = null;

        this.prepare() // когда вызывается констр. ExcelComponent вызывается метод prepare()
    }

    prepare(){// вызывается до init т.к. вызывается в конструкторе класса, нужен для предварительных действий с классом до работы экземпляров

    }

    toHTML () { // Возввращает шаблон компанента
        return ""
    }

    $emit(event, ...args){ // Уведомляем слушателей про событие event
        this.emitter.emit(event, ...args);
    }

    $on(event, fn){ // Подписываемся на событие event
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsub);
    }

    $dispatch (action){
        this.store.dispatch(action);
    }

    storeChanged(){ //Сюда приходят изменения из Store только по тем свойствам на которые подписались

    }

    isWatching(key){
        return this.subscribe.includes(key);
    }

    // $subscribe(fn){
    //     const storeSub = this.store.subscribe(fn); 
    // }

    init (){ // метод для навешивания листенеров на компоненты и нициализации компонента
        this.initDOMListeners();
    }

    destroy (){ // метод для удаления компанента и листенеров с компонентов 
        this.removeDOMListeners();
        this.unsubscribers.forEach(unsub => unsub());
        //this.storeSub.unsubscribe();
    }
}