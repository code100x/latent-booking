// Authentication related API calls
import { apiClient } from "./client";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
}

interface OtpVerificationParams {
  useremail: string;
  otp: string;
  device_id: string;
  mydeviceid?: string;
  mydeviceid2?: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },

  signup: async (data: SignupData) => {
    const response = await apiClient.post("/auth/signup", data);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },

  verifyToken: async () => {
    const response = await apiClient.get("/auth/verify");
    return response.data;
  },

  sendOtp: async (phone: string) => {
    const response = await apiClient.get(`/get/sendotp`, {
      params: { phone },
    });
    return response.data;
  },

  resentOtp: async (phone: string) => {
    const formData = new FormData();
    formData.append("mobile", phone);
    formData.append("type", "text");

    const response = await apiClient.post(
      `/post/resend_otp_with_call`,
      formData
    );
    return response.data;
  },

  verifyOtp: async (params: OtpVerificationParams) => {
    const response = await apiClient.get(`/get/otpverify`, {
      params: params,
    });
    return response.data;
  },
};
