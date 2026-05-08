import {configureStore} from '@reduxjs/toolkit'
import  useReducer  from '../features/user/userSlice.js'
import  connectionsReducer  from '../features/connections/connectionSlice.js'

export const store = configureStore({
    reducer: {
        user: useReducer,
        connections: connectionsReducer
    }
})