import * as types from "../action/actionType";
import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../action/actionCreator";
import { orderHistoryServices } from "../services/orderHistory.services";
import { ResponseGenerator } from "../types";

interface IActionGetObyId {
	type: string;
	payload: string;
}

export function* workerGetAllOrders() {
	try {
		const res: ResponseGenerator = yield call(orderHistoryServices.orders);
		const data = res.data;
		yield put(actions.getAllOrdersSuccess(data));
	} catch (err) {
		yield put(actions.getAllOrdersFailure(err));
	}
}

export function* workerGetOrderById(action: IActionGetObyId) {
	try {
		const res: ResponseGenerator = yield call(
			orderHistoryServices.order,
			action.payload
		);
		const data = res.data;
		yield put(actions.getOrderByIdSuccess(data));
	} catch (err: any) {
		yield put(actions.getOrderByIdFailure(err.message));
	}
}

export default function* watcherGetOrderHistory() {
	yield takeLatest(types.GET_ALL_ORDER_HISTORY_REQUEST, workerGetAllOrders);
	yield takeLatest(types.GET_ORDER_BY_ID_REQUEST, workerGetOrderById);
}
