"use client";

import React from 'react';
import { useDataSync } from '@/context/DataSyncContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  FiRefreshCw,
  FiWifi,
  FiWifiOff,
  FiClock,
  FiCheck
} from 'react-icons/fi';

interface SyncIndicatorProps {
  pageType: 'dashboard' | 'analytics' | 'wellness' | 'financial' | 'earnings';
  showDetails?: boolean;
}

export const SyncIndicator: React.FC<SyncIndicatorProps> = ({ 
  pageType, 
  showDetails = false 
}) => {
  const {
    isGlobalAuthenticated,
    isGlobalLoading,
    globalError,
    lastSyncTime,
    cacheStatus,
    syncAllData,
    refreshData,
    clearGlobalError
  } = useDataSync();

  const getConnectionStatus = () => {
    if (!isGlobalAuthenticated) {
      return {
        status: 'offline',
        icon: FiWifiOff,
        color: 'bg-gray-500',
        text: 'Offline'
      };
    }
    
    if (isGlobalLoading) {
      return {
        status: 'syncing',
        icon: FiRefreshCw,
        color: 'bg-blue-500',
        text: 'Syncing'
      };
    }
    
    if (globalError) {
      return {
        status: 'error',
        icon: FiWifiOff,
        color: 'bg-red-500',
        text: 'Error'
      };
    }
    
    return {
      status: 'connected',
      icon: FiWifi,
      color: 'bg-green-500',
      text: 'Connected'
    };
  };

  const getLastSyncTime = () => {
    if (!lastSyncTime) return 'Never';
    
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastSyncTime.getTime()) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const connectionStatus = getConnectionStatus();
  const IconComponent = connectionStatus.icon;
  const pageHasCache = cacheStatus[pageType];

  return (
    <div className="space-y-2">
      {/* Compact Status Badge */}
      <div className="flex items-center space-x-2">
        <Badge 
          variant="outline" 
          className={`flex items-center space-x-1 ${
            connectionStatus.status === 'connected' ? 'border-green-500 text-green-700 bg-green-50' :
            connectionStatus.status === 'syncing' ? 'border-blue-500 text-blue-700 bg-blue-50' :
            connectionStatus.status === 'error' ? 'border-red-500 text-red-700 bg-red-50' :
            'border-gray-500 text-gray-700 bg-gray-50'
          }`}
        >
          <IconComponent 
            className={`h-3 w-3 ${connectionStatus.status === 'syncing' ? 'animate-spin' : ''}`} 
          />
          <span className="text-xs">{connectionStatus.text}</span>
        </Badge>

        {/* Page Cache Status */}
        {isGlobalAuthenticated && (
          <Badge 
            variant="outline"
            className={`flex items-center space-x-1 ${
              pageHasCache ? 'border-emerald-500 text-emerald-700 bg-emerald-50' : 
              'border-amber-500 text-amber-700 bg-amber-50'
            }`}
          >
            <FiCheck className="h-3 w-3" />
            <span className="text-xs">{pageHasCache ? 'Synced' : 'Pending'}</span>
          </Badge>
        )}

        {/* Last Sync Time */}
        {lastSyncTime && (
          <Badge variant="outline" className="flex items-center space-x-1 text-xs">
            <FiClock className="h-3 w-3" />
            <span>{getLastSyncTime()}</span>
          </Badge>
        )}

        {/* Manual Refresh Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => refreshData(pageType)}
          disabled={isGlobalLoading || !isGlobalAuthenticated}
          className="h-6 px-2"
        >
          <FiRefreshCw className={`h-3 w-3 ${isGlobalLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Detailed Status - Optional */}
      {showDetails && (
        <div className="space-y-2">
          {/* Global Error Alert */}
          {globalError && (
            <Alert className="bg-red-50 border-red-200">
              <FiWifiOff className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 flex items-center justify-between">
                <span><strong>Sync Error:</strong> {globalError}</span>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => syncAllData()}
                    disabled={isGlobalLoading}
                  >
                    <FiRefreshCw className={`h-4 w-4 mr-1 ${isGlobalLoading ? 'animate-spin' : ''}`} />
                    Retry
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearGlobalError}
                  >
                    Dismiss
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Offline Mode Alert */}
          {!isGlobalAuthenticated && (
            <Alert className="bg-amber-50 border-amber-200">
              <FiWifiOff className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Offline Mode:</strong> Data menggunakan cache lokal. Login untuk sinkronisasi real-time.
              </AlertDescription>
            </Alert>
          )}

          {/* Sync Status Details */}
          {isGlobalAuthenticated && (
            <Alert className="bg-blue-50 border-blue-200">
              <FiRefreshCw className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <div className="flex items-center justify-between">
                  <div>
                    <strong>Global Sync Active:</strong> Data tersinkronisasi antar semua halaman.
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => syncAllData()}
                    disabled={isGlobalLoading}
                  >
                    <FiRefreshCw className={`h-4 w-4 mr-1 ${isGlobalLoading ? 'animate-spin' : ''}`} />
                    Sync All
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Cache Status untuk setiap halaman */}
          <div className="grid grid-cols-5 gap-2 text-xs">
            {Object.entries(cacheStatus).map(([page, hasCache]) => (
              <div 
                key={page}
                className={`p-2 rounded border text-center ${
                  hasCache ? 'bg-green-50 border-green-200 text-green-800' : 
                  'bg-gray-50 border-gray-200 text-gray-600'
                }`}
              >
                <div className="font-medium">{page}</div>
                <div className="text-xs mt-1">
                  {hasCache ? '✓ Synced' : '⏳ Pending'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 