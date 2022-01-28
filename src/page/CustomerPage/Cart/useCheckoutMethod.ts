import { useCallback } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { setLocalStorage } from "../../../localStorage";
import { IinitialValue } from "../../../types";

const useCheckoutMethod = () => {
	const [comfirmToastCheckOut, setComfirmToastCheckOut] = useState(false);
	const history = useHistory();
	const handleCancel = () => {
		setComfirmToastCheckOut(false);
	};
	const checkoutButtonClick = useCallback((values: IinitialValue) => {
		setComfirmToastCheckOut(true);
		setLocalStorage("customerInfo", values);
	}, []);
	const rediRectTomenu = () => {
		history.push("/menu/all");
	};
	return {
		comfirmToastCheckOut,
		handleCancel,
		checkoutButtonClick,
		rediRectTomenu,
	};
};

export default useCheckoutMethod;
