import React, { FC } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Product } from "../CustomerPage/Cart/Cart";
import { formatMoney } from "../../utils/formatmethod";
import StatusStep from "../../components/StatusStep";

import { paymentStep, IPaymentStatus, redirectTonewLink } from "./payment";
import useObjectPaymentStep from "./useObjectPaymentStep";
import useSocketPaymentHandler from "./useSocketPaymentHandler";

const PaymentStatus: FC<IPaymentStatus> = ({
	productInCart,
	totalCost,
	exitCheckoutTracking,
	orderInfor,
}) => {
	const { textError } = useSocketPaymentHandler();
	const { isCompleted, findActionCompleted } = useObjectPaymentStep();

	return (
		<div className="absolute top-0 bottom-0 right-0 left-0 bg-orange-500/50 flex justify-center items-center">
			<div className="w-fit bg-white px-0 md:px-4 py-4 shadow-lg rounded-lg ">
				<button
					className="p-5 bg-slate-700 text-white font-bold w-full mb-3 capitalize"
					// onClick={sendOrder}
				>
					{findActionCompleted()}
				</button>

				<h1 className="uppercase font-bold mb-0 md:mb-2 w-full px-1">
					<span className="text-lg">thông tin thanh toán</span>
				</h1>

				<button
					onClick={redirectTonewLink}
					className="text-right uppercase text-xs font-bold mb-4 text-blue-700 italic px-2"
				>
					nhấn vào dây để đến trang thanh toán của momo
				</button>

				<div className="md:block">
					<div className="flex mb-5 justify-center items-center">
						{paymentStep.map((step: string, index: number) => (
							<div key={index} className="w-11 md:w-20">
								<h3 className="text-center capitalize md:text-base text-xs">{step}</h3>
								<StatusStep isCompleted={isCompleted[index]} />
							</div>
						))}
					</div>
				</div>

				<h1 className="ư-full capitalize text-center font-bold text-xl">
					Phiếu Thanh toán
				</h1>

				<table className="table-auto w-full text-center mb-4 md:text-sm text-xs ">
					<thead className="bg-slate-500 text-white uppercase ">
						<tr>
							<th className="px-1 md:px-2 py-5 md:py-2 ">ID</th>
							<th className="px-1 md:px-2 ">sản phẩm</th>
							<th className="px-1 md:px-2">số lượng</th>
							<th className="px-1 md:px-2">Size</th>
							<th className="px-1 md:px-2">giá</th>
						</tr>
					</thead>

					<tbody>
						{productInCart.map((product: Product, index: number) => (
							<tr className="h-10 border-b-slate-500  font-bold" key={index}>
								<td className="font-bold ">{index + 1}</td>
								<td>
									<div className="flex h-10">
										<div className="w-full my-auto ">{product.name}</div>
									</div>
								</td>
								<td>{product.quantity}</td>
								<td className=" h-full uppercase">{product.size.types}</td>
								<td>
									{product.discount !== 1 ? (
										<div>
											{formatMoney(
												product.quantity * (1 - product.discount) * product.size.price
											)}
											VND
										</div>
									) : (
										<div>{formatMoney(product.quantity * product.size.price)} VND</div>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className="w-full mb-4 text-sm">
					<div className="flex w-full">
						<p className="font-bold text-center px-2 ">
							Tổng hoá đơn: {totalCost} VND
						</p>
					</div>
				</div>
				<div>
					{textError && (
						<p className="text-red-700 font-bold text-center h-14">
							Đang có một số lỗi hệ thống, vui lòng thực hiện thanh toán lại
						</p>
					)}
				</div>
				{orderInfor.orderId && orderInfor.partnerCode && orderInfor.requestId && (
					<div className="flex flex-col py-2 text-sm px-3 border-2 border-blue-200 mb-3">
						<div>OrderId: {orderInfor.orderId}</div>
						<div>PartnerCode: {orderInfor.partnerCode}</div>
						<div>RequestId: {orderInfor.requestId}</div>
					</div>
				)}
				<button
					onClick={exitCheckoutTracking}
					className="bg-slate-800 w-full text-white text-bold h-10 uppercase"
				>
					Thoát
				</button>
			</div>
		</div>
	);
};

export default PaymentStatus;
