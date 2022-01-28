import { socket } from ".";
import { TypeOrderData } from "../types";

export const customerServiceSoket = {
	checkout: (orderContent: TypeOrderData, orderId: string) => {
		socket.emit("checkout", {
			message: "order product",
			order: orderContent,
			orderId: orderId,
		});
	},
	payment_fail: (orderContent: TypeOrderData) => {
		socket.emit("payment fail", { message: "payment fail", order: orderContent });
	},
};
