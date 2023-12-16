import React, { useCallback, useEffect, useRef, useState } from "react";
import ChannelCreateBtn from "./ChannelCreateBtn/ChannelCreateBtn";
import { Button, Modal } from "react-daisyui";
import ChannelNameTextBox from "./ChannelNameTextBox/ChannelNameTextBox";
import ChannelTypeDD from "./ChannelTypeDD/ChannelTypeDD";
import {
  useChannelCreateValidate,
  useChannelInfo,
  useChatSocket,
} from "@/context/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userInformation } from "@/components/Profile/types";
import { getData, postData } from "../../../../../services/api";
import { API_ENDPOINTS } from "../../../../../../config/apiEndpoints";
import { CreateChannelItems } from "@/components/Chat/Channels/CreateChannel/ChannelTypes/ChannelType";

export default function CreateChannel({ userLogin }: { userLogin: string }) {
  const { socket } = useChatSocket();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [data, setData] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const handleClick = useCallback(() => {
    modalRef.current?.showModal();
  }, []);

  const { channelName, channelType, channelPassword } = useChannelInfo();
  const { setChannelName, setChannelType, setChannelPassword } =
    useChannelInfo();

  const { validChannelName, validPassword } = useChannelCreateValidate();
  const { setValidChannelName, setValidPassword } = useChannelCreateValidate();

  useEffect(() => {
    const getUserData = async () => {
      const userData: userInformation = await getData(
        userLogin,
        API_ENDPOINTS.getUserbyLogin
      );
      setData(userData.id);
    };
    getUserData();
  }, []);

  /** ==================== Validate Channel Name ==================== */
  // update the status of the button
  useEffect(() => {
    if (channelType === "PUBLIC" && validChannelName) {
      setIsValid(true);
    } else if (channelType === "PRIVATE" && validChannelName && validPassword) {
      setIsValid(true);
    } else setIsValid(false);
  }, [validChannelName, validPassword, channelType]);

  /** ==================== Create Channel ==================== */
  const createChannelButton = async () => {
    const newChannel: CreateChannelItems = {
      channelName: channelName,
      channelType: channelType,
      createdBy: data,
      channelPassword: channelPassword!,
    };
    try {
      // check if the channel name is valid (only characters and numbers) and (4-20 characters)
      if (
        channelName!.length < 4 ||
        channelName!.length > 20 ||
        channelName!.match(/^[a-zA-Z0-9]+$/g) === null ||
        channelName!.match(/^[a-zA-Z0-9]+$/g) === undefined
      ) {
        toast.error("Channel name is not valid", {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }

      const chan = await postData<CreateChannelItems>(
        newChannel,
        API_ENDPOINTS.createChannel
      );

      setChannelName("");
      setChannelPassword("");
      setValidChannelName(false);
      setValidPassword(false);
      modalRef.current?.close();

      // Create the channel room
      socket.emit("CreateChannel", {
        channelName: newChannel.channelName,
        channelType: newChannel.channelType,
        creator: newChannel.createdBy,
      });
      //   console.log("The creater is: ", newChannel.createdBy);
      // glopal value to re-render the channel list
      // toast.success("Channel created successfully", {
      //   position: "top-center",
      //   autoClose: 800,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      // });
    } catch (error: any) {
      setChannelName("");
      setChannelPassword("");
      setValidChannelName(false);
      setValidPassword(false);
      modalRef.current?.close();
      toast.error("Channel creation failed...", {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  /** ==================================================================================== */
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
        <Modal.Actions className="p-2 mt-4 flex flex-col px-16">
          {isValid ? (
            <Button
              className="p-0 m-0 text-main-text bg-heading-fill hover:bg-main-text hover:text-heading-fill"
              onClick={() => {
                createChannelButton();
              }}
            >
              Create
            </Button>
          ) : (
            <Button className="p-0 m-0" disabled>
              Create
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    </div>
  );
}

/** ==================================================================================== */
