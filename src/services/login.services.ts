import { AxiosRequestConfig } from "axios";
import { http } from "./http.services";
type TypeLoginRequestBody = {
	username: string;
	password: string;
};
type TypeLoginResponseData = {
	accessToken: string;
};

export const loginServices = {
	login: async (data: TypeLoginRequestBody, config?: AxiosRequestConfig) => {
		return http.post<TypeLoginResponseData>("/api/auth/login", data, {
			...config,
		});
	},
};
