import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, compose } from "redux";
import rootReducer from "../reducer/rootReducer";
import { createStore } from "redux";
import rootSaga from "../sagas/rootSaga";
import * as actions from "../action/actionCreator";
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
// store.dispatch(actions.apiGetAllOrders());
// store.dispatch(actions.apiGetAllProducts());
export default store;
