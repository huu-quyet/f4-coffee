import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
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
	changeOrderStatus,
} from "../../../../utils";
import { formatMoney } from "../../../../utils/formatmethod";
import { PaginationMemo } from "../../../../components/Pagination";
import ConfirmAction from "./ConfirmAction";
import QuickCancelOrder from "./QuickCancelOrder";
import { apiGetAllOrders } from "../../../../action/actionCreator";
import { toast } from "react-toastify";
import { socket } from "../../../../socket";

export const configNextStatus = {
	[EnumStatusValues.PENDING]: {
		nextLabel: "Paid",
		nextStatus: EnumStatusValues.PAID,
	},
	[EnumStatusValues.PAID]: {
		nextLabel: "To Ship",
		nextStatus: EnumStatusValues.SHIPPING,
	},
	[EnumStatusValues.SHIPPING]: {
		nextLabel: "Delivered",
		nextStatus: EnumStatusValues.DELIVERED,
	},
	[EnumStatusValues.DELIVERED]: {
		nextLabel: "Completed",
		nextStatus: EnumStatusValues.COMPLETED,
	},
};

export const successNotify = () => toast.success("Successful action!");
export const failNotify = () => toast.error("Unsuccessful action!");

interface IProcessingOrdersProps {
	ordersList: TypeOrderData[];
	productsList: TypeProductData[];
	status: string;
}

const TableOfProcessingOrders: React.FC<IProcessingOrdersProps> = ({
	ordersList,
	productsList,
	status,
}) => {
	const dispatch = useDispatch();
	// For Pagination
	const [postsPerPage, setPostsPerPage] = useState(10);
	const [totalEntries, setTotalEntries] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setCurrentPage(1);
		setPostsPerPage(10);
		setTotalEntries(ordersList.length);
	}, [ordersList]);

	// Pagination
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
	// For Confirm Action
	const [chosenOrder, setChosenOrder] = useState<TypeOrderData>(ordersList[0]);
	const [showConfirmBox, setShowConfirmBox] = useState(false);

	const handleShowConfirmBox = useCallback((order: TypeOrderData) => {
		setShowConfirmBox(true);
		setChosenOrder(order);
	}, []);
	const handleCloseConfirmBox = useCallback(() => {
		setShowConfirmBox(false);
	}, []);
	const handleConfirmAction = useCallback(async () => {
		const orderData = { ...chosenOrder };
		if (
			orderData &&
			orderData.status !== EnumStatusValues.COMPLETED &&
			orderData.status !== EnumStatusValues.CANCELED
		) {
			const changedData = {
				...orderData,
				status: configNextStatus[orderData.status].nextStatus,
			};
			const successChange = await changeOrderStatus(orderData._id, changedData);
			if (successChange) {
				setShowConfirmBox(false);
				socket.emit("apply order", {
					statusOrder: configNextStatus[orderData.status].nextStatus,
					orderId: orderData._id,
				});
				successNotify();
				dispatch(apiGetAllOrders());
			} else {
				failNotify();
			}
		}
	}, [chosenOrder]);
	// For Quick cancel order
	const [showQuickCancel, setShowQuickCancel] = useState(false);

	const handleShowQuickCancelPopup = useCallback((order: TypeOrderData) => {
		setShowQuickCancel(true);
		setChosenOrder(order);
	}, []);

	const handleCloseQuickCancelPopup = useCallback(() => {
		setShowQuickCancel(false);
	}, []);

	const handleCancelOrder = useCallback(
		async (cancelingReason: string) => {
			const orderData = { ...chosenOrder };
			if (orderData) {
				const changedData = {
					...orderData,
					status: EnumStatusValues.CANCELED,
					reasonCancel: cancelingReason,
				};
				const successChange = await changeOrderStatus(chosenOrder._id, changedData);
				if (successChange) {
					setShowQuickCancel(false);
					successNotify();
					dispatch(apiGetAllOrders());
					socket.emit("reject order", {
						statusOrder: "canceled",
						orderId: orderData._id,
					});
				} else {
					failNotify();
				}
			}
		},
		[chosenOrder]
	);

	const headings = useMemo(
		() => [
			"#",
			"Date",
			"Customer",
			"Product",
			"Total",
			"Status",
			"Quick Action",
			"Details",
		],
		[]
	);

	return (
		<>
			<table
				className={
					"table-auto w-full mx-auto bg-white text-center border mb-5" +
					(status === "pending"
						? " border-orange-200"
						: status === "paid"
						? " border-fuchsia-200"
						: status === "shipping"
						? " border-indigo-200"
						: status === "delivered"
						? " border-emerald-200"
						: " border-red-200")
				}
			>
				<thead>
					<tr
						className={
							status === "pending"
								? "bg-orange-300 border-t border-b border-orange-200 h-12"
								: status === "paid"
								? "bg-fuchsia-300 border-t border-b border-fuchsia-200 h-12"
								: status === "shipping"
								? "bg-indigo-300 border-t border-b border-indigo-200 h-12"
								: status === "delivered"
								? "bg-emerald-300 border-t border-b border-emerald-200 h-12"
								: "bg-red-300 border-t border-b border-red-200 h-12"
						}
					>
						{headings.map((heading: string, index: number) => (
							<th
								className={
									index === 0
										? status === "pending"
											? "px-3 border-r border-orange-200 border-l"
											: status === "paid"
											? "px-3 border-r border-fuchsia-200 border-l"
											: status === "shipping"
											? "px-3 border-r border-indigo-200 border-l"
											: status === "delivered"
											? "px-3 border-r border-emerald-200 border-l"
											: "px-3 border-r border-red-200 border-l"
										: status === "pending"
										? "px-3 border-r border-orange-200"
										: status === "paid"
										? "px-3 border-r border-fuchsia-200"
										: status === "shipping"
										? "px-3 border-r border-indigo-200"
										: status === "delivered"
										? "px-3 border-r border-emerald-200"
										: "px-3 border-r border-red-200"
								}
								key={index}
							>
								{heading}
							</th>
						))}
					</tr>
				</thead>
				{ordersList.length > 0 ? (
					<tbody className="text-center">
						{ordersList.map((order: TypeOrderData, index: number) => {
							if (
								index >= (currentPage - 1) * postsPerPage &&
								index < currentPage * postsPerPage
							) {
								return (
									<tr
										className={
											"hover:bg-gray " +
											(status === "pending"
												? "h-10 border-b border-orange-200"
												: status === "paid"
												? "h-10 border-b border-fuchsia-200"
												: status === "shipping"
												? "h-10 border-b border-indigo-200"
												: status === "delivered"
												? "h-10 border-b border-emerald-200"
												: "h-10 border-b border-red-200")
										}
										key={index}
									>
										<td
											className={
												status === "pending"
													? "px-3 py-1 border-r border-orange-200"
													: status === "paid"
													? "px-3 py-1 border-r border-fuchsia-200"
													: status === "shipping"
													? "px-3 py-1 border-r border-indigo-200"
													: status === "delivered"
													? "px-3 py-1 border-r border-emerald-200"
													: "px-3 py-1 border-r border-red-200"
											}
										>
											{index + 1}
										</td>
										<td
											className={
												status === "pending"
													? "px-3 py-1 border-r border-orange-200"
													: status === "paid"
													? "px-3 py-1 border-r border-fuchsia-200"
													: status === "shipping"
													? "px-3 py-1 border-r border-indigo-200"
													: status === "delivered"
													? "px-3 py-1 border-r border-emerald-200"
													: "px-3 py-1 border-r border-red-200"
											}
										>
											{formatDate(order.createdAt)}
										</td>
										<td
											className={
												status === "pending"
													? "px-3 py-1 border-r border-orange-200 capitalize"
													: status === "paid"
													? "px-3 py-1 border-r border-fuchsia-200 capitalize"
													: status === "shipping"
													? "px-3 py-1 border-r border-indigo-200 capitalize"
													: status === "delivered"
													? "px-3 py-1 border-r border-emerald-200 capitalize"
													: "px-3 py-1 border-r border-red-200 capitalize"
											}
										>
											{order.name}
										</td>
										<td
											className={
												status === "pending"
													? "px-3 py-1 border-r border-orange-200 flex justify-start items-center"
													: status === "paid"
													? "px-3 py-1 border-r border-fuchsia-200 flex justify-start items-center"
													: status === "shipping"
													? "px-3 py-1 border-r border-indigo-200 flex justify-start items-center"
													: status === "delivered"
													? "px-3 py-1 border-r border-emerald-200 flex justify-start items-center"
													: "px-3 py-1 border-r border-red-200 flex justify-start items-center"
											}
										>
											<div className="flex flex-col gap-1">
												{order.products.map(
													(product: TypeProductOrderedData, index: number) => (
														<div key={index} className="flex text-left items-center">
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
										<td
											className={
												status === "pending"
													? "px-3 py-1 border-r border-orange-200"
													: status === "paid"
													? "px-3 py-1 border-r border-fuchsia-200"
													: status === "shipping"
													? "px-3 py-1 border-r border-indigo-200"
													: status === "delivered"
													? "px-3 py-1 border-r border-emerald-200"
													: "px-3 py-1 border-r border-red-200"
											}
										>
											{formatMoney(getTotalPaymentOfOrder(order.products))}&#8363;
										</td>
										<td
											className={
												status === "pending"
													? "px-3 py-1 border-r border-orange-200"
													: status === "paid"
													? "px-3 py-1 border-r border-fuchsia-200"
													: status === "shipping"
													? "px-3 py-1 border-r border-indigo-200"
													: status === "delivered"
													? "px-3 py-1 border-r border-emerald-200"
													: "px-3 py-1 border-r border-red-200"
											}
										>
											<span
												className={
													order.status === "pending"
														? "px-1 border border-orange-400 text-orange-400 capitalize rounded"
														: order.status === "paid"
														? "px-1 border border-fuchsia-400 text-fuchsia-400 capitalize rounded"
														: order.status === "shipping"
														? "px-1 border border-indigo-400 text-indigo-400 capitalize rounded"
														: order.status === "delivered"
														? "px-1 border border-emerald-400 text-emerald-400 capitalize rounded"
														: "px-1 border border-red-400 text-red-400 capitalize rounded"
												}
											>
												{order.status}
											</span>
										</td>
										<td
											className={
												status === "pending"
													? "px-3 py-1 border-r border-orange-200"
													: status === "paid"
													? "px-3 py-1 border-r border-fuchsia-200"
													: status === "shipping"
													? "px-3 py-1 border-r border-indigo-200"
													: status === "delivered"
													? "px-3 py-1 border-r border-emerald-200"
													: "px-3 py-1 border-r border-red-200"
											}
										>
											<div className="group mx-auto flex justify-center bg-ahite relative cursor-pointer">
												<DotsHorizontalIcon className="h-5 w-5 text-center hover:opacity-30" />
												<div className="hidden group-hover:block absolute w-full top-full shadow bg-white shadow-slate-300 z-10">
													<div
														className={
															order.status === EnumStatusValues.PENDING
																? "h-7 w-full hover:bg-fuchsia-400 hover:text-white hover:font-semibold flex items-center justify-center rounded"
																: order.status === EnumStatusValues.PAID
																? "h-7 w-full hover:bg-indigo-400 hover:text-white hover:font-semibold flex items-center justify-center rounded"
																: order.status === EnumStatusValues.SHIPPING
																? "h-7 w-full hover:bg-emerald-400 hover:text-white hover:font-semibold flex items-center justify-center rounded"
																: order.status === EnumStatusValues.DELIVERED
																? "h-7 w-full hover:bg-green-600 hover:text-white hover:font-semibold flex items-center justify-center rounded"
																: ""
														}
														onClick={() => handleShowConfirmBox(order)}
													>
														<span>
															{order.status !== EnumStatusValues.CANCELED &&
																order.status !== EnumStatusValues.COMPLETED &&
																configNextStatus[order.status].nextLabel}
														</span>
													</div>
													<div
														className="h-7 w-full hover:bg-delete hover:text-white hover:font-semibold flex items-center justify-center rounded"
														onClick={() => handleShowQuickCancelPopup(order)}
													>
														<span>Cancel</span>
													</div>
												</div>
											</div>
										</td>
										<td className="px-3">
											<Link
												to={`/admin/order-detail/${order._id}`}
												className="p-1 text-sky-400 font-semibold underline hover:opacity-60"
											>
												Details
											</Link>
										</td>
									</tr>
								);
							} else {
								return null;
							}
						})}
					</tbody>
				) : null}
			</table>
			{ordersList.length === 0 ? (
				<div className="m-0 text-center">
					You don&apos;t have any {status} orders.
				</div>
			) : null}

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

			{showConfirmBox && (
				<ConfirmAction
					nextStatus={
						chosenOrder.status !== EnumStatusValues.COMPLETED &&
						chosenOrder.status !== EnumStatusValues.CANCELED
							? configNextStatus[chosenOrder.status].nextStatus
							: ""
					}
					handleCancel={handleCloseConfirmBox}
					handleComfirm={handleConfirmAction}
				/>
			)}
			{showQuickCancel && (
				<QuickCancelOrder
					handleClosePopup={handleCloseQuickCancelPopup}
					handleCancelOrder={handleCancelOrder}
				/>
			)}
		</>
	);
};

export default TableOfProcessingOrders;
