import { twoFaDto, verifyTwoFaDto } from '@/components/Setting/types';
import { postData } from './api';


export const activateTwoFa = async (login: string, endpoint: string) => {
  try {
    const data: twoFaDto = {
      userLogin: login,
    };
    return postData<twoFaDto>(data, endpoint);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const verifyTwoFa = async (
  login: string,
  code: string,
  endpoint: string
) => {
  try {
    const data: verifyTwoFaDto = {
      userLogin: login,
      token: code,
    };
    return postData<verifyTwoFaDto>(data, endpoint);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
