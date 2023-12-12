export interface SettingDetailsProps {
  name: string;
  Auth: string;
}

export type UpdateName = {
  login: string;
  name: string;
};

export type UpdateImg = {
  login: string;
  avatar: string;
};

export type ActivateTwoFaResponse = {
  qrCodeUrl?: string;
};


export interface twoFaDto {
  userLogin: string;
}

export interface verifyTwoFaDto {
  userLogin: string;
  token: string;
}
