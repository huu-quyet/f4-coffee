import React from "react";

import ToastComfirm from "../../../components/ToastComfirm";
import VerifyQuantity from "../../../components/VerifyQuantity";
import {
	formatMoney,
	removeVietnameseTones,
} from "../../../utils/formatmethod";
import { Product } from "./Cart";
import { RootState } from "../../../reducer/rootReducer";
import { useSelector } from "react-redux";
import ButtonOption from "../../../components/ButtonOption";
import BillingInfo from "../BillingInfo";

import PaymentStatus from "../../PaymentStatus";
import { ToastContainer } from "react-toastify";
import ButtonGrowing from "../../../components/ButtonGrowing";
import { TrashIcon } from "@heroicons/react/solid";
import useServiceCallApi from "./useServiceCallApi";
import useFormatCart from "../../../hook/useFormatCart";
import useImpactToCart from "./useImpactToCart";
import useCheckoutMethod from "./useCheckoutMethod";
import useCheckoutTracking from "./useCheckoutTracking";
import useUpdateQuantity from "./useUpdateQuantity";
import { Link, useParams } from "react-router-dom";
import { IParam } from "../../../types";

const Cart = () => {
	const param: IParam = useParams();
	const { productInCart, totalCost } = useFormatCart();
	const { removeProduct } = useImpactToCart();
	const {
		comfirmToastCheckOut,
		handleCancel,
		checkoutButtonClick,
		rediRectTomenu,
	} = useCheckoutMethod();
	const isCheckout: boolean = useSelector(
		(state: RootState) => state.checkouts.checkout
	);
	const { updateQuantity } = useUpdateQuantity();
	const {
		CheckoutStep,
		orderInfor,
		handleComfirm,
		exitCheckoutTracking,
		showButtonGrowing,
	} = useCheckoutTracking();

	useServiceCallApi();

	return (
		<div className="relative flex">
			<div className="container mx-auto shadow-lg  rounded-lg px-2  bg-white mt-20 md:mt-32 mb-10 md:px-6 md:py-20">
				<h1 className="ms:text-xl md:text-2xl font-bold text-center uppercase mb-3 text-blue-900">
					Thông tin đơn hàng
				</h1>

				{productInCart.length === 0 && (
					<p className="font-bold text-2xl text-green-600 text-center mb-5">
						Vui lòng đặt hàng trước khi thực hiện thanh toán
					</p>
				)}
				{productInCart.length > 0 && (
					<>
						<div className="md:block hidden">
							<table className="table-auto w-full text-center mb-4">
								<thead className="bg-blue-500 text-white uppercase lg:table-header-group  ">
									<tr className="max-w-screen-2xl ">
										<th className="w-1/12 py-2">NO</th>
										<th className="w-2/12 ">sản phẩm</th>
										<th className="w-2/12">giá Đơn</th>
										<th className="w-2/12">Số Lượng</th>
										<th className="w-2/12">Giá</th>
										<th className="w-1/12">Size</th>
										<th className="w-2/12"></th>
									</tr>
								</thead>

								<tbody>
									{productInCart.map((product: Product, index: number) => (
										<tr
											className="h-20 border-b-slate-500 text-xs font-bold transition ease-in-out delay-1000"
											key={product.productId + index}
										>
											<td className="font-bold text-xl">{index + 1}</td>
											<td>
												<div className="flex h-10">
													<img
														className="w-1/6 h-5/6"
														src={product.imageUrl}
														alt="product image"
													/>
													<div className="w-5/6 my-auto text-tiny px-2">
														<Link
															className="relative"
															to={`/menu/${param.id}/${removeVietnameseTones(product.name)}-${
																product.productId
															}`}
														>
															{product.name}
														</Link>
													</div>
												</div>
											</td>
											<td>
												{product.discount !== 1 ? (
													<>
														<div className="text-rose-700 line-through text-xs">
															{formatMoney(product.size.price)}
														</div>
														<div className="font-bold">
															{formatMoney(product.size.price * (1 - product.discount))} VND
														</div>
													</>
												) : (
													<div>{formatMoney(product.size.price)} VND</div>
												)}
											</td>
											<td className="h-full">
												<VerifyQuantity
													mount={product.quantity}
													updateProductQuantity={(mount: number) =>
														updateQuantity(mount, index)
													}
												/>
											</td>
											<td>
												{product.discount !== 1 ? (
													<>
														<div className="text-rose-700 line-through text-xs">
															{formatMoney(product.quantity * product.size.price)}
														</div>
														<div>
															{formatMoney(
																product.quantity * (1 - product.discount) * product.size.price
															)}
															VND
														</div>
													</>
												) : (
													<div>{formatMoney(product.quantity * product.size.price)} VND</div>
												)}
											</td>
											<td>
												<ButtonOption
													index={index}
													id={product.productId}
													typeInitial={product.size.types}
												/>
											</td>
											<td className="text-center text-delete font-bold">
												<button
													className="flex flex-row mx-auto"
													onClick={() => removeProduct(product.productId, index)}
												>
													<TrashIcon className="h-5 w-5 text-rose-500" />
													<span className="font-bold ">Delete</span>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="md:hidden block">
							{productInCart.map((product: Product, index: number) => (
								<div
									className={`${
										index % 2 === 0 && "bg-slate-100"
									} grid grid-cols-12 gap-1 md:gap-4 mb-3 py-2 `}
									key={product.productId + index}
								>
									<div className="col-span-2 flex jsutify-center items-center ">
										<img className=" w-full" src={product.imageUrl} alt="product image" />
									</div>
									<div className="col-span-4">
										<div className="w-full md:w-5/6 my-auto text-tiny font-bold">
											{product.name}
										</div>
										{product.discount !== 1 ? (
											<>
												<div className="text-rose-700 line-through text-tiny md:text-xs">
													{formatMoney(product.size.price)}
												</div>
												<div className="font-bold text-tiny md:text-xs">
													{formatMoney(product.size.price * (1 - product.discount))} VND
												</div>
											</>
										) : (
											<div className="font-bold text-tiny md:text-xs">
												{formatMoney(product.size.price)} VND
											</div>
										)}
									</div>

									<div className="col-span-6 flex jsutify-center items-center py-4">
										<VerifyQuantity
											mount={product.quantity}
											updateProductQuantity={(mount: number) =>
												updateQuantity(mount, index)
											}
										/>
									</div>

									<div className="col-span-12 flex justify-between px-10 md:px-2 bg-emerald-100 py-3">
										<div className="col-span-6">
											<div className="flex items-center jsutify-center">
												<span className="font-bold">Size:</span>{" "}
												<ButtonOption
													index={index}
													id={product.productId}
													typeInitial={product.size.types}
												/>
											</div>
										</div>
										<div className="col-span-6 flex items-center">
											<button
												className="flex flex-row mx-auto md:mt-5"
												onClick={() => removeProduct(product.productId, index)}
											>
												<TrashIcon className="h-5 w-5 text-rose-500" />
												<span className="font-bold ">Delete</span>
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</>
				)}

				{productInCart.length > 0 ? (
					<>
						<div className="text-right mb-5">
							<p className="font-bold">
								Tổng đơn hàng : <span className="text-red-600 ">{totalCost} VND</span>
							</p>
						</div>

						<BillingInfo checkoutButtonClick={checkoutButtonClick} />
					</>
				) : (
					<div className="px-2 inline-block w-full md:w-full mb-4">
						<button
							className=" w-full py-5 md:py-2 uppercase bg-yellow-900 font-bold text-white bg-red-600 shadow-lg rounded-lg"
							onClick={rediRectTomenu}
						>
							thêm sản phẩm
						</button>
					</div>
				)}
			</div>

			{comfirmToastCheckOut && parseInt(totalCost) > 0 && (
				<ToastComfirm
					totalCost={totalCost}
					handleCancel={handleCancel}
					handleComfirm={handleComfirm}
				/>
			)}

			{CheckoutStep && (
				<PaymentStatus
					productInCart={productInCart}
					totalCost={totalCost}
					exitCheckoutTracking={exitCheckoutTracking}
					orderInfor={orderInfor}
				/>
			)}

			<div className="md:block hidden">
				{isCheckout && (
					<div onClick={showButtonGrowing}>
						<ButtonGrowing />
					</div>
				)}
			</div>

			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
};

export default React.memo(Cart);
