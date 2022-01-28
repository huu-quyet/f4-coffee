import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "../../../utils/formatmethod";
import { PaginationMemo } from "../../../components/Pagination";
import { RootState } from "../../../reducer/rootReducer";
import {
	TypeOrderData,
	EnumStatusValues,
	TypeProductOrderedData,
} from "../../../types";
import ReportBox from "../../../components/ReportBox/ReportBox";
import SearchForm from "../../../components/SearchForm/SearchForm";

const AdminCustomer = () => {
	const orderList: TypeOrderData[] = useSelector(
		(state: RootState) => state.orderHistory.allOrderHistory
	);
	// const filterCustomer = (arr: TypeOrderData[]) => {
	// 	return arr.filter((item) => item.status === EnumStatusValues.COMPLETED);
	// };

	const getCustomersData = (allOrderData: TypeOrderData[]) => {
		const customers: TypeOrderData[] = [];
		for (const order of allOrderData) {
			if (order.status !== EnumStatusValues.COMPLETED) {
				continue;
			} else {
				const index = customers.findIndex(
					(customer: TypeOrderData) => customer.phone === order.phone
				);
				if (index < 0) {
					customers.push(order);
				} else {
					customers[index] = {
						...customers[index],
						products: [...customers[index].products, ...order.products],
					};
				}
			}
		}
		return customers;
	};

	const [cloneOrder, setCloneOrder] = useState(getCustomersData(orderList));
	const [textSearch, setTextSearch] = useState("");
	const [postsPerPage, setPostsPerPage] = useState(10);
	const [totalEntries, setTotalEntries] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const handleBack = useCallback(() => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	}, [currentPage]);
	useEffect(() => {
		setCloneOrder(getCustomersData(orderList));
	}, [orderList]);
	useEffect(() => {
		if (cloneOrder) {
			setTotalEntries(cloneOrder.length);
		}
	}, [cloneOrder]);
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
	const onHandleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (textSearch === "") {
			setCloneOrder(getCustomersData(orderList));
		} else {
			const newArr = getCustomersData(orderList).filter(
				({ phone, name }: TypeOrderData) => {
					return (
						phone.includes(textSearch) ||
						name.toLowerCase().includes(textSearch.toLowerCase())
					);
				}
			);
			setCurrentPage(1);
			setCloneOrder(newArr);
		}
	};
	const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value) {
			setTextSearch(value);
		} else {
			setTextSearch("");
		}
	};
	return (
		<div className="box-border">
			<div className="text-center font-extrabold text-xl uppercase p-4">
				<h3 className="inline border-b-2">Customer Report</h3>
			</div>
			<div className="flex justify-end gap-10 items-baseline">
				<SearchForm submit={() => onHandleSearch} change={() => onHandleChange} placeholder="Search customer by name or phone number..." />
				<ReportBox
					background="bg-orange-400"
					title="Total customer in store"
					data={cloneOrder.length}
				/>
			</div>
			<div>
				<div className="flex-row basis-1/3 text-center border-slate-400 mr-5">
					<table className="table-auto w-full mx-auto bg-white text-center border border-gray-300 mb-5 rounded">
						<thead>
							<tr className="bg-slate-300 border border-t border-b border-gray-400 h-12">
								<th className="border-r">STT</th>
								<th className="border-r">Id</th>
								<th className="border-r">Name</th>
								<th className="border-r">Address</th>
								<th className="border-r">Gender</th>
								<th className="border-r">Phone Number</th>
								<th className="border-r">Amount</th>
							</tr>
						</thead>
						<tbody>
							{cloneOrder.reverse().map((item: TypeOrderData, index: number) => {
								if (
									index >= (currentPage - 1) * postsPerPage &&
									index < currentPage * postsPerPage
								) {
									return (
										<tr
											key={index}
											className={
												"border px-3 border-r " + (index === 0 ? " border-l" : "")
											}
										>
											<td className="border-r p-2 bg-slate-300">{index + 1}</td>
											<td className="border-r">{item._id}</td>
											<td className="border-r capitalize">{item.name}</td>
											<td className="border-r capitalize">{item.address}</td>
											<td className="border-r capitalize">
												{item.gender === "male" ? "Nam" : item.gender}
											</td>
											<td className="border-r">{item.phone}</td>
											<td className="border-r">
												{formatMoney(
													item.products.reduce(
														(total: number, a: TypeProductOrderedData) =>
															total + Number(a.size[0].price * a.quantity),
														0
													)
												)}
											</td>
										</tr>
									);
								}
							})}
						</tbody>
					</table>
					<div>
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
				</div>
			</div>
		</div>
	);
};
export default AdminCustomer;
