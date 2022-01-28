import * as types from "../action/actionType";
import { TypeProductData } from "../types";

const initProducts: TypeProductData[] = [];

interface IActionProductReducer {
	type: string;
	data: TypeProductData[];
	error: string;
	payload: any;
}

const initState = {
	products: initProducts,
	error: "",
};

const productReducer = (state = initState, action: IActionProductReducer) => {
	switch (action.type) {
		case types.GET_ALL_PRODUCTS_RESPONSE: {
			return {
				...state,
				products: action.data,
			};
		}
		case types.GET_ALL_PRODUCTS_ERROR: {
			return {
				...state,
				error: action.error,
			};
		}
	}
	return state;
};
export default productReducer;
