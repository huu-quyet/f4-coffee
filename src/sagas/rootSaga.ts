import watcherGetOrderHistory from "./orderHistory.saga";
import watcherGetProduct from "./product.saga";
import watcherGetCategory from "./category.saga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
	yield all([
		watcherGetOrderHistory(),
		watcherGetProduct(),
		watcherGetCategory(),
	]);
}
