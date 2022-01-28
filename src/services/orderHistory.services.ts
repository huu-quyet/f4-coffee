import { AxiosRequestConfig } from "axios";
import { httpToken } from "./http.services";
import { TypeOrderData } from "../types";

export const orderHistoryServices = {
	orders: (config?: AxiosRequestConfig) => {
		return httpToken.get<TypeOrderData[]>("/api/order-informations", {
			...config,
		});
	},
	order: (orderId: string, config?: AxiosRequestConfig) => {
		return httpToken.get<TypeOrderData>(`/api/order-informations/${orderId}`, {
			...config,
		});
	},
	changeStatus: (
		orderId: string,
		data: TypeOrderData,
		config?: AxiosRequestConfig
	) => {
		return httpToken.put<TypeOrderData>(
			`/api/order-informations/${orderId}`,
			data,
			{
				...config,
			}
		);
	},
};
