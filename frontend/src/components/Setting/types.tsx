export interface SettingDetailsProps {
  name: string;
  email: string;
  Auth: string;
}

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
