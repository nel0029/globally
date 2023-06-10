import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import postReducer from './postSlice'
import usersSlice from './usersSlice'
import themeSlice from './themeSlice'

const store = configureStore({
    reducer: {
        posts: postReducer,
        user: usersSlice,
        theme: themeSlice
    },

})


export default store
export type AppDispatch = typeof store.dispatch