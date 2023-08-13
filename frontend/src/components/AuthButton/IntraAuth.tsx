import Image from "next/image";


/*
* TODO: # On width of 780px:
*           1- Change the size of the button
* 		    2- Change the font size
* */
export function IntraAuthButton() {
	return (
		<>
			<div className="w-[400px] h-[80px] rounded-md shadow border border-zinc-800
							bg-gradient-to-b from-authGrad-s to-authGrad-e
							hover:bg-gradient-to-b hover:from-hover-authGrad-s hover:to-hover-authGrad-e hover:shadow-lg hover:border-main-yellow
							flex-row justify-center items-center gap-5 inline-flex text-[30px] font-bold hover:cursor-pointer">
				<div className="font-saira-condensed left-0 text-center text-main-yellow">
					Authenticate 42 Intra
				</div>
				<div>
					<Image alt="auth-btn-separator" src="separator.svg" width={5} height={5}/>
				</div>
				<div className="font-saira-condensed w-[50px] h-11 text-center text-main-text">
					42
				</div>
			</div>
		</>
	);
}