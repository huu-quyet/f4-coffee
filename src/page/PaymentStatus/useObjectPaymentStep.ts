import { useCallback } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../reducer/rootReducer";
import { paymentStep } from "./payment";
function useObjectPaymentStep() {
	const isCompletedObject = useSelector((state: RootState) => state.checkouts);
	const { checkout, paid, hanlding, packed, posted, completed } =
		isCompletedObject;

	const isCompleted = Object.values({
		checkout: checkout,
		paid: paid,
		hanlding: hanlding,
		packed: packed,
		posted: posted,
		completed: completed,
	});

	const findActionCompleted = useCallback((): string => {
		let action = "";
		const newCompleteedArray = [...isCompleted];
		newCompleteedArray.reverse().find((item, index) => {
			if (item) {
				action = paymentStep[paymentStep.length - (index + 1)];
				return true;
			}
			return false;
		});
		return action;
	}, [...isCompleted]);

	return { isCompleted, findActionCompleted };
}

export default useObjectPaymentStep;
