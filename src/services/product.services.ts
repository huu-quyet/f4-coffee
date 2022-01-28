import { AxiosRequestConfig } from "axios";
import { http, httpToken } from "./http.services";
import { FormAddProductValue, TypeProductData, UpdateProduct } from "../types";

export const productServices = {
	products: (config?: AxiosRequestConfig) => {
		return http.get<TypeProductData[]>("/api/products", {
			...config,
		});
	},
	product: (productId: string, config?: AxiosRequestConfig) => {
		return http.get<TypeProductData>(`api/products/${productId}`, {
			...config,
		});
	},
	putProduct: (productId: string,  data : UpdateProduct, config?: AxiosRequestConfig) => {
		return httpToken.put(`api/products/${productId}`,data, {
			...config,
		});
	},
	postProduct : (data: FormAddProductValue, config?: AxiosRequestConfig) => {
		return httpToken.post("api/products", data, {
			...config,
		});
	},
	deleteProduct : (productId: string, config?: AxiosRequestConfig) => {
		return httpToken.delete(`api/products/${productId}`, {
			...config,
		});
	}
};
