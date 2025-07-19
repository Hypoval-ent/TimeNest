import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./../redux/formcounter/counter"
import taskReducer from "./../redux/tasks/task"
import eventsReducer from "./../redux/calendar/calendar"
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        tasks: taskReducer,
        events: eventsReducer,
    },
})
