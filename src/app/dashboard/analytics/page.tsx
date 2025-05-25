"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDataSync } from "@/context/DataSyncContext";
import { SyncIndicator } from "@/components/ui/SyncIndicator";
import {
  hasCompletedWellnessToday,
  getOverallWellnessScore,
  getWellnessStatus,
  getWellnessRecommendations
} from "@/lib/wellnessManager";
import {
  FiPieChart,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiClock,
  FiActivity,
  FiTarget,
  FiCalendar,
  FiBarChart,
  FiUsers,
  FiStar,
  FiAward,
  FiThumbsUp,
  FiFilter,
  FiDownload,
  FiRefreshCw,
  FiHeart,
  FiShield,
  FiBattery,
  FiAlertTriangle,
  FiWifi,
  FiWifiOff
} from "react-icons/fi";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from "recharts";

// Performance data over time (mock data dengan format sesuai backend)
const monthlyPerformance = [
  { month: "Jan", total_earnings: 8500000, total_trips: 165, total_distance: 5400, total_fare: 7650000, total_tip: 850000, rating: 4.6, wellness: 72 },
  { month: "Feb", total_earnings: 9200000, total_trips: 180, total_distance: 5850, total_fare: 8280000, total_tip: 920000, rating: 4.7, wellness: 75 },
  { month: "Mar", total_earnings: 8800000, total_trips: 170, total_distance: 5550, total_fare: 7920000, total_tip: 880000, rating: 4.5, wellness: 69 },
  { month: "Apr", total_earnings: 9500000, total_trips: 190, total_distance: 6175, total_fare: 8550000, total_tip: 950000, rating: 4.8, wellness: 78 },
  { month: "Mei", total_earnings: 10200000, total_trips: 205, total_distance: 6560, total_fare: 9180000, total_tip: 1020000, rating: 4.9, wellness: 81 },
  { month: "Jun", total_earnings: 11100000, total_trips: 220, total_distance: 7040, total_fare: 9990000, total_tip: 1110000, rating: 4.8, wellness: 79 }
];

// Daily earnings pattern
const dailyEarnings = [
  { day: "Senin", total_earnings: 320000, total_trips: 12, total_distance: 385, total_fare: 288000, total_tip: 32000, wellness: 75 },
  { day: "Selasa", total_earnings: 295000, total_trips: 11, total_distance: 355, total_fare: 265500, total_tip: 29500, wellness: 72 },
  { day: "Rabu", total_earnings: 285000, total_trips: 10, total_distance: 340, total_fare: 256500, total_tip: 28500, wellness: 70 },
  { day: "Kamis", total_earnings: 310000, total_trips: 12, total_distance: 375, total_fare: 279000, total_tip: 31000, wellness: 73 },
  { day: "Jumat", total_earnings: 350000, total_trips: 14, total_distance: 425, total_fare: 315000, total_tip: 35000, wellness: 78 },
  { day: "Sabtu", total_earnings: 420000, total_trips: 16, total_distance: 510, total_fare: 378000, total_tip: 42000, wellness: 82 },
  { day: "Minggu", total_earnings: 380000, total_trips: 15, total_distance: 465, total_fare: 342000, total_tip: 38000, wellness: 80 }
];

// Hourly performance
const hourlyData = [
  { hour: "06", total_earnings: 45000, total_trips: 2, demand: 30, fatigue: 15 },
  { hour: "07", total_earnings: 85000, total_trips: 3, demand: 65, fatigue: 25 },
  { hour: "08", total_earnings: 120000, total_trips: 4, demand: 85, fatigue: 35 },
  { hour: "09", total_earnings: 95000, total_trips: 3, demand: 60, fatigue: 40 },
  { hour: "10", total_earnings: 75000, total_trips: 3, demand: 45, fatigue: 45 },
  { hour: "11", total_earnings: 85000, total_trips: 3, demand: 50, fatigue: 50 },
  { hour: "12", total_earnings: 110000, total_trips: 4, demand: 70, fatigue: 55 },
  { hour: "13", total_earnings: 95000, total_trips: 3, demand: 65, fatigue: 60 },
  { hour: "14", total_earnings: 80000, total_trips: 3, demand: 55, fatigue: 65 },
  { hour: "15", total_earnings: 75000, total_trips: 3, demand: 50, fatigue: 70 },
  { hour: "16", total_earnings: 95000, total_trips: 3, demand: 65, fatigue: 75 },
  { hour: "17", total_earnings: 140000, total_trips: 5, demand: 90, fatigue: 80 },
  { hour: "18", total_earnings: 155000, total_trips: 5, demand: 95, fatigue: 85 },
  { hour: "19", total_earnings: 125000, total_trips: 4, demand: 80, fatigue: 80 },
  { hour: "20", total_earnings: 95000, total_trips: 3, demand: 60, fatigue: 75 },
  { hour: "21", total_earnings: 75000, total_trips: 3, demand: 45, fatigue: 70 }
];

// Wellness metrics trend
const wellnessMetrics = [
  { category: "Energy Level", current: 78, target: 85, trend: "+5%" },
  { category: "Stress Level", current: 35, target: 30, trend: "-8%" },
  { category: "Sleep Quality", current: 82, target: 85, trend: "+3%" },
  { category: "Work-Life Balance", current: 72, target: 80, trend: "+12%" },
  { category: "Physical Health", current: 85, target: 90, trend: "+7%" }
];

// Performance metrics breakdown
const performanceMetrics = [
  { name: "Trip Completion", value: 98, color: "#10b981" },
  { name: "Customer Rating", value: 94, color: "#3b82f6" },
  { name: "On-Time Performance", value: 91, color: "#f59e0b" },
  { name: "Fuel Efficiency", value: 85, color: "#8b5cf6" }
];

// Revenue breakdown
const revenueBreakdown = [
  { category: "Regular Trips", amount: 7800000, percentage: 70, color: "#10b981" },
  { category: "Peak Hour Bonus", amount: 1950000, percentage: 17.5, color: "#3b82f6" },
  { category: "Weekend Bonus", amount: 975000, percentage: 8.8, color: "#f59e0b" },
  { category: "Incentives", amount: 425000, percentage: 3.7, color: "#8b5cf6" }
];

// Financial planning data
const savingsData = [
  { month: "Jan", savings: 1700000, investments: 850000, expenses: 6000000 },
  { month: "Feb", savings: 1840000, investments: 920000, expenses: 6440000 },
  { month: "Mar", savings: 1760000, investments: 880000, expenses: 6160000 },
  { month: "Apr", savings: 1900000, investments: 950000, expenses: 6650000 },
  { month: "Mei", savings: 2040000, investments: 1020000, expenses: 7140000 },
  { month: "Jun", savings: 2220000, investments: 1110000, expenses: 7770000 }
];

export default function AnalyticsPage() {
  const [timeFilter, setTimeFilter] = useState("1m");
  const [hasWellnessData, setHasWellnessData] = useState(false);
  const [wellnessScore, setWellnessScore] = useState(0);
  const [realWellnessMetrics, setRealWellnessMetrics] = useState<any[]>([]);

  // Use DataSync context untuk sinkronisasi global  
  const {
    globalTripStats,
    isGlobalLoading,
    globalError,
    isGlobalAuthenticated,
    lastSyncTime,
    refreshData,
    clearGlobalError
  } = useDataSync();

  useEffect(() => {
    // Load wellness data
    const hasWellness = hasCompletedWellnessToday();
    setHasWellnessData(hasWellness);
    
    if (hasWellness) {
      const score = getOverallWellnessScore();      
      setWellnessScore(score);
      // Use wellnessMetrics from static data sebagai fallback
      setRealWellnessMetrics(wellnessMetrics);
    }
  }, []);

  // Load analytics data saat component mount
  useEffect(() => {
    if (isGlobalAuthenticated) {
      refreshData('analytics');
    }
  }, [isGlobalAuthenticated, refreshData]);

  // Handle time filter change
  const handleTimeFilterChange = (filter: string) => {
    setTimeFilter(filter);
    // Refresh data dengan periode baru jika diperlukan
    if (isGlobalAuthenticated) {
      refreshData('analytics');
    }
  };

  // Transform backend data or use mock data as fallback
  const getDisplayData = () => {
    if (isGlobalAuthenticated && globalTripStats.length > 0) {
      return globalTripStats;
    }
    
    // Fallback ke mock data
    const period = timeFilter === "1m" ? "daily" : timeFilter === "1y" ? "yearly" : "monthly";
    return period === "daily" ? dailyEarnings : monthlyPerformance;
  };

  const displayData = getDisplayData();
  const isRealData = isGlobalAuthenticated && globalTripStats.length > 0;

  // Calculate key metrics from display data
  const totalEarnings = displayData.reduce((sum, month) => sum + month.total_earnings, 0);
  const totalTrips = displayData.reduce((sum, month) => sum + month.total_trips, 0);
  const avgRating = displayData.reduce((sum, month) => sum + (month.rating || 4.5), 0) / displayData.length;
  const totalDistance = displayData.reduce((sum, month) => sum + (month.total_distance || 0), 0);
  
  // Use real wellness score if available, otherwise use mock data for non-wellness calculations
  const avgWellness = hasWellnessData ? wellnessScore : 0;

  const currentMonth = displayData[displayData.length - 1];
  const previousMonth = displayData[displayData.length - 2];
  
  const earningsGrowth = previousMonth ? ((currentMonth.total_earnings - previousMonth.total_earnings) / previousMonth.total_earnings) * 100 : 0;
  const tripsGrowth = previousMonth ? ((currentMonth.total_trips - previousMonth.total_trips) / previousMonth.total_trips) * 100 : 0;
  const wellnessGrowth = hasWellnessData ? 5.2 : 0; // Mock growth since we don't have historical data yet

  const wellnessStatus = hasWellnessData ? getWellnessStatus(wellnessScore) : null;

  return (
    <DashboardLayout
      title="Analytics"
      subtitle="Analisis mendalam performa dan tren penghasilan"
      badge={{
        icon: isGlobalAuthenticated ? FiWifi : FiWifiOff,
        text: lastSyncTime ? 
          `Last sync: ${lastSyncTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}` : 
          "No sync"
      }}
    >
      <div className="p-6">
        {/* Global Sync Indicator */}
        <SyncIndicator pageType="analytics" showDetails={false} />

        {/* Time Filter Controls */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Performance Analytics</h1>
          <div className="flex items-center space-x-2">
            {['1m', '3m', '6m', '1y'].map((filter) => (
              <Button
                key={filter}
                variant={timeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => handleTimeFilterChange(filter)}
              >
                {filter}
              </Button>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => refreshData('analytics')}
              disabled={isGlobalLoading}
            >
              <FiRefreshCw className={`h-4 w-4 ${isGlobalLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Connection Status and Loading Alerts */}
        {!isGlobalAuthenticated && (
          <Alert className="bg-amber-50 border-amber-200 mb-6">
            <FiWifiOff className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Offline Mode:</strong> Menampilkan data mock untuk demo. Login untuk melihat data real-time dari backend.
            </AlertDescription>
          </Alert>
        )}

        {globalError && (
          <Alert className="bg-red-50 border-red-200 mb-6">
            <FiAlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 flex items-center justify-between">
              <span><strong>Error:</strong> {globalError}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearGlobalError}
                className="ml-2"
              >
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {isGlobalLoading && (
          <Alert className="bg-blue-50 border-blue-200 mb-6">
            <FiRefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
            <AlertDescription className="text-blue-800">
              <strong>Loading:</strong> Mengambil data terbaru dari server...
            </AlertDescription>
          </Alert>
        )}

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Total Earnings</p>
                  <p className="text-3xl font-bold">Rp {Math.round(totalEarnings / 1000000)} Juta</p>
                  <div className="flex items-center space-x-1 text-emerald-100 text-xs">
                    <FiTrendingUp className="h-3 w-3" />
                    <span>+{earningsGrowth.toFixed(1)}% dari bulan lalu</span>
                  </div>
                </div>
                <FiDollarSign className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Trips</p>
                  <p className="text-3xl font-bold">{totalTrips}</p>
                  <div className="flex items-center space-x-1 text-blue-100 text-xs">
                    <FiTrendingUp className="h-3 w-3" />
                    <span>+{tripsGrowth.toFixed(1)}% dari bulan lalu</span>
                  </div>
                </div>
                <FiActivity className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Wellness Score</p>
                  {hasWellnessData ? (
                    <>
                      <p className="text-3xl font-bold">{avgWellness}%</p>
                      <div className="flex items-center space-x-1 text-purple-100 text-xs">
                        <FiTrendingUp className="h-3 w-3" />
                        <span>+{wellnessGrowth.toFixed(1)}% improvement</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold">--</p>
                      <div className="flex items-center space-x-1 text-purple-100 text-xs">
                        <FiAlertTriangle className="h-3 w-3" />
                        <span>Assessment needed</span>
                      </div>
                    </>
                  )}
                </div>
                <FiHeart className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Avg Rating</p>
                  <p className="text-3xl font-bold">{avgRating.toFixed(1)}</p>
                  <div className="flex items-center space-x-1 text-orange-100 text-xs">
                    <FiStar className="h-3 w-3" />
                    <span>Excellent performance</span>
                  </div>
                </div>
                <FiStar className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Monthly Performance Trend */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiTrendingUp className="h-5 w-5 text-emerald-600" />
                  <span>Performance Trend (6 Bulan)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={displayData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis yAxisId="earnings" orientation="left" stroke="#64748b" tickFormatter={(value) => `${value / 1000000} Juta`} />
                    <YAxis yAxisId="wellness" orientation="right" stroke="#64748b" />
                    <Tooltip 
                      formatter={(value: any, name: string) => {
                        if (name === 'Pendapatan') return [`Rp ${value.toLocaleString('id-ID')}`, 'Pendapatan'];
                        if (name === 'total_trips') return [value, 'Trips'];
                        if (name === 'wellness') return [`${value}%`, 'Wellness Score'];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Line 
                      yAxisId="earnings"
                      type="monotone" 
                      dataKey="total_earnings" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      name="Pendapatan"
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      yAxisId="wellness"
                      type="monotone" 
                      dataKey="wellness" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      name="Wellness Score"
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      yAxisId="earnings"
                      type="monotone" 
                      dataKey="rating" 
                      stroke="#f59e0b" 
                      strokeWidth={3}
                      name="Rating"
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Daily Performance & Wellness */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiBarChart className="h-5 w-5 text-blue-600" />
                  <span>Earnings & Wellness Harian</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyEarnings}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis yAxisId="earnings" orientation="left" stroke="#64748b" tickFormatter={(value) => `${value / 1000}rb`} />
                    <YAxis yAxisId="wellness" orientation="right" stroke="#64748b" />
                    <Tooltip 
                      formatter={(value: any, name: string) => {
                        if (name === 'Pendapatan') return [`Rp ${value.toLocaleString('id-ID')}`, 'Pendapatan'];
                        if (name === 'Wellness') return [`${value}%`, 'Wellness'];
                        return [value, name];
                      }}
                    />
                    <Bar yAxisId="earnings" dataKey="total_earnings" fill="#10b981" name="Pendapatan" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="wellness" dataKey="wellness" fill="#8b5cf6" name="Wellness" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Hourly Fatigue Analysis */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiBattery className="h-5 w-5 text-purple-600" />
                  <span>Analisis Fatigue per Jam</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="hour" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      formatter={(value: any, name: string) => {
                        if (name === 'Pendapatan') return [`Rp ${value.toLocaleString('id-ID')}`, 'Pendapatan'];
                        if (name === 'Fatigue Level') return [`${value}%`, 'Fatigue Level'];
                        return [value, name];
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="total_earnings" 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.3}
                      name="Pendapatan"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="fatigue" 
                      stroke="#ef4444" 
                      fill="#ef4444" 
                      fillOpacity={0.2}
                      name="Fatigue Level"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Financial Planning */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiShield className="h-5 w-5 text-green-600" />
                  <span>Financial Planning Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={savingsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" tickFormatter={(value) => `${value / 1000000} Juta`} />
                    <Tooltip 
                      formatter={(value: any, name: string) => {
                        if (name === 'savings') return [`Rp ${value.toLocaleString('id-ID')}`, 'Tabungan'];
                        if (name === 'investments') return [`Rp ${value.toLocaleString('id-ID')}`, 'Investasi'];
                        if (name === 'expenses') return [`Rp ${value.toLocaleString('id-ID')}`, 'Pengeluaran'];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="savings" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      name="Tabungan"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="investments" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      name="Investasi"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      name="Pengeluaran"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Metrics and Analysis */}
          <div className="space-y-8">
            {/* Performance Metrics */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiTarget className="h-5 w-5 text-emerald-600" />
                  <span>Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceMetrics.map((metric) => (
                  <div key={metric.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{metric.name}</span>
                      <span className="text-sm text-slate-500">{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                ))}
                
                <Separator className="my-4" />
                
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiAward className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-800">Achievement</span>
                  </div>
                  <p className="text-xs text-emerald-700">
                    Top 10% driver berdasarkan wellness score bulan ini! Excellent work! 🏆
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiPieChart className="h-5 w-5 text-blue-600" />
                  <span>Revenue Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={revenueBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {revenueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`Rp ${value.toLocaleString('id-ID')}`, 'Amount']}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="space-y-2 mt-4">
                  {revenueBreakdown.map((item) => (
                    <div key={item.category} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-slate-700">{item.category}</span>
                      </div>
                      <span className="font-medium text-slate-800">
                        Rp {(item.amount / 1000000).toFixed(1)} Juta
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Wellness Metrics */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiHeart className="h-5 w-5 text-purple-600" />
                  <span>Wellness Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {hasWellnessData ? (
                  <>
                    {/* Real wellness metrics from assessment */}
                    {realWellnessMetrics.map((metric) => (
                      <div key={metric.name}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">{metric.name}</span>
                          <span className="text-sm text-slate-500">{metric.value}%</span>
                        </div>
                        <Progress value={metric.value} className="h-2" />
                      </div>
                    ))}
                    
                    <Separator className="my-4" />
                    
                    {/* Wellness recommendations */}
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <FiTarget className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">Today's Recommendation</span>
                      </div>
                      <p className="text-xs text-purple-700">
                        {getWellnessRecommendations(wellnessScore)[0]}
                      </p>
                    </div>
                  </>
                ) : (
                  // Show assessment prompt if no data
                  <div className="text-center space-y-4">
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                      <FiHeart className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                      <h3 className="font-semibold text-slate-800 mb-2">
                        Wellness Assessment Required
                      </h3>
                      <p className="text-sm text-slate-600 mb-4">
                        Complete your daily wellness assessment to see detailed health metrics and risk analysis.
                      </p>
                      <Button
                        onClick={() => window.location.href = '/dashboard/wellness'}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <FiHeart className="mr-2 h-4 w-4" />
                        Start Assessment
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-yellow-800">
                        ⚡ <strong>Tip:</strong> Daily assessment takes only 2 minutes and provides valuable health insights.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Insights */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiThumbsUp className="h-5 w-5 text-green-600" />
                  <span>Quick Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800 mb-1">📈 Best Performance Day</h4>
                  <p className="text-xs text-blue-700">
                    Sabtu adalah hari terbaik dengan rata-rata Rp 420K{hasWellnessData ? ' dan wellness 82%' : ''}
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="text-sm font-medium text-green-800 mb-1">⏰ Peak Hours</h4>
                  <p className="text-xs text-green-700">
                    17:00-18:00 jam tersibuk dengan Rp 155K/jam{hasWellnessData ? ', tapi fatigue level tinggi (85%)' : ''}
                  </p>
                </div>
                
                {hasWellnessData ? (
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="text-sm font-medium text-purple-800 mb-1">❤️ Wellness Trend</h4>
                    <p className="text-xs text-purple-700">
                      Wellness score Anda {wellnessScore}% - {wellnessStatus?.text}. {wellnessScore >= 75 ? 'Pertahankan kondisi baik ini!' : 'Perlu perhatian lebih pada kesehatan.'}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-800 mb-1">❤️ Wellness Assessment</h4>
                    <p className="text-xs text-gray-700">
                      Lengkapi assessment wellness untuk mendapatkan insights kesehatan yang personal.
                    </p>
                  </div>
                )}
                
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="text-sm font-medium text-orange-800 mb-1">💰 Savings Growth</h4>
                  <p className="text-xs text-orange-700">
                    Tabungan meningkat 30% dalam 6 bulan. Investasi konsisten setiap bulan.
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