import { toast } from "react-toastify";
import * as Yup from "yup";
import { toastSuccessConfig } from "../../utils/toastConfig";
export interface FormValues {
	username: string;
	password: string;
}
export interface User {
	username: string;
	password: string;
	name: string;
	avatarUrl: string;
	id: string;
}
export const SignupSchema = Yup.object().shape({
	username: Yup.string().required("Required"),
	password: Yup.string().required("Required"),
});
export const initialValue: FormValues = { username: "", password: "" };

export const ToastEmitter = () => {
	toast.success("Login Success", toastSuccessConfig);
};
