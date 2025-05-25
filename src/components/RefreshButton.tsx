'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useDataIntegrationContext } from '@/providers/DataIntegrationProvider';

interface RefreshButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  showText?: boolean;
  className?: string;
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({
  variant = 'outline',
  size = 'sm',
  showText = true,
  className = ''
}) => {
  const { refreshAllData, isLoading, cacheStatus } = useDataIntegrationContext();

  // Check if any data is stale
  const hasStaleData = () => {
    let isStale = false;
    
    if (cacheStatus.tripStats) {
      isStale = isStale || cacheStatus.tripStats.daily.isStale;
      isStale = isStale || cacheStatus.tripStats.monthly.isStale;
      isStale = isStale || cacheStatus.tripStats.yearly.isStale;
    }
    
    if (cacheStatus.financialAdvice) {
      isStale = isStale || cacheStatus.financialAdvice.isStale;
    }
    
    if (cacheStatus.wellnessAdvice) {
      isStale = isStale || cacheStatus.wellnessAdvice.isStale;
    }
    
    if (cacheStatus.investmentAdvice) {
      isStale = isStale || cacheStatus.investmentAdvice.isStale;
    }
    
    return isStale;
  };
  
  // Get last update time
  const getLastUpdateText = () => {
    const updates: (Date | null)[] = [];
    
    // Collect all lastUpdated timestamps from nested cache structure
    if (cacheStatus.tripStats) {
      updates.push(cacheStatus.tripStats.daily.lastUpdated);
      updates.push(cacheStatus.tripStats.monthly.lastUpdated);
      updates.push(cacheStatus.tripStats.yearly.lastUpdated);
    }
    
    if (cacheStatus.financialAdvice) {
      updates.push(cacheStatus.financialAdvice.lastUpdated);
    }
    
    if (cacheStatus.wellnessAdvice) {
      updates.push(cacheStatus.wellnessAdvice.lastUpdated);
    }
    
    if (cacheStatus.investmentAdvice) {
      updates.push(cacheStatus.investmentAdvice.lastUpdated);
    }
    
    const validUpdates = updates
      .filter(Boolean)
      .sort((a, b) => new Date(b!).getTime() - new Date(a!).getTime());
    
    if (validUpdates.length === 0) return 'Belum pernah sync';
    
    const lastUpdate = validUpdates[0]!;
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Baru saja';
    if (diffMinutes < 60) return `${diffMinutes} menit lalu`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} jam lalu`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} hari lalu`;
  };

  const handleRefresh = async () => {
    await refreshAllData();
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={hasStaleData() ? 'default' : variant}
        size={size}
        onClick={handleRefresh}
        disabled={isLoading}
        className={`${hasStaleData() ? 'bg-orange-500 hover:bg-orange-600' : ''} ${className}`}
      >
        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''} ${showText ? 'mr-2' : ''}`} />
        {showText && (isLoading ? 'Refreshing...' : 'Refresh')}
      </Button>
      
      {showText && (
        <span className="text-xs text-gray-500">
          {getLastUpdateText()}
        </span>
      )}
    </div>
  );
}; 