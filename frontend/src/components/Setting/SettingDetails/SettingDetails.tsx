"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SettingDetailsProps } from "@/components/Setting/types";
import { useSession } from "next-auth/react";
import { API_ENDPOINTS } from "../../../../config/apiEndpoints";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { activateTwoFa, verifyTwoFa } from "../../../../services/twoFa";
import { Modal } from "react-daisyui";
import Image from "next/image";
import { userInformation } from "@/components/Profile/types";
import { getUserData } from "../../../../services/user";

function SettingDetails({ name, email, Auth }: SettingDetailsProps) {
  const { data: session } = useSession();
  const ref = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);
  const [qrCode, setQrCode] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (buttonId: string) => {
    console.log(buttonId + " button clicked");
  };

  const handleActivateTwoFa = async () => {
    try {
      setIsLoading(true);
      if (userInfo?.TFAEnabled === true) {
        toast.error("ALREADY ACTIVE");
        return;
      }
      const message = await activateTwoFa(
        session?.user.login!,
        API_ENDPOINTS.generateSecret
      );
      let parsedResult = JSON.parse(message);
      setQrCode(parsedResult.qrCodeUrl);
  
      handleShow();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const handleVerify = async () => {
    try {
      setIsLoading(true);

      if (code === "") {
        toast.error("CODE IS REQUIRED");
        return;
      }

      const message = await verifyTwoFa(
        session?.user.login!,
        code,
        API_ENDPOINTS.verifyTwoFa
      );
      // console.log(JSON.parse(message));
      let parsedResult = JSON.parse(message);

      setQrCode(parsedResult.qrCodeUrl);

      ref.current?.close();
      if (parsedResult.isValid === false) {
        toast.error("CODE IS NOT VALID");
      } else {
        toast.success("TWO-FACTOR AUTHENTICATION SET SUCCESSFULLY");
      }
    } catch (error: any) {

      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [userInfo, setUserInfo] = useState<userInformation>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const user: userInformation = await getUserData(
        session?.user.login!,
        API_ENDPOINTS.getUserbyLogin
      );
      setUserInfo(user);
      setIsLoading(false);

    };
    fetchData();
  }, [session]);

  return (
    <div className="flex flex-col ml-10 mb-10 font-saira-condensed font-bold text-main-text justify-start pl-6">
      <div className="grid grid-cols-5">
        <div className="text-xl ml-10"> Name:</div>
        <div className="text-md truncate">{userInfo?.name}</div>
        <div className="col-span-1" />
        <button
          className="w-40 h-7 rounded-md items-center text-md bg-button-background"
          onClick={() => handleClick("Edit username")}
        >
          Edit username
        </button>
      </div>
      <div className="grid grid-cols-5 mt-10">
        <div className="text-xl ml-10"> Email:</div>
        <div className="text-md truncate">{userInfo?.email}</div>
        <div className="col-span-1" />
      </div>
      <div className="grid grid-cols-5 mt-10">
        <div className="text-xl ml-10"> 2FA:</div>
        <div className="text-md truncate ">
          {userInfo?.TFAEnabled ? "Activated" : "Not Activated"}
        </div>
        <div className="col-span-1" />
        <button
          className="w-40 h-7 rounded-md items-center text-md bg-button-background"
          onClick={() => handleActivateTwoFa()}
        >
          Activate 2FA
        </button>
      </div>
      <Modal
        className="overflow-hidden w-[267px] h-[310px] m-0 p-0 gap-0 bg-aside-fill-70  border-b-start-game border-b-2 rounded-2xl "
        ref={ref}
        id="settings_modal"
      >
        {/* Header */}
        <Modal.Header className="font-bold m-0">
          <div className="flex justify-center items-center h-full">
            <p>USE AUTHENTICATOR</p>
          </div>
        </Modal.Header>
        <Modal.Body className="flex flex-col m-0 py-2">
          {/* customize game section */}
          <div className="flex flex-row justify-center align-center">
            <Image src={qrCode} width={100} height={100} alt="qr code"></Image>
          </div>
          <div className="flex justify-center mt-3 p-2 items-center rounded-md bg-search-box-fill w-full h-8 border-[0.5px] border-chat-search-stroke">
            <input
              className="ml-2 bg-search-box-fill font-thin text-sm text-search-box-text w-40 h-full focus:outline-none hover:cursor-text"
              type="search"
              name="search"
              placeholder="Enter Authenticator Code"
              onChange={(e) => {
                setCode(e.target.value);
    
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Actions className="flex items-center  justify-center mt-2 ">
          <button
            onClick={() => handleVerify()}
            className="text-start-game font-saira-condensed font-bold text-xl h-18 w-60 border-2 border-aside-border rounded-2xl  p-4 bg-heading-fill hover:bg-[#111417] opacity-90 mx"
          >
            VERIFY
          </button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default SettingDetails;
