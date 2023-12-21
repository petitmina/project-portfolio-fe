import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userReducer';
import productReducer from './productReducer';


const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
    }
})

export default store;
