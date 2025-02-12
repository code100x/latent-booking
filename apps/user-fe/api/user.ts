import { apiClient } from "./client";
import { UserValidationResponse } from "./types";

export const userApi = {
  validateUser: async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("No user ID found");
      }

      const response = await apiClient.get<UserValidationResponse>(
        "/get/get_user_dt",
        {
          params: { userid: userId },
        }
      );

      if (response.data.status === 200) {
        return response.data;
      } else {
        // If validation fails, clean up
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        throw new Error("User validation failed");
      }
    } catch (error) {
      // Clean up on any error
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      throw error;
    }
  },
};
