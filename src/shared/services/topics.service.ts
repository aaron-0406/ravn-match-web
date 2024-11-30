import axiosClient from "../utils/api/clientAxios";

const API = axiosClient.getUri();

const url = `${API}/topic`;

export const getListTopics = async () => {
  return await axiosClient.get(`${url}`);
};
