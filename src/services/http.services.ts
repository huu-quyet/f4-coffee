import axios, { AxiosRequestConfig } from "axios";

import { turnLoadingOff, turnLoadingOn } from "../action/actionCreator";
import store from "../store/store";
const BASE_URL =
	(import.meta.env.VITE_BASE_URL as string) || "http://localhost:5000";
// const BASE_URL = "http://localhost:5000";

export const httpToken = axios.create({
	baseURL: BASE_URL,
});

export const http = axios.create({
	baseURL: BASE_URL,
});

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

http.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		// loaddingOn
		store.dispatch(turnLoadingOn());
		return config;
	},
	(error) => {
		store.dispatch(turnLoadingOff());
	}
);

http.interceptors.response.use(
	(response) => {
		//hide loadding
		store.dispatch(turnLoadingOff());
		return response;
	},
	(error) => {
		const status = error.response.status;
		store.dispatch(turnLoadingOff());
		return error.response;
	}
);

httpToken.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		// loaddingOn
		store.dispatch(turnLoadingOn());
		const authToken = window.localStorage.getItem("accessToken");
		if (!authToken) {
			//goto login
			config.cancelToken = source.token;
		}
		const parseToken = JSON.parse(authToken as string);
		// console.log(parseToken);
		if (config.headers) {
			config.headers.Authorization = `Bearer ${parseToken.accessToken}`;
		}
		return config;
	},
	(error) => {
		store.dispatch(turnLoadingOff());
		if (error && error.status === 401) {
			//redirect to login page
			// hien pop up
			//refresh token
		}
	}
);

httpToken.interceptors.response.use(
	(response) => {
		//hide loadding
		store.dispatch(turnLoadingOff());
		return response;
	},
	(error) => {
		const status = error.response.status;
		store.dispatch(turnLoadingOff());
		//hide loadding
		//     console.log(error);
		if (status == 401) {
			//redirect login
		}
		return error.response;
	}
);
