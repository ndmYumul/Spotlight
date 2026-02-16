import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { buildingListReducer } from './reducers/buildingReducers';
import { scheduleListReducer, scheduleCreateReducer } from './reducers/scheduleReducers';

const reducer = combineReducers({
    buildingList: buildingListReducer,
    scheduleList: scheduleListReducer,
    scheduleCreate: scheduleCreateReducer
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