import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import statusReducer from "../reducers/status"
import dataReducer from "../reducers/data"

import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    status: {
        isLoading: false,
        error: false
    },
    data: {
        products: [],
        manufacturers: [],
        availabilityInfo: [],
        combinedData: [],
        groupedByCategory: {},
        finalOutput: [],
        pageNumbers: [],
        currentList: [],
        currentPage: 1,
        perPage: 10
    },
};

const bigReducer = combineReducers({ status: statusReducer, data: dataReducer });

export default function configureStore() {
    return createStore(
        bigReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    );
}