import {
	MergeProduct,
	TypeCategoryData,
	TypeProductData,
} from "./../types/index";
import * as types from "./actionType";
import {
	ChangeSizeProduct,
	ISize,
	TProductCartReducer,
	TypeOrderData,
	NotifActions,
} from "../types/index";

// Order Information
export const apiGetAllOrders = () => ({
	type: types.GET_ALL_ORDER_HISTORY_REQUEST,
});
export const getAllOrdersSuccess = (data: any) => ({
	type: types.GET_ALL_ORDER_HISTORY_RESPONSE,
	data,
});
export const getAllOrdersFailure = (error: any) => ({
	type: types.GET_ALL_ORDER_HISTORY_ERROR,
	error,
});

export const apiGetOrderById = (orderId: string) => ({
	type: types.GET_ORDER_BY_ID_REQUEST,
	payload: orderId,
});
export const getOrderByIdSuccess = (data: TypeOrderData) => ({
	type: types.GET_ORDER_BY_ID_RESPONSE,
	data,
});
export const getOrderByIdFailure = (error: string) => ({
	type: types.GET_ORDER_BY_ID_ERROR,
	error,
});

// Show Loading

export const turnLoadingOn = () => ({
	type: types.LOADING_ON,
});
export const turnLoadingOff = () => ({
	type: types.LOADING_OFF,
});

// Notifications
export const pushNewNotification = (
	notifData: TypeOrderData[]
): NotifActions => ({
	type: types.PUSH_NEW_NOTIFICATION,
	payload: notifData,
});

export const deleteAllNotifications = () => ({
	type: types.DELETE_ALL_NOTIFICATIONS,
});

export const deleteANotification = (
	notifData: TypeOrderData[]
): NotifActions => ({
	type: types.DELETE_A_NOTIFICATION,
	payload: notifData,
});

export const notHaveNotif = () => ({
	type: types.NOT_HAVE_NEW_NOTIF,
});

export const haveNotif = () => ({
	type: types.HAVE_NEW_NOTIF,
});

// Categories
export const apiGetAllCategories = () => ({
	type: types.GET_ALL_CATEGORIES_REQUEST,
});
export const getAllCategoriesSuccess = (data: TypeCategoryData[]) => ({
	type: types.GET_ALL_CATEGORIES_RESPONSE,
	data,
});
export const getAllCategoriesFailure = (error: string) => ({
	type: types.GET_ALL_CATEGORIES_ERROR,
	error,
});

//  Products

export const apiGetAllProducts = () => ({
	type: types.GET_ALL_PRODUCTS_REQUEST,
});
export const getAllProductsSuccess = (data: TypeProductData[]) => ({
	type: types.GET_ALL_PRODUCTS_RESPONSE,
	data,
});
export const getAllProductsFailure = (error: string) => ({
	type: types.GET_ALL_PRODUCTS_ERROR,
	error,
});

export const apiGetProductById = (productId: string) => ({
	type: types.GET_PRODUCT_BY_ID_REQUEST,
	payload: productId,
});
export const getProductByIdSuccess = (data: TypeOrderData) => ({
	type: types.GET_PRODUCT_BY_ID_RESPONSE,
	data,
});
export const getProductByIdFailure = (error: string) => ({
	type: types.GET_PRODUCT_BY_ID_ERROR,
	error,
});
// cart
export const getCart = () => ({
	type: types.GET_CART,
});
export const changeSizeProduct = (
	size: ISize,
	index: number
): ChangeSizeProduct => ({
	type: types.CHANGE_SIZE,
	payload: size,
	index: index,
});
export const mergeProduct = (
	size: ISize,
	index: number,
	indexToMerge: number
): MergeProduct => ({
	type: types.MERGE_PRODUCT,
	payload: size,
	index: index,
	indexToMerge: indexToMerge,
});
export const verifyQuantity = (mount: number, index: number) => ({
	type: types.VERIFY_QUANTITY,
	mount: mount,
	index: index,
});
export const deleteProductInCart = (id: string, index: number) => ({
	type: types.DELETE_PRODUCT_IN_CART,
	id: id,
	index: index,
});
export const changeCheckoutStatus = (status: boolean) => ({
	type: types.CHANGE_CHECK_OUT_STATUS,
	status: status,
});
export const paidStatus = (status: boolean) => ({
	type: types.PAID_STATUS,
	status: status,
});
export const hanldingCheckout = (status: boolean) => ({
	type: types.HANLDING_CHECKOUT,
	status: status,
});
export const packedOrder = (status: boolean) => ({
	type: types.PACKED_ORDER,
	status: status,
});
export const postedOrder = (status: boolean) => ({
	type: types.POSTED_ORDER,
	status: status,
});
export const completedCheckout = (status: boolean) => ({
	type: types.COMPLETED_CHECKOUT,
	status: status,
});
// Add product to cart
export const addProductsToCart = (product: TProductCartReducer) => ({
	type: types.GET_ADD_ORDER_TO_CART_REQUEST,
	payload: product,
});
