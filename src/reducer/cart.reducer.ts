import {
	IInitStateCartReducer,
	TProductCartReducer,
	IActionCartReducer,
	ChangeSizeProduct,
	VerifyQuantity,
	MergeProduct,
} from "../types";
import * as types from "../action/actionType";
import { Reducer } from "redux";
interface dataCart {
	products: [];
	totalAmount: number;
}

const cartSessionStorage: any = window.sessionStorage.getItem("cart");
const dataCart: dataCart =
	typeof cartSessionStorage === "string"
		? JSON.parse(cartSessionStorage)
		: { products: [], totalAmount: 0 };

type actions =
	| ChangeSizeProduct
	| IActionCartReducer
	| VerifyQuantity
	| MergeProduct;

const cartReducer: Reducer<IInitStateCartReducer, actions> = (
	state = dataCart,
	action
) => {
	switch (action.type) {
		// Add product to cart

		case types.GET_ADD_ORDER_TO_CART_REQUEST: {
			// Handle find index of product existed in cart or not
			const existingProductId = state.products.findIndex(
				(product) =>
					product.id === action.payload?.id && product.type === action.payload.type
			);

			const existingProduct = state.products[existingProductId];
			let updateProduct: TProductCartReducer[];
			let newTotalAmount: number;

			// Handle if product not exist, add the product to cart
			if (existingProduct) {
				const newProduct: TProductCartReducer = {
					...existingProduct,
					quantity: existingProduct.quantity + 1,
				};
				updateProduct = [...state.products];
				updateProduct[existingProductId] = newProduct;
				newTotalAmount = state.totalAmount;
			}
			// Handle if product existed, increase quantity product in cart
			else {
				updateProduct = state.products.concat(action.payload);
				newTotalAmount = state.totalAmount + 1;
			}

			// Save new cart to SessionStorage
			const data = { products: updateProduct, totalAmount: newTotalAmount };
			window.sessionStorage.setItem("cart", JSON.stringify(data));

			return {
				products: updateProduct,
				totalAmount: newTotalAmount,
			};
		}

		case types.CHANGE_SIZE: {
			const { id, sizeProduct, price: priceChanged }: any = action.payload;
			const { index: positionProduct }: any = action;

			const productInCart: TProductCartReducer[] = state.products.map(
				(product, index) => {
					if (id === product.id && index === positionProduct) {
						const { type, price, ...list } = product;
						return { type: sizeProduct, price: priceChanged, ...list };
					}
					return { ...product };
				}
			);
			const data = { products: productInCart, totalAmount: state.totalAmount };
			window.sessionStorage.setItem("cart", JSON.stringify(data));
			return { products: productInCart, totalAmount: state.totalAmount };
		}

		case types.VERIFY_QUANTITY: {
			const products = [...state.products];
			const { index, mount }: any = action;
			const newProducts = products.map((product, indexProduct) => {
				if (index === indexProduct) {
					const { quantity, ...list } = product;
					return { quantity: mount, ...list };
				}
				return { ...product };
			});
			const data = { products: newProducts, totalAmount: state.totalAmount };
			window.sessionStorage.setItem("cart", JSON.stringify(data));

			return { products: newProducts, totalAmount: state.totalAmount };
		}

		case types.DELETE_PRODUCT_IN_CART: {
			const products = [...state.products];
			const { id, index }: any = action;
			const newProducts = products.filter((_, indexProduct) => {
				return index !== indexProduct;
			});
			const data = { products: newProducts, totalAmount: state.totalAmount - 1 };
			window.sessionStorage.setItem("cart", JSON.stringify(data));
			return { products: newProducts, totalAmount: state.totalAmount - 1 };
		}

		case types.MERGE_PRODUCT: {
			const { sizeProduct, price: priceChanged }: any = action.payload;
			const { index, indexToMerge }: any = action;
			const products = [...state.products];
			const { quantity: quantityProductAdd } = products[indexToMerge];
			products[index].quantity += quantityProductAdd;
			products[index].type = sizeProduct;
			products[index].price = priceChanged;
			const newProducts = products.filter((product, indexProduct) => {
				return indexProduct !== indexToMerge;
			});
			return { products: newProducts, totalAmount: state.totalAmount - 1 };
		}

		default:
			return state;
	}
};

export default cartReducer;
