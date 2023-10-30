/*-------------------------------------------------------------------*/
/*------------ All the Types required in Profile page ---------------*/
/*-------------------------------------------------------------------*/

import { TableRowData } from '../Table/types';
import { playerData } from '../commonTypes/types';

export interface ProfileInfoProps {
  name: string;
  email: string;
  rank: string;
  avatar: string;
  activeButton: string;
  handleButtonClick: (buttonId: string) => void;
}

export interface ProfileNavBarProps {
  activeButton: string;
  handleButtonClick: (buttonId: string) => void;
}

export interface userInformation {
  id: string;
  login: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  isOnline: boolean;
  score: number;
  TFAVerified: boolean;
  TFAEnabled: boolean;
}

export interface ProfilePageProps {
  userInfo: userInformation;
}

export interface friendRelationDto {
  userLogin: string;
  friendLogin: string;
}
