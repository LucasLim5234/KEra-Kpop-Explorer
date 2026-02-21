import api from "./axios";

// Get all idols with quiz attempt status
export const fetchQuizIdols = async () => {
	const res = await api.get("/api/quiz/idols");
	return res.data;
};

// Get 10 quiz questions for a group
export const fetchQuizQuestions = async (idolId) => {
	const res = await api.get(`/api/quiz/${idolId}`);
	return res.data;
};

// Submit quiz answers for a group
export const submitQuizAnswers = async (idolId, answers) => {
	const res = await api.post(`/api/quiz/${idolId}`, { answers });
	return res.data;
};

// Get leaderboard and current user's score
export const fetchQuizLeaderboard = async () => {
	const res = await api.get("/api/quiz-leaderboard");
	return res.data;
};
