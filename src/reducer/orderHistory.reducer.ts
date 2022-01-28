import * as types from "../action/actionType";
import { TypeOrderData } from "../types";

const initAllOrderHistory: TypeOrderData[] = [];

const initState = {
	allOrderHistory: initAllOrderHistory,
	orderHistory: {
		_id: "",
		products: [],
		name: "",
		gender: "",
		address: "",
		phone: "",
		status: "",
		notes: "",
		reasonCancel: "",
		createdAt: "",
		updatedAt: "",
		__v: 0,
	},
	error: "",
};

const orderHistoryReducer = (state = initState, action: any) => {
	switch (action.type) {
		case types.GET_ALL_ORDER_HISTORY_RESPONSE:
			return {
				...state,
				allOrderHistory: action.data,
			};
		case types.GET_ORDER_BY_ID_RESPONSE:
			return {
				...state,
				orderHistory: action.data,
			};
		case types.GET_ALL_ORDER_HISTORY_ERROR:
		case types.GET_PRODUCT_BY_ID_ERROR:
			return {
				...state,
				error: action.error,
			};
	}
	return state;
};
export default orderHistoryReducer;
