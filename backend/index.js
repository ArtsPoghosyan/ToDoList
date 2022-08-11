const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

app.listen(3030, function(err, val){
	if(err){
		console.log(err);
	}
	console.log("Server started in 3030 port");
});



app.use(bodyParser.json());
app.use(express.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
  	origin: "http://localhost:8080",
  	credentials: true
}));


app.get("/getState", (req, res)=>{
	fs.promises.readFile(path.resolve("./db.json"), "utf8").then((state)=>{
		let todos = JSON.parse(state);
		let date = new Date();
		todos.todos = todos.todos.filter((evt)=>{
			let date_one = new Date(evt.dateCreated);
			date_one = date_one.setDate(date_one.getDate() + 1);
			if(date_one >= date.getTime()){
				return evt;
			}
		})
		todos.week.todos = todos.week.todos.filter((evt)=>{
			let date_one = new Date(evt.dateCreated);
			date_one = date_one.setDate(date_one.getDate() + 7);
			if(date_one >= date.getTime()){
				return evt;
			}
		})
		todos.month.todos = todos.month.todos.filter((evt)=>{
			let date_one = new Date(evt.dateCreated);
			date_one = date_one.setMonth(date_one.getMonth() + 1);
			if(date_one >= date.getTime()){
				return evt;
			}
		});
		todos.year.todos = todos.year.todos.filter((evt)=>{
			let date_one = new Date(evt.dateCreated);
			date_one = date_one.setFullYear(date_one.getFullYear() + 1);
			
			if(date_one >= date.getTime()){
				return evt;
			}
		});
		fs.promises.writeFile(path.resolve("./db.json"), JSON.stringify(todos, undefined, 2)).then((val)=>{
			return res.send(todos);
		})
	})
});

app.post("/addTodo", (req, res)=>{
	fs.promises.readFile(path.resolve("./db.json"), "utf8").then((state)=>{
		var todos = JSON.parse(state);
		if(req.body.dateTodo === "todos"){
			todos[req.body.dateTodo].push({
				id: (Math.random() * 10 + "").substring(2, 10),
				text: req.body.text,
				isCompleted: false,
				isTop: false,
				dateCreated: new Date(),
			});
		}else{
			let x = req.body.dateTodo.split(".");
			todos[x[0]][x[1]].push({
				id: (Math.random() * 10 + "").substring(2, 10),
				text: req.body.text,
				isCompleted: false,
				isTop: false,
				dateCreated: new Date().toISOString(),
			});
		}
		
		fs.promises.writeFile(path.resolve("./db.json"), JSON.stringify(todos, undefined, 2)).then((val)=>{
			return res.send(todos);
		})
	})
});


app.post("/updateCompleted", (req, res)=>{
	fs.promises.readFile(path.resolve("./db.json"), "utf8").then((state)=>{
		var todos = JSON.parse(state);
		if(req.body.dateTodo === "todos"){
			todos[req.body.dateTodo] = todos[req.body.dateTodo].map((evt)=>{
				if(evt.id === req.body.id){
					return {
						...evt,
						isCompleted: !evt.isCompleted,
					}
				}else{
					return evt;
				}
			});
		}else{
			let x = req.body.dateTodo.split(".");
			todos[x[0]][x[1]] = todos[x[0]][x[1]].map((evt)=>{
				if(evt.id === req.body.id){
					return {
						...evt,
						isCompleted: !evt.isCompleted,
					}
				}else{
					return evt;
				}
			});
		}
		fs.promises.writeFile(path.resolve("./db.json"), JSON.stringify(todos, undefined, 2)).then((val)=>{
			return res.send(todos);
		})
	})
});

app.post("/deleteToDo", (req, res)=>{
	fs.promises.readFile(path.resolve("./db.json"), "utf8").then((state)=>{
		let todos = JSON.parse(state);
		if(req.body.dateTodo === "todos"){
			todos[req.body.dateTodo] = todos[req.body.dateTodo].filter((evt)=>{
				if(evt.id !== req.body.id){
					return evt;
				}
			});
		}else{
			let x = req.body.dateTodo.split(".");
			todos[x[0]][x[1]] = todos[x[0]][x[1]].filter((evt)=>{
				if(evt.id !== req.body.id){
					return evt;
				}
			});
		}
		
		fs.promises.writeFile(path.resolve("./db.json"), JSON.stringify(todos, undefined, 2)).then((val)=>{
			return res.send(todos);
		})
	})
});


app.post("/updatePin", (req, res)=>{
	fs.promises.readFile(path.resolve("./db.json"), "utf8").then((state)=>{
		let todos = JSON.parse(state);
		if(req.body.dateTodo === "todos"){
			todos[req.body.dateTodo] = todos[req.body.dateTodo].map((evt)=>{
				if(evt.id === req.body.id){
					return {
						...evt,
						isTop: !evt.isTop,
					}
				}else{
					return evt;
				}
			});
		}else{
			let x = req.body.dateTodo.split(".");
			todos[x[0]][x[1]] = todos[x[0]][x[1]].map((evt)=>{
				if(evt.id === req.body.id){
					return {
						...evt,
						isTop: !evt.isTop,
					}
				}else{
					return evt;
				}
			});
		}
		
		fs.promises.writeFile(path.resolve("./db.json"), JSON.stringify(todos, undefined, 2)).then((val)=>{
			return res.send(todos);
		})
	})
});

app.post("/updateText", (req, res)=>{
	fs.promises.readFile(path.resolve("./db.json"), "utf8").then((state)=>{
		let todos = JSON.parse(state);
		if(req.body.dateTodo === "todos"){
			todos[req.body.dateTodo] = todos[req.body.dateTodo].map((evt)=>{
				if(evt.id === req.body.id){
					return{
						...evt,
						text: req.body.text
					}
				}else{
					return evt;
				}
			});
		}else{
			let x = req.body.dateTodo.split(".");
			todos[x[0]][x[1]] = todos[x[0]][x[1]].map((evt)=>{
				if(evt.id === req.body.id){
					return{
						...evt,
						text: req.body.text
					}
				}else{
					return evt;
				}
			});
		}
		
		fs.promises.writeFile(path.resolve("./db.json"), JSON.stringify(todos, undefined, 2)).then((val)=>{
			return res.send(todos);
		})
	})
});
