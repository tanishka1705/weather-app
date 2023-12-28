import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const store  = configureStore({
    reducer : {
        location : reducer,
    }
})

export default store;