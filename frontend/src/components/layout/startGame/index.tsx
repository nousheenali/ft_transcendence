import React, { useCallback, useRef } from 'react'
import { Button, Modal } from 'react-daisyui';

export default function StartGameCustomize() {
	const ref = useRef<HTMLDialogElement>(null);
	const handleShow = useCallback(() => {
		ref.current?.showModal();
	}, [ref]);
	return (
		<div className="flex items-center justify-center p-4 mb-6">
			<button className="text-start-game font-saira-condensed font-bold text-xl h-18 w-screen border-2 border-aside-border rounded-2xl  p-4 bg-heading-fill hover:bg-[#111417] opacity-90 mx-4" onClick={handleShow}>
				Start Game
			</button>
			<Modal className='w-[1000px] h-[1000px]' ref={ref}>
				<Modal.Header className="font-bold">Customize Game!</Modal.Header>
				<Modal.Body>
					
					Press Customize the game or Start default game
				</Modal.Body>
				<Modal.Actions>
					<Button>StartGame</Button>
				</Modal.Actions>
			</Modal>
		</div>
	)
}
