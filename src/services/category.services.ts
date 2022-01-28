import { AxiosRequestConfig } from "axios";
import { http } from "./http.services";
import { TypeCategoryData } from "../types";

export const categoryServices = {
	categories: (config?: AxiosRequestConfig) => {
		return http.get<TypeCategoryData[]>("/api/categories", {
			...config,
		});
	},
	category: (categoryId: string, config?: AxiosRequestConfig) => {
		return http.get<TypeCategoryData>(`api/categories/${categoryId}`, {
			...config,
		});
	},
};
