/*-------------------------------------------------------------------*/
/*------------ All the Types required in Profile page ---------------*/
/*-------------------------------------------------------------------*/

import { TableRowData } from '../Table/types';
import { playerData } from '../commonTypes/types';

export interface ProfileInfoProps {
  name: string;
  email: string;
  score: number;
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
  inAGame: boolean;
  score: number;
  losses: number;
  wins: number;
  TFAEnabled: boolean;
  TFAVerified: boolean;
}

export interface ProfilePageProps {
  login: string | undefined;
}

export interface friendRelationDto {
  userLogin: string;
  friendLogin: string;
}

type DataGeneratorFunction = (login: string) => Promise<TableRowData[]>; 


export interface DataGeneratorMap {
  [key: string]: DataGeneratorFunction;
}