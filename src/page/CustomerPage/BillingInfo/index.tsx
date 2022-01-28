import { Form, Formik } from "formik";
import React, { FC } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import InputCustom from "../../../components/InputCustom";
import TextArea from "../../../components/TextArea";
import { IinitialValue } from "../../../types";
import { handleReset, saveNewDataToStore, validationSchema } from "./infor";
import useIntialValueData from "./useIntialValueData";
import useResetCheckout from "./useResetCheckout";

export interface InfoProps {
	checkoutButtonClick: (values: IinitialValue) => void;
}
const BillingInfo: FC<InfoProps> = ({ checkoutButtonClick }) => {
	useEffect(() => {
		saveNewDataToStore();
	}, []);

	const history = useHistory();
	const rediRectTomenu = () => {
		history.push("/menu/all");
	};
	const { initialValueData } = useIntialValueData();

	const { resetAllStatus } = useResetCheckout();

	const checkoutClickButton = (values: IinitialValue) => {
		checkoutButtonClick(values);
		resetAllStatus();
	};

	const handleResetForm = () => {
		resetAllStatus();
		handleReset();
	};
	return (
		<Formik
			initialValues={initialValueData}
			validationSchema={validationSchema}
			onSubmit={checkoutClickButton}
		>
			<Form className="w-full py-4 bg-emerald-50 px-4 round-lg shadow-lg">
				<h3 className="text-md md:text-xl font-bold uppercase text-blue-600">
					thông tin khách hàng
				</h3>
				<div className="grid grid-cols-12 gap4 md:h-14 ">
					<div className="md:pr-2 col-span-12 md:col-span-6">
						<InputCustom label="" name="name" placeholder="Enter your name" />
					</div>
					<div className="md:pl-2 col-span-12 md:col-span-6 ">
						<InputCustom label="" name="phone" placeholder="Enter your phone" />
					</div>
				</div>

				<div className="w-full mb-5">
					<InputCustom label="" name="address" placeholder="Billing address" />
				</div>

				<div className="w-full mb-12">
					<TextArea
						label="Thông tin lưu ý nếu có"
						name="notes"
						placeholder="Notes"
						rows="4"
						cols="50"
					/>
				</div>

				<div className="px-2 inline-block w-full md:w-1/4 mb-4">
					<button
						className=" w-full py-5 md:py-2 uppercase bg-yellow-900 font-bold text-white bg-blue-600 shadow-lg rounded-lg"
						onClick={rediRectTomenu}
					>
						thêm sản phẩm
					</button>
				</div>

				<div className="px-2 inline-block w-full md:w-2/4 mb-4">
					<button
						type="submit"
						className="w-full py-5 md:py-2 uppercase  bg-green-700 font-bold text-white shadow-lg rounded-lg"
					>
						thanh toán
					</button>
				</div>

				<div className=" px-2 inline-block w-full md:w-1/4 ">
					<button
						className=" w-full py-5 md:py-2 uppercase  bg-delete font-bold text-white shadow-lg rounded-lg"
						onClick={handleResetForm}
						type="reset"
					>
						khôi phục
					</button>
				</div>
			</Form>
		</Formik>
	);
};

export default React.memo(BillingInfo);
