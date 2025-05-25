"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useDataIntegrationContext } from "@/providers/DataIntegrationProvider";
import { RefreshButton } from "@/components/RefreshButton";
import {
  hasCompletedWellnessToday,
  getOverallWellnessScore,
  getWellnessStatus
} from "@/lib/wellnessManager";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FiTrendingUp,
  FiDollarSign,
  FiClock,
  FiActivity,
  FiAlertTriangle,
  FiSun,
  FiMoon,
  FiShield,
  FiTarget,
  FiHeart,
  FiStar,
  FiCalendar,
  FiRefreshCw,
  FiWifi,
  FiWifiOff
} from "react-icons/fi";

// Peak hours data (static for now)
const peakHoursData = [
  { hour: "06:00", demand: 60 },
  { hour: "07:00", demand: 80 },
  { hour: "08:00", demand: 95 },
  { hour: "12:00", demand: 70 },
  { hour: "17:00", demand: 90 },
  { hour: "18:00", demand: 100 },
  { hour: "19:00", demand: 85 },
  { hour: "21:00", demand: 65 }
];

// Format currency helper
const formatCurrency = (amount: number): string => {
  return `Rp ${amount.toLocaleString('id-ID')}`;
};

export default function DashboardPage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasWellnessData, setHasWellnessData] = useState(false);
  const [wellnessScore, setWellnessScore] = useState(0);
  const [wellnessStatus, setWellnessStatus] = useState<any>(null);

  // Use DataIntegration context - TANPA auto-sync
  const {
    tripStats,
    weeklyEarnings,
    isLoading,
    error,
    isAuthenticated,
    cacheStatus,
    forceRefresh,
    clearError
  } = useDataIntegrationContext();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Load wellness data from local system
    const hasWellness = hasCompletedWellnessToday();
    setHasWellnessData(hasWellness);
    
    if (hasWellness) {
      const score = getOverallWellnessScore();
      const status = getWellnessStatus(score);
      setWellnessScore(score);
      setWellnessStatus(status);
    }

    return () => clearInterval(timer);
  }, []);

  // Calculate data from tripStats instead of globalTripStats
  const todayData = tripStats.length > 0 ? 
    tripStats[tripStats.length - 1] : 
    { total_earnings: 0, total_fare: 0, total_tip: 0, total_trips: 0, total_distance: 0 };

  // Calculate actual earnings (fare + tip) if total_earnings not available
  const todayEarnings = todayData.total_earnings || (todayData.total_fare + (todayData.total_tip || 0));
  const todayProgress = Math.min((todayEarnings / 600000) * 100, 100); // Target Rp 600K

  // Calculate weekly totals from trip data
  const weeklyTotals = tripStats.reduce((acc: any, day: any) => {
    const dayEarnings = day.total_earnings || (day.total_fare + (day.total_tip || 0));
    return {
      earnings: acc.earnings + dayEarnings,
      trips: acc.trips + day.total_trips,
      distance: acc.distance + day.total_distance
    };
  }, { earnings: 0, trips: 0, distance: 0 });

  const averageTripValue = weeklyTotals.trips > 0 ? 
    Math.round(weeklyTotals.earnings / weeklyTotals.trips) : 0;

  // Debug logging
  console.log('🏠 Dashboard - tripStats:', tripStats);
  console.log('📊 Dashboard - weeklyEarnings:', weeklyEarnings);
  console.log('📈 Dashboard - todayData:', todayData);
  console.log('📊 Dashboard - weeklyTotals:', weeklyTotals);

  // Get last update time from cache
  const getLastSyncTime = () => {
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
    
    return validUpdates.length > 0 ? validUpdates[0] : null;
  };

  const lastSyncTime = getLastSyncTime();

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle={`Selamat datang kembali! ${currentTime.toLocaleDateString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}`}
      badge={{
        icon: isAuthenticated ? FiWifi : FiWifiOff,
        text: lastSyncTime ? 
          `Last sync: ${lastSyncTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}` : 
          "No sync"
      }}
    >
      <div className="p-6 space-y-6">
        {/* Header dengan Refresh Button */}
        {isAuthenticated && (
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
              <p className="text-slate-600">Data real-time dari backend FairLeap</p>
            </div>
            <RefreshButton showText={true} />
          </div>
        )}

        {/* Connection Status Alert */}
        {!isAuthenticated && (
          <Alert className="bg-amber-50 border-amber-200">
            <FiWifiOff className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Offline Mode:</strong> Data ditampilkan dari cache lokal. Login untuk sinkronisasi dengan server.
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert className="bg-red-50 border-red-200">
            <FiAlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 flex items-center justify-between">
              <span><strong>Error:</strong> {error}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearError}
                className="ml-2"
              >
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Penghasilan Hari Ini</p>
                  <p className="text-3xl font-bold">{formatCurrency(todayEarnings)}</p>
                  <p className="text-emerald-100 text-xs">Target: Rp 600K</p>
                </div>
                <FiDollarSign className="h-8 w-8 text-emerald-200" />
              </div>
              <div className="mt-4">
                <Progress value={todayProgress} className="h-2 bg-emerald-400" />
                <p className="text-emerald-100 text-xs mt-1">{Math.round(todayProgress)}% dari target</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Trip Hari Ini</p>
                  <p className="text-3xl font-bold">{todayData.total_trips}</p>
                  <p className="text-blue-100 text-xs">Rata-rata: {averageTripValue > 0 ? formatCurrency(averageTripValue) : 'Rp 0'}</p>
                </div>
                <FiActivity className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          {/* Weekly Total */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">Weekly Total</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {formatCurrency(weeklyTotals.earnings)}
                  </p>
                  <p className="text-green-600 text-xs">
                    {isAuthenticated ? "Real-time data" : "Cached data"}
                  </p>
                </div>
                <FiTrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          {/* Wellness Score */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">Wellness Score</p>
                  {hasWellnessData ? (
                    <>
                      <p className="text-2xl font-bold text-slate-800">{wellnessScore}%</p>
                      <p className="text-emerald-600 text-xs">{wellnessStatus?.text}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-slate-800">--</p>
                      <p className="text-amber-600 text-xs">Assessment needed</p>
                    </>
                  )}
                </div>
                <FiHeart className={`h-8 w-8 ${hasWellnessData ? 'text-red-500' : 'text-gray-400'}`} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Earnings Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FiTrendingUp className="h-5 w-5" />
                <span>Weekly Earnings Trend</span>
                {isLoading && <FiRefreshCw className="h-4 w-4 animate-spin text-blue-500" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {weeklyEarnings.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyEarnings}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      formatter={(value: any, name: string) => {
                        if (name === 'earnings') return [`Rp ${(value * 1000).toLocaleString('id-ID')}`, 'Earnings'];
                        if (name === 'bonus') return [`Rp ${(value * 1000).toLocaleString('id-ID')}`, 'Bonus'];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="earnings" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      name="Earnings"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="bonus" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      name="Bonus"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-slate-500">
                  {isLoading ? (
                    <div className="text-center">
                      <FiRefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
                      <p>Loading earnings data...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FiActivity className="h-8 w-8 mx-auto mb-2" />
                      <p>No earnings data available</p>
                      {!isAuthenticated && (
                        <p className="text-sm mt-1">Login to see your real data</p>
                      )}
                      {isAuthenticated && tripStats.length === 0 && (
                        <p className="text-sm mt-1">No trip data found. Start driving to see your earnings!</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FiTarget className="h-5 w-5" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Earnings Calculator */}
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                <h4 className="font-semibold text-emerald-800 mb-2">💰 Earnings Calculator</h4>
                <p className="text-sm text-emerald-700 mb-3">
                  Hitung potensi penghasilan harian berdasarkan target trips
                </p>
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => router.push('/dashboard/earnings')}
                >
                  <FiDollarSign className="mr-2 h-4 w-4" />
                  Open Calculator
                </Button>
              </div>

              {/* Wellness Check */}
              <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">❤️ Wellness Check</h4>
                <p className="text-sm text-red-700 mb-3">
                  Monitor kesehatan dan dapatkan tips untuk performa optimal
                </p>
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={() => router.push('/dashboard/wellness')}
                >
                  <FiHeart className="mr-2 h-4 w-4" />
                  Health Monitor
                </Button>
              </div>

              {/* Financial Advisor */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">🛡️ Financial Advisor</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Konsultasi investasi dan rencana finansial masa depan
                </p>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => router.push('/dashboard/financial-advisor')}
                >
                  <FiShield className="mr-2 h-4 w-4" />
                  Get Advice
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Peak Hours & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Peak Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FiClock className="h-5 w-5" />
                <span>Peak Hours Today</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={peakHoursData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="hour" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="demand" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Daily Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FiStar className="h-5 w-5" />
                <span>Today's Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-blue-50 border-blue-200">
                <FiSun className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Peak Hour Alert:</strong> Demand tinggi dari 17:00-19:00 hari ini. 
                  Peluang bonus hingga 25% lebih tinggi!
                </AlertDescription>
              </Alert>

              <Alert className="bg-green-50 border-green-200">
                <FiTrendingUp className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Earnings Update:</strong> {todayProgress >= 75 ? 
                    `Anda sudah mencapai ${Math.round(todayProgress)}% target harian. Excellent progress!` :
                    `Target ${Math.round(100 - todayProgress)}% lagi untuk mencapai Rp 600K.`
                  }
                </AlertDescription>
              </Alert>

              <Alert className="bg-amber-50 border-amber-200">
                <FiHeart className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  {hasWellnessData ? (
                    wellnessScore < 70 ? (
                      <><strong>Wellness Alert:</strong> Score rendah ({wellnessScore}%). Pertimbangkan istirahat lebih lama dan konsultasi kesehatan.</>
                    ) : (
                      <><strong>Wellness Update:</strong> Score baik ({wellnessScore}%). Pertahankan pola hidup sehat Anda!</>
                    )
                  ) : (
                    <><strong>Wellness Reminder:</strong> Lengkapi assessment wellness harian untuk mendapatkan insights kesehatan personal.</>
                  )}
                </AlertDescription>
              </Alert>

              {!isAuthenticated && (
                <Alert className="bg-purple-50 border-purple-200">
                  <FiWifiOff className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    <strong>Data Sync:</strong> Login untuk mendapatkan data real-time dan prediksi AI yang akurat.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
    </div>
    </DashboardLayout>
  );
}
