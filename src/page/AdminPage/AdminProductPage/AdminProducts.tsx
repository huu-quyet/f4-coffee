import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaginationMemo } from "../../../components/Pagination";
import { TypeProductData } from "../../../types";
import * as actions from "../../../action/actionCreator";
import Popup from "reactjs-popup";
import FormEditProduct from "./FormEditProduct";
import FormAddNewProduct from "./FormAddNewProduct";
import { formatMoney } from "../../../utils/formatmethod";
import SearchForm from "../../../components/SearchForm/SearchForm";

enum SortValues {
	Up = "up",
	Down = "down",
}
const AdminProduct = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.apiGetAllProducts());
	}, []);
	const productList: TypeProductData[] = useSelector(
		(state: any) => state.product.products
	);
	const [cloneProduct, setCloneProduct] = useState(productList);
	const [postsPerPage, setPostsPerPage] = useState(10);
	const [totalEntries, setTotalEntries] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [textSearch, setTextSearch] = useState("");
	const [sortValue, setSortValue] = useState({ value: SortValues.Up });
	useEffect(() => {
		setCloneProduct(productList);
	}, [productList]);
	useEffect(() => {
		setTotalEntries(cloneProduct.length);
	}, [cloneProduct]);
	useEffect(() => {
		sort();
	}, [sortValue]);
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
	const sort = () => {
		if (sortValue && cloneProduct) {
			const arr = cloneProduct.sort((a: TypeProductData, b: TypeProductData) => {
				if (a.size.length > 0 && b.size.length > 0) {
					if (a.size[0].price && b.size[0].price) {
						return sortValue.value == SortValues.Up
							? a.size[0].price - b.size[0].price
							: sortValue.value === SortValues.Down
							? b.size[0].price - a.size[0].price
							: 0;
					}
				}
				return 0;
			});
			setCloneProduct([...arr]);
		}
	};

	const handlerSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value.trim() as SortValues;
		setSortValue({ value });
	};
	const onHandleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (textSearch) {
			const newArr = productList.filter(
				(item) =>
					item.category.toLowerCase().includes(textSearch.toLowerCase().trim()) ||
					item.title.toLowerCase().includes(textSearch.toLowerCase().trim())
			);
			setCurrentPage(1);
			setCloneProduct(newArr);
		} else setCloneProduct(productList);
	};
	const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setTextSearch(value);
	};
	return (
		<div>
			<div className="text-center font-extrabold uppercase text-xl p-4">
				<h3 className="inline border-b-2">product management</h3>
			</div>
			<div className="w-full rounded text-black my-1 mx-1 flex">
				<div className="flex basis-4/5">
					<SearchForm submit={() => onHandleSearch} change={() => onHandleChange} placeholder="Search product by name or group name" />
					<div>
						<select
							name=""
							id=""
							onChange={handlerSortChange}
							className="rounded p-2 hover:bg-opacity-60 hover:text-black border border-gray"
						>
							<option value="">---Sort---</option>
							<option value={SortValues.Up}>Price go up</option>
							<option value={SortValues.Down}>Prices go down</option>
						</select>
					</div>
				</div>
				<div className="basis-1/5">
					<Popup
						modal
						trigger={
							<button className=" bg-cyan-600 p-2 float-right mx-2 rounded text-blue-50 group-hover:flex hover:bg-slate-700 hover:text-white">
								Add Product
							</button>
						}
					>
						{(close: any) => <FormAddNewProduct close={close}/>}
					</Popup>
				</div>
			</div>
			<div>
				<table className="table-auto w-full mx-auto bg-white text-center border border-gray-300 mb-5">
					<thead>
						<tr className="bg-slate-400 border-t border-b border-gray-400 h-12">
							<td className="border-r">Product Name</td>
							<td className="border-r">Status</td>
							<td className="border-r">Group</td>
							<td className="border-r">Size</td>
							<td className="border-r">Price(VNĐ)</td>
							<td className="border-r">Discount</td>
							<td className="border-r">Action</td>
						</tr>
					</thead>
					<tbody>
						{cloneProduct ? (
							cloneProduct.reverse().map((product: TypeProductData, index: number) => {
								if (
									index >= (currentPage - 1) * postsPerPage &&
									index < currentPage * postsPerPage
								) {
									return (
										<tr
											key={index}
											className={
												" px-3 border-r border-gray-400 border-b border" +
												(index === 0 || " border-l")
											}
										>
											<th className="flex justify-center border-r h-auto">
												<img
													src={product.img}
													alt=""
													className="basis-1/5 w-6 h-auto rounded my-2"
												/>
												<p className="my-auto basis-3/5">{product.title}</p>
											</th>
											<th className="border-r">
												{product.inStock ? "Active" : "Unactive"}
											</th>
											<th className="capitalize border-r">{product.category}</th>
											<th className="border-r">
												{product.size.map((item, index) => {
													return <p key={index}>{item?.types?.toUpperCase()}</p>;
												})}
											</th>
											<th className="border-r">
												{product.size.map((item, index) => {
													if (item.price) {
														return <p key={index}>{formatMoney(item?.price)}</p>;
													}
												})}
											</th>
											<th className="border-r">
												{product.discount === 1
													? "No Discount"
													: product.discount < 1
													? `${product.discount * 100}%`
													: `${product.discount % 100}`}
											</th>
											<th>
												<Popup
													modal
													trigger={<button className="bg-lime-500 p-1 rounded">Edit</button>}
												>
													{(close: any) => (
														<FormEditProduct
															close={close}
															id={product._id}
															title={product.title}
															discount={
																product.discount < 1
																	? product.discount * 100
																	: product.discount * 1
															}
															name={product.title}
															inStock={product.inStock}
															price={product.size[0].price}
														/>
													)}
												</Popup>
											</th>
										</tr>
									);
								}
							})
						) : (
							<p className="text-center w-screen">Loading Product ....</p>
						)}
					</tbody>
				</table>
			</div>
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
	);
};
export default AdminProduct;
