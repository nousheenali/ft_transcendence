import React from 'react';
import TopPlayer from '@/components/TopPlayer/TopPlayer';

export default function Leaderboard() {
  return (
    <div className="container mx-auto p-6">
      <TopPlayer />
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
