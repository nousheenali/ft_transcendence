/*
* TODO: # On width of 780px:
* 		    1- Change the font size of the title.
* */

export function Title() {
	return (
		<div className="w-[800px] flex flex-col justify-center font-saira-condensed">
			<div
				className="-mb-4 ml-32 flex justify-start text-9xl font-saira-condensed text-main-yellow [-webkit-text-stroke:1px_#555967]">
				<div>SPIN</div>
			</div>
			<div
				className="-mt-2 mr-12 flex justify-end text-9xl font-saira-condensed text-main-texts [-webkit-text-stroke:1px_#555967]">
				<div>MASTERS</div>
			</div>
		</div>
	);
}
