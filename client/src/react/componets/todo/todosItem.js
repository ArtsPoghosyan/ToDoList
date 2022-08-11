import React, {useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { updateCompletedApi, deleteToDoApi, updateTextApi, updateTopApi } from "../../../redux/slice/todoSlice/TodoReducer";
import check from "../../../images/check.png";

function ListItem({evt, path}){  
    const dispatch = useDispatch();
    const [btn, setBtn] = useState(false);
    const [update, setUpdate] = useState(false);
    const [value, setValue] = useState(evt.text);

    return (
        <>
           {      
                update     
                    ?   <div className="listItem">
                            <div className="checkbox" onClick={()=>{debugger;dispatch(updateCompletedApi(evt.id, path === "day" ? "todos" : path === "week" ? "week.todos" : path === "month" ? "month.todos" : "year.todos"))}}>{evt.isCompleted ? <img src={check} /> : ""}</div>
                            <form onSubmit={(e)=>{
                                e.preventDefault();
                                setTimeout(()=>{
                                    setBtn(false);
                                    setUpdate(false);
                                }, 100);
                                dispatch(updateTextApi(evt.id, value, path === "day" ? "todos" : path === "week" ? "week.todos" : path === "month" ? "month.todos" : "year.todos"));
                            }}>
                                <input id="updateText" type="text" value={value} onChange={(evt)=>{setValue(evt.target.value)}}/>
                            </form>
                            <div className="more"><div onClick={()=>{setBtn(!btn)}}><i className="fas fa-ellipsis-h"></i></div></div>
                        </div>
                    :   <div className="listItem">
                            <div className="checkbox" onClick={()=>{dispatch(updateCompletedApi(evt.id, path === "day" ? "todos" : path === "week" ? "week.todos" : path === "month" ? "month.todos" : "year.todos"))}}>{evt.isCompleted ? <img src={check} /> : ""}</div>
                            <p className="text" onClick={()=>{dispatch(updateCompletedApi(evt.id, path === "day" ? "todos" : path === "week" ? "week.todos" : path === "month" ? "month.todos" : "year.todos"))}}>{evt.text}</p>
                            <div className="more"><div onClick={()=>{setBtn(!btn)}}><i className="fas fa-ellipsis-h"></i></div></div>
                        </div>
            }
            {
                btn 
                    ?  <div className="listMore">
                            <div className="moreBlock">
                                <div><i className="fas fa-map-pin"></i><p onClick={()=>{dispatch(updateTopApi(evt.id, path === "day" ? "todos" : path === "week" ? "week.todos" : path === "month" ? "month.todos" : "year.todos"))}}>Pin on the top</p></div>
                                <div><i className="fas fa-pen"></i><p onClick={()=>{
                                    if(update){
                                        setTimeout(()=>{
                                            setBtn(false);
                                            setUpdate(false);
                                        }, 100); 
                                        dispatch(updateTextApi(evt.id, value, path === "day" ? "todos" : path === "week" ? "week.todos" : path === "month" ? "month.todos" : "year.todos"));
                                    }else{
                                        setUpdate(!update)
                                    }}}>{update ? "Save task" : "Update task"}</p></div>
                                <div><i className="far fa-trash-alt"></i><p onClick={()=>{dispatch(deleteToDoApi(evt.id, path === "day" ? "todos" : path === "week" ? "week.todos" : path === "month" ? "month.todos" : "year.todos"))}}>Delete</p></div>
                            </div> 
                        </div>
                    :   ""
            }
        </>
    )
}

export default ListItem;