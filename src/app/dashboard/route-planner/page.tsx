"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DashboardLayout from "@/components/layout/DashboardLayout";
import GoogleMapComponent from "@/components/maps/GoogleMapComponent";
import MapFallback from "@/components/maps/MapFallback";
import { isGoogleMapsConfigured } from "@/config/googleMaps";
import {
  FiMapPin,
  FiNavigation,
  FiClock,
  FiTrendingUp,
  FiAlertTriangle,
  FiDollarSign,
  FiActivity,
  FiCloud,
  FiTarget,
  FiZap,
  FiRefreshCw
} from "react-icons/fi";

interface RouteData {
  distance?: string;
  duration?: string;
  durationInTraffic?: string;
  optimized?: boolean;
  totalEarnings?: number;
  zones?: any[];
}

interface ZoneData {
  id: number;
  name: string;
  demand: number;
  traffic: number;
  earnings: number;
  lat: number;
  lng: number;
  hotspots: string[];
}

export default function RoutePlannerPage() {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [selectedZone, setSelectedZone] = useState<ZoneData | null>(null);
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    condition: "Cerah",
    rainfall: 0
  });
  const [realTimeAlerts, setRealTimeAlerts] = useState([
    { id: 1, type: "traffic", message: "Kemacetan berat di Jl. Sudirman", time: "2 menit lalu", severity: "high" },
    { id: 2, type: "bonus", message: "Bonus zone aktif di Menteng (+20%)", time: "5 menit lalu", severity: "medium" },
    { id: 3, type: "weather", message: "Hujan ringan diprediksi jam 16:00", time: "10 menit lalu", severity: "low" }
  ]);

  // Jakarta zones data (synchronized with GoogleMapComponent)
  const jakartaZones = [
    {
      id: 1,
      name: "Menteng",
      demand: 92,
      traffic: 85,
      earnings: 52000,
      lat: -6.1944,
      lng: 106.8294,
      hotspots: ["Plaza Indonesia", "Grand Indonesia", "Sarinah"],
      currentBonus: 20,
      peakHours: "17:00-19:00",
      estimatedTrips: 8
    },
    {
      id: 2,
      name: "Kelapa Gading",
      demand: 85,
      traffic: 65,
      earnings: 45000,
      lat: -6.1598,
      lng: 106.9057,
      hotspots: ["Mall of Indonesia", "Kelapa Gading Mall", "La Piazza"],
      currentBonus: 10,
      peakHours: "19:00-21:00",
      estimatedTrips: 6
    },
    {
      id: 3,
      name: "Senayan",
      demand: 78,
      traffic: 75,
      earnings: 38000,
      lat: -6.2297,
      lng: 106.8070,
      hotspots: ["Senayan City", "FX Sudirman", "Plaza Senayan"],
      currentBonus: 5,
      peakHours: "18:00-20:00",
      estimatedTrips: 5
    },
    {
      id: 4,
      name: "Kemang",
      demand: 88,
      traffic: 55,
      earnings: 48000,
      lat: -6.2615,
      lng: 106.8106,
      hotspots: ["Kemang Village", "Lippo Mall Kemang", "Kemang Raya"],
      currentBonus: 15,
      peakHours: "20:00-22:00",
      estimatedTrips: 7
    },
    {
      id: 5,
      name: "PIK",
      demand: 75,
      traffic: 45,
      earnings: 35000,
      lat: -6.1088,
      lng: 106.7383,
      hotspots: ["PIK Avenue", "Living World", "Pantai Indah Kapuk"],
      currentBonus: 0,
      peakHours: "16:00-18:00",
      estimatedTrips: 4
    }
  ];

  const handleRouteCalculated = (route: RouteData) => {
    setRouteData(route);
  };

  const handleZoneSelect = (zone: ZoneData) => {
    setSelectedZone(zone);
  };

  const planRoute = () => {
    if (startLocation && endLocation) {
      // Route calculation will be handled by GoogleMapComponent
      console.log("Planning route from", startLocation, "to", endLocation);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'traffic': return FiAlertTriangle;
      case 'bonus': return FiDollarSign;
      case 'weather': return FiCloud;
      default: return FiAlertTriangle;
    }
  };

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setRealTimeAlerts(prev => [
        {
          id: Date.now(),
          type: "traffic",
          message: "Update traffic: Jl. Rasuna Said lancar",
          time: "Baru saja",
          severity: "low"
        },
        ...prev.slice(0, 2)
      ]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout
      title="Route Planner"
      subtitle="Optimasi rute dengan data traffic real-time"
      badge={{
        icon: FiMapPin,
        text: "Live Traffic"
      }}
    >
      <div className="p-6 space-y-6">
        {/* Current Conditions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Cuaca</p>
                  <p className="text-lg font-semibold">{weatherData.condition}</p>
                  <p className="text-sm text-slate-600">{weatherData.temperature}°C</p>
                </div>
                <FiCloud className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Traffic Status</p>
                  <p className="text-lg font-semibold text-orange-600">Moderate</p>
                  <p className="text-sm text-slate-600">Jakarta Pusat</p>
                </div>
                <FiActivity className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Zone Optimal</p>
                  <p className="text-lg font-semibold text-emerald-600">Menteng</p>
                  <p className="text-sm text-slate-600">+20% bonus</p>
                </div>
                <FiTarget className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Prediksi Income</p>
                  <p className="text-lg font-semibold text-emerald-600">Rp 325K</p>
                  <p className="text-sm text-slate-600">Hari ini</p>
                </div>
                <FiDollarSign className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Route Planning Input */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FiNavigation className="h-5 w-5" />
                <span>Planning Rute</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Lokasi Awal
                </label>
                <Input
                  placeholder="Masukkan alamat awal..."
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Tujuan
                </label>
                <Input
                  placeholder="Masukkan tujuan..."
                  value={endLocation}
                  onChange={(e) => setEndLocation(e.target.value)}
                />
              </div>

              <Button 
                onClick={planRoute}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={!startLocation || !endLocation}
              >
                <FiMapPin className="mr-2 h-4 w-4" />
                Rencanakan Rute
              </Button>

              {/* Route Information */}
              {routeData && (
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-2">
                    {routeData.optimized ? "Rute Optimal" : "Rute Standard"}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Jarak:</span>
                      <span className="font-medium">{routeData.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Waktu Normal:</span>
                      <span className="font-medium">{routeData.duration}</span>
                    </div>
                    {routeData.durationInTraffic && (
                      <div className="flex justify-between">
                        <span>Waktu + Traffic:</span>
                        <span className="font-medium text-orange-600">{routeData.durationInTraffic}</span>
                      </div>
                    )}
                    {routeData.optimized && routeData.totalEarnings && (
                      <div className="flex justify-between border-t border-emerald-300 pt-2">
                        <span>Potensi Income:</span>
                        <span className="font-bold text-emerald-700">
                          Rp {routeData.totalEarnings.toLocaleString('id-ID')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Selected Zone Info */}
              {selectedZone && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">{selectedZone.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Demand:</span>
                      <Badge variant="outline" className="bg-blue-100">{selectedZone.demand}%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Traffic:</span>
                      <Badge variant="outline" className="bg-orange-100">{selectedZone.traffic}%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Earnings:</span>
                      <span className="font-medium">Rp {selectedZone.earnings.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Interactive Map */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FiMapPin className="h-5 w-5" />
                  <span>Interactive Map</span>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <FiZap className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96">
                {isGoogleMapsConfigured() ? (
                  <GoogleMapComponent
                    selectedZone={selectedZone}
                    onZoneSelect={handleZoneSelect}
                    startLocation={startLocation}
                    endLocation={endLocation}
                    onRouteCalculated={handleRouteCalculated}
                  />
                ) : (
                  <MapFallback 
                    selectedZone={selectedZone}
                    onZoneSelect={handleZoneSelect}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Alerts & Zone Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Real-time Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FiAlertTriangle className="h-5 w-5" />
                  <span>Update Real-time</span>
                </div>
                <Button variant="outline" size="sm">
                  <FiRefreshCw className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {realTimeAlerts.map((alert) => {
                  const IconComponent = getAlertIcon(alert.type);
                  return (
                    <Alert key={alert.id} className={getSeverityColor(alert.severity)}>
                      <IconComponent className="h-4 w-4" />
                      <AlertDescription>
                        <div className="flex justify-between items-start">
                          <span className="text-sm">{alert.message}</span>
                          <span className="text-xs opacity-70">{alert.time}</span>
                        </div>
                      </AlertDescription>
                    </Alert>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Zone Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FiTrendingUp className="h-5 w-5" />
                <span>Rekomendasi Zone</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {jakartaZones
                  .sort((a, b) => b.demand - a.demand)
                  .slice(0, 3)
                  .map((zone, index) => (
                    <div key={zone.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          index === 0 ? 'bg-emerald-500' : index === 1 ? 'bg-blue-500' : 'bg-orange-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{zone.name}</p>
                          <p className="text-sm text-slate-500">{zone.peakHours}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-emerald-600">
                          +{zone.currentBonus}%
                        </p>
                        <p className="text-sm text-slate-500">
                          {zone.estimatedTrips} trips
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
} 