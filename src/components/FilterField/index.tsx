import React, { ChangeEvent } from "react";
import { FilterIcon } from "@heroicons/react/solid";

interface IFilterFieldProps {
	startDate: string;
	endDate: string;
	handleChooseStartDate: (srtDate: string) => void;
	handleChooseEndDate: (endDate: string) => void;
	handleChooseStatus: (status: string) => void;
	handleFilter: () => void;
}

const FilterField: React.FC<IFilterFieldProps> = ({
	startDate,
	endDate,
	handleChooseStartDate,
	handleChooseEndDate,
	handleChooseStatus,
	handleFilter,
}) => {
	return (
		<>
			<div className="basis-1/2 flex justify-between gap-2">
				<label
					htmlFor="start-day"
					className="basis-1/2 flex justify-start items-center"
				>
					<span className="font-semibold pr-2">From:</span>
					<input
						type="date"
						name="date"
						id="start-day"
						min={"2022-01-01"}
						defaultValue={"2022-01-01"}
						max={endDate}
						className="filter-field-style"
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							handleChooseStartDate(e.target.value)
						}
					/>
				</label>
				<label
					htmlFor="end-day"
					className="basis-1/2 flex justify-start items-center"
				>
					<span className="font-semibold pr-2">To:</span>
					<input
						type="date"
						name="date"
						id="end-day"
						defaultValue={new Date().toISOString().split("T")[0]}
						min={startDate}
						max={new Date().toISOString().split("T")[0]}
						className="filter-field-style"
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							handleChooseEndDate(e.target.value)
						}
					/>
				</label>
			</div>
			<select
				name="filter by status"
				className="filter-field-style"
				onChange={(e: ChangeEvent<HTMLSelectElement>) =>
					handleChooseStatus(e.target.value)
				}
			>
				<option value="" className="text-black">
					All Status
				</option>
				<option value="completed" className="text-black cursor-pointer">
					Completed
				</option>
				<option value="canceled" className="text-black cursor-pointer">
					Canceled
				</option>
			</select>
			<button className="filter-history-btn" onClick={handleFilter}>
				<FilterIcon className="h-6 w-6 pr-2" />
				Filter
			</button>
		</>
	);
};

export const FilterFieldMemo =  React.memo(FilterField);
