import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { addTodoApi } from "../../../redux/slice/todoSlice/TodoReducer";

function ToDoForm({path}){
    const [value, setValue] = useState("");
    const dispatch = useDispatch();
    var idTimeout;

    return (
        <>
            <i className="fas fa-align-left iconInput" ></i>
            <form onSubmit={(evt)=>{
                evt.preventDefault();
                setTimeout(()=>{
                    evt.target[0].value = "";
                    setValue("");   
                }, 100);
                dispatch(addTodoApi(value, path === "day" ? "todos" : path === "week" ? "week.todos" : path === "month" ? "month.todos" : "year.todos"))}}>
            <input type="text" placeholder="Add a task..." onChange={(evt)=>{
                if(idTimeout !== undefined){
                    clearTimeout(idTimeout);
                    idTimeout = setTimeout(() => {
                        setValue(evt.target.value);
                    }, 500);
                }else{
                    idTimeout = setTimeout(() => {
                        setValue(evt.target.value);
                    }, 500);
                }
                
                }}/>
            </form> 
        </>
    )
}

export default ToDoForm;