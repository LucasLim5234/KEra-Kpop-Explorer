import api from "./axios";

export const fetchQuizIdols = async () => {
	const res = await api.get("/api/quiz/idols");
	return res.data;
};

export const fetchQuizQuestions = async (idolId) => {
	const res = await api.get(`/api/quiz/${idolId}`);
	return res.data;
};

export const submitQuizAnswers = async (idolId, answers) => {
	const res = await api.post(`/api/quiz/${idolId}`, { answers });
	return res.data;
};

export const fetchQuizLeaderboard = async () => {
	const res = await api.get("/api/quiz-leaderboard");
	return res.data;
};
