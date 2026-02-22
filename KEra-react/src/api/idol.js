import api from "./axios";

export const readIdols = async (company, debut_year) => {
	const res = await api.get("/api/idol", { params: {company, debut_year} });
	return res.data;
};

export const readIdolDetail = async (id) => {
	const res = await api.get(`/api/idol/${id}`);
	return res.data;
};
