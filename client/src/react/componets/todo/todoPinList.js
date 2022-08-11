import React from "react";
import { useSelector, useDispatch} from "react-redux";
import { addTodo } from "../../../redux/slice/todoSlice/TodoReducer";
import PinItem from "./pinItem";

function ToDoPinList({path}){  
    const todo = useSelector((state)=>{
        if(path === "day"){
            return state.todo;
        }else if(path === "week"){
            return state.todo.week;
        }else if(path === "month"){
            return state.todo.month;
        }else if(path === "year"){
            return state.todo.year;
        }
    });
    const dispatch = useDispatch();

    return (
        <div className={todo.todos.length === 0 ? "" : todo.todos.filter((evt)=>{
            if(evt.isTop){
                return evt;
            }    
        }).length > 0 ? "pinBlock" : ""}>
            {
                todo.todos.length > 0
                    ?  todo.todos.filter((e)=>{
                            if(e.isTop === true){
                                return e;
                            }
                        }).map((evt)=>{
                            return <PinItem evt={evt} path={path} key={evt.id}/>
                        })
                    : ""
            }
        </div>
    )
}

export default ToDoPinList;