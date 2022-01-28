import React from "react";
import { TypeOrderData, EnumStatusValues } from "../../../../types";
import { getTotalSoldProducts, getTotalIncome } from "../../../../utils";
import { formatMoney } from "../../../../utils/formatmethod";

interface IStatisticsProps {
	orderHistoryData: TypeOrderData[];
}

const StatisticsOrderHistory: React.FC<IStatisticsProps> = ({
	orderHistoryData,
}) => {
	return (
		<>
			<div className="border border-green-400 w-1/5 rounded-lg shadow-md shadow-slate-300">
				<div
					className="text-center text-black border-b rounded-t-lg border-green-300
         bg-green-300 text-sm p-3 font-bold uppercase"
				>
					Completed Orders
				</div>
				<div className="text-center py-3 text-lg font-bold text-black">
					{
						orderHistoryData.filter(
							(order: TypeOrderData) => order.status === EnumStatusValues.COMPLETED
						).length
					}
				</div>
			</div>
			<div className="border border-red-400 w-1/5 rounded-lg shadow-md shadow-slate-300">
				<div
					className="text-center text-black border-b rounded-t-lg border-red-300 
        bg-red-300 text-sm p-3 font-bold uppercase"
				>
					Canceled Orders
				</div>
				<div className="text-center py-3 text-lg font-bold text-black">
					{
						orderHistoryData.filter(
							(order: TypeOrderData) => order.status === EnumStatusValues.CANCELED
						).length
					}
				</div>
			</div>
			<div className="border border-sky-400 w-1/5 rounded-lg shadow-md shadow-slate-300">
				<div
					className="text-center text-black border-b rounded-t-lg border-sky-300 
        bg-sky-300 text-sm p-3 font-bold uppercase"
				>
					Sold Products
				</div>
				<div className="text-center py-3 text-lg font-bold text-black">
					{getTotalSoldProducts(orderHistoryData)}
				</div>
			</div>
			<div className="border border-orange-400 w-1/5 rounded-lg shadow-md shadow-slate-300">
				<div
					className="text-center text-black border-b rounded-t-lg border-orange-300 
        bg-orange-300 text-sm p-3 font-bold uppercase"
				>
					Total Income
				</div>
				<div className="text-center py-3 text-lg font-bold text-black">
					{formatMoney(getTotalIncome(orderHistoryData))}&#8363;
				</div>
			</div>
		</>
	);
};

export default StatisticsOrderHistory;
