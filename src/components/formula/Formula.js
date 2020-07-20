import { ExcelComponent } from "@/core/ExcelComponent"
import { $ } from "@core/dom"
import { CHANGE_TEXT }  from "@/redux/types"
import { Emitter } from "../../core/Emmiter"

export class Formula extends ExcelComponent {
    static className = "excel__formula"

    constructor ($root, options){ // options добавлено для связки с Эмитером 
        super($root, {
           name: "Formula",
           listeners: ["input", "keydown"],
           subscribe: ["currentText"],
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
            this.$formula.text($cell.data.value);
        })

        // this.$on("table:input", $cell => {
        //     this.$formula.text($cell.text());
        // })
        // this.$subscribe(state =>{
        //     this.$formula.text(state.currentText);
        // })
    } 

    storeChanged({currentText}){
        this.$formula.text(currentText);
        //console.log("changes", changes)
    }

    onInput(event){
        const text = $(event.target).text();
        this.$emit("formula:input", text);
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