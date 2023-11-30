import { getData } from "./api";
import { Game } from "@/components/GameComponents/types";

export const getGamesHistory = async (login: string, endpoint: string) => {
  try {
    const games: Game[] = await getData<Game[]>(login, endpoint);
    return games;
  } catch (error: any) {
    throw new Error(error.message);
  }
};