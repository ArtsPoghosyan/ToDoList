import { changeStateInDB, todoLoader } from "./todoAPI";

export function todo(state={}, action){
    if(action.type === "changeState"){
        return {
            ...action.payload.tod,
        }
    }
    return state;
}

export const initalTodo = {
    todos:[],
    week: {todos:[]},
    month: {todos:[]},
    year: {todos:[]},
};

export function changeStateInRedux(todos){
    return {
        type: "changeState",
        payload: {
            tod: todos,
        }
    }
}

export function GetStateApi(){
    return (dispatch,  getState)=>{
        return todoLoader().then((stateApi)=>{
            dispatch(changeStateInRedux(stateApi));
        })
    }
}

export function addTodoApi(text, path){
    return (dispatch, getState)=>{
        return changeStateInDB(null, text, {path : "addTodo", dateTodo: path}).then((stateApi)=>{
            dispatch(changeStateInRedux(stateApi));
        })
    }
}

export function updateCompletedApi(id, path){
    return (dispatch,  getState)=>{
        return changeStateInDB(id, null, {path : "updateCompleted", dateTodo: path}).then((stateApi)=>{
            dispatch(changeStateInRedux(stateApi));
        })
    }
}

export function deleteToDoApi(id, path){
    return (dispatch,  getState)=>{
        return changeStateInDB(id, null, {path: "deleteToDo", dateTodo: path}).then((stateApi)=>{
            dispatch(changeStateInRedux(stateApi));
        })
    }
}

export function updateTopApi(id, path){
    return (dispatch,  getState)=>{
        return changeStateInDB(id, null, {path: "updatePin", dateTodo: path}).then((stateApi)=>{
            dispatch(changeStateInRedux(stateApi));
        })
    }
}

export function updateTextApi(id, text, path){
    return (dispatch,  getState)=>{
        return changeStateInDB(id, text, {path: "updateText", dateTodo: path}).then((stateApi)=>{
            dispatch(changeStateInRedux(stateApi));
        })
    }
}