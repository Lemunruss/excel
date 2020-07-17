import { ExcelComponent } from "@/core/ExcelComponent"
import { $ } from "@core/dom"
import { Emitter } from "../../core/Emmiter"

export class Formula extends ExcelComponent {
    static className = "excel__formula"

    constructor ($root, options){ // options добавлено для связки с Эмитером 
        super($root, {
           name: "Formula",
           listeners: ["input", "keydown"],
           ...options
        })
    }

    toHTML(){
        return `
        <div class="info">fx</div>
        <div id="formula" class="input" contenteditable spellcheck="false"></div>
        `
    }

    init () {
        super.init();

        this.$formula = this.$root.find("#formula");

        this.$on("table:select", $cell => {
            this.$formula.text($cell.text());
        })

        this.$on("table:input", $cell => {
            this.$formula.text($cell.text());
        })
    }

    onInput(event){
        this.$emit("formula:input", $(event.target).text());
    }

    onClick(){}

    onKeydown(event){
        const keys = ["Enter", "Tab"]
        if (keys.includes(event.key)){
            event.preventDefault();

            this.$emit("formula:done")
        }
    }
}