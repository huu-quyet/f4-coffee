import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	changeCheckoutStatus,
	completedCheckout,
	hanldingCheckout,
	packedOrder,
	paidStatus,
	postedOrder,
} from "../../../action/actionCreator";
import { orderServices } from "../../../services/order.services";
const useServiceCallApi = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const paymentStatus = localStorage.getItem("paymentstatus") as string;
			const paymentStatusParse = JSON.parse(paymentStatus);
			if (paymentStatusParse) {
				const response = await orderServices.getOrderByMoMoId(
					paymentStatusParse.paymentStatus.orderId
				);
				if (response.data?.orderId) {
					dispatch(paidStatus(true));
				}
				// console.log(response.data.orderId);
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const checkoutInfor = localStorage.getItem("checkoutInfor") as string;
			const checkoutInforParse = JSON.parse(checkoutInfor);
			if (checkoutInforParse) {
				const response = await orderServices.getOrderStatus(checkoutInforParse._id);
				// console.log(response.data.status);
				dispatch(changeCheckoutStatus(true));
				if (response.data.status === "paid") {
					dispatch(paidStatus(true));
				}
				if (response.data.status === "handing") {
					dispatch(paidStatus(true));
					dispatch(hanldingCheckout(true));
				}
				if (response.data.status === "packed") {
					dispatch(paidStatus(true));
					dispatch(hanldingCheckout(true));
					dispatch(packedOrder(true));
				}
				if (response.data.status === "completed") {
					dispatch(paidStatus(true));
					dispatch(hanldingCheckout(true));
					dispatch(packedOrder(true));
					dispatch(postedOrder(true));
					dispatch(completedCheckout(true));
				}
			} else {
				dispatch(changeCheckoutStatus(false));
				dispatch(paidStatus(false));
				dispatch(hanldingCheckout(false));
				dispatch(packedOrder(false));
				dispatch(postedOrder(false));
				dispatch(completedCheckout(false));
			}
		})();
	}, []);

	return {};
};

export default useServiceCallApi;
