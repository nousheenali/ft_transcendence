import React, { useCallback, useRef, useState } from "react";
import ChannelCreateBtn from "./ChannelCreateBtn/ChannelCreateBtn";
import { Button, Dropdown, Input, Modal } from "react-daisyui";
import ChannelNameTextBox from "./ChannelNameTextBox/ChannelNameTextBox";
import ChannelTypeDD from "./ChannelTypeDD/ChannelTypeDD";
import { useChannelInfo } from "@/context/store";
import { useSession } from "next-auth/react";
import { API_ENDPOINTS } from "../../../../../config/apiEndpoints";
import { getData, postData } from "../../../../../services/api";
import { userInformation } from "@/components/Profile/types";
import { CreateChannelItems } from "./ChannelTypes/ChannelType";

export default function CreateChannel({ userName }: { userName: string }) {
  console.log("user: ", userName);
  const modalRef = useRef<HTMLDialogElement>(null);
  // const { data: session } = useSession();
  const [data, setData] = useState<string>();
  // const userName = session?.user.name!;
  const handleClick = useCallback(() => {
    modalRef.current?.showModal();
  }, []);

  const { channelName, channelType, channelPassword } = useChannelInfo();

  const createChannelButton = async () => {
    // console.log("userName: ", userName);
    const userData: userInformation = await getData(
      userName,
      API_ENDPOINTS.getUserbyLogin
    );
    console.log("userData", userData.id);
    setData(userData.id);

    const newChannel: CreateChannelItems = {
      channelName: channelName,
      channelType: channelType,
      createdBy: data!,
      password: channelPassword!,
    };

    console.log("newChannel", newChannel);
    // const channel = await postData();
    // console.log("userData", data);
    // console.log("channelName", channelName);
    // console.log("channelType", channelType);
    // console.log("channelPassword", channelPassword);
  };
  return (
    <div>
      <ChannelCreateBtn onClick={handleClick} />
      <Modal
        ref={modalRef}
        className="w-[300px] h-[340px] m-0 p-0 border-b-start-game bg-aside-fill-90 border-b-2 rounded-2xl"
      >
        <Modal.Header className="font-bold">
          <div className="flex flex-row justify-center items-center space-x-2 h-[30px] bg-heading-fill rounded-t-2xl border-[1px] border-heading-stroke p-5">
            <div className="font-saira-condensed font-bold text-xl text-main-text">
              <h1>Create Channel</h1>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col items-center justify-around gap-6 border-2 border-aside-border rounded-2xl mx-4 p-3">
            <ChannelNameTextBox />
            <ChannelTypeDD />
          </div>
        </Modal.Body>
        <Modal.Actions className="p-2 mt-4 flex flex-col">
          <Button
            className="p-0 m-0"
            onClick={() => {
              createChannelButton();
            }}
          >
            Create
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
