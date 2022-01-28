import React, { FC, useCallback, useMemo } from "react";

interface IPaginationProps {
	handleBack: () => void;
	handleNext: () => void;
	handleChoosePage: (page: number) => void;
	handleSetPostsPerPage: (entries: number) => void;
	postsPerPage: number;
	totalPosts: number;
	currentPage: number;
}

const Pagination: FC<IPaginationProps> = ({
	handleBack,
	handleNext,
	handleChoosePage,
	handleSetPostsPerPage,
	postsPerPage,
	totalPosts,
	currentPage,
}) => {
	const lastPage = Math.ceil(totalPosts / postsPerPage);

	const getArrOfPages = useCallback(
		(lastPage: number) => {
			const res: number[] = [];
			for (let i = 1; i <= lastPage; i++) {
				res.push(i);
			}
			return res;
		},
		[lastPage]
	);

	const arrOfPages = useMemo(() => {
		return getArrOfPages(lastPage);
	}, [lastPage]);
	if (totalPosts < 10) return null;
	return (
		<nav
			aria-label="Page navigation"
			className="flex justify-between items-center flex-wrap gap-y-2"
		>
			<div className="space-x-2">
				<select
					name="postPerPage"
					className="border border-slate-400 text-sm"
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
						handleSetPostsPerPage(+e.target.value);
					}}
					value={postsPerPage}
				>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="50">50</option>
				</select>
				<span>items/page</span>
			</div>
			<div className="h-8">
				Showing <b>{postsPerPage * (currentPage - 1) + 1}</b> to
				<b>
					{" "}
					{postsPerPage * currentPage > totalPosts
						? totalPosts
						: postsPerPage * currentPage}
				</b>{" "}
				of <b>{totalPosts}</b> items
			</div>
			<ul className="inline-flex">
				<li>
					<button
						className={
							"h-8 px-3 text-black transition-colors duration-150 bg-white border border-r-0 border-slate-600 rounded-l-lg" +
							(currentPage === 1
								? " cursor-not-allowed"
								: " hover:bg-slate-300 hover:text-white")
						}
						onClick={handleBack}
					>
						Previous
					</button>
				</li>
				{arrOfPages.map((page: number) => (
					<li key={page}>
						<button
							className={
								"h-8 px-3 transition-colors duration-150 bg-white border border-r-0 border-slate-600" +
								(page === currentPage
									? " bg-slate-300"
									: " text-black hover:bg-slate-300 hover:text-white")
							}
							onClick={() => {
								handleChoosePage(page);
							}}
						>
							{page}
						</button>
					</li>
				))}
				<li>
					<button
						className={
							"h-8 px-3 text-black transition-colors duration-150 bg-white border border-slate-600 rounded-r-lg" +
							(currentPage === lastPage
								? " cursor-not-allowed"
								: " hover:bg-slate-300 hover:text-white")
						}
						onClick={handleNext}
					>
						Next
					</button>
				</li>
			</ul>
		</nav>
	);
};

export const PaginationMemo = React.memo(Pagination);
