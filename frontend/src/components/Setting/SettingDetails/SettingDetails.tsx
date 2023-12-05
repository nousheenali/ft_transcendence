"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SettingDetailsProps } from "@/components/Setting/types";
import { useSession } from "next-auth/react";
import { API_ENDPOINTS } from "../../../../config/apiEndpoints";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { activateTwoFa, verifyTwoFa } from '../../../../services/twoFa';
import { Modal } from "react-daisyui";
import Image from "next/image";
import { userInformation } from "@/components/Profile/types";
import { getUserData, updateUserName } from "../../../../services/user";
import SettingAvatar from "@/components/Setting/SettingAvatar/SettingAvatar";
import { AuthContext } from "@/context/AuthProvider";
import { activateTwoFa, verifyTwoFa } from "../../../../services/two-fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useIsUserUpdated } from "@/context/store";

function SettingDetails({ name, email, Auth }: SettingDetailsProps) {
  const { user } = useContext(AuthContext);
  const ref = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);
  const [qrCode, setQrCode] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const { setIsUserUpdated } = useIsUserUpdated();

  const router = useRouter();

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
        user.login,
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
  const handleVerify = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (code === "") {
        toast.error("CODE IS REQUIRED");
        return;
      }

      const response = await axios.post(
        `http://10.13.8.1:3001${API_ENDPOINTS.verifyTwoFa}`,
        { userLogin: user.login!, token: code },
        { withCredentials: true }
      );

      // Assuming the API sends a response indicating success or failure
      // You can adjust this based on the actual API response format
      // if (response.data.isValid) {
      // toast.success('WELCOME BACK');
      // location.replace('/');
      // rout

      router.push("/redirect");

      // or use router.push('/') if you are using a routing library
      // } else {
      // toast.error('CODE IS NOT VALID');
      handleShow(); // Show an error or additional info as needed
      // }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveName = async () => {
    try {
      setIsLoading(true);
      const updatedUser = await updateUserName(
        user.login,
        newName,
        API_ENDPOINTS.updateName
      );
      const updatedData = JSON.parse(updatedUser);
      setNewName(updatedData.name);
      setIsEditingName(false);
      toast.success("Name updated successfully!!!");
      setIsUserUpdated(true);
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

      if (user && user.login) {
        const userResult: userInformation = await getUserData(
          user.login,
          API_ENDPOINTS.getUserbyLogin
        );
        setUserInfo(userResult);
        setNewName(userResult.name);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [user.login]);

  return (
    <div>
      <SettingAvatar avatarUrl={userInfo?.avatar} />
      <hr className="mx-20 mt-10 mb-10  border-heading-stroke-30" />
      <div className=" flex flex-col mb-10 font-saira-condensed font-bold text-main-text justify-start pl-6">
        <div className="flex flx-row align-middle items-center justify-around ">
          <div className="text-xl w-full text-center"> Name:</div>
          {isEditingName ? (
            <div className="text-md truncate w-full text-center">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
          ) : (
            <div className="text-md truncate w-full text-center">{newName}</div>
          )}
          <div className="w-full text-center">
            {isEditingName ? (
              <button
                className="w-40 h-7 rounded-md items-center text-md bg-button-background"
                onClick={() => handleSaveName()}
              >
                Save
              </button>
            ) : (
              <button
                className="w-40 h-7 rounded-md items-center text-md bg-button-background"
                onClick={() => setIsEditingName(true)}
              >
                Edit Name
              </button>
            )}
          </div>
        </div>

        <br />
        <div className="flex flx-row align-middle items-center justify-around">
          <div className="text-xl w-full text-center "> 2FA :</div>
          <div className="text-md truncate w-full text-center ">
            {userInfo?.TFAEnabled ? "Activated" : "Not Activated"}
          </div>
          {/* <div className="col-span-1" /> */}
          <div className="w-full text-center">
            <button
              className="w-40 h-7 rounded-md items-center text-md bg-button-background"
              onClick={() => handleActivateTwoFa()}
            >
              Activate 2FA
            </button>
          </div>
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
              <Image
                src={qrCode}
                width={100}
                height={100}
                alt="qr code"
              ></Image>
            </div>
            <div className="flex justify-center mt-3 p-2 items-center rounded-md bg-search-box-fill w-full h-8 border-[0.5px] border-chat-search-stroke">
              <input
                className="bg-search-box-fill font-thin text-sm text-search-box-text w-40 h-full focus:outline-none hover:cursor-text"
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
              type="submit"
              onClick={(e) => handleVerify(e)}
              className="text-start-game font-saira-condensed font-bold text-xl h-18 w-60 border-2 border-aside-border rounded-2xl  p-4 bg-heading-fill hover:bg-[#111417] opacity-90 mx"
            >
              VERIFY
            </button>
          </Modal.Actions>
        </Modal>
      </div>
    </div>
  );
}

export default SettingDetails;

{
  /* <div className="grid grid-cols-5 mt-10"> */
}
{
  /* <div className="text-xl ml-10"> Email:</div> */
}
{
  /* <div className="text-md">{userInfo?.email}</div> */
}
{
  /* <div className="col-span-1" /> */
}
{
  /* </div> */
}
