
import api from "./axios";

// Fetch idol list with optional filters
export const readIdols = async (company, debut_year) => {
	const res = await api.get("/api/idols", { params: {company, debut_year} });
	return res.data;
};

// Fetch idol detail by id
export const readIdolDetail = async (id) => {
	const res = await api.get(`/api/idols/${id}`);
	return res.data;
};

