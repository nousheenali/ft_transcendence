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
import { getUserData, updateUserName } from "../../../services/user";
import SettingAvatar from "@/components/Setting/SettingAvatar/SettingAvatar";
import { AuthContext } from "@/context/AuthProvider";
import { activateTwoFa, verifyTwoFa } from "../../../services/two-fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useIsUserUpdated } from "@/context/store";

function SettingDetails({ name, Auth }: SettingDetailsProps) {
  const { user, setUserUpdated } = useContext(AuthContext);
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
        `${process.env.NEXT_PUBLIC_BACKEND}${API_ENDPOINTS.verifyTwoFa}`,
        { userLogin: user.login!, token: code },
        { withCredentials: true }
      );
      setUserUpdated(response.data.user);
      router.push("/");
      // }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivateTwofa = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (code === "") {
        toast.error("CODE IS REQUIRED");
        return;
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}${API_ENDPOINTS.verifyTwoFa}`,
        { userLogin: user.login!, token: code },
        { withCredentials: true }
      );

      const responsedeactivate = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}${API_ENDPOINTS.deactivateTwoFa}`,
        { userLogin: user.login!, token: code },
        { withCredentials: true }
      );
      console.log("done");
      setUserUpdated(responsedeactivate.data.user);
      toast.success("De-activate successfully");
      router.push("/");
      // }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const [userInfo, setUserInfo] = useState<userInformation>();

  const handleSaveName = async () => {
    try {
      setIsLoading(true);
      if (newName === "") {
        toast.error("Name cannot be empty");
        return;
      }
      const updatedUser = await updateUserName(
        user.login,
        newName,
        API_ENDPOINTS.updateName
      );
      const updatedData = JSON.parse(updatedUser);

      setUserInfo((prevUserInfo) => {
        const updatedUserInfo = { ...prevUserInfo, ...updatedData };
        setNewName(updatedUserInfo.name);
        return updatedUserInfo;
      });

      if (updatedData.name !== userInfo?.name) {
        setIsEditingName(false);
        toast.success("Name updated successfully!!!");
        setIsUserUpdated(true);
      } else {
        toast.warning("No change. Name is the same.");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEditName = () => {
    setNewName(userInfo?.name || "");
    setIsEditingName(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (user && user.login) {
        try {
          const userResult: userInformation = await getUserData(
            user.login,
            API_ENDPOINTS.getUserbyLogin
          );

          setUserInfo((prevUserInfo) => {
            const updatedUserInfo = { ...prevUserInfo, ...userResult };
            setNewName(updatedUserInfo.name);
            return updatedUserInfo;
          });
        } catch (error) {
          console.error(error);
        }
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
        <div className="flex flex-row align-middle items-center justify-around ">
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
              <>
                <button
                  className="w-20 h-7 rounded-md items-center text-md bg-button-background"
                  onClick={() => handleSaveName()}
                >
                  Save
                </button>
                <button
                  className="w-20 h-7 ml-2 rounded-md items-center text-md bg-button-background"
                  onClick={handleCancelEditName}
                >
                  Cancel
                </button>
              </>
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
          <div className="w-full text-center">
            <button
              className="w-40 h-7 rounded-md items-center text-md bg-button-background"
              onClick={(e) => {
                userInfo?.TFAEnabled ? handleShow() : handleActivateTwoFa();
              }}
            >
              {userInfo?.TFAEnabled ? " De-activate 2FA" : " Activate 2FA"}
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
            {user?.TFAEnabled ? (
              ""
            ) : (
              <div className="flex flex-row justify-center align-center">
                <Image
                  src={qrCode}
                  width={100}
                  height={100}
                  alt="qr code"
                ></Image>
              </div>
            )}

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
              onClick={(e) =>
                userInfo?.TFAEnabled
                  ? handleDeactivateTwofa(e)
                  : handleVerify(e)
              }
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
