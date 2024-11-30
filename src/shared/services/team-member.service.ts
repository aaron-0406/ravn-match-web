import axiosClient from "../utils/api/clientAxios";

const API = axiosClient.getUri();

const url = `${API}/team-member`;

export const getListTeamMembers = async (
  techStacks: Array<string>,
  topics: Array<string>,
  seniority: string,
  englishLevel: string
) => {
  return await axiosClient.post(`${url}`, {
    requiredSeniority: seniority,
    requiredEnglishLevel: englishLevel,
    topics,
    techStack: techStacks,
  });
};
