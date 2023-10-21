import { userInformation } from '@/components/Profile/types';
import { getData } from './api';

export const getUserData = async (login: string, endpoint: string) => {
  try {
    const user: userInformation = await getData<userInformation>(
      login,
      endpoint
    );
    return user;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
