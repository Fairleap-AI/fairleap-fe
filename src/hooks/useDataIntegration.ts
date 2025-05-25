import { useState, useEffect, useCallback } from 'react';
import { 
  tripAPI, 
  wellnessAPI, 
  authAPI,
  llmAPI,
  chatAPI,
  type TripStats, 
  type WellnessData,
  type WellnessLog,
  type FinancialAdvice,
  type WellnessAdvice,
  type InvestmentAdvice,
  type ChatMessage,
  type ChatResponse
} from '@/lib/apiService';

// Custom hook untuk mengintegrasikan data dari backend
export const useDataIntegration = () => {
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Data states - centralized untuk sinkronisasi antar page
  const [tripStats, setTripStats] = useState<TripStats[]>([]);
  const [wellnessData, setWellnessData] = useState<WellnessData[]>([]);
  const [financialAdvice, setFinancialAdvice] = useState<FinancialAdvice | null>(null);
  const [wellnessAdvice, setWellnessAdvice] = useState<WellnessAdvice | null>(null);
  const [investmentAdvice, setInvestmentAdvice] = useState<InvestmentAdvice | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Centralized data cache untuk sinkronisasi antar page
  const [dataCache, setDataCache] = useState({
    dailyStats: [] as TripStats[],
    monthlyStats: [] as TripStats[],
    yearlyStats: [] as TripStats[],
    lastUpdated: {
      daily: null as Date | null,
      monthly: null as Date | null,
      yearly: null as Date | null
    }
  });

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    setIsAuthenticated(authAPI.isAuthenticated());
  }, []);

  // Listen for authentication changes (localStorage changes)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(authAPI.isAuthenticated());
    };

    // Listen for localStorage changes in same tab
    window.addEventListener('storage', handleStorageChange);
    
    // Check for token changes periodically (for same-tab changes)
    const intervalId = setInterval(() => {
      const currentAuthState = authAPI.isAuthenticated();
      setIsAuthenticated(currentAuthState);
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  // Generic error handler
  const handleError = useCallback((error: any, context: string) => {
    console.error(`Error in ${context}:`, error);
    setError(error.message || `Failed to ${context}`);
    setIsLoading(false);
  }, []);

  // Load trip statistics dengan caching untuk sinkronisasi antar page
  const loadTripStats = useCallback(async (period: 'daily' | 'monthly' | 'yearly' = 'monthly', forceRefresh = false) => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return;
    }

    // Check cache validity (5 menit untuk data segar)
    const cacheKey = period;
    const lastUpdate = dataCache.lastUpdated[cacheKey];
    const isCacheValid = lastUpdate && 
      (new Date().getTime() - lastUpdate.getTime()) < 5 * 60 * 1000; // 5 menit

    if (!forceRefresh && isCacheValid && dataCache[`${period}Stats`].length > 0) {
      // Gunakan data cache
      setTripStats(dataCache[`${period}Stats`]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let response;
      switch (period) {
        case 'daily':
          response = await tripAPI.getDailyStats();
          break;
        case 'yearly':
          response = await tripAPI.getYearlyStats();
          break;
        default:
          response = await tripAPI.getMonthlyStats();
      }

      if (response.status === 'success') {
        const newData = response.data;
        setTripStats(newData);

        // Update cache untuk sinkronisasi antar page
        setDataCache(prev => ({
          ...prev,
          [`${period}Stats`]: newData,
          lastUpdated: {
            ...prev.lastUpdated,
            [period]: new Date()
          }
        }));

      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      handleError(error, 'load trip statistics');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, handleError, dataCache]);

  // Load wellness data
  const loadWellnessData = useCallback(async (period: 'daily' | 'monthly' | 'yearly' = 'daily') => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let response;
      switch (period) {
        case 'monthly':
          response = await wellnessAPI.getMonthlyStats();
          break;
        case 'yearly':
          response = await wellnessAPI.getYearlyStats();
          break;
        default:
          response = await wellnessAPI.getDailyStats();
      }
      
      if (response.status === 'success') {
        setWellnessData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      handleError(error, 'load wellness data');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, handleError]);

  // Submit wellness assessment
  const submitWellnessAssessment = useCallback(async (assessment: Omit<WellnessLog, 'timestamp'>) => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Calculate total score from wellness assessment
      const totalScore = (assessment.energy_level + assessment.stress_level + 
                         assessment.sleep_quality + assessment.physical_condition) / 4 * 100;

      const response = await wellnessAPI.submitWellness(totalScore);
      
      if (response.status === 'success') {
        // Reload wellness data after submission
        await loadWellnessData();
        return true;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      handleError(error, 'submit wellness assessment');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, handleError, loadWellnessData]);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authAPI.login(email, password);
      
      if (response.status === 'success') {
        setIsAuthenticated(true);
        return true;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      handleError(error, 'login');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  // Logout function
  const logout = useCallback(() => {
    authAPI.logout();
    setIsAuthenticated(false);
    // Clear all data
    setTripStats([]);
    setWellnessData([]);
    setFinancialAdvice(null);
    setWellnessAdvice(null);
    setInvestmentAdvice(null);
    setChatMessages([]);
  }, []);

  // Utility functions untuk transformasi data sesuai format backend
  const getWeeklyEarnings = useCallback(() => {
    if (!tripStats.length) return [];
    
    // Transform backend data for chart display
    return tripStats.slice(-7).map(stat => {
      // Handle different date formats from backend
      const dateKey = stat.date || stat.month || stat.year || new Date().toISOString();
      const earnings = stat.total_earnings / 1000; // Convert to thousands
      const trips = stat.total_trips;
      
      return {
        day: new Date(dateKey).toLocaleDateString('id-ID', { weekday: 'short' }),
        earnings,
        trips,
        bonus: Math.round(stat.total_tip / 1000) // Use tips as bonus
      };
    });
  }, [tripStats]);

  const getTotalStats = useCallback(() => {
    if (!tripStats.length) {
      return {
        totalEarnings: 0,
        totalTrips: 0,
        avgRating: 4.5, // Default rating
        totalHours: 0,
        avgEarningsPerTrip: 0
      };
    }

    const totals = tripStats.reduce((acc, stat) => ({
      totalEarnings: acc.totalEarnings + stat.total_earnings,
      totalTrips: acc.totalTrips + stat.total_trips,
      totalDistance: acc.totalDistance + stat.total_distance,
    }), { totalEarnings: 0, totalTrips: 0, totalDistance: 0 });

    return {
      ...totals,
      avgRating: 4.5, // TODO: Get from backend when available
      totalHours: Math.round(totals.totalDistance / 30), // Estimate hours based on distance (30km/h avg)
      avgEarningsPerTrip: totals.totalTrips > 0 ? totals.totalEarnings / totals.totalTrips : 0
    };
  }, [tripStats]);

  // Get financial advice from LLM
  const getFinancialAdvice = useCallback(async (
    pendapatan: number,
    pengeluaran: number,
    toleransi_risiko: string
  ) => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await llmAPI.getFinancialTips(pendapatan, pengeluaran, toleransi_risiko);
      
      if (response.status === 'success') {
        setFinancialAdvice(response.data);
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      handleError(error, 'get financial advice');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, handleError]);

  // Get wellness recommendations from LLM
  const getWellnessRecommendations = useCallback(async (
    energy_level: number,
    stress_level: number,
    sleep_quality: number,
    physical_condition: number
  ) => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await llmAPI.getWellnessAdvice(energy_level, stress_level, sleep_quality, physical_condition);
      
      if (response.status === 'success') {
        setWellnessAdvice(response.data);
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      handleError(error, 'get wellness recommendations');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, handleError]);

  // Get investment advice from LLM
  const getInvestmentAdvice = useCallback(async (
    pendapatan: number,
    pengeluaran: number,
    toleransi_risiko: string
  ) => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await llmAPI.getInvestmentAdvice(pendapatan, pengeluaran, toleransi_risiko);
      
      if (response.status === 'success') {
        setInvestmentAdvice(response.data);
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      handleError(error, 'get investment advice');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, handleError]);

  // Chat operations
  const createNewChat = useCallback(async (message: string) => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await chatAPI.createChat(message);
      
      if (response.status === 'success') {
        // Refresh chat list after creating new chat
        await loadChatList();
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      handleError(error, 'create new chat');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, handleError]);

  const loadChatList = useCallback(async () => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await chatAPI.getChatList();
      
      if (response.status === 'success') {
        setChatMessages(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      handleError(error, 'load chat list');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, handleError]);

  const replyToChat = useCallback(async (chatId: string, message: string) => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await chatAPI.replyToChat(chatId, message);
      
      if (response.status === 'success') {
        // Refresh chat list after reply
        await loadChatList();
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      handleError(error, 'reply to chat');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, handleError, loadChatList]);

  return {
    // State
    isLoading,
    error,
    isAuthenticated,
    tripStats,
    wellnessData,
    financialAdvice,
    wellnessAdvice,
    investmentAdvice,
    chatMessages,
    userProfile,

    // Actions
    loadTripStats,
    loadWellnessData,
    submitWellnessAssessment,
    getFinancialAdvice,
    getWellnessRecommendations,
    getInvestmentAdvice,
    createNewChat,
    loadChatList,
    replyToChat,
    login,
    logout,
    loadUserProfile: useCallback(async () => {
      // Mock implementation for now - could be extended to call backend profile API
      if (!isAuthenticated) {
        setError('Authentication required');
        return;
      }
      
      setIsLoading(true);
      try {
        // In a real implementation, this would call userAPI.getProfile()
        const mockProfile = {
          id: 'user123',
          email: 'driver@fairleap.com',
          name: 'John Driver',
          phone: '+62812345678',
          vehicle: {
            type: 'Motorcycle',
            brand: 'Honda',
            model: 'Vario 150',
            plate: 'B 1234 DEF'
          },
          rating: 4.8,
          joinDate: '2023-01-15',
          totalTrips: 1250,
          verificationStatus: 'verified'
        };
        setUserProfile(mockProfile);
      } catch (error) {
        handleError(error, 'load user profile');
      } finally {
        setIsLoading(false);
      }
    }, [isAuthenticated, handleError]),
    
    updateUserProfile: useCallback(async (profileData: any) => {
      if (!isAuthenticated) {
        setError('Authentication required');
        return false;
      }
      
      setIsLoading(true);
      try {
        // In a real implementation, this would call userAPI.updateProfile()
        setUserProfile((prev: any) => ({ ...prev, ...profileData }));
        return true;
      } catch (error) {
        handleError(error, 'update user profile');
        return false;
      } finally {
        setIsLoading(false);
      }
    }, [isAuthenticated, handleError]),

    // Computed data
    weeklyEarnings: getWeeklyEarnings(),
    totalStats: getTotalStats(),

    // Data cache & sync utilities
    getCachedData: (period: 'daily' | 'monthly' | 'yearly') => dataCache[`${period}Stats`],
    getLastUpdated: (period: 'daily' | 'monthly' | 'yearly') => dataCache.lastUpdated[period],
    forceRefresh: (period: 'daily' | 'monthly' | 'yearly') => loadTripStats(period, true),
    
    // Cache status
    cacheStatus: {
      daily: {
        hasData: dataCache.dailyStats.length > 0,
        lastUpdated: dataCache.lastUpdated.daily,
        isStale: dataCache.lastUpdated.daily ? 
          (new Date().getTime() - dataCache.lastUpdated.daily.getTime()) > 5 * 60 * 1000 : true
      },
      monthly: {
        hasData: dataCache.monthlyStats.length > 0,
        lastUpdated: dataCache.lastUpdated.monthly,
        isStale: dataCache.lastUpdated.monthly ? 
          (new Date().getTime() - dataCache.lastUpdated.monthly.getTime()) > 5 * 60 * 1000 : true
      },
      yearly: {
        hasData: dataCache.yearlyStats.length > 0,
        lastUpdated: dataCache.lastUpdated.yearly,
        isStale: dataCache.lastUpdated.yearly ? 
          (new Date().getTime() - dataCache.lastUpdated.yearly.getTime()) > 5 * 60 * 1000 : true
      }
    },

    // Utility
    clearError: () => setError(null),
  };
}; 