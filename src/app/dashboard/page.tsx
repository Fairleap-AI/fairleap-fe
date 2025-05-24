"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  FiDollarSign,
  FiTrendingUp,
  FiMapPin,
  FiActivity,
  FiClock,
  FiTarget,
  FiHeart,
  FiShield,
  FiLogOut,
  FiUser,
  FiSettings,
  FiBell,
  FiBarChart,
  FiMap,
  FiMenu,
  FiX,
  FiMessageCircle,
  FiSend,
  FiHome,
  FiPieChart,
  FiTrendingDown,
  FiBookOpen,
  FiHelpCircle
} from "react-icons/fi";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  calculateRouteOptimization, 
  getTimeBasedRecommendations, 
  generateRealTimeAlerts,
  formatCurrency,
  ZoneData 
} from "@/lib/routeOptimization";

// Mock data untuk demo
const earningsData = [
  { day: "Sen", actual: 285000, predicted: 290000 },
  { day: "Sel", actual: 320000, predicted: 315000 },
  { day: "Rab", actual: 275000, predicted: 280000 },
  { day: "Kam", actual: 310000, predicted: 305000 },
  { day: "Jum", actual: 350000, predicted: 345000 },
  { day: "Sab", actual: 420000, predicted: 415000 },
  { day: "Min", actual: 380000, predicted: 375000 }
];

// Jakarta zones data yang sinkron dengan Route Planner
const jakartaZones: ZoneData[] = [
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

const wellnessData = [
  { name: "Energy", value: 75, color: "#10b981" },
  { name: "Stress", value: 35, color: "#f59e0b" },
  { name: "Fatigue", value: 45, color: "#ef4444" }
];

const monthlyEarnings = [
  { month: "Jan", earnings: 8500000 },
  { month: "Feb", earnings: 9200000 },
  { month: "Mar", earnings: 8800000 },
  { month: "Apr", earnings: 9500000 },
  { month: "Mei", earnings: 10200000 },
  { month: "Jun", earnings: 11100000 }
];

// Chatbot messages
interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function DashboardPage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [optimizedRoute, setOptimizedRoute] = useState<any>(null);
  const [timeBasedRecommendations, setTimeBasedRecommendations] = useState<ZoneData[]>([]);

  useEffect(() => {
    // Update time
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    
    // Calculate optimized route
    const optimized = calculateRouteOptimization(jakartaZones);
    setOptimizedRoute(optimized);
    
    // Get time-based recommendations
    const currentHour = new Date().getHours();
    const recommendations = getTimeBasedRecommendations(jakartaZones, currentHour);
    setTimeBasedRecommendations(recommendations);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <DashboardLayout
      title="Dashboard Overview"
      subtitle={currentTime.toLocaleDateString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}
      badge={{
        icon: FiActivity,
        text: "Online"
      }}
    >
      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Selamat {currentTime.getHours() < 12 ? 'Pagi' : currentTime.getHours() < 17 ? 'Siang' : 'Malam'}, Driver!
          </h2>
          <p className="text-slate-600">
            Lihat prediksi penghasilan hari ini dan optimasi rute untuk memaksimalkan income Anda.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Prediksi Hari Ini</p>
                  <p className="text-3xl font-bold">
                    {optimizedRoute ? formatCurrency(Math.round(optimizedRoute.totalEarnings)) : "Rp 325K"}
                  </p>
                  <p className="text-emerald-100 text-xs">Optimal route AI</p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <FiDollarSign className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Bulan Ini</p>
                  <p className="text-3xl font-bold">Rp 8.2M</p>
                  <p className="text-blue-100 text-xs">73% dari target</p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <FiTrendingUp className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Wellness Score</p>
                  <p className="text-3xl font-bold">75%</p>
                  <p className="text-purple-100 text-xs">Good condition</p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <FiHeart className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Route Efficiency</p>
                  <p className="text-3xl font-bold">
                    {optimizedRoute?.efficiency || 88}%
                  </p>
                  <p className="text-orange-100 text-xs">AI optimized</p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <FiMapPin className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Earnings Prediction Chart */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiBarChart className="h-5 w-5 text-emerald-600" />
                  <span>Prediksi vs Aktual Penghasilan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis 
                      stroke="#64748b" 
                      tickFormatter={(value) => `${value / 1000}K`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID')}`, '']}
                      labelStyle={{ color: '#1f2937' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      name="Prediksi"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      name="Aktual"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Route Optimization */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FiMap className="h-5 w-5 text-blue-600" />
                    <span>AI Route Optimization</span>
                  </CardTitle>
                  <Badge className="bg-emerald-100 text-emerald-800">
                    Score: {optimizedRoute ? Math.round(optimizedRoute.score) : 'Loading...'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Optimized Route Info */}
                  {optimizedRoute && (
                    <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200 mb-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600">Total Distance:</p>
                          <p className="font-semibold">{optimizedRoute.totalDistance}</p>
                        </div>
                        <div>
                          <p className="text-slate-600">Est. Duration:</p>
                          <p className="font-semibold">{optimizedRoute.totalDuration}</p>
                        </div>
                        <div>
                          <p className="text-slate-600">Efficiency:</p>
                          <p className="font-semibold text-emerald-600">{optimizedRoute.efficiency}%</p>
                        </div>
                        <div>
                          <p className="text-slate-600">Total Income:</p>
                          <p className="font-bold text-emerald-700">{formatCurrency(Math.round(optimizedRoute.totalEarnings))}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Top Zones */}
                  {(optimizedRoute?.zones || timeBasedRecommendations.slice(0, 5)).map((zone: ZoneData, index: number) => (
                    <div key={zone.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          zone.demand > 85 ? 'bg-green-500' : 
                          zone.demand > 75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <p className="font-semibold text-slate-800">{zone.name}</p>
                          <div className="flex items-center space-x-3 text-sm text-slate-500">
                            <span>Demand: {zone.demand}%</span>
                            <span>Traffic: {zone.traffic}%</span>
                            {zone.currentBonus && zone.currentBonus > 0 && (
                              <Badge variant="outline" className="bg-emerald-100 text-emerald-700 text-xs">
                                +{zone.currentBonus}%
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600">{formatCurrency(zone.earnings)}</p>
                        <p className="text-xs text-slate-500">Est. per trip</p>
                      </div>
                    </div>
                  ))}

                  {/* Quick Action */}
                  <div className="mt-4">
                    <Button 
                      onClick={() => router.push('/dashboard/route-planner')}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <FiMapPin className="mr-2 h-4 w-4" />
                      Open Route Planner
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Calendar & AI Insights */}
          <div className="space-y-8">
            {/* Wellness Dashboard */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiHeart className="h-5 w-5 text-red-500" />
                  <span>Wellness Guardian</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {wellnessData.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">{item.name}</span>
                      <span className="text-sm text-slate-500">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-2" />
                  </div>
                ))}
                
                <Separator className="my-4" />
                
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-emerald-800 mb-2">💡 Rekomendasi Hari Ini</p>
                  <p className="text-xs text-emerald-700">
                    Istirahat 15 menit setiap 2 jam untuk menjaga stamina optimal.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiTarget className="h-5 w-5 text-emerald-600" />
                  <span>AI Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">🚀 Peak Hour Alert</h4>
                  <p className="text-sm text-blue-700">
                    {timeBasedRecommendations[0]?.name || "Menteng"} area optimal untuk jam {currentTime.getHours()}:00
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚡ Route Optimization</h4>
                  <p className="text-sm text-yellow-700">
                    {optimizedRoute ? 
                      `Efisiensi rute meningkat ${optimizedRoute.efficiency}% dengan AI routing` :
                      "Hindari Jl. Sudirman pada jam 16:00-18:00. Alternatif: Jl. Rasuna Said"
                    }
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">💰 Earning Boost</h4>
                  <p className="text-sm text-green-700">
                    {optimizedRoute ? 
                      `Target ${optimizedRoute.zones.length} zone optimal untuk maksimal income` :
                      "Target 12 trip hari ini untuk mencapai bonus mingguan Rp 150K"
                    }
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
