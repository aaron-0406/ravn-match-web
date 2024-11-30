import axiosClient from "../utils/api/clientAxios";

const API = axiosClient.getUri();

const url = `${API}/tech-stack`;

export const getListTechStacks = async () => {
  return await axiosClient.get(`${url}`);
};
