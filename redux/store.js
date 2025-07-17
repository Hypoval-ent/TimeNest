import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./../redux/formcounter/counter"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})
