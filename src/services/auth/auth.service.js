// src/services/auth/auth.service.js
import api from "../api";

export const authService = {
  login: async ({ email, password }) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
 
    localStorage.setItem("authToken", response.data.access_token);
 
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