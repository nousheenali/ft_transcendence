
/*-------------------------------------------------------------------*/
/*-------------------------- Common Types --------------------------- */
/*-------------------------------------------------------------------*/

export type ImageInformation = {
  src: string;
  alt: string;
};

export type playerInformation = {
  username: string;
  score: number;
  profileImage: ImageInformation;
  rank: number;
  email: string;
};