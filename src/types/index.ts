export type TypeSizeData = {
	types: string;
	price: number;
	_id: string;
};
export interface IinitialValue {
	gender: string;
	name: string;
	phone: string;
	address: string;
	notes: string;
}

export type UpdateProduct = {
	price: number;
	discount: number;
	inStock: boolean;
};
export type FormAddProductValue = {
	title: string;
	desc: string;
	img: string;
	size: Omit<TypeSizeData, "_id">[];
	inStock: boolean;
	discount: number;
	category: string;
};
export type TypeProductData = {
	_id: string;
	title: string;
	desc: string;
	img: string;
	size: TypeSizeData[];
	inStock: boolean;
	discount: number;
	category: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};
export type ICustomerInfor = {
	address: string;
	gender: string;
	name: string;
	notes: string;
	phone: string;
};

export enum EnumStatusValues {
	PENDING = "pending",
	PAID = "paid",
	SHIPPING = "shipping",
	DELIVERED = "delivered",
	COMPLETED = "completed",
	CANCELED = "canceled",
}

export type TypeProductOrderedData = {
	productId: string;
	size: TypeSizeData[];
	quantity: number;
	_id: string;
};
export type TypeOrderData = {
	_id: string;
	products: TypeProductOrderedData[];
	name: string;
	gender: string;
	address: string;
	phone: string;
	status: EnumStatusValues;
	notes: string;
	reasonCancel?: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

// Notification
export interface NotifActions {
	type: string;
	payload?: TypeOrderData[];
}

export type TypeCategoryData = {
	title: string;
	desc: string;
	img: string;
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

export interface ResponseGenerator {
	config?: any;
	data?: any;
	headers?: any;
	request?: any;
	status?: number;
	statusText?: string;
}
export interface IParam {
	id: string;
}
export interface IActionSaga {
	type: string;
	payload: string;
}
export interface TProductCartReducer {
	id: string;
	title: string;
	desc: string;
	img: string;
	type: string | undefined;
	quantity: number;
	price: number | undefined;
	discount: number;
	category: string;
}
export interface IInitStateCartReducer {
	products: TProductCartReducer[];
	totalAmount: number;
}
export interface IInitStateProductReducer {
	products: TypeProductData[];
	product: TypeProductData;
	error: string;
}
export interface IActionCartReducer {
	type: string;
	payload: TProductCartReducer;
}
export interface ISize {
	id: string;
	sizeProduct: string;
	price: number;
}

export interface ChangeSizeProduct {
	type: "CHANGE_SIZE";
	payload: ISize;
	index: number;
}
export interface MergeProduct {
	type: "MERGE_PRODUCT";
	payload: ISize;
	index: number;
	indexToMerge: number;
}
export interface VerifyQuantity {
	type: "VERIFY_QUANTITY";
	mount: number;
	index: string;
}

export interface VerifyQuantity {
	type: "VERIFY_QUANTITY";
	mount: number;
	index: string;
}
export interface DeleteProductInCart {
	type: "DELETE_PRODUCT_IN_CART";
	id: string;
}
export interface ChangeCheckoutStatus {
	type: "CHANGE_CHECK_OUT_STATUS";
	status: boolean;
}
export interface PaidStatus {
	type: "PAID_STATUS";
	status: boolean;
}
export interface HanldingCheckout {
	type: "HANLDING_CHECKOUT";
	status: boolean;
}
export interface PackedOrder {
	type: "POSTED_ORDER";
	status: boolean;
}
export interface PostOrder {
	type: "PACKED_ORDER";
	status: boolean;
}
export interface CompletedCheckout {
	type: "COMPLETED_CHECKOUT";
	status: boolean;
}

export interface IOrderContent {
	status: string;
	gender: string;
	name: string;
	phone: string;
	address: string;
	notes: string;
	products: {
		productId: string;
		quantity: number;
		size: {
			types: string;
			price: number;
		};
	}[];
}
