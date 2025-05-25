// API Service untuk Fairleap Backend Integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.fairleap.cloud';

// Types untuk API responses
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data: T;
}

export interface AuthResponse {
  email: string;
  token: string;
}

// Sesuai dengan response dari backend
export interface TripStats {
  date?: string;
  month?: string; 
  year?: string;
  total_distance: number;
  total_fare: number;
  total_tip: number;
  total_earnings: number;
  total_trips: number;
}

export interface WellnessData {
  date?: string;
  month?: string;
  year?: string;
  total_score: number;
  total_test: number;
  avg_score: number;
}

export interface WellnessLog {
  energy_level: number;
  stress_level: number;
  sleep_quality: number;
  physical_condition: number;
  timestamp: string;
}

export interface FinancialAdvice {
  saving_strategies: string;
  investment_strategies: string;
  insurance_strategies: string;
}

export interface WellnessAdvice {
  rest_advice: string;
  hydration_tip: string;
  relaxation_techniques: string[];
  wellness_score: number;
  general_wellness_status: string;
}

export interface InvestmentAdvice {
  [instrumentName: string]: {
    minimum_invest: string;
    expected_return: string;
    risk_category: string;
  };
}

export interface ChatMessage {
  id?: string;
  message: string;
  response?: string;
  timestamp: string;
}

export interface ChatResponse {
  query: string;
  response: string;
  messages: any[];
}

// Utility untuk membuat authenticated request
const createAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Get token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
};

// Save token to localStorage
const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
};

// Remove token from localStorage
const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
};

// Generic API call function
const apiCall = async <T>(
  url: string,
  options: RequestInit = {},
  useAuthToken = true
): Promise<ApiResponse<T>> => {
  try {
    const token = useAuthToken ? getAuthToken() : null;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...createAuthHeaders(token || undefined),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Authentication API calls
export const authAPI = {
  // Email verification
  verifyEmail: async (email: string): Promise<ApiResponse> => {
    return apiCall(`${API_BASE_URL}/user/auth/email/verify`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    }, false);
  },

  // User registration
  register: async (email: string, password: string): Promise<ApiResponse<AuthResponse>> => {
    return apiCall(`${API_BASE_URL}/user/auth/email/register`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }, false);
  },

  // User login
  login: async (email: string, password: string): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiCall<AuthResponse>(`${API_BASE_URL}/user/auth/email/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }, false);

    // Save token if login successful
    if (response.status === 'success' && response.data.token) {
      setAuthToken(response.data.token);
    }

    return response;
  },

  // Refresh token
  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    const response = await apiCall<{ token: string }>(`${API_BASE_URL}/user/auth/refresh-token`, {
      method: 'GET',
    });

    // Update token if refresh successful
    if (response.status === 'success' && response.data.token) {
      setAuthToken(response.data.token);
    }

    return response;
  },

  // Logout
  logout: (): void => {
    removeAuthToken();
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!getAuthToken();
  },

  // Get Google OAuth URL
  getGoogleOAuthUrl: (): string => {
    return `${API_BASE_URL}/user/auth/google`;
  },
};

// Trip/Stats API calls
export const tripAPI = {
  // Create new trip
  createTrip: async (tripData: any): Promise<ApiResponse> => {
    return apiCall(`${API_BASE_URL}/service/trip/new`, {
      method: 'POST',
      body: JSON.stringify(tripData),
    });
  },

  // Get daily stats
  getDailyStats: async (): Promise<ApiResponse<TripStats[]>> => {
    return apiCall(`${API_BASE_URL}/service/trip/stats/daily`, {
      method: 'GET',
    });
  },

  // Get monthly stats
  getMonthlyStats: async (): Promise<ApiResponse<TripStats[]>> => {
    return apiCall(`${API_BASE_URL}/service/trip/stats/monthly`, {
      method: 'GET',
    });
  },

  // Get yearly stats
  getYearlyStats: async (): Promise<ApiResponse<TripStats[]>> => {
    return apiCall(`${API_BASE_URL}/service/trip/stats/yearly`, {
      method: 'GET',
    });
  },

  // Predict earnings
  predictEarnings: async (predictionData: any): Promise<ApiResponse> => {
    return apiCall(`${API_BASE_URL}/service/predict/earnings`, {
      method: 'POST',
      body: JSON.stringify(predictionData),
    });
  },
};

// LLM API calls (AI terintegrasi di backend)
export const llmAPI = {
  // Get financial tips
  getFinancialTips: async (
    pendapatan: number,
    pengeluaran: number,
    toleransi_risiko: string
  ): Promise<ApiResponse<FinancialAdvice>> => {
    return apiCall(`${API_BASE_URL}/service/llm/fin_tips`, {
      method: 'POST',
      body: JSON.stringify({
        pendapatan,
        pengeluaran,
        toleransi_risiko,
      }),
    });
  },

  // Get wellness recommendations (SATU-SATUNYA endpoint wellness yang digunakan)
  getWellnessAdvice: async (
    energy_level: number,
    stress_level: number,
    sleep_quality: number,
    physical_condition: number
  ): Promise<ApiResponse<WellnessAdvice>> => {
    return apiCall(`${API_BASE_URL}/service/llm/wellness`, {
      method: 'POST',
      body: JSON.stringify({
        energy_level,
        stress_level,
        sleep_quality,
        physical_condition,
      }),
    });
  },

  // Get investment advice
  getInvestmentAdvice: async (
    pendapatan: number,
    pengeluaran: number,
    toleransi_risiko: string
  ): Promise<ApiResponse<InvestmentAdvice>> => {
    return apiCall(`${API_BASE_URL}/service/llm/invest`, {
      method: 'POST',
      body: JSON.stringify({
        pendapatan,
        pengeluaran,
        toleransi_risiko,
      }),
    });
  },
};

// Chat API calls
export const chatAPI = {
  // Create new chat
  createChat: async (message: string): Promise<ApiResponse<ChatResponse>> => {
    return apiCall(`${API_BASE_URL}/service/chat/create`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },

  // Get list of all chats
  getChatList: async (): Promise<ApiResponse<ChatMessage[]>> => {
    return apiCall(`${API_BASE_URL}/service/chat/list`, {
      method: 'GET',
    });
  },

  // Read specific chat
  readChat: async (chatId: string): Promise<ApiResponse<ChatMessage>> => {
    return apiCall(`${API_BASE_URL}/service/chat/read/${chatId}`, {
      method: 'GET',
    });
  },

  // Reply to chat
  replyToChat: async (chatId: string, message: string): Promise<ApiResponse<ChatResponse>> => {
    return apiCall(`${API_BASE_URL}/service/chat/reply`, {
      method: 'PUT',
      body: JSON.stringify({
        chatId,
        message,
      }),
    });
  },
};

// User Profile API calls
export const userAPI = {
  // Get user profile
  getProfile: async (): Promise<ApiResponse<any>> => {
    return apiCall(`${API_BASE_URL}/user/profile`, {
      method: 'GET',
    });
  },

  // Update user profile
  updateProfile: async (profileData: any): Promise<ApiResponse<any>> => {
    return apiCall(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Upload profile picture
  uploadProfilePicture: async (file: File): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    formData.append('profile_picture', file);
    
    return apiCall(`${API_BASE_URL}/user/profile/picture`, {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it
      },
    });
  },
};

// Export utility functions
export { getAuthToken, setAuthToken, removeAuthToken }; 