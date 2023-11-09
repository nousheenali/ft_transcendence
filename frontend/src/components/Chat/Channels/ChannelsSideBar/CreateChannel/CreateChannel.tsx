import React, { useCallback, useRef, useState } from 'react'
import ChannelCreateBtn from './ChannelCreateBtn/ChannelCreateBtn'
import { Dropdown, Input, Modal } from 'react-daisyui';
import ChannelNameTextBox from './ChannelNameTextBox/ChannelNameTextBox';
import ChannelTypeDD from './ChannelTypeDD/ChannelTypeDD';


export default function CreateChannel() {

    const modalRef = useRef<HTMLDialogElement>(null);
    const handleClick = useCallback(() => {
      modalRef.current?.showModal();
    }, []);

    return (
      <div>
        <ChannelCreateBtn onClick={handleClick} />
        <Modal
          ref={modalRef}
          className="w-[1000px] h-[400px] m-0 p-0 border-b-start-game bg-aside-fill-90 border-b-2 rounded-2xl"
        >
          <Modal.Header className="font-bold">
            <div className="flex flex-row bg-heading-stroke-30 border-2 rounded-t-2xl border-aside-border p-2 items-center justify-center font-saira-condensed font-bold text-20 text-2xl text-main-text space-x-2 gap-8">
              <h1>Create Channel</h1>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col items-center justify-around gap-12 border-2 border-aside-border rounded-2xl mx-8 p-10">
              <ChannelNameTextBox />
              <ChannelTypeDD />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
}


