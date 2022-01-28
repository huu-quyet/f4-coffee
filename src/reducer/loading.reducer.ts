import * as types from "../action/actionType";

const initialValue = {
	isLoading: false,
};
export const loadingReducer = (state = initialValue, action: any) => {
	switch (action.type) {
		case types.LOADING_ON:
			return {
				...state,
				isLoading: true,
			};
		case types.LOADING_OFF:
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;
	}
};
