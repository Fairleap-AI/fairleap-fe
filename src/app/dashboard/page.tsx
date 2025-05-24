"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layout/DashboardLayout";
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
  FiRefreshCw
} from "react-icons/fi";

// Earnings data untuk chart
const earningsData = [
  { day: "Sen", earnings: 320, trips: 12, bonus: 30 },
  { day: "Sel", earnings: 420, trips: 18, bonus: 45 },
  { day: "Rab", earnings: 280, trips: 9, bonus: 20 },
  { day: "Kam", earnings: 520, trips: 22, bonus: 80 },
  { day: "Jum", earnings: 380, trips: 15, bonus: 55 },
  { day: "Sab", earnings: 610, trips: 28, bonus: 120 },
  { day: "Min", earnings: 450, trips: 19, bonus: 65 }
];

// Peak hours data
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

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Load wellness data
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

  // Weekly summary calculations
  const weeklyEarnings = earningsData.reduce((sum, day) => sum + day.earnings, 0);
  const weeklyTrips = earningsData.reduce((sum, day) => sum + day.trips, 0);
  const averageTripValue = Math.round(weeklyEarnings / weeklyTrips);

  // Today's data (last item in array)
  const todayData = earningsData[earningsData.length - 1];
  const todayProgress = Math.min((todayData.earnings / 600) * 100, 100); // Target Rp 600K

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
        icon: FiActivity,
        text: "Active"
      }}
    >
      <div className="p-6 space-y-6">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Today's Earnings */}
          <Card className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Today's Earnings</p>
                  <p className="text-2xl font-bold">{formatCurrency(todayData.earnings)}</p>
                  <p className="text-emerald-100 text-xs">Target: Rp 600K</p>
                </div>
                <FiDollarSign className="h-8 w-8 text-emerald-100" />
              </div>
              <div className="mt-4">
                <Progress value={todayProgress} className="h-2 bg-emerald-400" />
                <p className="text-emerald-100 text-xs mt-1">{Math.round(todayProgress)}% dari target</p>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Total */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">Weekly Total</p>
                  <p className="text-2xl font-bold text-slate-800">{formatCurrency(weeklyEarnings)}</p>
                  <p className="text-green-600 text-xs">↗ +12% vs last week</p>
                </div>
                <FiTrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          {/* Total Trips */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">Total Trips</p>
                  <p className="text-2xl font-bold text-slate-800">{weeklyTrips}</p>
                  <p className="text-blue-600 text-xs">Avg: {formatCurrency(averageTripValue)}/trip</p>
                </div>
                <FiActivity className="h-8 w-8 text-blue-500" />
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
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Earnings (K)" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bonus" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Bonus (K)" 
                  />
                </LineChart>
              </ResponsiveContainer>
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
                  <strong>Earnings Update:</strong> Anda sudah mencapai 75% target harian. 
                  2-3 trip lagi untuk mencapai target Rp 600K.
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
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
