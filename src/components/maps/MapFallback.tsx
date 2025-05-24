"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { JAKARTA_ZONES } from '@/config/googleMaps';
import { formatCurrency } from '@/lib/routeOptimization';
import { 
  FiMapPin, 
  FiActivity, 
  FiDollarSign, 
  FiClock, 
  FiRefreshCw, 
  FiAlertTriangle,
  FiMap,
  FiNavigation
} from 'react-icons/fi';

interface MapFallbackProps {
  onZoneSelect?: (zone: any) => void;
  selectedZone?: any;
  onRetryLoad?: () => void;
}

export default function MapFallback({ onZoneSelect, selectedZone, onRetryLoad }: MapFallbackProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const getDemandColor = (demand: number) => {
    if (demand >= 85) return 'bg-green-100 text-green-800 border-green-200';
    if (demand >= 70) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getTrafficColor = (traffic: number) => {
    if (traffic >= 80) return 'bg-red-100 text-red-800 border-red-200';
    if (traffic >= 60) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getDemandBadgeColor = (demand: number) => {
    if (demand >= 85) return 'bg-green-500';
    if (demand >= 70) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const handleZoneClick = (zone: any) => {
    if (onZoneSelect) {
      onZoneSelect(zone);
    }
  };

  const handleRetry = async () => {
    if (onRetryLoad) {
      setIsRetrying(true);
      try {
        await onRetryLoad();
      } finally {
        setTimeout(() => setIsRetrying(false), 2000);
      }
    }
  };

  // Sort zones by demand for better UX
  const sortedZones = [...JAKARTA_ZONES].sort((a, b) => b.demand - a.demand);

  return (
    <div className="h-full flex flex-col">
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FiMapPin className="h-5 w-5 text-blue-600" />
              <span className="text-lg">Jakarta Zones</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">
                <FiMap className="h-3 w-3 mr-1" />
                Fallback Mode
              </Badge>
              {onRetryLoad && (
                <Button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  variant="outline"
                  size="sm"
                  className="h-7 px-2"
                >
                  <FiRefreshCw className={`h-3 w-3 ${isRetrying ? 'animate-spin' : ''}`} />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-4">
          {/* Info Alert */}
          <Alert className="mb-4 bg-blue-50 border-blue-200">
            <FiAlertTriangle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 text-sm">
              <div className="flex items-center justify-between">
                <span>Google Maps tidak tersedia. Menampilkan data zone overview.</span>
                {onRetryLoad && (
                  <Button
                    onClick={handleRetry}
                    disabled={isRetrying}
                    variant="ghost"
                    size="sm"
                    className="text-blue-700 hover:text-blue-800 p-1 h-auto"
                  >
                    {isRetrying ? (
                      <span className="flex items-center text-xs">
                        <FiRefreshCw className="h-3 w-3 animate-spin mr-1" />
                        Loading...
                      </span>
                    ) : (
                      <span className="flex items-center text-xs">
                        <FiNavigation className="h-3 w-3 mr-1" />
                        Load Map
                      </span>
                    )}
                  </Button>
                )}
              </div>
            </AlertDescription>
          </Alert>

          {/* Zone List - Scrollable */}
          <div className="space-y-3 overflow-y-auto max-h-64">
            {sortedZones.map((zone) => (
              <div
                key={zone.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedZone?.id === zone.id 
                    ? 'border-emerald-300 bg-emerald-50 shadow-sm' 
                    : 'hover:bg-slate-50 border-slate-200'
                }`}
                onClick={() => handleZoneClick(zone)}
              >
                {/* Zone Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div 
                      className={`w-3 h-3 rounded-full ${getDemandBadgeColor(zone.demand)}`}
                    />
                    <h4 className="font-semibold text-slate-800 text-sm">{zone.name}</h4>
                  </div>
                  <Badge className={getDemandColor(zone.demand)} variant="outline">
                    {zone.demand}%
                  </Badge>
                </div>

                {/* Zone Metrics - Compact */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div className="flex items-center space-x-1">
                    <FiActivity className="h-3 w-3 text-orange-500" />
                    <span className="text-slate-500">Traffic:</span>
                    <span className={`font-medium ${
                      zone.traffic >= 80 ? 'text-red-600' : 
                      zone.traffic >= 60 ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {zone.traffic}%
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <FiDollarSign className="h-3 w-3 text-emerald-500" />
                    <span className="text-slate-500">Avg:</span>
                    <span className="font-semibold text-emerald-600 text-xs">
                      {formatCurrency(zone.earnings)}
                    </span>
                  </div>
                </div>

                {/* Peak Hours */}
                <div className="flex items-center space-x-1 mb-2">
                  <FiClock className="h-3 w-3 text-blue-500" />
                  <span className="text-xs text-slate-500">Peak:</span>
                  <span className="text-xs font-medium text-slate-700">{zone.peakHours}</span>
                </div>

                {/* Hotspots - Compact */}
                <div className="flex flex-wrap gap-1 mb-1">
                  {zone.hotspots.slice(0, 2).map((spot, index) => (
                    <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                      {spot}
                    </Badge>
                  ))}
                  {zone.hotspots.length > 2 && (
                    <Badge variant="secondary" className="text-xs px-1 py-0 bg-slate-200">
                      +{zone.hotspots.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Selected Indicator */}
                {selectedZone?.id === zone.id && (
                  <div className="mt-2 pt-2 border-t border-emerald-200">
                    <p className="text-xs text-emerald-700 font-medium flex items-center">
                      <FiNavigation className="h-3 w-3 mr-1" />
                      Zone terpilih
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Action/Info */}
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-800 mb-1">
                  💡 Setup Google Maps API
                </p>
                <p className="text-xs text-slate-600">
                  Untuk fitur peta interaktif dan route optimization
                </p>
              </div>
              {onRetryLoad && (
                <Button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isRetrying ? (
                    <FiRefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <FiMap className="h-4 w-4 mr-1" />
                      Try Load
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 