import { toast } from "react-toastify";
import { setLocalStorage } from "../../../localStorage";
import { orderServices } from "../../../services/order.services";
import { customerServiceSoket } from "../../../socket/customerService";
import {
	IinitialValue,
	IInitStateCartReducer,
	IOrderContent,
	TProductCartReducer,
} from "../../../types";
import {
	formatMoney,
	removeVietnameseTones,
} from "../../../utils/formatmethod";
import { toastErrorConfig } from "../../../utils/toastConfig";
export interface Product {
	productId: string;
	imageUrl: string;
	name: string;
	size: { types: string; price: number };
	quantity: number;
	discount: number;
}
export const orderCheckoutInitial = {
	orderId: "",
	partnerCode: "",
	requestId: "",
};
export const findtotalCost = (product: Product[]): string => {
	return formatMoney(
		product.reduce((acc: number, curr: Product) => {
			if (curr.discount !== 1) {
				return acc + curr.size.price * curr.quantity * (1 - curr.discount);
			}
			return acc + curr.size.price * curr.quantity;
		}, 0)
	);
};

export const moneyamount = (product: Product[]): number => {
	return product.reduce((acc: number, curr: Product) => {
		if (curr.discount !== 1) {
			return acc + curr.size.price * curr.quantity * (1 - curr.discount);
		}
		return acc + curr.size.price * curr.quantity;
	}, 0);
};

export const findCartInitial = (cart: IInitStateCartReducer): Product[] => {
	return cart.products.map((product: TProductCartReducer) => {
		const {
			id: productId,
			img: imageUrl,
			title: name,
			quantity,
			price,
			type: types,
			discount,
		} = product;
		const newProduct: Product = {
			productId: productId,
			imageUrl: imageUrl,
			name: name,
			quantity: quantity,
			size: { types: types || "", price: price || 0 },
			discount,
		};
		return newProduct;
	});
};

const formaProduct = (productInCart: Product[]) => {
	return productInCart.map((product: Product) => {
		const {
			productId,
			quantity,
			size: { types, price },
			discount,
		} = product;
		let newPrice = price;
		if (discount !== 1) {
			newPrice = price * (1 - discount);
		}
		return {
			productId: productId,
			quantity: quantity,
			size: { types: types, price: newPrice },
		};
	});
};
async function momoShowQR(data: any, orderContent: IOrderContent) {
	if (data.message === "Bad format request.") {
		// console.log("wrong here");
	} else {
		const responseOrder = await orderServices.postOrder(orderContent);
		setLocalStorage("checkoutInfor", responseOrder.data);
		setLocalStorage("URLAPI", { urlApi: data.payUrl });
		customerServiceSoket.checkout(responseOrder.data, data.orderId);
		window.open(data.payUrl);
	}
}
export const postDataandgetApiMoMo = async (productInCart: Product[]) => {
	localStorage.removeItem("paymentstatus");
	const customerInfor = JSON.parse(localStorage.getItem("customer") as string);
	const normalTotalCost = moneyamount([...productInCart]);
	if (customerInfor) {
		const response: any = await orderServices.getApiMomo({
			orderInfo: `${removeVietnameseTones(
				customerInfor.name
			)} thanh toan don hang`,
			amount: `${normalTotalCost}`,
		});

		const newProducts = formaProduct(productInCart);

		const orderContent: IOrderContent = {
			products: newProducts,
			...customerInfor,
			status: "pending",
		};

		await momoShowQR(response.data, orderContent);
		return response;
	}
};

export const toastAddData = () => {
	toast.error(
		"🌹🌹🌹 Please adđ product before payment 🌹🌹🌹",
		toastErrorConfig
	);
};
