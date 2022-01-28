import * as types from "../action/actionType";
import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../action/actionCreator";
import { ResponseGenerator } from "../types";
import { categoryServices } from "../services/category.services";

export function* workerGetAllCategories() {
	try {
		const res: ResponseGenerator = yield call(categoryServices.categories);
		const data = res.data;
		yield put(actions.getAllCategoriesSuccess(data));
	} catch (err: any) {
		yield put(actions.getAllCategoriesFailure(err));
	}
}

export default function* watcherGetCategory() {
	yield takeLatest(types.GET_ALL_CATEGORIES_REQUEST, workerGetAllCategories);
}
