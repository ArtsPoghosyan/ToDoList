import React, { useState, useEffect } from "react";
import ToDoForm from "./todo/todoForm";
import ToDoList from "./todo/todolist";
import ToDoPinList from "./todo/todoPinList";
import "../../scss/style.scss";

function Main(){ 
    const [nav, setNav] = useState("day");
    useEffect(()=>{
        document.title = "ToDoList";     
    }, []);
    return (
        <div className="mainDiv">
            <div className="todoFon">
                <div className="navBar">
                    <div className={nav === "day" ? "borderNav" : ""} onClick={()=>{setNav("day")}}>Day</div>
                    <div className={nav === "week" ? "borderNav" : ""} onClick={()=>{setNav("week")}}>Week</div>
                    <div className={nav === "month" ? "borderNav" : ""} onClick={()=>{setNav("month")}}>Month</div>
                    <div className={nav === "year" ? "borderNav" : ""} onClick={()=>{setNav("year")}}>Year</div>
                </div>
                <div className="dateBlock"><h1>ToDoList</h1></div>
                <div className="todoBlock">
                    <div className="blockInput">
                        <ToDoForm path={nav}/>
                    </div>
                    <div className="blockItems">
                        <ToDoPinList path={nav} />
                        <ToDoList path={nav} />
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default Main;