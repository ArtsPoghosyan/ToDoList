import React, { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { GetStateApi } from "../../../redux/slice/todoSlice/TodoReducer";
import ListItem from "./todosItem";

function ToDoList({path}){  
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

    useEffect(()=>{   
        dispatch(GetStateApi());
    }, []);
    
    return (
        <>
            {
                todo.todos.length > 0
                    ?   todo.todos.filter((e)=>{
                            if(e.isTop === false){
                                return e;
                            }
                        }).map((evt)=>{
                            return <ListItem evt={evt} path={path} key={evt.id} />
                        })
                    : ""
            }
        </>
    )

}

export default ToDoList;