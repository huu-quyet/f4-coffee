import { CheckCircleIcon } from "@heroicons/react/solid";
import React, { FC } from "react";
import momoLogo from "../../assets/images/momologo.png";
interface IToastComfirm {
	totalCost: string;
	handleCancel: () => void;
	handleComfirm: () => void;
}
const ToastComfirm: FC<IToastComfirm> = ({
	totalCost,
	handleCancel,
	handleComfirm,
}) => {
	const nameCustomer =
		JSON.parse(localStorage.getItem("customerInfo") as string).name || "";
	return (
		<div className=" absolute top-0 bottom-0 right-0 left-0 bg-orange-500/50 flex justify-center items-center">
			<div className="w-80  bg-white px-4 py-4 shadow-lg rounded-lg">
				<h5 className="text-center mb-3">
					Xin chào bạn{" "}
					<span className="font-bold text-orange-800">{nameCustomer}!!!</span>
				</h5>

				<div className="border-b-gray-300 border-b-2 mb-5">
					<h4 className="text-slate-400 mb-2">Hoá đơn thanh toán đơn hàng</h4>
					<div className="flex justify-between w-full font-bold">
						<div>Tổng :</div>
						<div>
							<span className="text-red-600 ">{totalCost} VND</span>
						</div>
					</div>
				</div>

				<div className="mb-6">
					<h4 className="text-slate-400 mb-1">Phương thức thanh toán</h4>
					<div className="flex items-center">
						<div className="basis-3">
							<CheckCircleIcon className="h-5 w-5 text-secondary" />
						</div>

						<div className="basis-3 mx-2">
							<img src={momoLogo} alt="momo Logo" />
						</div>

						<div className="text-sm">
							<p className="text-slate-400">Phương thức thanh toán qua MOMO</p>
						</div>
					</div>
				</div>

				<div className="flex justify-end ">
					<button
						className="bg-red-600 text-white rounded-lg shadow-lg  px-3 py-2"
						onClick={handleCancel}
					>
						Huỷ
					</button>
					<button
						className="bg-green-600 text-white rounded-lg shadow-lg  ml-2 px-3 py-2"
						onClick={handleComfirm}
					>
						Xác nhận
					</button>
				</div>
			</div>
		</div>
	);
};

export default ToastComfirm;
