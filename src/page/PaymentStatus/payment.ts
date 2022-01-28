import { Product } from "../CustomerPage/Cart/Cart";
import { socket } from "../../socket";

export interface IPaymentStatus {
	productInCart: Product[];
	totalCost: string;
	exitCheckoutTracking: () => void;
	orderInfor: any;
}
export interface Istep {
	step: string;
	isCompleted: boolean;
}

export const InitialPaymentStep: Istep[] = [
	{ step: "checkout", isCompleted: false },
	{ step: "paid", isCompleted: false },
	{ step: "handle", isCompleted: false },
	{ step: "packed", isCompleted: false },
	{ step: "posted", isCompleted: false },
	{ step: "complete", isCompleted: false },
];

export const paymentLength = 12 / InitialPaymentStep.length;

export const paymentStep = InitialPaymentStep.map((item) => item.step);

export const sendOrder = () => {
	socket.emit("checkout", { message: "order Id", orderId: "1234567890" });
};
export const redirectTonewLink = () => {
	const payUrlAPIMOMO = localStorage.getItem("URLAPI") as string;
	window.open(JSON.parse(payUrlAPIMOMO).urlApi);
};
