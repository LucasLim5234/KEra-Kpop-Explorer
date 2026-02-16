import api from "./axios";

export const csrf = async () => {
  try {
    await api.get("/sanctum/csrf-cookie");
  } catch (err) {
    console.error("CSRF request failed: ", err);
    throw err;
  }
}

export const register = async (form) => {
  try {
    await api.post("/register", form);
  } catch (err) {
    console.error("Register failed: ", err);
    throw err;
  }
}

export const login = async (email, password) => {
  try {
    await api.post("/login", { email, password });
  } catch (err) {
    console.error("Login failed: ", err);
    throw err;
  }
}

export const forgotPassword = async (email) => {
  try {
    await api.post("/forgot-password", { email });
  } catch (err) {
    console.error("Reset link sent failed: ", err);
  }
}

export const resetPassword = async (form) => {
  try {
    await api.post("/reset-password", form);
  } catch (err) {
    console.error("Reset password failed: ", err);
  }
}

export const logout = async () => {
  try {
    await api.post("/logout");
  } catch (err) {
    console.error("Logout failed: ", err);
    throw err;
  }
}

export const loadUser = async () => {
  try {
    const res = await api.get("/api/user");
    return res.data;
  } catch (err) {
    console.error("Load user failed: ", err);
    return null;
  }
}