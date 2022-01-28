import * as types from "../action/actionType";
import { TypeCategoryData } from "../types";

const initCategories: TypeCategoryData[] = [];

interface IActionCategoryReducer {
	type: string;
	error?: string;
	data: TypeCategoryData[];
}

const initState = {
	categories: initCategories,
	category: {},
};

const categoryReducer = (state = initState, action: IActionCategoryReducer) => {
	switch (action.type) {
		case types.GET_ALL_CATEGORIES_RESPONSE: {
			return {
				...state,
				categories: action.data,
			};
		}
		case types.GET_ALL_CATEGORIES_ERROR: {
			return {
				...state,
				error: action.error,
			};
		}
	}
	return state;
};
export default categoryReducer;
