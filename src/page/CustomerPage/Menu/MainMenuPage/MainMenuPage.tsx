import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { RootState } from "../../../../reducer/rootReducer";
import { IParam, TypeCategoryData, TypeProductData } from "../../../../types";
import { addProductsToCart } from "../../../../action/actionCreator";
import { toast, ToastContainer } from "react-toastify";
import Sale from "../../../../components/UI/Sale";
import ButtonAddToCart from "../../../../components/UI/Button.addToCart";
import {
	addProductToCart,
	formatPrice,
	removeVietnameseTones,
	toggleShowProduct,
} from "../../../../utils";
import OutStock from "../../../../components/UI/OutStock";

type TDataProps = {
	products: TypeProductData[];
	category: TypeCategoryData[];
};

interface IProps {
	data: TDataProps;
}

const MainMenuPage = (props: IProps) => {
	const products = useSelector((state: RootState) => state.product);
	const dispatch = useDispatch();
	const history = useHistory();
	const param: IParam = useParams();

	const onAddProductToCart = (id: string) => {
		const productAddToCart = addProductToCart(id, products.products);
		dispatch(addProductsToCart(productAddToCart));
		toast.success(
			`Bạn đã thêm ${productAddToCart.title} vào giỏ hàng 🎉🎉🎉`,
			{}
		);
	};

	const onToProductDetail = (productId: string) => {
		const product = products.products?.filter(
			(product: TypeProductData) => product._id === productId
		);
		history.push(
			`/menu/${param.id}/${removeVietnameseTones(
				product[0].title,
				false
			)}-${productId}`
		);
	};

	useEffect(() => {
		window.scrollTo({ left: 0, top: 0, behavior: "auto" });
		const cards = document.querySelectorAll(".card--show");

		cards.forEach((card) => {
			card.classList.add("card--show");
		});
		window.addEventListener("scroll", animation);
		animation();
		function animation() {
			toggleShowProduct(cards, "card--show");
		}

		return () => {
			window.removeEventListener("scroll", animation);
		};
	});

	return (
		<section className="mx-4 sm:mx-8 mt-28 lg:flex-grow lg:my-8 lg:pr-20">
			<div className="flex justify-between bg-primary drop-shadow-xl">
				<p className="md:m-8 m-4 text-center">{props.data.category[0]?.desc}</p>
			</div>
			<div className="capitalize mt-8">
				<span className="font-bold">Menu </span>/ {props.data.category[0]?.title}
			</div>
			<div className="grid grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
				{props.data.products.map((product: TypeProductData, index: number) => {
					return (
						<div
							className="card--show transition-all ease-linear duration-500 translate-y-[-1rem]"
							key={index}
						>
							<div className="relative shadow-xl rounded-xl drop-shadow-xl cursor-pointer">
								<Link
									className="relative"
									to={`/menu/${param.id}/${removeVietnameseTones(product.title)}-${
										product._id
									}`}
								>
									<img
										className="w-full rounded-xl transition-all duration-500 ease-linear"
										src={product.img}
										alt={product.title}
									></img>
									{product.discount !== 1 && <Sale />}
								</Link>
								<div
									onClick={() => onAddProductToCart(product._id)}
									className="absolute right-0 z-40 rounded-br-xl bottom-0 rounded-tl-xl p-[2px] hidden lg:flex items-center bg-white text-secondary"
								>
									<ButtonAddToCart />
								</div>
								{!product.inStock && <OutStock />}
							</div>
							<p
								className="font-bold mt-4 hover:text-orange-400 cursor-pointer"
								onClick={() => onToProductDetail(product._id)}
							>
								{product.title}
							</p>
							{product.discount !== 1 && (
								<p className="text-red-500 font-bold">
									{formatPrice(product.size[0].price, product.discount)} đ
								</p>
							)}
							<p className={`${product.discount !== 1 && "line-through text-sm"}`}>
								{new Intl.NumberFormat("vn").format(product.size[0].price)} đ
							</p>
						</div>
					);
				})}
			</div>
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
				className="w-72 mb-4"
			/>
		</section>
	);
};

export default React.memo(MainMenuPage, (prevProps, nextProps) => {
	const isRerender =
		nextProps.data.products.length === prevProps.data.products.length &&
		nextProps.data.category[0]?.title === prevProps.data.category[0]?.title &&
		nextProps.data.category.length === prevProps.data.category.length;
	return isRerender;
});
