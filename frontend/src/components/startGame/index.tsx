import React, { useCallback, useRef } from "react";
import { Button, Dropdown, Input, Modal } from "react-daisyui";
import Image from "next/image";
export default function StartGameCustomize() {
  const ref = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);
  return (
    <div className="flex items-center justify-center p-4 mb-6">
      <button
        className="text-start-game font-saira-condensed font-bold text-xl h-18 w-screen border-2 border-aside-border rounded-2xl  p-4 bg-heading-fill hover:bg-[#111417] opacity-90 mx-4"
        onClick={handleShow}
      >
        Start Game
      </button>
      <Modal
        className="w-[1000px] h-[900px] m-0 p-0 border-b-start-game bg-aside-fill-70 border-b-2 rounded-2xl"
        ref={ref}
      >
        <Modal.Header className="font-bold">
          <div className="flex flex-row bg-heading-stroke-30 border-2 rounded-t-2xl border-aside-border p-2 items-center justify-center font-saira-condensed font-bold text-20 text-2xl text-main-text space-x-2 gap-8">
            <div className="mt-1">
              <h1>Customize your game</h1>
            </div>
            <div>
              <Image
                src="/StartGame_icon.svg"
                width={40}
                height={40}
                // className="inline-block ml-2"
                alt="Customize your game"
              />
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {/* customize game section */}
          <div className="flex flex-col gap-12">
            <div className="bg-Customize-game-bg p-10 mx-8  flex flex-col gap-12 border-2 border-aside-border rounded-2xl">
              <div className="flex flex-row items-center justify-around gap-14">
                <h1 className="text-main-text font-saira-condensed text-xl">
                  Ball Color
                </h1>
                <Dropdown.Details>
                  <Dropdown.Details.Toggle className=" text-placeholder-text font-saira-condensed normal-case text-xl bg-main bg-heading-fill border-2 border-aside-border rounded-2xl w-60 flex flex-col gap-20">
                    <h1>Default Color</h1>
                    <Image
                      src="/DropDown_icon.svg"
                      width={20}
                      height={20}
                      className="inline-block ml-2"
                      alt="DropDown_icon"
                    />
                  </Dropdown.Details.Toggle>
                  <Dropdown.Menu className="w-52 z-10">
                    <Dropdown.Item className="text-main-text">Red</Dropdown.Item>
                    <Dropdown.Item className="text-main-text">yellow</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Details>
              </div>
              <div className="flex flex-row justify-around gap-8">
                <h1 className="text-main-text font-saira-condensed text-xl">
                  Racket Color
                </h1>
                <Dropdown.Details>
                  <Dropdown.Details.Toggle className=" text-placeholder-text font-saira-condensed normal-case text-xl bg-main bg-heading-fill border-2 border-aside-border rounded-2xl w-60 flex flex-col gap-20">
                    Default Color
                    <Image
                      src="/DropDown_icon.svg"
                      width={20}
                      height={20}
                      className="inline-block ml-2"
                      alt="DropDown_icon"
                    />
                  </Dropdown.Details.Toggle>
                  <Dropdown.Menu className="w-52 z-10">
                    <Dropdown.Item className="text-main-text">Red</Dropdown.Item>
                    <Dropdown.Item className="text-main-text">yellow</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Details>
              </div>
              <div className="flex flex-row justify-around gap-8">
                <h1 className="text-main-text font-saira-condensed text-xl">
                  Background
                </h1>
                <Dropdown.Details>
                  <Dropdown.Details.Toggle className=" text-placeholder-text font-saira-condensed normal-case text-xl bg-main bg-heading-fill border-2 border-aside-border rounded-2xl w-60 flex flex-col gap-18">
                    <h1 className="pr-6">Default Background</h1>
                    <Image
                      src="/DropDown_icon.svg"
                      width={20}
                      height={20}
                      className="inline-block ml-2"
                      alt="DropDown_icon"
                    />
                  </Dropdown.Details.Toggle>
                  <Dropdown.Menu className="w-52 z-10">
                    <Dropdown.Item className="text-main-text">Red</Dropdown.Item>
                    <Dropdown.Item className="text-main-text">Yellow</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Details>
              </div>
              <div className="flex flex-row justify-around gap-8">
                <h1 className="text-main-text font-saira-condensed text-xl">
                  Game Level
                </h1>
                <Dropdown.Details>
                  <Dropdown.Details.Toggle className=" text-placeholder-text font-saira-condensed normal-case text-xl bg-main bg-heading-fill border-2 border-aside-border rounded-2xl w-60 flex flex-col gap-20">
                    <h1 className="pr-12">Easy</h1>
                    <Image
                      src="/DropDown_icon.svg"
                      width={20}
                      height={20}
                      className="inline-block ml-2"
                      alt="DropDown_icon"
                    />
                  </Dropdown.Details.Toggle>
                  <Dropdown.Menu className="w-52">
                    <Dropdown.Item className="text-main-text">Easy</Dropdown.Item>
                    <Dropdown.Item className="text-main-text">Medium</Dropdown.Item>
                    <Dropdown.Item className="text-main-text">Hard</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Details>
              </div>
            </div>

            {/* join queue or invite section */}
            <div className="text-placeholder-text font-saira-condensed normal-case text-xl bg-main bg-aside-fill border-2 border-aside-border rounded-2xl flex flex-row gap-4  mx-8 p-4">
              <div className="text-main-yellow font-saira-condensed font-bold text-4xl py-10 px-4">
                OR
              </div>
              <div className="flex flex-col gap-4 pt-4">
                <button className="text-main-text font-saira-condensed font-bold text-3xl flex flex-row gap-4">
                  <Image
                    src="/Queue_icon.svg"
                    width={18}
                    height={18}
                    className="inline-block ml-2 mt-2"
                    alt="DropDown_icon"
                  />
                  <h1>Join A queue</h1>
                </button>
                <div className=" text-main-text text-3xl font-saira-condensed flex items-center space-x-4">
                    <Image
                      src="/InviteFriends_icon.svg"
                      width={24}
                      height={24}
                      className="inline-block ml-2 "
                      alt="DropDown_icon"
                    />
                    <h1 className="">Invite :</h1>
                    <Input className="w-30" />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Actions className="flex items-center justify-center mt-16 ">
          <button className="text-start-game font-saira-condensed font-bold text-xl h-18 w-60 border-2 border-aside-border rounded-2xl  p-4 bg-heading-fill hover:bg-[#111417] opacity-90 mx">
            Start Game
          </button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
