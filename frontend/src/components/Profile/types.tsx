/*-------------------------------------------------------------------*/
/*------------ All the Types required in Profile page ---------------*/
/*-------------------------------------------------------------------*/

export interface ProfileInfoProps {
  name: string;
  email: string;
  rank: string;
  activeButton: string;
  handleButtonClick: (buttonId: string) => void;
}

export interface ProfileNavBarProps {
  activeButton: string;
  handleButtonClick: (buttonId: string) => void;
}
