import { AxiosRequestConfig } from "axios";
import { http } from "./http.services";
interface Itype {
	types: string;
	price: number;
}
interface IquantitySize {
	productId: string;
	quantity: number;
	size: Itype;
}

interface TypeOrderRequestBody {
	products: IquantitySize[];
	name: string;
	gender: string;
	address: string;
	phone: string;
	status: string;
	note?: string;
}

interface TypeRequestOrderMomo {
	orderInfo: string;
	amount: string;
}

export const orderServices = {
	postOrder: async (data: TypeOrderRequestBody) => {
		return http.post("/api/order-informations", data);
	},
	getOrderStatus: async (id: string) => {
		return http.get(`/api/order-informations/status/${id}`);
	},
	getApiMomo: async (
		data: TypeRequestOrderMomo,
		config?: AxiosRequestConfig
	) => {
		return http.post("/api/checkouts", data, {
			...config,
		});
	},
	getOrderByMoMoId: async (orderMoMoId: string, config?: AxiosRequestConfig) => {
		return http.get(`/api/checkouts/${orderMoMoId}`, {
			...config,
		});
	},
};
