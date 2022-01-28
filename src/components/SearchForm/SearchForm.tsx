import React from "react";
interface SearchProps{
    submit: () => any;
    change: () => any;
	placeholder: string;
}
const SearchForm = ({submit , change , placeholder} : SearchProps) => {
	return (
		<div className="basis-2/3">
			<form action="" className="my-auto" onSubmit={submit()}>
				<input
					onChange={change()}
					type="text"
					className="w-9/12 p-2 mx-4 rounded border border-stone-400"
					placeholder={placeholder}
				/>
				<button className="bg-secondary p-2 px-4 rounded text-white hover:bg-green-400 hover:text-black">
					Search
				</button>
			</form>
		</div>
	);
};
export default SearchForm;
