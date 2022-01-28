import React, { ChangeEvent, useRef } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { IParam, TypeCategoryData } from "../../../../types";
import { newParam, removeVietnameseTones } from "../../../../utils";

interface IProps {
	categories: TypeCategoryData[];
	search: (value: string) => void;
}

const LeftNav = (props: IProps) => {
	const param: IParam = useParams();
	const history = useHistory();
	const searchRef = useRef<HTMLInputElement>(null);
	const mobileSearchRef = useRef<HTMLInputElement>(null);

	const selectCategoryHandle = (param: string) => {
		history.push(`/menu/${removeVietnameseTones(param)}`);
	};

	// Select category mobile
	const onChangeCategoryHandle = (event: ChangeEvent<HTMLSelectElement>) => {
		const param = event.target.value;
		history.push(`/menu/${removeVietnameseTones(param)}`);
	};

	// Handle search on desktop
	const onDesktopSearchProducts = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!searchRef.current?.value) return;
		props.search(searchRef.current?.value);
		searchRef.current.value = "";
	};

	// Handle search on mobile
	const onMobileSearchProducts = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!mobileSearchRef.current?.value) return;
		props.search(mobileSearchRef.current?.value);
		mobileSearchRef.current.value = "";
	};

	return (
		<aside className="min-w-[30%] relative lg:pl-24 lg:py-8 z-40">
			<div className="fixed min-w-[20%]">
				<ul className="absolute hidden lg:block 2xl:ml-4">
					<li className="mb-2 w-full">
						<NavLink
							onClick={() => selectCategoryHandle("all")}
							activeClassName="activeMenu"
							className="inline-block"
							to="/menu/all"
						>
							<i className="fas fa-coffee invisible mr-2"></i>
							Tất cả
						</NavLink>
					</li>
					{props.categories.map((cat: TypeCategoryData, i: number) => {
						return (
							<li key={i} className="mb-2">
								<NavLink
									onClick={() => selectCategoryHandle(newParam(cat.title))}
									activeClassName="activeMenu"
									className="inline-block"
									to={`/menu/${removeVietnameseTones(cat.title)}`}
								>
									<i className="fas fa-coffee invisible mr-2"></i>
									{cat.title}
								</NavLink>
							</li>
						);
					})}
					<div className="mt-4">
						<form onSubmit={onDesktopSearchProducts} className="flex">
							<input
								ref={searchRef}
								type="text"
								className="search--input"
								placeholder="Search"
								required
							/>
							<button type="submit" className="search--button">
								<i className="fa fa-search"></i>
							</button>
						</form>
					</div>
				</ul>
				<div className="block bg-white lg:hidden w-full fixed z-40 shadow-xl">
					<select
						placeholder={param.id}
						onChange={onChangeCategoryHandle}
						className="py-1 w-4/5 md:w-2/3 relative left-1/2 translate-x-[-50%] border-[1px] z-50 border-slate-300 rounded-sm my-2"
					>
						<option>All</option>
						{props.categories.map((category: TypeCategoryData, index: number) => {
							return <option key={index}>{category.title}</option>;
						})}
					</select>
					<div className="mt-2">
						<form
							onSubmit={onMobileSearchProducts}
							className="flex w-4/5 md:w-2/3 relative left-1/2 translate-x-[-50%] mb-2"
						>
							<input
								ref={mobileSearchRef}
								type="text"
								className="search--input"
								placeholder="Search"
								required
							/>
							<button type="submit" className="search--button">
								<i className="fa fa-search"></i>
							</button>
						</form>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default React.memo(LeftNav, (prevProps, nextProps) => {
	return prevProps.categories.length === nextProps.categories.length;
});
