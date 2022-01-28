/* eslint-disable prefer-spread */
/* eslint-disable indent */
import {
	TypeProductData,
	TypeProductOrderedData,
	TypeOrderData,
	TProductCartReducer,
	EnumStatusValues,
} from "../types";
import { orderHistoryServices } from "../services/orderHistory.services";

export const getProductFromId = (
	productsList: TypeProductData[],
	productId: string
) => {
	return productsList.find((product: TypeProductData) => {
		return product._id === productId;
	});
};

export const getOrderById = (
	orderHistoryData: TypeOrderData[],
	orderId: string
) => {
	return orderHistoryData.find((order: TypeOrderData) => order._id === orderId);
};

export const changeOrderStatus = async (
	orderId: string,
	orderData: TypeOrderData
) => {
	try {
		const res = await orderHistoryServices.changeStatus(orderId, orderData);
		if (res.status == 200) {
			return true;
		}
	} catch (err) {
		// console.log(err);
		return false;
	}
};

export const getTotalPaymentOfOrder = (
	productsOrdered: TypeProductOrderedData[]
) => {
	return productsOrdered.reduce(
		(total: number, productOrdered: TypeProductOrderedData) => {
			return total + productOrdered.quantity * productOrdered.size[0].price;
		},
		0
	);
};

export const getTotalSoldProducts = (allOrderHistoryData: TypeOrderData[]) => {
	return allOrderHistoryData
		.filter(
			(orderHistoryData: TypeOrderData) =>
				orderHistoryData.status === EnumStatusValues.COMPLETED
		)
		.reduce((res: number, orderHistoryData: TypeOrderData) => {
			return (
				res +
				orderHistoryData.products.reduce(
					(total: number, orderedProduct: TypeProductOrderedData) => {
						return total + orderedProduct.quantity;
					},
					0
				)
			);
		}, 0);
};

export const getTotalIncome = (allOrderHistoryData: TypeOrderData[]) => {
	return allOrderHistoryData
		.filter(
			(orderHistoryData: TypeOrderData) =>
				orderHistoryData.status === EnumStatusValues.COMPLETED
		)
		.reduce((res: number, orderHistoryData: TypeOrderData) => {
			return (
				res +
				orderHistoryData.products.reduce(
					(total: number, orderedProduct: TypeProductOrderedData) => {
						return total + orderedProduct.quantity * orderedProduct.size[0].price;
					},
					0
				)
			);
		}, 0);
};

export const formatDate = (jsonDate: string) => {
	return new Date(jsonDate).toLocaleString("en-GB");
};

export const activeDot = function (slide: number) {
	document
		.querySelectorAll(".dots__dot")
		.forEach((e) => e.classList.remove("dots__dot--active"));
	document
		.querySelector(`.dots__dot[data-slide="${slide}"]`)
		?.classList.add("dots__dot--active");
};

export const gotoSlide = function (slide: number) {
	document.querySelectorAll(".slide").forEach((slideEl: any, i) => {
		slideEl.style.transform = `translateX(${100 * (i - slide)}%)`;
	});
};

export const formatPrice = function (price: number, discount: number) {
	let newPrice;
	if (discount === 1) {
		newPrice = price;
	} else {
		newPrice = price * (1 - discount);
	}
	const formatPrice = new Intl.NumberFormat("vn").format(newPrice);
	return formatPrice;
};

export const formatPriceProduct = function (price: number) {
	return new Intl.NumberFormat("vn").format(price);
};

export const addProductToCart = (id: string, products: TypeProductData[]) => {
	const productOrder: TypeProductData[] = products.filter(
		(product: TypeProductData) => {
			return product._id === id;
		}
	);
	const [product] = productOrder;
	const productAddToCart: TProductCartReducer = {
		id: product._id,
		title: product.title,
		desc: product.desc,
		img: product.img,
		type: product.size[0].types,
		quantity: 1,
		price: product.size[0].price,
		discount: product.discount,
		category: product.category,
	};

	return productAddToCart;
};

export const newParam = (param: string) => {
	return param.toLowerCase().split(" ").join("-");
};

export const formatParam = (param: string) => {
	return param.toLowerCase().split("-").join(" ");
};

export const toggleChoseSizeProduct = function (types: string) {
	document
		.querySelectorAll(".type")
		.forEach((el) => el.classList.remove("type--active"));
	document
		.querySelector(`.type[data-type=${types}]`)
		?.classList.add("type--active");
};

export const toggleShowProduct = function (el: any, classEl: string) {
	const triggerBottom = window.innerHeight;
	el.forEach((card: any) => {
		const cardTop = card.getBoundingClientRect().top;
		if (cardTop < triggerBottom) {
			card.classList.remove(`${classEl}`);
		} else {
			card.classList.add(`${classEl}`);
		}
	});
};

export function removeVietnameseTones(str: string, toUpperCase = false) {
	str = str.toLowerCase();
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
	str = str.replace(/đ/g, "d");
	str = str.replace(/ /g, "-");
	str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
	str = str.replace(/\u02C6|\u0306|\u031B/g, "");

	return toUpperCase ? str.toUpperCase() : str;
}

export const hiddenMenuMobile = () => {
	document.querySelector(".menu--mobile")?.classList.add("hidden--mobile");
	document.querySelector(".nav--mobile")?.classList.add("hidden--mobile");
};

export const addStyleHeader = () => {
	const header = document.querySelector("header");
	if (!header) return;
	if (header?.getBoundingClientRect().top < 0) {
		document.querySelector("header")?.classList.add("sticky");
	}
};

//  for storage notification

export const setNotifStorageForFirstLogin = (
	allOrdersData: TypeOrderData[]
) => {
	const jsonData = window.localStorage.getItem("recentNotifications");
	if (!jsonData) {
		const data = allOrdersData.slice(allOrdersData.length - 50);
		window.localStorage.setItem("recentNotifications", JSON.stringify(data));
	}
};
