import * as types from "../action/actionType";
import { Reducer } from "redux";
import {
	ChangeCheckoutStatus,
	CompletedCheckout,
	HanldingCheckout,
	PackedOrder,
	PaidStatus,
	PostOrder,
} from "../types";
interface IintialState {
	checkout: boolean;
	paid: boolean;
	hanlding: boolean;
	packed: boolean;
	posted: boolean;
	completed: boolean;
}
const initState: IintialState = {
	checkout: false,
	paid: false,
	hanlding: false,
	packed: false,
	posted: false,
	completed: false,
};
type actions =
	| ChangeCheckoutStatus
	| PaidStatus
	| HanldingCheckout
	| PackedOrder
	| PostOrder
	| CompletedCheckout;

const checkoutReducer: Reducer<IintialState, actions> = (
	state = initState,
	action
) => {
	switch (action.type) {
		case types.CHANGE_CHECK_OUT_STATUS: {
			const { checkout, ...rest } = state;
			return { checkout: action.status, ...rest };
		}
		case types.HANLDING_CHECKOUT: {
			const { hanlding, ...rest } = state;
			return { hanlding: action.status, ...rest };
		}
		case types.PAID_STATUS: {
			const { paid, ...rest } = state;
			return { paid: action.status, ...rest };
		}
		case types.PACKED_ORDER: {
			const { packed, ...rest } = state;
			return { packed: action.status, ...rest };
		}
		case types.POSTED_ORDER: {
			const { posted, ...rest } = state;
			return { posted: action.status, ...rest };
		}
		case types.COMPLETED_CHECKOUT: {
			const { completed, ...rest } = state;
			return { completed: action.status, ...rest };
		}
		default:
			return { ...state };
	}
};

export default checkoutReducer;
