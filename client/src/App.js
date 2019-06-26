import React from "react";
import {Provider} from "react-redux";

import store from "./store";

import "./App.css";

import Home from "./pages/home/Home";

const App = () => (
    <Provider store={store}>
        <Home></Home>
    </Provider>
);

export default App;
