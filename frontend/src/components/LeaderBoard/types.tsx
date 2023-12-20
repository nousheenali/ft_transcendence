
/*-------------------------------------------------------------------*/
/*------------ All the Types required in LeaderBoard page -----------*/
/*-------------------------------------------------------------------*/

import { userInformation } from "../Profile/types";


export interface PlayerInfoProps {
  userData: userInformation;
  rank: number;
  medal: string;
}

export interface TopPlayerProps {
  data: userInformation[];
}