export interface SettingDetailsProps {
  name: string;
  email: string;
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
