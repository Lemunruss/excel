export function parse (value = ""){
    // console.log("val", value)
    if (value.startsWith("=")){
        try {
          return eval(value.slice(1));  
        }
        catch (e){
          return value;
        }
    }
    return value
}