'use client';

import React, { useEffect } from 'react';
import { useDataIntegrationContext } from '@/providers/DataIntegrationProvider';
import { EmptyDataState } from '@/components/EmptyDataState';
import { useRouter } from 'next/navigation';

interface DashboardWrapperProps {
  children: React.ReactNode;
}

export const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ children }) => {
  const { 
    isAuthenticated, 
    hasEmptyData, 
    dataCheckCompleted, 
    isLoading 
  } = useDataIntegrationContext();
  
  const router = useRouter();

  // Handle redirect di useEffect untuk menghindari SSR issues
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/sign-in');
    }
  }, [isAuthenticated, router]);

  // Jika belum authenticated, tampilkan loading sementara redirect
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Jika masih loading data check, tampilkan loading
  if (!dataCheckCompleted && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Memeriksa data kamu...</p>
        </div>
      </div>
    );
  }

  // Jika data kosong, tampilkan empty state
  if (dataCheckCompleted && hasEmptyData) {
    return (
      <EmptyDataState
        onStartJourney={() => router.push('/dashboard/earnings')}
        onCreateTrip={() => router.push('/dashboard/earnings')}
        onTakeWellnessAssessment={() => router.push('/dashboard/wellness')}
      />
    );
  }

  // Jika ada data, tampilkan dashboard normal
  return <>{children}</>;
}; 