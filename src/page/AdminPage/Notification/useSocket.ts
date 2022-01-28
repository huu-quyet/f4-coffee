import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
	apiGetAllOrders,
	haveNotif,
	pushNewNotification,
	notHaveNotif,
	deleteANotification,
} from "../../../action/actionCreator";
import { RootState } from "../../../reducer/rootReducer";
import { socket } from "../../../socket";
import { TypeOrderData } from "../../../types";
import { saveReadNotifs } from "./utilsForStorage";

export const changeStatusSuccess = () => {
	toast.success("Send new order's status to customer successfully!");
};

export const changeStatusFailure = () => {
	toast.error("Send new order's status to customer unsuccessfully!");
};

export const useSocket = () => {
	const dispatch = useDispatch();
	const hasNewComingOrder = useSelector(
		(state: RootState) => state.notification.hasNewNotif
	);

	const newOrderHandler = ({ order }: { order: TypeOrderData }) => {
		const data: TypeOrderData[] = [order];
		if (
			location.pathname === "/admin/orders-list" ||
			location.pathname === "/admin/orders-list/all-processing-orders" ||
			location.pathname === "/admin/orders-list/pending-orders"
		) {
			dispatch(notHaveNotif());
			saveReadNotifs(data);
			toast.info("You have new orders!!");
		} else {
			dispatch(haveNotif());
			dispatch(pushNewNotification(data));
		}
		dispatch(apiGetAllOrders());
	};

	const handleReadNotif = (data: TypeOrderData) => {
		const sendData = [data];
		dispatch(deleteANotification(sendData));
		dispatch(notHaveNotif());
	};

	useEffect(() => {
		socket.emit("admin login", { message: "admin login" });
		socket.on("new order", newOrderHandler);
		socket.on("comfirm success", changeStatusSuccess);
		socket.on("order shipping success", changeStatusSuccess);
		socket.on("order delivered success", changeStatusSuccess);
		socket.on("order completed success", changeStatusSuccess);
		socket.on("rejecte success", changeStatusSuccess);
		socket.on("comfirm fail", changeStatusFailure);
		socket.on("order shipping fail", changeStatusFailure);
		socket.on("order delivered fail", changeStatusFailure);
		socket.on("order completed fail", changeStatusFailure);
		socket.on("rejecte fail", changeStatusFailure);

		return () => {
			socket.off("new order", newOrderHandler);
			socket.off("comfirm success", changeStatusSuccess);
			socket.off("order shipping success", changeStatusSuccess);
			socket.off("order delivered success", changeStatusSuccess);
			socket.off("order completed success", changeStatusSuccess);
			socket.off("rejecte success", changeStatusSuccess);
			socket.off("comfirm fail", changeStatusFailure);
			socket.off("order shipping fail", changeStatusFailure);
			socket.off("order delivered fail", changeStatusFailure);
			socket.off("order completed fail", changeStatusFailure);
			socket.off("rejecte fail", changeStatusFailure);
		};
	}, []);

	return { hasNewComingOrder, handleReadNotif };
};
