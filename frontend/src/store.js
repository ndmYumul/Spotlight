import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { buildingListReducer } from './reducers/buildingReducers';

const reducer = combineReducers({
    buildingList: buildingListReducer
});

const initialState = {};

const store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: { warnAfter: 100 },
            serializableCheck: false,           
        }),
});

export default store;