import api from "./axios";

export const fetchKpopGroups = async (search = '') => {
  const res = await api.get("/api/tour", { params: { search } });
  return res.data;
};

export const fetchConcertsByGroup = async (groupName) => {
  const res = await api.get(`/api/tour?group=${encodeURIComponent(groupName)}`);
  return res.data;
};

