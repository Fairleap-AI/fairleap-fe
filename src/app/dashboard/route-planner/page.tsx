"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  FiMapPin,
  FiNavigation,
  FiClock,
  FiDollarSign,
  FiTrendingUp,
  FiActivity,
  FiThermometer,
  FiDroplet,
  FiWind,
  FiSun,
  FiCloud,
  FiTarget,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiRefreshCw,
  FiSettings,
  FiFilter
} from "react-icons/fi";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Traffic data for different zones
const trafficData = [
  { time: "06:00", kelapa_gading: 65, menteng: 45, senayan: 30, kemang: 40, pik: 25 },
  { time: "07:00", kelapa_gading: 85, menteng: 70, senayan: 55, kemang: 60, pik: 45 },
  { time: "08:00", kelapa_gading: 95, menteng: 90, senayan: 85, kemang: 80, pik: 70 },
  { time: "09:00", kelapa_gading: 75, menteng: 65, senayan: 60, kemang: 55, pik: 50 },
  { time: "10:00", kelapa_gading: 45, menteng: 40, senayan: 35, kemang: 40, pik: 30 },
  { time: "11:00", kelapa_gading: 50, menteng: 45, senayan: 40, kemang: 45, pik: 35 },
  { time: "12:00", kelapa_gading: 70, menteng: 65, senayan: 60, kemang: 65, pik: 55 },
  { time: "13:00", kelapa_gading: 75, menteng: 70, senayan: 65, kemang: 70, pik: 60 },
  { time: "14:00", kelapa_gading: 60, menteng: 55, senayan: 50, kemang: 55, pik: 45 },
  { time: "15:00", kelapa_gading: 55, menteng: 50, senayan: 45, kemang: 50, pik: 40 },
  { time: "16:00", kelapa_gading: 75, menteng: 80, senayan: 75, kemang: 70, pik: 60 },
  { time: "17:00", kelapa_gading: 90, menteng: 95, senayan: 90, kemang: 85, pik: 75 },
  { time: "18:00", kelapa_gading: 95, menteng: 98, senayan: 95, kemang: 90, pik: 80 },
  { time: "19:00", kelapa_gading: 80, menteng: 75, senayan: 70, kemang: 75, pik: 65 },
  { time: "20:00", kelapa_gading: 60, menteng: 55, senayan: 50, kemang: 55, pik: 45 },
  { time: "21:00", kelapa_gading: 45, menteng: 40, senayan: 35, kemang: 40, pik: 30 }
];

// Zone demand and earnings data
const zoneData = [
  {
    id: 1,
    name: "Menteng",
    demand: 92,
    traffic: 85,
    earnings: 52000,
    distance: "2.3 km",
    eta: "8 menit",
    status: "high",
    weather: "cerah",
    fuel_cost: 8500,
    hotspots: ["Plaza Indonesia", "Grand Indonesia", "Sarinah"]
  },
  {
    id: 2,
    name: "Kelapa Gading",
    demand: 85,
    traffic: 65,
    earnings: 45000,
    distance: "5.1 km",
    eta: "15 menit",
    status: "medium",
    weather: "cerah",
    fuel_cost: 18500,
    hotspots: ["Mall of Indonesia", "Kelapa Gading Mall", "La Piazza"]
  },
  {
    id: 3,
    name: "Senayan",
    demand: 78,
    traffic: 75,
    earnings: 38000,
    distance: "3.7 km",
    eta: "12 menit",
    status: "medium",
    weather: "berawan",
    fuel_cost: 13500,
    hotspots: ["Senayan City", "FX Sudirman", "Plaza Senayan"]
  },
  {
    id: 4,
    name: "Kemang",
    demand: 88,
    traffic: 55,
    earnings: 48000,
    distance: "4.2 km",
    eta: "11 menit",
    status: "high",
    weather: "cerah",
    fuel_cost: 15000,
    hotspots: ["Kemang Village", "Lippo Mall Kemang", "Kemang Raya"]
  },
  {
    id: 5,
    name: "PIK",
    demand: 75,
    traffic: 45,
    earnings: 35000,
    distance: "8.9 km",
    eta: "22 menit",
    status: "low",
    weather: "cerah",
    fuel_cost: 32000,
    hotspots: ["PIK Avenue", "Living World", "Pantai Indah Kapuk"]
  }
];

// Route recommendations
const routeRecommendations = [
  {
    id: 1,
    title: "Rute Pagi Optimal",
    description: "Kuningan → Menteng → Kelapa Gading",
    estimated_earnings: 285000,
    estimated_time: "3.5 jam",
    fuel_cost: 45000,
    net_profit: 240000,
    efficiency: 95,
    peak_times: ["07:00-09:00", "12:00-13:00"],
    icon: FiSun
  },
  {
    id: 2,
    title: "Rute Siang Efisien",
    description: "Kemang → Senayan → Menteng",
    estimated_earnings: 220000,
    estimated_time: "3 jam",
    fuel_cost: 35000,
    net_profit: 185000,
    efficiency: 88,
    peak_times: ["11:00-14:00"],
    icon: FiClock
  },
  {
    id: 3,
    title: "Rute Sore Premium",
    description: "SCBD → Menteng → Kelapa Gading",
    estimated_earnings: 340000,
    estimated_time: "4 jam",
    fuel_cost: 55000,
    net_profit: 285000,
    efficiency: 92,
    peak_times: ["17:00-20:00"],
    icon: FiTrendingUp
  }
];

// Weather and conditions
const currentConditions = {
  weather: {
    condition: "Cerah",
    temperature: 32,
    humidity: 65,
    wind: 8,
    icon: FiSun,
    visibility: "Baik"
  },
  traffic: {
    overall: "Sedang",
    hotspots: ["Jl. Sudirman", "Jl. Thamrin", "Kuningan"],
    level: 65
  }
};

export default function RoutePlannerPage() {
  const [selectedZone, setSelectedZone] = useState(zoneData[0]);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(routeRecommendations[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high": return "bg-green-100 text-green-800 border-green-300";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case "cerah": return FiSun;
      case "berawan": return FiCloud;
      case "hujan": return FiDroplet;
      default: return FiSun;
    }
  };

  return (
    <DashboardLayout
      title="Route Planner"
      subtitle="Optimasi Rute & Navigasi Cerdas"
      badge={{
        icon: FiActivity,
        text: "Live Tracking"
      }}
    >
      <div className="p-6">
        {/* Current Conditions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Cuaca Hari Ini</p>
                  <p className="text-2xl font-bold">{currentConditions.weather.condition}</p>
                  <p className="text-blue-100 text-xs">{currentConditions.weather.temperature}°C, {currentConditions.weather.humidity}% humidity</p>
                </div>
                <currentConditions.weather.icon className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Traffic Level</p>
                  <p className="text-2xl font-bold">{currentConditions.traffic.level}%</p>
                  <p className="text-orange-100 text-xs">{currentConditions.traffic.overall}</p>
                </div>
                <FiActivity className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Zona Optimal</p>
                  <p className="text-2xl font-bold">Menteng</p>
                  <p className="text-emerald-100 text-xs">92% demand rate</p>
                </div>
                <FiTarget className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Estimasi Earnings</p>
                  <p className="text-2xl font-bold">Rp 285K</p>
                  <p className="text-purple-100 text-xs">Rute pagi optimal</p>
                </div>
                <FiDollarSign className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Map and Route Input */}
          <div className="lg:col-span-2 space-y-8">
            {/* Route Input */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiNavigation className="h-5 w-5 text-blue-600" />
                  <span>Perencanaan Rute</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start">Lokasi Awal</Label>
                    <Input
                      id="start"
                      placeholder="Masukkan alamat awal..."
                      value={startLocation}
                      onChange={(e) => setStartLocation(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end">Tujuan</Label>
                    <Input
                      id="end"
                      placeholder="Masukkan tujuan..."
                      value={endLocation}
                      onChange={(e) => setEndLocation(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 flex-1">
                    <FiNavigation className="h-4 w-4 mr-2" />
                    Cari Rute Optimal
                  </Button>
                  <Button variant="outline">
                    <FiRefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button variant="outline">
                    <FiSettings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Map Placeholder */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiMapPin className="h-5 w-5 text-emerald-600" />
                  <span>Peta Interaktif & Heat Map</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <div className="text-center">
                    <FiMapPin className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Interactive Map</h3>
                    <p className="text-slate-500 text-sm">
                      Peta dengan heat map zona demand, traffic conditions, dan rute optimal akan ditampilkan di sini
                    </p>
                  </div>
                  
                  {/* Zone markers simulation */}
                  <div className="absolute top-4 left-4 bg-red-500 w-3 h-3 rounded-full animate-pulse"></div>
                  <div className="absolute top-8 right-12 bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-12 left-8 bg-yellow-500 w-3 h-3 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 right-6 bg-blue-500 w-3 h-3 rounded-full animate-pulse"></div>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>High Demand</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Medium Demand</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Low Traffic</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <FiFilter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Traffic Analysis */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiActivity className="h-5 w-5 text-orange-600" />
                  <span>Analisis Traffic Harian</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="time" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      formatter={(value: number, name: string) => [`${value}%`, name.replace('_', ' ')]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="menteng" 
                      stackId="1" 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.3}
                      name="Menteng"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="kelapa_gading" 
                      stackId="1" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3}
                      name="Kelapa Gading"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="senayan" 
                      stackId="1" 
                      stroke="#f59e0b" 
                      fill="#f59e0b" 
                      fillOpacity={0.3}
                      name="Senayan"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Zone Info and Recommendations */}
          <div className="space-y-8">
            {/* Zone Details */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiTarget className="h-5 w-5 text-emerald-600" />
                  <span>Zona Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {zoneData.map((zone) => {
                  const WeatherIcon = getWeatherIcon(zone.weather);
                  
                  return (
                    <div 
                      key={zone.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedZone.id === zone.id ? 'border-emerald-300 bg-emerald-50' : 'hover:bg-slate-50'
                      }`}
                      onClick={() => setSelectedZone(zone)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-slate-800">{zone.name}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={getStatusColor(zone.status)}>
                            {zone.status}
                          </Badge>
                          <WeatherIcon className="h-4 w-4 text-slate-600" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-slate-500">Demand</p>
                          <p className="font-bold text-emerald-600">{zone.demand}%</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Earnings</p>
                          <p className="font-bold text-slate-800">Rp {zone.earnings.toLocaleString('id-ID')}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Distance</p>
                          <p className="font-medium text-slate-700">{zone.distance}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">ETA</p>
                          <p className="font-medium text-slate-700">{zone.eta}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-xs text-slate-500 mb-1">Hotspots:</p>
                        <div className="flex flex-wrap gap-1">
                          {zone.hotspots.map((spot, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {spot}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Route Recommendations */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiNavigation className="h-5 w-5 text-blue-600" />
                  <span>Rute Direkomendasikan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {routeRecommendations.map((route) => {
                  const RouteIcon = route.icon;
                  
                  return (
                    <div 
                      key={route.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedRoute.id === route.id ? 'border-blue-300 bg-blue-50' : 'hover:bg-slate-50'
                      }`}
                      onClick={() => setSelectedRoute(route)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <RouteIcon className="h-4 w-4 text-blue-600" />
                          <h4 className="font-semibold text-slate-800">{route.title}</h4>
                        </div>
                        <Badge variant="outline" className="bg-blue-100 text-blue-700">
                          {route.efficiency}% efisien
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-3">{route.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-slate-500">Estimasi Earnings</p>
                          <p className="font-bold text-emerald-600">Rp {route.estimated_earnings.toLocaleString('id-ID')}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Waktu</p>
                          <p className="font-medium text-slate-700">{route.estimated_time}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Biaya BBM</p>
                          <p className="font-medium text-red-600">Rp {route.fuel_cost.toLocaleString('id-ID')}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Net Profit</p>
                          <p className="font-bold text-green-600">Rp {route.net_profit.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-xs text-slate-500 mb-1">Peak Times:</p>
                        <div className="flex flex-wrap gap-1">
                          {route.peak_times.map((time, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-orange-50 text-orange-700">
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiActivity className="h-5 w-5 text-purple-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <FiNavigation className="h-4 w-4 mr-2" />
                  Mulai Navigasi
                </Button>
                
                <Button variant="outline" className="w-full">
                  <FiRefreshCw className="h-4 w-4 mr-2" />
                  Update Traffic
                </Button>
                
                <Button variant="outline" className="w-full">
                  <FiInfo className="h-4 w-4 mr-2" />
                  Detail Rute
                </Button>
                
                <Separator />
                
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiAlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Traffic Alert</span>
                  </div>
                  <p className="text-xs text-yellow-700">
                    Kemacetan parah di Jl. Sudirman. Estimasi keterlambatan +15 menit.
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiCheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Rekomendasi</span>
                  </div>
                  <p className="text-xs text-green-700">
                    Zona Menteng sedang high demand. Pergi sekarang untuk earnings optimal!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 