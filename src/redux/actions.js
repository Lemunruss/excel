import { TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLE, CHANGE_TITLE,  UPDATE_DATE } from "./types";

export function tableResize(data){ // ActionCreator
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function changeText(data){ // ActionCreator
    return {
        type: CHANGE_TEXT,
        data
    }
}

export function updateDate (){
    return {
        type:  UPDATE_DATE
    }
}

export function changeStyles(data){
    return {
        type: CHANGE_STYLES,
        data
    }
}

export function applyStyle (data){ // В дата храним value, ids
    return {
        type: APPLY_STYLE,
        data
    }
}

export function changeTitle (data){
    return {
        type: CHANGE_TITLE,
        data
    }
}