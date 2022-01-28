import React from "react";
import InputCustom from "../../components/InputCustom";
import { Formik, Form } from "formik";
import CustomImage from "../../components/ImageCustom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/images/logo.png";
import { initialValue, SignupSchema } from "./login";
import useLoginHandle from "./useLoginHandle";
import Loading from "../../components/UI/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../../reducer/rootReducer";
import Coutdown from "../../components/Coutdown";

const LoginPage = () => {
	const { isLogin, setIslogin, handleLogin } = useLoginHandle();
	const loading = useSelector((state: RootState) => state.loading.isLoading);
	// console.log(isLogin);
	return (
		<div className="h-screen w-full  flex flex-col justify-center bg-blue-200">
			<div className="container mx-auto grid grid-cols-12 gap-4 w-fit">
				<div className="col-span-6 h-full box-shadow rounded-lg ">
					<CustomImage
						imageUrl={logo}
						imageSize="100%"
						classCustom="h-full w-full"
					/>
				</div>

				<div className="col-span-4 h-full bg-white px-10 box-shadow rounded-lg py-10">
					<p>Welcome</p>
					<h2 className="text-2xl font-bold text-blue-900 ">
						Login to your account
					</h2>

					<Formik
						initialValues={initialValue}
						validationSchema={SignupSchema}
						onSubmit={handleLogin}
					>
						<Form>
							<div className="mb-4">
								<InputCustom
									label="Username:"
									name="username"
									placeholder="Enter your email"
									type="text"
								/>
							</div>
							<div className="mb-4">
								<InputCustom
									label="Password:"
									name="password"
									placeholder="Enter your password"
									type="password"
								/>
							</div>
							<button
								type="submit"
								className="bg-green-600  text-white w-full py-2 mt-5 rounded-lg "
							>
								{isLogin ? (
									<span>Login Now</span>
								) : (
									<Coutdown
										initialMinute={0}
										initialSeconds={5}
										setIslogin={setIslogin}
									/>
								)}
							</button>
						</Form>
					</Formik>
				</div>
			</div>

			{loading ? <Loading /> : null}

			<ToastContainer
				position="bottom-left"
				autoClose={4000}
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

export default LoginPage;
