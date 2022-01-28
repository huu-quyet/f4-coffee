import React, { useRef } from "react";
import {
	ErrorMessage,
	Field,
	FieldArray,
	Form,
	Formik,
	FormikHelpers,
	FormikProps,
} from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TypeSizeData } from "../../../types";
import { productServices } from "../../../services/product.services";
import { toast } from "react-toastify";

export type FormAddProductValue = {
	title: string;
	desc: string;
	img: string;
	size: Omit<TypeSizeData, "_id">[];
	inStock: boolean;
	discount: number;
	category: string;
};
const initialValues: FormAddProductValue = {
	title: "",
	desc: "",
	img: "",
	size: [
		{
			types: "",
			price: 0,
		},
	],
	inStock: true,
	discount: 1,
	category: "",
};
const validationSchema = Yup.object().shape({
	title: Yup.string().required("Enter your title please"),
	desc: Yup.string().required("Enter description for new product"),
	img: Yup.string().required("Choose your image product"),
	size: Yup.array().of(
		Yup.object().shape({
			types: Yup.string().required("Enter type for new product"),
			price: Yup.number().required("Enter price for new product"),
		})
	),
	inStock: Yup.boolean(),
	discount: Yup.number(),
	category: Yup.string().required("Enter category for new product"),
});
async function getCloudinaryUrl(file: string | Blob) {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", "zhqvoer4");
	const url = import.meta.env.VITE_CLOUDINARY_URL as string;
	const resp = await axios.post(url, formData).catch((error) => {
		console.log(error);
	});
	if (!resp) {
		return null;
	}
	return resp?.data?.url;
}
type IPropsAddProduct = {
	close : any, 
}
const FormAddNewProduct = (props: IPropsAddProduct) => {
	const {close} = props;
	const uploadFileRef = useRef<any>(null);
	const handleSubmit = async (
		values: FormAddProductValue,
		actions: FormikHelpers<FormAddProductValue>
	) => {
		const resp = await productServices.postProduct(values).catch((error) => {
			if (error) {
				toast.error(error);
			}
		});
		if (!resp) {
			return toast.error("Add failed");
		}
		if (resp.status === 200) {
			toast.success(`Created ${resp.data.title}`);
			actions.resetForm();
		}
	};

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({
					values,
					errors,
					setFieldValue,
					handleChange,
				}: FormikProps<FormAddProductValue>) => {
					const onChangeUploadField = async (e: any) => {
						if (uploadFileRef.current) {
							const myFile = uploadFileRef.current.files[0];
							const myUrl = await getCloudinaryUrl(myFile);
							if (myUrl) {
								setFieldValue("img", myUrl);
							}
						}
						handleChange(e);
					};
					return (
						<div className="box-border w-screen bg-slate-600  p-5">
							<div className="grid">
								<div className="grid-rows-1 inline text-center">
									<span className="grid-cols-1 font-bold  text-white block text-4xl  ">
										Form Add New Product
										<a
											className="close float-right bg-slate-700 text-slate-50 px-2"
											onClick={close}
										>
											&times;
										</a>
									</span>
								</div>
							</div>
							<div>
								<div className="">
									<Form className=" grid grid-cols-2 w-full">
										<div className="grid-cols-1 mx-3">
											<div className="flex mb-4">
												<div className="inline basis-1/5 text-white">
													<label htmlFor="title">Name Product</label>
												</div>
												<div className="inline basis-3/5">
													<Field
														name="title"
														className={`w-full rounded block ${
															errors?.title && "border-red-500 border"
														}`}
													></Field>
													<ErrorMessage name="title" className="text-red-500">
														{(message) => <div className="text-red-500">{message}</div>}
													</ErrorMessage>
												</div>
											</div>
											<div className="flex mb-4">
												<div className="inline basis-1/5 text-white">
													<label htmlFor="desc">Description</label>
												</div>
												<div className="inline basis-3/5 border-green-700">
													<Field
														name="desc"
														className={`w-full rounded block ${
															errors?.title && "border-red-500 border"
														}`}
													></Field>
													<ErrorMessage name="desc" className="text-red">
														{(message) => <div className="text-red-500">{message}</div>}
													</ErrorMessage>
												</div>
											</div>
											<div className="flex mb-4">
												<div className="basis-1/5 text-white">
													<label htmlFor="img">Image</label>
												</div>
												<div className="basis-3/5">
													<input
														name="fileUpload"
														type="file"
														ref={uploadFileRef}
														className="rounded text-white"
														onChange={onChangeUploadField}
													/>
													<Field type="hidden" name="img" />
												</div>
											</div>
											<div className="my-4">
												<FieldArray
													name="size"
													render={(arrayHelpers) => (
														<div>
															<label htmlFor="size" className="mr-10 text-white">
																Size :
															</label>
															{values.size
																? values.size.map(
																		(size: Partial<TypeSizeData>, index: number) => (
																			<div key={index}>
																				<div className="flex mb-4">
																					<div className="basis-1/5 text-white">
																						<label htmlFor={`size[${index}].types`}>Types</label>
																					</div>
																					<div className="basis-3/5">
																						<Field
																							name={`size[${index}].types`}
																							component="select"
																							className={`w-full rounded block ${
																								errors?.title && "border-red-500 border"
																							}`}
																						>
																							<option value="">Choose Types</option>
																							<option value="S">S</option>
																							<option value="M">M</option>
																							<option value="L">L</option>
																						</Field>
																						<ErrorMessage
																							name={`size[${index}].types`}
																							className="text-red"
																						>
																							{(message) => (
																								<div className="text-red-500">{message}</div>
																							)}
																						</ErrorMessage>
																					</div>
																				</div>
																				<div className="flex mb-4">
																					<div className="basis-1/5 text-white">
																						<label htmlFor={`size[${index}].price`}>Price</label>
																					</div>
																					<div className="basis-3/5">
																						<Field
																							name={`size[${index}].price`}
																							className={`w-full rounded block ${
																								errors?.title && "border-red-500 border"
																							}`}
																						/>
																						<ErrorMessage
																							name={`size[${index}].price`}
																							className="text-red"
																						>
																							{(message) => (
																								<div className="text-red-500">{message}</div>
																							)}
																						</ErrorMessage>
																					</div>
																					<button
																						type="button"
																						onClick={() => arrayHelpers.remove(index)}
																						className="bg-red-500 text-white rounded mx-4 px-2 hover:bg-opacity-20 hover:text-black"
																					>
																						Delete
																					</button>
																				</div>
																			</div>
																		)
																		// eslint-disable-next-line no-mixed-spaces-and-tabs
																  )
																: null}
															<button
																type="button"
																onClick={() => arrayHelpers.push({ types: "", price: 0 })}
																className="bg-blue-500 p-1 rounded hover:bg-opacity-60 hover:text-black text-white"
															>
																Add Size
															</button>
														</div>
													)}
												/>
											</div>
										</div>
										<div className="basis-1/2 grid-cols-1 ">
											<div className="flex mb-4">
												<div className="basis-1/5 text-white">
													<label htmlFor="" className="inline">
														In stock?
													</label>
												</div>
												<div className="inline basis-3/5">
													<Field
														name="inStock"
														component="select"
														className={`w-full rounded block ${
															errors?.title && "border-red-500 border"
														}`}
													>
														<option value="true">Yes</option>
														<option value="false">No</option>
													</Field>
													<ErrorMessage name="inStock" className="text-red">
														{(message) => <div className="text-red-500">{message}</div>}
													</ErrorMessage>
												</div>
											</div>
											<div className="flex mb-4">
												<div className="basis-1/5 text-white">
													<label htmlFor="">Discount</label>
												</div>
												<div className="basis-3/5">
													<Field
														name="discount"
														className={`w-full rounded block ${
															errors?.title && "border-red-500 border"
														}`}
													></Field>
													<ErrorMessage name="discount" className="text-red">
														{(message) => <div className="text-red-500">{message}</div>}
													</ErrorMessage>
												</div>
											</div>
											<div className="flex mb-4">
												<div className="basis-1/5 text-white">
													<label htmlFor="">Categories</label>
												</div>
												<div className="basis-3/5">
													<Field
														name="category"
														className={`w-full rounded block ${
															errors?.title && "border-red-500 border"
														}`}
														component="select"
													>
														<option>----Choose----</option>
														<option value="Cà Phê">Cà Phê</option>
														<option value="Trà">Trà</option>
														<option value="Bánh & Snack">Bánh Mì & Bánh Ngọt</option>
														<option value="Món Khác">Other</option>
													</Field>
													<ErrorMessage name="category" className="text-red">
														{(message) => <div className="text-red-500">{message}</div>}
													</ErrorMessage>
												</div>
											</div>
										</div>
										<div className="flex mb-4">
											<div className="ml-3 basis-1/5">
												<button
													type="submit"
													className="bg-secondary py-2 px-4 rounded text-white transition-all active:translate-y-[0.25rem] hover:bg-opacity-60 hover:text-black"
												>
													Submit
												</button>
											</div>
										</div>
									</Form>
								</div>
							</div>
						</div>
					);
				}}
			</Formik>
		</>
	);
};
export default FormAddNewProduct;
