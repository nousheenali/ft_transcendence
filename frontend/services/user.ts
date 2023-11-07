import { userInformation } from '@/components/Profile/types';
import { getData,  postData,  updateData, postDataWithImage } from './api';
import { SettingDetailsProps, UpdateName, UpdateImg } from '@/components/Setting/types';

export const getUserData = async (login: string, endpoint: string) => {
  try {
    const user: userInformation = await getData<userInformation>(
      login,
      endpoint
    );
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateUserName = async (login: string, newName: string, endpoint: string) => {
  try {
    const data : UpdateName = {
      login: login,
      name: newName
    };
    return updateData(data, endpoint+login);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateUserImg = async (login: string, newAvatar: File, endpoint: string) => {
  try {
    const formData = new FormData();
    formData.append('file', newAvatar); // Assuming 'file' is the field name expected by the server

    return postDataWithImage(formData, endpoint + login);
  } catch (error: any) {
    throw new Error(error.message);
  }
};