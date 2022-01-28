import * as Yup from "yup";
import { IinitialValue } from "../../../types";

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const validationSchema = Yup.object().shape({
	name: Yup.string().required("enter your name please"),
	phone: Yup.string()
		.required("required")
		.matches(phoneRegExp, "Phone number is not valid")
		.min(10, "to short")
		.max(10, "to long"),
	address: Yup.string().required("your address is required"),
});

export const handleReset = () => {
	localStorage.removeItem("paymentstatus");
	localStorage.removeItem("customerInfo");
	localStorage.removeItem("checkoutInfor");
	localStorage.removeItem("URLAPI");
};
export const billOptions = [
	{ key: "male", value: "male" },
	{ key: "female", value: "female" },
	{ key: "other", value: "other" },
];
export const initialValue: IinitialValue = {
	gender: "male",
	name: "",
	phone: "",
	address: "",
	notes: "",
};
export function saveNewDataToStore() {
	const customerInfo = localStorage.getItem("customerInfo") || "";
	if (customerInfo) {
		const { gender, name, phone, address, notes } = JSON.parse(customerInfo);
		initialValue.gender = gender;
		initialValue.name = name;
		initialValue.phone = phone;
		initialValue.address = address;
		initialValue.notes = notes;
	}
}
