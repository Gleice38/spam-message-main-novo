// src/services/auth/auth.service.js
import api from "../api";

export const authService = {
  login: async ({ email, password }) => {
    const response = await api.post("/api/v1/auth/login", {
      email,
      password,
    });

    return response.data;
  },


 logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("onboardingCompleted");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },
};