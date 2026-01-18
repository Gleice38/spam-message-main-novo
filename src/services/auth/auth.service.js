// src/services/auth/auth.service.js
import api from "../api";

export const authService = {
  login: async ({ email, password }) => {
    // MOCK TEMPORÁRIO PARA FUNCIONAR SEM BACKEND
    console.log("Login mockado para:", email);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay
    
    const mockResponse = {
        access_token: "mock-token-123456",
        token_type: "bearer"
    };

    localStorage.setItem("authToken", mockResponse.access_token);
    return mockResponse;

    /* CÓDIGO ORIGINAL COMENTADO
    const response = await api.post("/auth/login", {
      email,
      password,
    });
 
    localStorage.setItem("authToken", response.data.access_token);
 
    return response.data;
    */
  },


 logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("onboardingCompleted");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },
};