import React, { useState, useEffect, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import ApexChart from "./Chart";
import { TypeOrderData, EnumStatusValues } from "../../../types";
import {
	formatMoney,
	getDate,
	fillNet,
	fillProduct,
	formatData,
	formatDataProduct,
} from "../../../utils/formatmethod";
import { RootState } from "../../../reducer/rootReducer";
import ReportBox from "../../../components/ReportBox/ReportBox";
const today = new Date().toISOString().split("T")[0];
const AdminDashboard = () => {
	const orderList = useSelector(
		(state: RootState) => state.orderHistory.allOrderHistory
	);
	const [cloneOrderList, setCloneOrder] = useState<TypeOrderData[]>(orderList);
	const [dataCustomer, setDataCustomer] = useState<number[]>([]);
	const [dataProduct, setDataProduct] = useState<number[]>([]);
	const [numberDate, setNumberDate] = useState<number>(0);
	useEffect(() => {
		if (orderList) {
			setCloneOrder([
				orderList.filter(
					(item: TypeOrderData) =>
						item.status == EnumStatusValues.COMPLETED &&
						item.createdAt.split("T")[0] === today
				),
			]);
		}
	}, [orderList]);
	useEffect(() => {
		setDataCustomer(formatData(orderList, numberDate));
	}, [numberDate]);
	useEffect(() => {
		setDataProduct(formatDataProduct(orderList, numberDate));
	}, [numberDate]);
	const onHandleChang = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		const value = event.target.value;
		setNumberDate(Number(value));
	};
	const netValue =
		cloneOrderList.length > 0 ? formatMoney(fillNet(cloneOrderList, today)) : 0;

	if (cloneOrderList.length == 0) return null;
	return (
		<div className="box-border w-full">
			<div className="font-extrabold text-center uppercase text-xl p-4">
				<h3 className="inline border-b-2">Daily Report</h3>
			</div>
			<div className="flex gap-5 mx-4">
				<ReportBox
					background="bg-green-300"
					title="Customer in day"
					data={cloneOrderList ? cloneOrderList.length : 0}
				/>
				<ReportBox
					background="bg-blue-400"
					title="Product sold"
					data={fillProduct(cloneOrderList, today)}
				/>
				<ReportBox background="bg-amber-400" title="Net Revenue" data={netValue} />
			</div>
			<div>
				<form action="">
					<select
						name="numberData"
						onChange={onHandleChang}
						className="rounded m-4 w-6/12 border-slate-400 border sadow"
					>
						<option value="0">---Choose Number Date---</option>
						<option value="7">Last week</option>
						<option value="15">Last 15 days</option>
						<option value="30">Last Month</option>
					</select>
				</form>
			</div>
			<div className="box-border w-full flex gap-4">
				<div className="basis-1/2 border border-slate-500">
					<ApexChart
						name={"Customer"}
						category={getDate(numberDate)}
						data={dataCustomer}
						title="Number customer in month"
					/>
				</div>
				<div className="basis-1/2 border border-slate-500">
					<ApexChart
						name={"Product"}
						category={getDate(numberDate)}
						data={dataProduct}
						title="Number product in month"
					/>
				</div>
			</div>
		</div>
	);
};
export default AdminDashboard;
