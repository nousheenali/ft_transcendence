import React, { useContext, useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../../../config/apiEndpoints";
import { updateUserImg } from "../../../../services/user";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthProvider";
import { useIsUserUpdated } from "@/context/store";

export default function SettingAvatar({ avatarUrl }: any) {
  // const { data: session } = useSession();
  const {user} = useContext(AuthContext);
  const [newAva, setNewAva] = useState(avatarUrl);
  const {setIsUserUpdated } = useIsUserUpdated();

  const handleSaveImg = async (newAvatar: File) => {
    try {
      const updatedUser = await updateUserImg(user.login!, newAvatar,  API_ENDPOINTS.updateAvatar);
      const updatedData = JSON.parse(updatedUser);
      setNewAva(updatedData.avatar);
      toast.success("Avatar updated successfully!!!");
      setIsUserUpdated(true);
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const handleEditAvatarClick = () => {
    const avatarInput = document.getElementById("avatar-input");
    if (avatarInput) {
      avatarInput.click(); 
    }
  };

  useEffect(() => {
    if ( newAva !== avatarUrl ) {
      setNewAva(avatarUrl);
    }
  }, [avatarUrl]);

  return (
    <div className="flex flex-row mt-10">
      <input
        type="file"
        id="avatar-input"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            handleSaveImg(selectedFile);
          }
        }}
      />
      <div className="flex w-1/5 ml-20 justify-between items-center ">
        <img
          className="w-24 h-24 rounded-full object-cover cursor-pointer"
          src={newAva}
          alt="avatar"
          /> 
        <button
          className="w-32 h-7 rounded-md font-saira-condensed font-bold text-main-text bg-button-background"
          onClick={() => handleEditAvatarClick()}
          >
          Edit Avatar
        </button>
      </div>
    </div>
  );
}