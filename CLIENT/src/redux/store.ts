// --------------- IMPORTS ---------------
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";


// --------------- STORE ---------------
const store = configureStore({
    reducer: {
        root: rootReducer
    }
});


// --------------- EXPORTS ---------------
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;