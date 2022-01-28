import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { productServices } from "../../../services/product.services";
type FormEditProduct = {
	price: number;
	discount: number;
	inStock: boolean;
	title: string;
};

const FormEditProduct = (props: any) => {
	const { id, close, discount, name, inStock, price } = props;
	// const [idSize, setIdSize] = useState("");
	const initialValues = {
		price: price,
		discount: discount,
		inStock: inStock,
		title: name,
	};
	const validationSchema = Yup.object().shape({
		price: Yup.number(),
		discount: Yup.number(),
		inStock: Yup.boolean(),
		title: Yup.string().required("Please enter name product"),
	});
	const handleSubmit = async (
		values: any,
		actions: FormikHelpers<FormEditProduct>
	) => {
		const result = confirm("Are you sure you want to update product");
		if (result) {
			toast.success("Updated");
			await productServices.putProduct(id, values);
			actions.resetForm();
		}
	};
	return (
		<div className="box-border bg-slate-400 m-4 w-80 h-64">
			<div className="flex items-baseline text-center nowrap">
				<p className="basis-11/12 font-bold text-xl pl-10">Edit Product</p>
				<a
					className="basis-1/12 bg-red-500 text-slate-50 p-1 hover:bg-red-300 hover:text-black"
					onClick={close}
				>
					&times;
				</a>
			</div>
			<div>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{() => (
						<Form className="text-center">
							<div className="flex gap-4 m-4 items-baseline">
								<label htmlFor="" className="basis-2/5 font-bold">
									Name
								</label>
								<Field name="title" placeholder="" className="basis-3/5 rounded" />
							</div>
							<div className="flex gap-4 m-4 items-baseline">
								<label htmlFor="price" className="basis-2/5">
									Price:
								</label>
								<Field name="price" className="basis-3/5 rounded" />
							</div>
							<div className="flex gap-4 mx-4 items-baseline my-4">
								<label htmlFor="" className="basis-2/5">
									Discount (%):
								</label>
								<Field name="discount" className="basis-3/5 rounded" />
							</div>
							<div className="flex gap-4 mx-4 items-baseline mt-4 mb-8">
								<label htmlFor="inStock" className="basis-2/5">
									In Stock?:
								</label>
								<Field component="select" name="inStock" className="basis-4/5 rounded">
									<option value="">Choose</option>
									<option value="true">Active</option>
									<option value="false">Unactive</option>
								</Field>
							</div>
							<button
								className="text-amber-50 block bg-blue-700 w-10/12 rounded mx-auto hover:bg-opacity-60 hover:text-black"
								type="submit"
							>
								Submit
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};
export default FormEditProduct;
