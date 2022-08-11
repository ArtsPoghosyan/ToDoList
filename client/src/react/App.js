import React from "react";
import { Provider } from "react-redux";
import Main from "./componets/Main";
import store from "../redux/store";

function App(){
    return(
        <Provider store={store}>
            <Main />
        </Provider> 
    )
}

export default App;