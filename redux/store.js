import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./../redux/formcounter/counter"
import taskReducer from "./../redux/tasks/task"
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        tasks: taskReducer,
    },
})
