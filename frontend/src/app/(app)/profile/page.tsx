import React from 'react';
import ProfileInfo from '@/components/Profile/ProfileInfo/ProfileInfo';
import ResponsiveTable from '@/components/Table/Table';

export default function Profile() {
  const profileHeadings = [
    'Friend',
    'Score',
    'Games',
    'Wins',
    'Losses',
    'Chat',
    'Block',
    'Delete',
  ];
  const generateProfileData = (numRecords = 100) => {
    const records = [];

    for (let i = 1; i <= numRecords; i++) {
      records.push([
        { playerName: `Player${i}`, img: `/av1.svg`, name: `Name${i}` },
        `${1900 + i}`, // Score, this increases by 1 for each record as an example
        `${Math.floor(Math.random() * 20) + 1}`, // Games, random number between 1-20
        `${Math.floor(Math.random() * 15) + 1}`, // Wins, random number between 1-15
        `${Math.floor(Math.random() * 10) + 1}`, // Losses, random number between 1-10
        { iconName: 'icon1', iconImg: '/crown.svg' },
        { iconName: 'icon2', iconImg: '/crown.svg' },
        { iconName: 'icon3', iconImg: '/crown.svg' },
      ]);
    }

    return records;
  };

  const profileData = generateProfileData();

  return (
    <>
      <div className="w-full h-full text-center text-white flex flex-col p-6">
        <ProfileInfo name="UserName" email="username@email.com" rank="12" />
        <div className="h-full mt-[10px] ">
          <ResponsiveTable
            headings={profileHeadings}
            data={profileData}
            maxHeight="520px"
          ></ResponsiveTable>
        </div>
      </div>
    </>
  );
}
