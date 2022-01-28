import { useState, useEffect } from "react";
import { IinitialValue } from "../../../types";
import { initialValue } from "./infor";

const useIntialValueData = () => {
	const [initialValueData, setInitialValueData] =
		useState<IinitialValue>(initialValue);
	useEffect(() => {
		const customerInfo = JSON.parse(
			localStorage.getItem("customerInfo") as string
		);
		if (customerInfo) {
			setInitialValueData(customerInfo);
		}
	}, []);
	return { initialValueData };
};

export default useIntialValueData;
