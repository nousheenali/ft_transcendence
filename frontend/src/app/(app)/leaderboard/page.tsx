import React from 'react';
import TopPlayer from '@/components/TopPlayer';

export default function Leaderboard() {
  return (
    <div className="container mx-auto p-6">
      <TopPlayer />
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Top Player Heading With Icon
        </h1>
      </div>
      <div className="mb-6 w-full flex justify-center items-center">
        <div className="flex space-x-20">
          <div className="flex items-center space-x-4 relative flex-1">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 relative">
              {/* Avatar Image */}
              <div className="absolute w-4 h-4 bg-red-500 rounded-full right-0 bottom-0"></div>
            </div>
            <div>
              <p className="font-semibold">Player 1</p>
              <p className="font-semibold">1900</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 relative flex-1">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 relative">
              {/* Avatar Image */}
              <div className="absolute w-4 h-4 bg-red-500 rounded-full right-0 bottom-0"></div>
            </div>
            <div>
              <p className="font-semibold">Player 1</p>
              <p className="font-semibold">1900</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 relative flex-1">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 relative">
              {/* Avatar Image */}
              <div className="absolute w-4 h-4 bg-red-500 rounded-full right-0 bottom-0"></div>
            </div>
            <div>
              <p className="font-semibold">Player 1</p>
              <p className="font-semibold">1900</p>
            </div>
          </div>
          {/* Repeat for other players */}
        </div>
        {/* Repeat for other players */}
      </div>
      <h2 className="text-xl font-bold mb-4 text-center mt-10">
        Leaderboard Heading with icon{' '}
      </h2>
      <table className="w-full bg-black text-white border border-white">
        <thead className="border border-white">
          <tr>
            <th className="py-2 px-4 text-center bg-black text-white shadow-md">
              Player
            </th>
            <th className="py-2 px-4 text-center bg-black text-white shadow-md">
              Rank
            </th>
            <th className="py-2 px-4 text-center bg-black text-white shadow-md">
              Score
            </th>
            <th className="py-2 px-4 text-center bg-black text-white shadow-md">
              Games
            </th>
            <th className="py-2 px-4 text-center bg-black text-white shadow-md">
              Wins
            </th>
            <th className="py-2 px-4 text-center bg-black text-white shadow-md">
              Losses
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 text-center">Player 1</td>
            <td className="py-2 px-4 text-center">1</td>
            <td className="py-2 px-4 text-center">1900</td>
            <td className="py-2 px-4 text-center">10</td>
            <td className="py-2 px-4 text-center">7</td>
            <td className="py-2 px-4 text-center">3</td>
          </tr>
          <tr>
            <td className="py-2 px-4 text-center">Player 1</td>
            <td className="py-2 px-4 text-center">1</td>
            <td className="py-2 px-4 text-center">1900</td>
            <td className="py-2 px-4 text-center">10</td>
            <td className="py-2 px-4 text-center">7</td>
            <td className="py-2 px-4 text-center">3</td>
          </tr>
          <tr>
            <td className="py-2 px-4 text-center">Player 1</td>
            <td className="py-2 px-4 text-center">1</td>
            <td className="py-2 px-4 text-center">1900</td>
            <td className="py-2 px-4 text-center">10</td>
            <td className="py-2 px-4 text-center">7</td>
            <td className="py-2 px-4 text-center">3</td>
          </tr>
          {/* Repeat for other players */}
        </tbody>
      </table>
    </div>
  );
}
