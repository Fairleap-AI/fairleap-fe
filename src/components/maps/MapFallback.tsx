"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { JAKARTA_ZONES } from '@/config/googleMaps';
import { FiMapPin, FiActivity, FiDollarSign, FiClock } from 'react-icons/fi';

interface MapFallbackProps {
  onZoneSelect?: (zone: any) => void;
  selectedZone?: any;
}

export default function MapFallback({ onZoneSelect, selectedZone }: MapFallbackProps) {
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

  const handleZoneClick = (zone: any) => {
    if (onZoneSelect) {
      onZoneSelect(zone);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FiMapPin className="h-5 w-5" />
          <span>Jakarta Zones Overview</span>
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Fallback Mode
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-80 overflow-y-auto">
        {JAKARTA_ZONES.map((zone) => (
          <div
            key={zone.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
              selectedZone?.id === zone.id 
                ? 'border-emerald-300 bg-emerald-50 shadow-sm' 
                : 'hover:bg-slate-50 border-slate-200'
            }`}
            onClick={() => handleZoneClick(zone)}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-slate-800">{zone.name}</h4>
              <div className="flex space-x-2">
                <Badge className={getDemandColor(zone.demand)}>
                  {zone.demand}% demand
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
              <div className="flex items-center space-x-2">
                <FiActivity className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-slate-500">Traffic</p>
                  <Badge className={getTrafficColor(zone.traffic)} variant="outline">
                    {zone.traffic}%
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <FiDollarSign className="h-4 w-4 text-emerald-500" />
                <div>
                  <p className="text-slate-500">Avg Earnings</p>
                  <p className="font-semibold text-emerald-600">
                    Rp {zone.earnings.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <FiClock className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-slate-500 text-xs">Peak Hours</p>
                <p className="text-sm font-medium">{zone.peakHours}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500 mb-1">Hotspots:</p>
              <div className="flex flex-wrap gap-1">
                {zone.hotspots.map((spot, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {spot}
                  </Badge>
                ))}
              </div>
            </div>

            {selectedZone?.id === zone.id && (
              <div className="mt-3 pt-3 border-t border-emerald-200">
                <p className="text-xs text-emerald-700 font-medium">
                  ✓ Zone terpilih - Akan digunakan untuk kalkulasi rute
                </p>
              </div>
            )}
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Setup Google Maps API untuk fitur peta interaktif dan route optimization
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 