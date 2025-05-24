const BASE_URL = "https://api.fairleap.cloud";

export interface ApiResponse<T = any> {
  status: "success" | "error";
  message: string;
  data: T;
}

export interface EmailVerifyResponse {
  verificationCheck: string;
}

export interface EmailVerificationStatus {
  email: string;
  isVerified: boolean;
}

export interface RegisterResponse {
  email: string;
  token: string;
}

export interface LoginResponse {
  email: string;
  token: string;
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async verifyEmail(email: string): Promise<ApiResponse<EmailVerifyResponse>> {
    return this.request<EmailVerifyResponse>("/user/auth/email/verify", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async checkEmailVerification(
    token: string
  ): Promise<ApiResponse<EmailVerificationStatus>> {
    const response = await fetch(
      `${BASE_URL}/user/auth/email/activation?token=${token}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async register(
    email: string,
    password: string
  ): Promise<ApiResponse<RegisterResponse>> {
    return this.request<RegisterResponse>("/user/auth/email/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>("/user/auth/email/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    return this.request("/user/auth/email/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async changePassword(password: string, token: string): Promise<ApiResponse> {
    return this.request("/user/auth/email/change-password", {
      method: "POST",
      body: JSON.stringify({ password, token }),
    });
  }

  getGoogleOAuthUrl(): string {
    return `${BASE_URL}/user/auth/google`;
  }
}

export const apiClient = new ApiClient();
