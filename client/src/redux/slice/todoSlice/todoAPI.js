import axios from "axios";

export function todoLoader(){
    return new Promise((resolve, reject)=>{
        axios.get("http://localhost:3030/getState").then((res)=>{
            return resolve(res.data);
        }); 
    });     
};

export function changeStateInDB(id, text, path){
    return new Promise((resolve, reject)=>{
        axios({
            method: "post",
            data: {
                id,
                text,
                dateTodo: path.dateTodo,
            },
            withCredentials: true,
            url: `http://localhost:3030/${path.path}`
        }).then((res)=>{
            return resolve(res.data);
        }); 
    }); 
}
