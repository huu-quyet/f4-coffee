import * as types from "../action/actionType";
import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../action/actionCreator";
import { ResponseGenerator } from "../types";
import { productServices } from "../services/product.services";

interface IActionGetProductById {
	type: string;
	payload: string;
}

export function* workerGetAllProducts() {
	try {
		const res: ResponseGenerator = yield call(productServices.products);
		const data = res.data;
		yield put(actions.getAllProductsSuccess(data));
	} catch (error: any) {
		yield put(actions.getAllProductsFailure(error.message));
	}
}

export function* workerGetProductById(action: IActionGetProductById) {
	try {
		const res: ResponseGenerator = yield call(
			productServices.product,
			action.payload
		);
		const data = res.data;
		yield put(actions.getProductByIdSuccess(data));
	} catch (err: any) {
		yield put(actions.getProductByIdFailure(err.message));
	}
}

export default function* watcherGetProduct() {
	yield takeLatest(types.GET_ALL_PRODUCTS_REQUEST, workerGetAllProducts);
	yield takeLatest(types.GET_PRODUCT_BY_ID_REQUEST, workerGetProductById);
}
