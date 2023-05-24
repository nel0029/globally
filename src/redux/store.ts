import { configureStore } from '@reduxjs/toolkit'
import postReducer from './postSlice'
import userSlice from './userSlice'

const store = configureStore({
    reducer: {
        posts: postReducer,
        user: userSlice
    }
})


export default store
export type AppDispatch = typeof store.dispatch