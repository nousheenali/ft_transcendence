import Image from "next/image";

export function IntraAuthButton() {
	return (
		<>
			<div className="w-56 md:w-96 h-20 md:h-28 rounded-md
							flex-col md:flex-row justify-center items-center gap-5 inline-flex 
							text-2xl md:text-3xl font-bold
							shadow border border-zinc-800 bg-gradient-to-b from-authGrad-s to-authGrad-e
							hover:bg-gradient-to-b hover:from-hover-authGrad-s hover:to-hover-authGrad-e hover:shadow-lg hover:border-main-yellow hover:cursor-pointer">
				<div className="font-saira-condensed left-0 text-center text-main-yellow">
					Authenticate 42 Intra
				</div>
				<div className="hidden md:block"><Image alt="auth-btn-separator" src="separator.svg" width={5} height={5}/></div>
				<div className="hidden md:block font-saira-condensed w-[50px] h-11 text-center text-main-text">42</div>
			</div>
		</>
	);
}