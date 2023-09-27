import { userInformation } from "@/components/Profile/types";


// const backendUrl = "http://localhost:3001";
const backendUrl = process.env.NESTJS_URL;
export const getData = async (
  id: string,
  endpoint: string
) => {
  const apiUrl = `${backendUrl}${endpoint}${id}`;
  const response = await fetch(apiUrl);
  const records = await response.json();
  return records;
};
