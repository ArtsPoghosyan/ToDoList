import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { initalTodo, todo } from "./slice/todoSlice/TodoReducer";

const store = createStore(combineReducers({
    todo,
}), {
    todo: initalTodo,
}, applyMiddleware(thunk));

export default store;