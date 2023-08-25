
/*-------------------------------------------------------------------*/
/*-------------------------- Common Types --------------------------- */
/*-------------------------------------------------------------------*/

export type ImageData = {
  src: string;
  alt: string;
};

export type playerData = {
  username: string;
  score: number;
  profileImage: ImageData;
  rank: number;
  email: string;
};