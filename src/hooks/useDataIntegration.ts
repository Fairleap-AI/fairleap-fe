import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  tripAPI, 
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

// CACHE VALIDITY - 30 menit untuk mengurangi API calls
const CACHE_VALIDITY = 30 * 60 * 1000; // 30 menit

// Global cache object untuk shared state antar page
let globalDataCache = {
  tripStats: {
    daily: [] as TripStats[],
    monthly: [] as TripStats[],
    yearly: [] as TripStats[]
  },
  financialAdvice: null as FinancialAdvice | null,
  wellnessAdvice: null as WellnessAdvice | null,
  investmentAdvice: null as InvestmentAdvice | null,
  lastUpdated: {
    tripStats: null as Date | null,
    financialAdvice: null as Date | null,
    wellnessAdvice: null as Date | null,
    investmentAdvice: null as Date | null
  }
};

// Custom hook untuk mengintegrasikan data dari backend dengan PROPER CACHE
export const useDataIntegration = () => {
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Data states - menggunakan global cache untuk sinkronisasi antar page
  const [tripStats, setTripStats] = useState<TripStats[]>(globalDataCache.tripStats.monthly);
  const [financialAdvice, setFinancialAdvice] = useState<FinancialAdvice | null>(globalDataCache.financialAdvice);
  const [wellnessAdvice, setWellnessAdvice] = useState<WellnessAdvice | null>(globalDataCache.wellnessAdvice);
  const [investmentAdvice, setInvestmentAdvice] = useState<InvestmentAdvice | null>(globalDataCache.investmentAdvice);
  
  // Wellness data disimpan di localStorage, tidak di backend
  const [wellnessData, setWellnessData] = useState<WellnessLog[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);

  // State untuk tracking data kosong
  const [hasEmptyData, setHasEmptyData] = useState(false);
  const [dataCheckCompleted, setDataCheckCompleted] = useState(false);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasInitialDataCheck, setHasInitialDataCheck] = useState(false);

  // Ref untuk tracking component mount
  const isMounted = useRef(true);

  // Check authentication status on mount (client-side only)
  useEffect(() => {
    // Pastikan hanya berjalan di client-side
    if (typeof window !== 'undefined') {
      const isAuth = authAPI.isAuthenticated();
      setIsAuthenticated(isAuth);
      
      // Load data dari global cache jika ada
      if (isAuth) {
        setTripStats(globalDataCache.tripStats.monthly);
        setFinancialAdvice(globalDataCache.financialAdvice);
        setWellnessAdvice(globalDataCache.wellnessAdvice);
        setInvestmentAdvice(globalDataCache.investmentAdvice);
        
        // Initial data check hanya jika belum pernah dilakukan
        if (!hasInitialDataCheck) {
          setHasInitialDataCheck(true);
          setTimeout(() => {
            if (isMounted.current) {
              checkUserDataAvailability();
              // Load trip stats jika cache kosong
              if (globalDataCache.tripStats.monthly.length === 0) {
                console.log('🔄 Loading initial trip stats...');
                loadTripStats('monthly', false);
              }
            }
          }, 100);
        }
      }
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  // Listen for authentication changes - TANPA auto sync
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = () => {
      const newAuthState = authAPI.isAuthenticated();
      setIsAuthenticated(newAuthState);
      
      if (!newAuthState) {
        // Reset states dan clear cache saat logout
        setHasInitialDataCheck(false);
        setDataCheckCompleted(false);
        setHasEmptyData(false);
        clearAllCache();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check for token changes - REDUCED frequency
    const intervalId = setInterval(() => {
      const currentAuthState = authAPI.isAuthenticated();
      if (currentAuthState !== isAuthenticated) {
        setIsAuthenticated(currentAuthState);
        
        if (!currentAuthState) {
          setHasInitialDataCheck(false);
          setDataCheckCompleted(false);
          setHasEmptyData(false);
          clearAllCache();
        }
      }
    }, 5000); // 5 detik, bukan 1 detik

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, [isAuthenticated]);

  // Helper function untuk check cache validity
  const isCacheValid = useCallback((cacheKey: keyof typeof globalDataCache.lastUpdated) => {
    const lastUpdate = globalDataCache.lastUpdated[cacheKey];
    return lastUpdate && (new Date().getTime() - lastUpdate.getTime()) < CACHE_VALIDITY;
  }, []);

  // Helper function untuk clear all cache
  const clearAllCache = useCallback(() => {
    globalDataCache = {
      tripStats: { daily: [], monthly: [], yearly: [] },
      financialAdvice: null,
      wellnessAdvice: null,
      investmentAdvice: null,
      lastUpdated: {
        tripStats: null,
        financialAdvice: null,
        wellnessAdvice: null,
        investmentAdvice: null
      }
    };
    setTripStats([]);
    setFinancialAdvice(null);
    setWellnessAdvice(null);
    setInvestmentAdvice(null);
  }, []);

  // Generic error handler
  const handleError = useCallback((error: any, context: string) => {
    console.error(`Error in ${context}:`, error);
    setError(error.message || `Failed to ${context}`);
    setIsLoading(false);
  }, []);

  // Load trip statistics dengan PROPER CACHE
  const loadTripStats = useCallback(async (period: 'daily' | 'monthly' | 'yearly' = 'monthly', forceRefresh = false) => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return;
    }

    // Check cache validity
    if (!forceRefresh && isCacheValid('tripStats') && globalDataCache.tripStats[period].length > 0) {
      // Gunakan data cache tanpa API call
      setTripStats(globalDataCache.tripStats[period]);
      console.log(`📦 Using cached ${period} trip stats`);
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
        console.log(`🔄 API Response for ${period}:`, newData);
        
        // Update global cache untuk shared state antar page
        globalDataCache.tripStats[period] = newData;
        globalDataCache.lastUpdated.tripStats = new Date();
        
        // Update local state
        setTripStats(newData);
        
        console.log(`🔄 Loaded fresh ${period} trip stats from API, updated tripStats:`, newData);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      handleError(error, 'load trip statistics');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, handleError, isCacheValid]);

  // Load wellness data dari localStorage (tidak dari backend)
  const loadWellnessData = useCallback(async (period: 'daily' | 'monthly' | 'yearly' = 'daily') => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Load wellness data dari localStorage (client-side only)
      let wellnessLogs: WellnessLog[] = [];
      if (typeof window !== 'undefined') {
        const storedWellnessData = localStorage.getItem('fairleap_wellness_data');
        if (storedWellnessData) {
          try {
            const parsedData = JSON.parse(storedWellnessData);
            // Pastikan parsedData adalah array
            wellnessLogs = Array.isArray(parsedData) ? parsedData : [];
          } catch (parseError) {
            console.error('Error parsing wellness data:', parseError);
            wellnessLogs = [];
          }
        }
      }
      
      // Filter berdasarkan period - dengan safe check
      const now = new Date();
      const filteredData = wellnessLogs.filter(log => {
        // Safe check untuk memastikan log memiliki timestamp
        if (!log || !log.timestamp) return false;
        
        try {
          const logDate = new Date(log.timestamp);
          switch (period) {
            case 'daily':
              return logDate.toDateString() === now.toDateString();
            case 'monthly':
              return logDate.getMonth() === now.getMonth() && logDate.getFullYear() === now.getFullYear();
            case 'yearly':
              return logDate.getFullYear() === now.getFullYear();
            default:
              return true;
          }
        } catch (dateError) {
          console.error('Error parsing log date:', dateError);
          return false;
        }
      });
      
      setWellnessData(filteredData);
    } catch (error) {
      handleError(error, 'load wellness data');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, handleError]);

  // Submit wellness assessment ke localStorage (tidak ke backend)
  const submitWellnessAssessment = useCallback(async (assessment: Omit<WellnessLog, 'timestamp'>) => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return false;
    }

    // Pastikan hanya berjalan di client-side
    if (typeof window === 'undefined') {
      setError('localStorage not available');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Buat wellness log baru dengan timestamp
      const newWellnessLog: WellnessLog = {
        ...assessment,
        timestamp: new Date().toISOString()
      };

      // Load existing data dari localStorage dengan safe parsing
      let existingLogs: WellnessLog[] = [];
      const storedWellnessData = localStorage.getItem('fairleap_wellness_data');
      if (storedWellnessData) {
        try {
          const parsedData = JSON.parse(storedWellnessData);
          existingLogs = Array.isArray(parsedData) ? parsedData : [];
        } catch (parseError) {
          console.error('Error parsing existing wellness data:', parseError);
          existingLogs = [];
        }
      }
      
      // Tambahkan log baru
      const updatedLogs = [...existingLogs, newWellnessLog];
      
      // Simpan kembali ke localStorage
      localStorage.setItem('fairleap_wellness_data', JSON.stringify(updatedLogs));
      
      // Update state
      setWellnessData(updatedLogs);
      
      console.log('✅ Wellness assessment saved successfully');
      return true;
    } catch (error) {
      handleError(error, 'submit wellness assessment');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, handleError]);

  // Check if user has any meaningful data
  const checkUserDataAvailability = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setDataCheckCompleted(false);

    try {
      // Check trip stats untuk semua periode
      const [dailyResponse, monthlyResponse, yearlyResponse] = await Promise.allSettled([
        tripAPI.getDailyStats(),
        tripAPI.getMonthlyStats(),
        tripAPI.getYearlyStats()
      ]);

      // Check apakah ada data trip yang meaningful
      let hasTripData = false;
      
      if (dailyResponse.status === 'fulfilled' && dailyResponse.value.status === 'success') {
        hasTripData = hasTripData || (dailyResponse.value.data && dailyResponse.value.data.length > 0);
      }
      
      if (monthlyResponse.status === 'fulfilled' && monthlyResponse.value.status === 'success') {
        hasTripData = hasTripData || (monthlyResponse.value.data && monthlyResponse.value.data.length > 0);
      }
      
      if (yearlyResponse.status === 'fulfilled' && yearlyResponse.value.status === 'success') {
        hasTripData = hasTripData || (yearlyResponse.value.data && yearlyResponse.value.data.length > 0);
      }

      // Check wellness data dari localStorage (client-side only)
      let hasWellnessData = false;
      if (typeof window !== 'undefined') {
        const storedWellnessData = localStorage.getItem('fairleap_wellness_data');
        if (storedWellnessData) {
          try {
            const parsedData = JSON.parse(storedWellnessData);
            hasWellnessData = Array.isArray(parsedData) && parsedData.length > 0;
          } catch (parseError) {
            console.error('Error parsing wellness data in availability check:', parseError);
            hasWellnessData = false;
          }
        }
      }

      // Jika tidak ada data trip dan wellness, maka data kosong
      const isEmpty = !hasTripData && !hasWellnessData;
      
      setHasEmptyData(isEmpty);
      setDataCheckCompleted(true);

      return !isEmpty;
    } catch (error) {
      console.error('Error checking user data availability:', error);
      // Jika error, assume data kosong untuk safety
      setHasEmptyData(true);
      setDataCheckCompleted(true);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Login function dengan data availability check (HANYA saat login)
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    setHasEmptyData(false);
    setDataCheckCompleted(false);

    try {
      const response = await authAPI.login(email, password);
      
      if (response.status === 'success') {
        setIsAuthenticated(true);
        setHasInitialDataCheck(true); // Tandai bahwa initial check akan dilakukan
        
        // Setelah login berhasil, check data availability SEKALI SAJA
        setTimeout(async () => {
          await checkUserDataAvailability();
        }, 500); // Delay sedikit untuk memastikan token tersimpan
        
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
  }, [handleError, checkUserDataAvailability]);

  // Logout function
  const logout = useCallback(() => {
    authAPI.logout();
    setIsAuthenticated(false);
    setHasInitialDataCheck(false); // Reset initial check flag
    setDataCheckCompleted(false);
    setHasEmptyData(false);
    
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
    console.log('🔍 getWeeklyEarnings called, tripStats:', tripStats);
    
    if (!tripStats.length) {
      console.log('❌ No tripStats data available');
      return [];
    }
    
    // Transform backend data for chart display
    const transformedData = tripStats.slice(-7).map((stat, index) => {
      console.log(`📊 Transforming stat ${index}:`, stat);
      
      // Handle different date formats from backend
      const dateKey = stat.date || stat.month || stat.year || new Date().toISOString();
      
      // Use total_earnings (which should be total_fare + total_tip) or calculate it
      const totalEarnings = stat.total_earnings || (stat.total_fare + (stat.total_tip || 0));
      const earnings = totalEarnings / 1000; // Convert to thousands
      const trips = stat.total_trips;
      const bonus = Math.round((stat.total_tip || 0) / 1000); // Use tips as bonus, with fallback
      
      const transformed = {
        day: new Date(dateKey).toLocaleDateString('id-ID', { weekday: 'short' }),
        earnings,
        trips,
        bonus
      };
      
      console.log(`✅ Transformed to:`, transformed);
      return transformed;
    });
    
    console.log('📈 Final weeklyEarnings data:', transformedData);
    return transformedData;
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

    const totals = tripStats.reduce((acc, stat) => {
      // Use total_earnings or calculate from total_fare + total_tip
      const totalEarnings = stat.total_earnings || (stat.total_fare + (stat.total_tip || 0));
      
      return {
        totalEarnings: acc.totalEarnings + totalEarnings,
        totalTrips: acc.totalTrips + stat.total_trips,
        totalDistance: acc.totalDistance + stat.total_distance,
      };
    }, { totalEarnings: 0, totalTrips: 0, totalDistance: 0 });

    return {
      ...totals,
      avgRating: 4.5, // TODO: Get from backend when available
      totalHours: Math.round(totals.totalDistance / 30), // Estimate hours based on distance (30km/h avg)
      avgEarningsPerTrip: totals.totalTrips > 0 ? totals.totalEarnings / totals.totalTrips : 0
    };
  }, [tripStats]);

  // Get financial advice from LLM dengan PROPER CACHE
  const getFinancialAdvice = useCallback(async (
    pendapatan: number,
    pengeluaran: number,
    toleransi_risiko: string
  ) => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return null;
    }

    // Check cache validity untuk financial advice
    if (globalDataCache.financialAdvice && isCacheValid('financialAdvice')) {
      console.log('📦 Using cached financial advice');
      return globalDataCache.financialAdvice;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await llmAPI.getFinancialTips(pendapatan, pengeluaran, toleransi_risiko);
      
      if (response.status === 'success') {
        // Update global cache
        globalDataCache.financialAdvice = response.data;
        globalDataCache.lastUpdated.financialAdvice = new Date();
        
        // Update local state
        setFinancialAdvice(response.data);
        
        console.log('🔄 Loaded fresh financial advice from API');
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
  }, [isAuthenticated, handleError, isCacheValid]);

  // Get wellness recommendations from LLM dengan PROPER CACHE
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

    // Check cache validity untuk wellness advice
    if (globalDataCache.wellnessAdvice && isCacheValid('wellnessAdvice')) {
      console.log('📦 Using cached wellness advice');
      return globalDataCache.wellnessAdvice;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await llmAPI.getWellnessAdvice(energy_level, stress_level, sleep_quality, physical_condition);
      
      if (response.status === 'success') {
        // Update global cache
        globalDataCache.wellnessAdvice = response.data;
        globalDataCache.lastUpdated.wellnessAdvice = new Date();
        
        // Update local state
        setWellnessAdvice(response.data);
        
        console.log('🔄 Loaded fresh wellness advice from API');
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
  }, [isAuthenticated, handleError, isCacheValid]);

  // Get investment advice from LLM dengan PROPER CACHE
  const getInvestmentAdvice = useCallback(async (
    pendapatan: number,
    pengeluaran: number,
    toleransi_risiko: string
  ) => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return null;
    }

    // Check cache validity untuk investment advice
    if (globalDataCache.investmentAdvice && isCacheValid('investmentAdvice')) {
      console.log('📦 Using cached investment advice');
      return globalDataCache.investmentAdvice;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await llmAPI.getInvestmentAdvice(pendapatan, pengeluaran, toleransi_risiko);
      
      if (response.status === 'success') {
        // Update global cache
        globalDataCache.investmentAdvice = response.data;
        globalDataCache.lastUpdated.investmentAdvice = new Date();
        
        // Update local state
        setInvestmentAdvice(response.data);
        
        console.log('🔄 Loaded fresh investment advice from API');
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
  }, [isAuthenticated, handleError, isCacheValid]);

  // Chat operations
  const createNewChat = useCallback(async (message: string) => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Gunakan createChat method yang sudah tersedia
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

    // Empty data handling
    hasEmptyData,
    dataCheckCompleted,
    checkUserDataAvailability,

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

    // Data cache & sync utilities - MANUAL CONTROL
    getCachedData: (period: 'daily' | 'monthly' | 'yearly') => globalDataCache.tripStats[period],
    getLastUpdated: () => globalDataCache.lastUpdated.tripStats,
    
    // Manual refresh functions - USER INITIATED ONLY
    forceRefresh: (period: 'daily' | 'monthly' | 'yearly') => loadTripStats(period, true),
    refreshAllData: useCallback(async () => {
      // Manual refresh semua data - hanya saat user klik
      setIsLoading(true);
      try {
        await Promise.all([
          loadTripStats('daily', true),
          loadTripStats('monthly', true), 
          loadTripStats('yearly', true),
          checkUserDataAvailability()
        ]);
      } catch (error) {
        handleError(error, 'refresh all data');
      } finally {
        setIsLoading(false);
      }
    }, [loadTripStats, checkUserDataAvailability, handleError]),
    
    // Cache status - UPDATED untuk extended cache time (30 menit)
    cacheStatus: {
      tripStats: {
        daily: {
          hasData: globalDataCache.tripStats.daily.length > 0,
          lastUpdated: globalDataCache.lastUpdated.tripStats,
          isStale: globalDataCache.lastUpdated.tripStats ? 
            (new Date().getTime() - globalDataCache.lastUpdated.tripStats.getTime()) > CACHE_VALIDITY : true
        },
        monthly: {
          hasData: globalDataCache.tripStats.monthly.length > 0,
          lastUpdated: globalDataCache.lastUpdated.tripStats,
          isStale: globalDataCache.lastUpdated.tripStats ? 
            (new Date().getTime() - globalDataCache.lastUpdated.tripStats.getTime()) > CACHE_VALIDITY : true
        },
        yearly: {
          hasData: globalDataCache.tripStats.yearly.length > 0,
          lastUpdated: globalDataCache.lastUpdated.tripStats,
          isStale: globalDataCache.lastUpdated.tripStats ? 
            (new Date().getTime() - globalDataCache.lastUpdated.tripStats.getTime()) > CACHE_VALIDITY : true
        }
      },
      financialAdvice: {
        hasData: !!globalDataCache.financialAdvice,
        lastUpdated: globalDataCache.lastUpdated.financialAdvice,
        isStale: globalDataCache.lastUpdated.financialAdvice ? 
          (new Date().getTime() - globalDataCache.lastUpdated.financialAdvice.getTime()) > CACHE_VALIDITY : true
      },
      wellnessAdvice: {
        hasData: !!globalDataCache.wellnessAdvice,
        lastUpdated: globalDataCache.lastUpdated.wellnessAdvice,
        isStale: globalDataCache.lastUpdated.wellnessAdvice ? 
          (new Date().getTime() - globalDataCache.lastUpdated.wellnessAdvice.getTime()) > CACHE_VALIDITY : true
      },
      investmentAdvice: {
        hasData: !!globalDataCache.investmentAdvice,
        lastUpdated: globalDataCache.lastUpdated.investmentAdvice,
        isStale: globalDataCache.lastUpdated.investmentAdvice ? 
          (new Date().getTime() - globalDataCache.lastUpdated.investmentAdvice.getTime()) > CACHE_VALIDITY : true
      }
    },

    // Sync control flags
    hasInitialDataCheck,
    
    // Utility
    clearError: () => setError(null),
  };
}; 