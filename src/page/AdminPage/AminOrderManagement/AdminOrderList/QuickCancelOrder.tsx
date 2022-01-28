import React, { useCallback, useState } from "react";
import throttle from "lodash/throttle";
import { ExclamationIcon } from "@heroicons/react/outline";

interface IQuickCancelOrder {
	handleClosePopup: () => void;
	handleCancelOrder: (cancelingReason: string) => void;
}
const QuickCancelOrder: React.FC<IQuickCancelOrder> = ({
	handleClosePopup,
	handleCancelOrder,
}) => {
	const [reason, setReason] = useState("");
	const handleOnChangeReason = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setReason(e.target.value);
		},
		[]
	);
	const throttledCancel = useCallback(
		throttle(() => handleCancelOrder(reason), 3000, {
			trailing: false,
		}),
		[reason]
	);
	return (
		<div className="absolute inset-0 bg-slate-600/50 flex justify-center items-center">
			<div className="w-96 -translate-y-6 bg-white px-4 py-4 shadow-lg rounded-lg">
				<div className="text-center font-semibold text flex gap-2">
					<ExclamationIcon className="w-12 h-w-12 text-red-500" />
					<div className="flex items-center">
						You are going to cancel this order.
					</div>
				</div>
				<div className="pb-5 pt-2 text-slate-600 text-tiny text-justify">
					<p className="mb-1">
						This order will be sent to <b>Orders Hitory</b> page and you won&apos;t
						able to undo this action.
					</p>
					<p className="mb-1">
						If you choose this action by accident, please press{" "}
						<b>&apos;Keep this order&apos;</b> button to go back.
					</p>
					<p>
						In case you still want to confirm this action, please provide the reason
						for canceling this order on the below blank:{" "}
						<b>
							<i>(required)</i>
						</b>{" "}
					</p>
				</div>
				<textarea
					className="appearance-none border border-slate-400 focus:outline-none focus:ring-1 
          focus:border-sky-400 text-tiny w-full rounded-md px-3 py-2 mb-3"
					onChange={handleOnChangeReason}
				/>

				<div className="flex justify-center">
					<button
						className="bg-green-600 text-white opacity-80 rounded-md  px-3 py-1 hover:opacity-100"
						onClick={handleClosePopup}
					>
						Keep this order
					</button>
					<button
						className={
							reason.trim() !== ""
								? "bg-red-600 text-white opacity-80 rounded-md ml-3 px-3 py-1 hover:opacity-100"
								: "bg-red-600 text-white opacity-80 rounded-md ml-3 px-3 py-1 cursor-not-allowed"
						}
						onClick={throttledCancel}
					>
						Cancel this order
					</button>
				</div>
			</div>
		</div>
	);
};

export default QuickCancelOrder;
