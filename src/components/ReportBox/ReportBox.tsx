import React from "react";

interface ReportProps {
	background: string;
	title: string;
	data?: number | string;
}
const ReportBox = ({ background, title, data }: ReportProps) => {
	return (
		<div className="pb-4 flex-column basis-1/3 mb-4  text-center justify-center items-center shadow-md shadow-slate-400 font-extrabold rounded-xl">
			<div
				className={
					background + " border border-slate-400 p-4 uppercase rounded-t-xl"
				}
			>
				<p>{title}</p>
			</div>
			<div className="my-auto mt-4">
				<span>{data}</span>
			</div>
		</div>
	);
};
export default ReportBox;
