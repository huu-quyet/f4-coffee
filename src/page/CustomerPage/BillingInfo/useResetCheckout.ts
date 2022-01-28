import {
	changeCheckoutStatus,
	completedCheckout,
	hanldingCheckout,
	packedOrder,
	paidStatus,
	postedOrder,
} from "../../../action/actionCreator";
import { useDispatch } from "react-redux";

function useResetCheckout() {
	const dispatch = useDispatch();
	const resetAllStatus = () => {
		dispatch(changeCheckoutStatus(false));
		dispatch(paidStatus(false));
		dispatch(hanldingCheckout(false));
		dispatch(packedOrder(false));
		dispatch(postedOrder(false));
		dispatch(completedCheckout(false));
	};
	return { resetAllStatus };
}

export default useResetCheckout;
