import axios from "axios";

const API_URL = "http://localhost:3000/get-random-words-map";

export const getRandomWordsMap = async (): Promise<Record<
  string,
  number
> | null> => {
  try {
    return axios.get(API_URL).then((response) => response.data);
  } catch (error) {
    return null;
  }
};
