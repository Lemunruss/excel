class Dom {
    constructor(selector){
        this.$el = typeof selector === "string" 
        ? document.querySelector(selector)
        : selector;
    }

    html(html){
        if(typeof html === "string"){
            this.$el.innerHTML = html;
            return this;
        }
        return  this.$el.outerHTML.trim();
    }

    text(text){
        if (typeof text === "string"){
            this.$el.textContent = text;
            return this;
        }
        if (this.$el.tagName.toLowerCase() === "input"){
            return this.$el.value.trim();
        }
        return this.$el.textContent.trim();
    }

    clear() {
        this.html("");
        return this;
    }

    on (eventType, callback){
        this.$el.addEventListener(eventType, callback)
    }

    off (eventType, callback){
        this.$el.removeEventListener(eventType, callback)
    }

    append(node){
        if (node instanceof Dom) {
            node = node.$el;
        }
        if(Element.prototype.append){
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }
        return this;
    }

    get data (){
        return this.$el.dataset;
    }

    closest (selector) {
        return $(this.$el.closest(selector));
    }

    getCoords (){
        return this.$el.getBoundingClientRect();
    }

    find (selector){ // метод для нахождения 1й ячейки по селектору
        return $(this.$el.querySelector(selector)); // оборачиваем в конструктор класса dom для того чтобы имела все методы ячейка
    }

    findAll (selector){ // метод для нахождения всех ячеек по селектору
        return this.$el.querySelectorAll(selector);
    }

    css (styles = {}){
        Object
        .keys(styles)
        .forEach(key => {
            this.$el.style[key] = styles[key]
        })
    }

    id (parse) { // метод для определения id выбранной/ых ячейки/ек 
        if(parse) {
            const parsed = this.id().split(":"); // вызывае метод id() котороый по сепоратору : разделит строку с id хранящимся в this.data.id на элементы массива
            return {
                row: +parsed[0], //через + приводим к числу, row == 0 эл. массива parsed
                col: +parsed[1] // col == 1 эл. массива parsed
            }
        }
        return this.data.id;
    }

    focus (){ // с помощью натив метода  focus добавляем установку фокуса на  выбранном элементе, который является экземпляром класса dom
        this.$el.focus();
        return this
    }

    addClass (className){ // метод для добавления класса к элементу
        this.$el.classList.add(className); // исп. натив метод add для добавления элементу класса переданного в параметры
        return this;
    }

    removeClass (className){ // метод для удаления класса у элемента
        this.$el.classList.remove(className); // исп. натив метод remove для удаления у элемента класса переданного в параметры
        return this;
    }
}

export function $ (selector) {
    return new Dom(selector);
}

$.create = (tagName, classes = " ") => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes);
    }
    return $(el)
}
