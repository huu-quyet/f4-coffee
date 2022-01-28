import { toast } from "react-toastify";
import {
	changeCheckoutStatus,
	completedCheckout,
	hanldingCheckout,
	packedOrder,
	paidStatus,
	postedOrder,
} from "../../action/actionCreator";
import { socket } from "../../socket";
import { toastErrorConfig, toastSuccessConfig } from "../../utils/toastConfig";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export interface MessageSocket {
	message: string;
}
function useSocketPaymentHandler() {
	const [textError, setTextError] = useState(false);
	const dispatch = useDispatch();
	const handler_Order_Approved = ({ message }: MessageSocket) => {
		dispatch(paidStatus(true));
		toast.success("admin comfirmed your order", toastSuccessConfig);
	};

	const rejected_Apply_Handler = ({ message }: MessageSocket) => {
		setTextError(true);
		toast.error("💔😭 admin từ chối đơn hàng của bạn 😭💔", toastErrorConfig);
	};

	const paid_Order_Handler = ({ message }: MessageSocket) => {
		dispatch(paidStatus(true));
		toast.success(
			"😍 bạn đã thanh toán thành công đơn hàng 😍",
			toastSuccessConfig
		);
	};
	const packed_Order_Handler = ({ message }: MessageSocket) => {
		dispatch(hanldingCheckout(true));
		dispatch(packedOrder(true));
		toast.success("😍 đơn hàng của bạn đang được đóng gói😍", toastSuccessConfig);
	};

	const posted_Order_Handler = ({ message }: MessageSocket) => {
		dispatch(postedOrder(true));
		toast.success("🚁đơn hàng của bạn đã được gửi đi🚁", toastSuccessConfig);
	};

	const completed_Order_Handler = ({ message }: MessageSocket) => {
		dispatch(completedCheckout(true));
		toast.success("💋đơn hàng của bạn đã được hoàn thành💋", toastSuccessConfig);
	};

	const checkout_inforation_MOMO = ({
		partnerCode,
		orderId,
		amount,
		orderInfo,
		message,
	}: any) => {
		if (message === "Transaction denied by user.") {
			toast.error("please checkout before next step", toastErrorConfig);
		} else if (message.includes("Success")) {
			toast.success("checkout successfull!!!", toastSuccessConfig);
			dispatch(paidStatus(true));
		} else {
			toast.error("timeout please execute the payment", toastErrorConfig);
		}
		const payment_status = JSON.stringify({
			paymentStatus: {
				partnerCode: partnerCode,
				orderId: orderId,
				amount: amount,
				orderInfo: orderInfo,
				message: message,
			},
		});
		localStorage.setItem("paymentstatus", payment_status);
		// console.log({
		// 	partnerCode: partnerCode,
		// 	orderId: orderId,
		// 	amount: amount,
		// 	orderInfo: orderInfo,
		// 	message: message,
		// });
	};

	useEffect(() => {
		dispatch(changeCheckoutStatus(true));
	}, []);

	useEffect(() => {
		socket.on("apply approved", handler_Order_Approved);
		return () => {
			socket.off("apply approved", handler_Order_Approved);
		};
	}, []);

	useEffect(() => {
		socket.on("apply rejected", rejected_Apply_Handler);
		return () => {
			// cleanListen();
			socket.off("apply rejected", rejected_Apply_Handler);
		};
	}, []);

	useEffect(() => {
		socket.on("order paid", paid_Order_Handler);
		return () => {
			// cleanListen();
			socket.off("order paid", paid_Order_Handler);
		};
	}, []);

	useEffect(() => {
		socket.on("order packed", packed_Order_Handler);
		return () => {
			// cleanListen();
			socket.off("order packed", packed_Order_Handler);
		};
	}, []);

	useEffect(() => {
		socket.on("order posted", posted_Order_Handler);
		return () => {
			// cleanListen();
			socket.off("order posted", posted_Order_Handler);
		};
	}, []);

	useEffect(() => {
		socket.on("order completed", completed_Order_Handler);
		return () => {
			// cleanListen();
			socket.off("order completed", completed_Order_Handler);
		};
	}, []);

	useEffect(() => {
		socket.on("checkout Information", checkout_inforation_MOMO);
		return () => {
			// cleanListen();
			socket.off("checkout Information", checkout_inforation_MOMO);
		};
	}, []);

	return { textError };
}

export default useSocketPaymentHandler;
