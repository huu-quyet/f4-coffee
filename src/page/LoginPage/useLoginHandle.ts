import { loginServices } from "../../services/login.services";
import { AxiosResponse } from "axios";

import { useHistory } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";
import { FormValues } from "./login";
import { useState } from "react";

const useLoginHandle = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const history = useHistory();

	const handleLogin = async (
		values: FormikValues,
		{ setErrors }: FormikHelpers<FormValues>
	) => {
		try {
			const resp: AxiosResponse = await loginServices.login({
				username: values.username,
				password: values.password,
			});

			// console.log(resp);
			if (resp && resp.status === 200) {
				// redirect
				const accessToken = JSON.stringify({ accessToken: resp.data.accessToken });
				const user = JSON.stringify(values.username);
				window.localStorage.setItem("accessToken", accessToken);
				window.localStorage.setItem("username", user);
				history.push("/admin");
			}
			if (resp && resp.status === 401) {
				//redirect to login page
				// console.log("error");
				const { data } = resp;
				if (data.message.includes("Incorrect")) {
					setErrors({ username: data.message });
				}
				if (data.message.includes("exceed")) {
					setErrors({ username: "wait 5 munite to access" });
					setIsLogin(false);
				}
			}
		} catch (error: any) {
			const { data } = error.response;
			if (data.message.includes("Incorrect")) {
				setErrors({ username: data.message });
			}
			if (data.message.includes("exceed")) {
				setErrors({ username: "wait 5 munite to access" });
			}
		}
	};
	return { isLogin: isLogin, setIslogin: setIsLogin, handleLogin: handleLogin };
};

export default useLoginHandle;
