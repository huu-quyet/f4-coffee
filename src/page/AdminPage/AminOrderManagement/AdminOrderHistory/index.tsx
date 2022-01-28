import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reducer/rootReducer";
import {
	TypeOrderData,
	TypeProductData,
	TypeProductOrderedData,
	EnumStatusValues,
} from "../../../../types";
import {
	getProductFromId,
	getTotalPaymentOfOrder,
	formatDate,
} from "../../../../utils";
import { formatMoney } from "../../../../utils/formatmethod";
import { FilterFieldMemo } from "../../../../components/FilterField";
import { PaginationMemo } from "../../../../components/Pagination";

import StatisticsOrderHistory from "./StatisticsOrderHistory";

const OrderHistory: React.FC = () => {
	const allOrderData: TypeOrderData[] = useSelector(
		(state: RootState) => state.orderHistory.allOrderHistory
	);

	const productsList: TypeProductData[] = useSelector(
		(state: RootState) => state.product.products
	);

	const [orderHistoryData, setOrderHistoryData] = useState<TypeOrderData[]>(
		() => {
			return [
				...allOrderData.filter(
					(orderData: TypeOrderData) =>
						orderData.status === EnumStatusValues.CANCELED ||
						orderData.status === EnumStatusValues.COMPLETED
				),
			];
		}
	);

	// FilterField Props
	const [startDate, setStartDate] = useState("2022-01-01");
	const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
	const [statusForFilter, setStatusForFilter] = useState("");

	const handleChooseStartDate = useCallback((srtDate: string) => {
		setStartDate(srtDate);
	}, []);
	const handleChooseEndDate = useCallback((endDate: string) => {
		setEndDate(endDate);
	}, []);
	const handleChooseStatus = useCallback((status: string) => {
		setStatusForFilter(status);
	}, []);
	const handleFilter = useCallback(() => {
		const tempData = allOrderData
			.filter((orderData: TypeOrderData) => {
				const date = orderData.createdAt.slice(0, 10);
				return new Date(startDate).getTime() <= new Date(date).getTime() &&
					new Date(endDate).getTime() >= new Date(date).getTime() &&
					((statusForFilter === "" &&
						(orderData.status === EnumStatusValues.COMPLETED ||
							orderData.status === EnumStatusValues.CANCELED)) ||
						statusForFilter === orderData.status)
					? true
					: false;
			})
			.sort(
				(prevData: TypeOrderData, nextData: TypeOrderData) =>
					new Date(nextData.createdAt).getTime() -
					new Date(prevData.createdAt).getTime()
			);
		setOrderHistoryData([...tempData]);
	}, [statusForFilter, startDate, endDate, allOrderData]);

	// Pagination Props
	const [postsPerPage, setPostsPerPage] = useState(10);
	const [totalEntries, setTotalEntries] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setOrderHistoryData([
			...allOrderData
				.filter(
					(orderData: TypeOrderData) =>
						orderData.status === EnumStatusValues.COMPLETED ||
						orderData.status === EnumStatusValues.CANCELED
				)
				.sort(
					(prevData: TypeOrderData, nextData: TypeOrderData) =>
						new Date(nextData.createdAt).getTime() -
						new Date(prevData.createdAt).getTime()
				),
		]);
	}, [allOrderData]);

	useEffect(() => {
		setTotalEntries(orderHistoryData.length);
	}, [orderHistoryData]);

	const handleBack = useCallback(() => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	}, [currentPage]);

	const handleNext = useCallback(() => {
		if (currentPage < Math.ceil(totalEntries / postsPerPage)) {
			setCurrentPage(currentPage + 1);
		}
	}, [currentPage]);

	const handleChoosePage = useCallback((page: number) => {
		setCurrentPage(page);
	}, []);

	const handleSetPostsPerPage = useCallback((entries: number) => {
		setPostsPerPage(entries);
		setCurrentPage(1);
	}, []);

	const headings = useMemo(
		() => [
			"#",
			"Date",
			"Ordered Products",
			"Quantity",
			"Payment Amount",
			"Status",
			"Action",
		],
		[]
	);

	const handleSearchOrder = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const key = e.target.value.toLowerCase();
			if (key === "") {
				setOrderHistoryData([
					...allOrderData
						.filter(
							(orderData: TypeOrderData) =>
								orderData.status === EnumStatusValues.COMPLETED ||
								orderData.status === EnumStatusValues.CANCELED
						)
						.sort(
							(prevData: TypeOrderData, nextData: TypeOrderData) =>
								new Date(nextData.updatedAt).getTime() -
								new Date(prevData.updatedAt).getTime()
						),
				]);
			} else {
				const temp = allOrderData.filter((order: TypeOrderData) => {
					return (order._id.includes(key) ||
						order.name.toLowerCase().includes(key)) &&
						(order.status === EnumStatusValues.CANCELED ||
							order.status === EnumStatusValues.COMPLETED)
						? true
						: false;
				});
				setCurrentPage(1);
				setOrderHistoryData([...temp]);
			}
		},
		[]
	);

	return (
		<div className="bg-white p-4 m-4 rounded-lg border border-slate-300 shadow-lg">
			<div className="pb-1 font-extrabold text-center uppercase text-xl">
				<span className="border-b-2 border-black ">Order History</span>
			</div>
			<div className="mt-2 p-2 mb-4 border-slate-400">
				<div className="flex justify-center items-center gap-2 mb-4">
					<div className="pl-3 basis-1/2">
						Input order&apos;s id or customer&apos; name to find:
					</div>
					<div className="basis-1/2 flex justify-end gap-2">
						<input
							type="text"
							placeholder="Order's id or customer's name..."
							className="w-96 border border-slate-400 rounded-xl px-3 py-1 
              focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
							onChange={handleSearchOrder}
						/>
					</div>
				</div>
				<div className="flex justify-center items-center gap-2">
					<div className="pl-3 basis-1/2">
						Or choose these information to see list:
					</div>
					<div className="basis-1/2 flex justify-around gap-2">
						<FilterFieldMemo
							startDate={startDate}
							endDate={endDate}
							handleChooseStartDate={handleChooseStartDate}
							handleChooseEndDate={handleChooseEndDate}
							handleChooseStatus={handleChooseStatus}
							handleFilter={handleFilter}
						/>
					</div>
				</div>
				<div className="mx-auto my-10 flex justify-center gap-12">
					<StatisticsOrderHistory orderHistoryData={orderHistoryData} />
				</div>
			</div>
			<table className="table-auto w-full mx-auto bg-white text-center border border-slate-300 mb-5">
				<thead>
					<tr className="bg-slate-300 border-t border-b border-slate-400 h-12">
						{headings.map((heading: string, index: number) => (
							<th
								className={
									"px-3 border-r border-slate-400" + (index === 0 ? " border-l" : "")
								}
								key={index}
							>
								{heading}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="text-center">
					{orderHistoryData.map((orderHistory: TypeOrderData, index: number) => {
						if (
							index >= (currentPage - 1) * postsPerPage &&
							index < currentPage * postsPerPage
						) {
							return (
								<tr className="h-10 border-b border-slate-300" key={index}>
									<td className="px-3 py-1 border-r border-slate-300">{index + 1}</td>
									<td className="px-3 py-1 border-r border-slate-300">
										{formatDate(orderHistory.createdAt)}
									</td>
									<td className="px-3 py-1 border-r border-slate-300 flex justify-start items-center">
										<div className="flex flex-col h-full gap-1">
											{orderHistory.products.map(
												(product: TypeProductOrderedData, i1: number) => (
													<div key={i1} className="flex text-left items-center">
														<img
															src={getProductFromId(productsList, product.productId)?.img}
															alt="avatar"
															className="object-cover h-10 pr-2"
														/>

														{getProductFromId(productsList, product.productId)?.title}
													</div>
												)
											)}
										</div>
									</td>
									<td className="px-3 py-1 border-r border-slate-300">
										<div className="flex flex-col items-center gap-1">
											{orderHistory.products.map(
												(orderedProduct: TypeProductOrderedData, i2: number) => (
													<div key={i2} className="h-10 flex items-center">
														{orderedProduct.quantity} size{" "}
														{orderedProduct.size[0].types.toLocaleUpperCase()} x{" "}
														{formatMoney(orderedProduct.size[0].price)}&#8363;
													</div>
												)
											)}
										</div>
									</td>
									<td className="px-3 py-1 border-r border-slate-300">
										{formatMoney(getTotalPaymentOfOrder(orderHistory.products))}&#8363;
									</td>
									<td className="px-3 py-1 border-r border-slate-300">
										<span
											className={
												"border px-1 capitalize rounded" +
												(orderHistory.status === "completed"
													? " text-green-400 border-green-400"
													: " text-delete border-delete")
											}
										>
											{orderHistory.status}
										</span>
									</td>
									<td className="px-3 py-1 cursor-pointer">
										<Link
											to={`/admin/order-detail/${orderHistory._id}`}
											className="hover:text-white border border-slate-400 
                      rounded px-2 py-1 hover:bg-slate-800 hover:font-semibold"
										>
											Review
										</Link>
									</td>
								</tr>
							);
						} else {
							return null;
						}
					})}
				</tbody>
			</table>
			{orderHistoryData.length === 0 && (
				<div className="text-center -mt-5 border border-slate-300 border-t-0 h-10 p-2">
					No data found!
				</div>
			)}
			<div className="p-5">
				<PaginationMemo
					handleBack={handleBack}
					handleNext={handleNext}
					handleChoosePage={handleChoosePage}
					handleSetPostsPerPage={handleSetPostsPerPage}
					postsPerPage={postsPerPage}
					totalPosts={totalEntries}
					currentPage={currentPage}
				/>
			</div>
		</div>
	);
};

export default OrderHistory;
