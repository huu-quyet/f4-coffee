import React, { useCallback } from "react";
import throttle from "lodash/throttle";
import { InformationCircleIcon } from "@heroicons/react/outline";

interface IConfirmAction {
	nextStatus: string;
	handleCancel: () => void;
	handleComfirm: () => void;
}
const ConfirmAction: React.FC<IConfirmAction> = ({
	nextStatus,
	handleCancel,
	handleComfirm,
}) => {
	const throttledConfirm = useCallback(
		throttle(handleComfirm, 3000, { trailing: false }),
		[]
	);
	return (
		<div className="absolute inset-0 bg-slate-600/50 flex justify-center items-center">
			<div className="w-96 -translate-y-6 bg-white px-4 py-4 shadow-lg rounded-lg">
				<div className="text-center font-semibold text flex gap-2">
					<InformationCircleIcon className="w-12 h-w-12 text-sky-500" />
					<span>
						You are going to change this order&apos;s status into &apos;{nextStatus}
						&apos;.
					</span>
				</div>
				<div className="pt-5 pb-2 text-slate-600 text-tiny text-justify">
					{nextStatus === "paid" ? (
						<span>
							Pressing button <b>&apos;Confirm&apos;</b> below means that you have
							already received customer&apos;s payment for this order.
						</span>
					) : nextStatus === "shipping" ? (
						<span>
							Pressing button <b>&apos;Confirm&apos;</b> below means that this order
							has been being shipped to your customer.
						</span>
					) : nextStatus === "delivered" ? (
						<span>
							Pressing button <b>&apos;Confirm&apos;</b> below only when this order has
							been delivered to your customer.
						</span>
					) : nextStatus === "completed" ? (
						<span>
							Pressing button <b>&apos;Confirm&apos;</b> to complete this order. This
							order will be sent to <b>Orders History</b> page.
						</span>
					) : null}
				</div>
				<div className="pb-5 text-slate-600 text-tiny text-justify">
					If you choose this action by accident, please press{" "}
					<b>&apos;Cancel&apos;</b> button to go back.
				</div>

				<div className="flex justify-center">
					<button
						className="bg-red-600 text-white opacity-80 rounded-md  px-3 py-1 hover:opacity-100"
						onClick={handleCancel}
					>
						Cancel
					</button>
					<button
						className="bg-green-600 text-white opacity-80 rounded-md  ml-3 px-3 py-1 hover:opacity-100"
						onClick={throttledConfirm}
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmAction;
