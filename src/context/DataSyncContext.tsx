"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useDataIntegration } from '@/hooks/useDataIntegration';

interface DataSyncContextType {
  // Data states
  globalTripStats: any[];
  globalWellnessData: any[];
  globalFinancialAdvice: any;
  globalWellnessAdvice: any;
  globalInvestmentAdvice: any;
  userProfile: any;
  
  // Sync states
  isGlobalLoading: boolean;
  globalError: string | null;
  isGlobalAuthenticated: boolean;
  lastSyncTime: Date | null;
  
  // Actions
  syncAllData: () => Promise<void>;
  refreshData: (pageType: string, params?: any) => Promise<boolean>;
  submitWellnessAssessment: (assessment: any) => Promise<boolean>;
  getFinancialAdvice: (income: number, expenses: number, riskTolerance: string) => Promise<void>;
  getInvestmentAdvice: (income: number, expenses: number, riskTolerance: string) => Promise<void>;
  loadUserProfile: () => Promise<void>;
  updateUserProfile: (profileData: any) => Promise<boolean>;
  broadcastUpdate: (updateType: string, data: any) => void;
  clearGlobalError: () => void;
  
  // Cache status
  cacheStatus: {
    dashboard: boolean;
    analytics: boolean;
    wellness: boolean;
    financial: boolean;
    earnings: boolean;
  };
}

const DataSyncContext = createContext<DataSyncContextType | undefined>(undefined);

export const DataSyncProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Global states untuk sinkronisasi
  const [globalTripStats, setGlobalTripStats] = useState<any[]>([]);
  const [globalWellnessData, setGlobalWellnessData] = useState<any[]>([]);
  const [globalFinancialAdvice, setGlobalFinancialAdvice] = useState<any>(null);
  const [globalWellnessAdvice, setGlobalWellnessAdvice] = useState<any>(null);
  const [globalInvestmentAdvice, setGlobalInvestmentAdvice] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isGlobalAuthenticated, setIsGlobalAuthenticated] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  
  // Cache status untuk setiap page
  const [cacheStatus, setCacheStatus] = useState({
    dashboard: false,
    analytics: false,
    wellness: false,
    financial: false,
    earnings: false
  });

  // Initialize data integration hook
  const dataIntegration = useDataIntegration();

  // Sync authentication state
  useEffect(() => {
    setIsGlobalAuthenticated(dataIntegration.isAuthenticated);
  }, [dataIntegration.isAuthenticated]);

  // Sync data states
  useEffect(() => {
    if (dataIntegration.tripStats.length > 0) {
      setGlobalTripStats(dataIntegration.tripStats);
      setLastSyncTime(new Date());
      setCacheStatus(prev => ({ ...prev, dashboard: true, analytics: true, earnings: true }));
    }
  }, [dataIntegration.tripStats]);

  useEffect(() => {
    if (dataIntegration.wellnessData.length > 0) {
      setGlobalWellnessData(dataIntegration.wellnessData);
      setCacheStatus(prev => ({ ...prev, wellness: true }));
    }
  }, [dataIntegration.wellnessData]);

  useEffect(() => {
    if (dataIntegration.financialAdvice) {
      setGlobalFinancialAdvice(dataIntegration.financialAdvice);
      setCacheStatus(prev => ({ ...prev, financial: true }));
    }
  }, [dataIntegration.financialAdvice]);

  useEffect(() => {
    if (dataIntegration.wellnessAdvice) {
      setGlobalWellnessAdvice(dataIntegration.wellnessAdvice);
    }
  }, [dataIntegration.wellnessAdvice]);

  useEffect(() => {
    if (dataIntegration.investmentAdvice) {
      setGlobalInvestmentAdvice(dataIntegration.investmentAdvice);
    }
  }, [dataIntegration.investmentAdvice]);

  useEffect(() => {
    if (dataIntegration.userProfile) {
      setUserProfile(dataIntegration.userProfile);
    }
  }, [dataIntegration.userProfile]);

  // Sync loading and error states
  useEffect(() => {
    setIsGlobalLoading(dataIntegration.isLoading);
  }, [dataIntegration.isLoading]);

  useEffect(() => {
    setGlobalError(dataIntegration.error);
  }, [dataIntegration.error]);

  // Sync all data untuk refresh menyeluruh
  const syncAllData = useCallback(async () => {
    if (!isGlobalAuthenticated) return;
    
    setIsGlobalLoading(true);
    try {
      // Load all necessary data
      await Promise.all([
        dataIntegration.loadTripStats('daily', true),
        dataIntegration.loadTripStats('monthly', true),
        dataIntegration.loadWellnessData('daily'),
      ]);
      
      setLastSyncTime(new Date());
    } catch (error) {
      console.error('❌ Global sync failed:', error);
    } finally {
      setIsGlobalLoading(false);
    }
  }, [isGlobalAuthenticated, dataIntegration]);

  // Refresh data per page type
  const refreshData = useCallback(async (pageType: string, params?: any) => {
    if (!isGlobalAuthenticated) return false;

    switch (pageType) {
      case 'dashboard':
        await dataIntegration.loadTripStats('daily', true);
        break;
      case 'analytics':
        await Promise.all([
          dataIntegration.loadTripStats('daily', true),
          dataIntegration.loadTripStats('monthly', true),
          dataIntegration.loadTripStats('yearly', true)
        ]);
        break;
      case 'wellness':
        await dataIntegration.loadWellnessData('daily');
        break;
      case 'financial':
        // Financial advice akan di-refresh saat user input berubah
        break;
      case 'earnings':
        await dataIntegration.loadTripStats('daily', true);
        break;
    }
    return true;
  }, [isGlobalAuthenticated, dataIntegration]);

  // Broadcast update untuk notify semua component
  const broadcastUpdate = useCallback((updateType: string, data: any) => {
    console.log(`📡 Broadcasting update: ${updateType}`, data);
    
    switch (updateType) {
      case 'trip_stats':
        setGlobalTripStats(data);
        break;
      case 'wellness_data':
        setGlobalWellnessData(data);
        break;
      case 'financial_advice':
        setGlobalFinancialAdvice(data);
        break;
      case 'wellness_advice':
        setGlobalWellnessAdvice(data);
        break;
      case 'investment_advice':
        setGlobalInvestmentAdvice(data);
        break;
    }
    
    setLastSyncTime(new Date());
  }, []);

  const clearGlobalError = useCallback(() => {
    setGlobalError(null);
    dataIntegration.clearError();
  }, [dataIntegration]);

  // Auto-refresh data setiap 2 menit untuk semua page
  useEffect(() => {
    if (!isGlobalAuthenticated) return;

    const interval = setInterval(() => {
      console.log('⏰ Auto-refreshing global data...');
      syncAllData();
    }, 2 * 60 * 1000); // 2 menit

    return () => clearInterval(interval);
  }, [isGlobalAuthenticated, syncAllData]);

  // Initial data load saat authenticated
  useEffect(() => {
    if (isGlobalAuthenticated && !lastSyncTime) {
      console.log('🚀 Initial global data load...');
      syncAllData();
    }
  }, [isGlobalAuthenticated, lastSyncTime, syncAllData]);

  // Submit wellness assessment dengan proper return
  const submitWellnessAssessment = useCallback(async (assessment: any) => {
    if (!isGlobalAuthenticated) return false;
    
    try {
      // Calculate total score from wellness assessment
      const totalScore = (assessment.energy_level + assessment.stress_level + 
                         assessment.sleep_quality + assessment.physical_condition) / 4 * 100;

      const response = await dataIntegration.submitWellnessAssessment({ ...assessment, totalScore });
      
      if (response) {
        // Reload wellness data after submission
        await dataIntegration.loadWellnessData('daily');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error submitting wellness assessment:', error);
      return false;
    }
  }, [isGlobalAuthenticated, dataIntegration]);

  // Get financial advice dengan parameter
  const getFinancialAdvice = useCallback(async (income: number, expenses: number, riskTolerance: string) => {
    if (!isGlobalAuthenticated) return;
    
    try {
      await dataIntegration.getFinancialAdvice(income, expenses, riskTolerance);
    } catch (error) {
      console.error('Error getting financial advice:', error);
    }
  }, [isGlobalAuthenticated, dataIntegration]);

  // Get investment advice dengan parameter
  const getInvestmentAdvice = useCallback(async (income: number, expenses: number, riskTolerance: string) => {
    if (!isGlobalAuthenticated) return;
    
    try {
      await dataIntegration.getInvestmentAdvice(income, expenses, riskTolerance);
    } catch (error) {
      console.error('Error getting investment advice:', error);
    }
  }, [isGlobalAuthenticated, dataIntegration]);

  const loadUserProfile = useCallback(async () => {
    if (!isGlobalAuthenticated) return;
    
    try {
      await dataIntegration.loadUserProfile();
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }, [isGlobalAuthenticated, dataIntegration]);

  const updateUserProfile = useCallback(async (profileData: any) => {
    if (!isGlobalAuthenticated) return false;
    
    try {
      await dataIntegration.updateUserProfile(profileData);
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  }, [isGlobalAuthenticated, dataIntegration]);

  const value: DataSyncContextType = {
    // Data states
    globalTripStats,
    globalWellnessData,
    globalFinancialAdvice,
    globalWellnessAdvice,
    globalInvestmentAdvice,
    userProfile,
    
    // Sync states
    isGlobalLoading,
    globalError,
    isGlobalAuthenticated,
    lastSyncTime,
    
    // Actions
    syncAllData,
    refreshData,
    submitWellnessAssessment,
    getFinancialAdvice,
    getInvestmentAdvice,
    loadUserProfile,
    updateUserProfile,
    broadcastUpdate,
    clearGlobalError,
    
    // Cache status
    cacheStatus
  };

  return (
    <DataSyncContext.Provider value={value}>
      {children}
    </DataSyncContext.Provider>
  );
};

export const useDataSync = () => {
  const context = useContext(DataSyncContext);
  if (context === undefined) {
    throw new Error('useDataSync must be used within a DataSyncProvider');
  }
  return context;
}; 