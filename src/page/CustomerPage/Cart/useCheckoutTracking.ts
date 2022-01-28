import { useState } from "react";
import { orderCheckoutInitial, postDataandgetApiMoMo } from "./Cart";
import useFormatCart from "../../../hook/useFormatCart";

const useCheckoutTracking = () => {
	const [CheckoutStep, setCheckoutStep] = useState(false);
	const [orderInfor, setorderInfor] = useState(orderCheckoutInitial);
	const { productInCart } = useFormatCart();

	async function handleComfirm() {
		setCheckoutStep(true);
		const response: any = await postDataandgetApiMoMo(productInCart);
		if (response.data) {
			const { orderId, partnerCode, requestId } = response.data;
			setorderInfor({
				orderId: orderId,
				partnerCode: partnerCode,
				requestId: requestId,
			});
		}
	}

	function exitCheckoutTracking() {
		setCheckoutStep(false);
	}

	function showButtonGrowing() {
		setCheckoutStep(!CheckoutStep);
	}

	return {
		CheckoutStep,
		orderInfor,
		handleComfirm,
		exitCheckoutTracking,
		showButtonGrowing,
	};
};

export default useCheckoutTracking;
