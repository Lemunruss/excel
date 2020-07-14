import { capitalize } from "@core/utils";

export class DomListener {
    constructor ($root, listeners = []){
        if(!$root){
            throw new Error("No provided $root for DomListener")
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDOMListeners (){
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            console.log(method);
            if (!this[method]){
                const name = this.name || "";
                throw new Error (`Method ${method} is not impemented in ${name} Component` )
            }
            this[method] = this[method].bind(this);
            // addEventListener вынесен отдельно в dom.js в функцию .on
            this.$root.on(listener, this[method]);
        })
    }

    removeDOMListeners(){
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            this.$root.off(listener, this[method]);
        })
    }
}

    //inpup =>> onInput
  function getMethodName (eventName){
        return `on${capitalize(eventName)}`
    }