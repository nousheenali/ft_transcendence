import React from 'react'
import Image from 'next/image';

interface ProfileInfoProps{
  name: string;
  email: string;
  rank: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = (props) => {
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-center items-center space-x-4 h-[40px] bg-heading-fill rounded-t-2xl border-[1px] border-heading-stroke">
          <div>
            <h1 className="font-saira-condensed font-bold text-xl text-main-text">
              Profile
            </h1>
          </div>
          <div>
            <Image
              height={25}
              width={25}
              src="/profile.svg"
              alt="profile icon"
            />
          </div>
        </div>
        <div className="flex flex-row h-[130px] border-b rounded-b-lg border-[#7a8a27]">
          <div className="flex flex-shrink-0 w-1/5 justify-center">
            <img height={100} width={100} src="/av1.svg" alt="avatar" />
          </div>
          <div className="bg-slate-400 w-4/5 border-2 rounded-xl ml-2 mt-5 mb-5 mr-10 p-8">
            <ul>
              <li> Name:</li>
              <li> Email:</li>
              <li> Rank:</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row h-[35px] border-b rounded-b-lg border-[#7a8a27]">
          PROFILE NAV
        </div>
      </div>
    </>
  );
}

export default ProfileInfo;
