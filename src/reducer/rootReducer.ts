import orderHistoryReducer from "./orderHistory.reducer";
import productReducer from "./product.reducer";
import categoryReducer from "./category.reducer";
import cartReducer from "./cart.reducer";
import notificationReducer from "./notification.reducer";
import { combineReducers } from "redux";
import checkoutReducer from "./checkoutReducer";
import { loadingReducer } from "./loading.reducer";

const rootReducer = combineReducers({
	cart: cartReducer,
	orderHistory: orderHistoryReducer,
	product: productReducer,
	category: categoryReducer,
	checkouts: checkoutReducer,
	notification: notificationReducer,
	loading: loadingReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
