"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  hasCompletedWellnessToday,
  getWellnessMetrics,
  getOverallWellnessScore,
  getWellnessStatus,
  getWellnessRecommendations,
  getRiskAssessment
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
  FiAlertTriangle
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

// Performance data over time
const monthlyPerformance = [
  { month: "Jan", earnings: 8500000, trips: 165, hours: 180, rating: 4.6, fuel: 1200000, wellness: 72 },
  { month: "Feb", earnings: 9200000, trips: 180, hours: 195, rating: 4.7, fuel: 1350000, wellness: 75 },
  { month: "Mar", earnings: 8800000, trips: 170, hours: 185, rating: 4.5, fuel: 1280000, wellness: 69 },
  { month: "Apr", earnings: 9500000, trips: 190, hours: 200, rating: 4.8, fuel: 1400000, wellness: 78 },
  { month: "Mei", earnings: 10200000, trips: 205, hours: 210, rating: 4.9, fuel: 1500000, wellness: 81 },
  { month: "Jun", earnings: 11100000, trips: 220, hours: 225, rating: 4.8, fuel: 1650000, wellness: 79 }
];

// Daily earnings pattern
const dailyEarnings = [
  { day: "Senin", earnings: 320000, trips: 12, avg_per_trip: 26667, wellness: 75 },
  { day: "Selasa", earnings: 295000, trips: 11, avg_per_trip: 26818, wellness: 72 },
  { day: "Rabu", earnings: 285000, trips: 10, avg_per_trip: 28500, wellness: 70 },
  { day: "Kamis", earnings: 310000, trips: 12, avg_per_trip: 25833, wellness: 73 },
  { day: "Jumat", earnings: 350000, trips: 14, avg_per_trip: 25000, wellness: 78 },
  { day: "Sabtu", earnings: 420000, trips: 16, avg_per_trip: 26250, wellness: 82 },
  { day: "Minggu", earnings: 380000, trips: 15, avg_per_trip: 25333, wellness: 80 }
];

// Hourly performance
const hourlyData = [
  { hour: "06", earnings: 45000, trips: 2, demand: 30, fatigue: 15 },
  { hour: "07", earnings: 85000, trips: 3, demand: 65, fatigue: 25 },
  { hour: "08", earnings: 120000, trips: 4, demand: 85, fatigue: 35 },
  { hour: "09", earnings: 95000, trips: 3, demand: 60, fatigue: 40 },
  { hour: "10", earnings: 75000, trips: 3, demand: 45, fatigue: 45 },
  { hour: "11", earnings: 85000, trips: 3, demand: 50, fatigue: 50 },
  { hour: "12", earnings: 110000, trips: 4, demand: 70, fatigue: 55 },
  { hour: "13", earnings: 95000, trips: 3, demand: 65, fatigue: 60 },
  { hour: "14", earnings: 80000, trips: 3, demand: 55, fatigue: 65 },
  { hour: "15", earnings: 75000, trips: 3, demand: 50, fatigue: 70 },
  { hour: "16", earnings: 95000, trips: 3, demand: 65, fatigue: 75 },
  { hour: "17", earnings: 140000, trips: 5, demand: 90, fatigue: 80 },
  { hour: "18", earnings: 155000, trips: 5, demand: 95, fatigue: 85 },
  { hour: "19", earnings: 125000, trips: 4, demand: 80, fatigue: 80 },
  { hour: "20", earnings: 95000, trips: 3, demand: 60, fatigue: 75 },
  { hour: "21", earnings: 75000, trips: 3, demand: 45, fatigue: 70 }
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
  const [timeRange, setTimeRange] = useState("6m");
  const [selectedMetric, setSelectedMetric] = useState("earnings");
  const [hasWellnessData, setHasWellnessData] = useState(false);
  const [wellnessScore, setWellnessScore] = useState(0);
  const [realWellnessMetrics, setRealWellnessMetrics] = useState<any[]>([]);
  const [riskData, setRiskData] = useState<any>(null);

  useEffect(() => {
    // Load wellness data
    const hasWellness = hasCompletedWellnessToday();
    setHasWellnessData(hasWellness);
    
    if (hasWellness) {
      const score = getOverallWellnessScore();
      const metrics = getWellnessMetrics();
      const risk = getRiskAssessment();
      
      setWellnessScore(score);
      setRealWellnessMetrics(metrics);
      setRiskData(risk);
    }
  }, []);

  // Calculate key metrics
  const totalEarnings = monthlyPerformance.reduce((sum, month) => sum + month.earnings, 0);
  const totalTrips = monthlyPerformance.reduce((sum, month) => sum + month.trips, 0);
  const avgRating = monthlyPerformance.reduce((sum, month) => sum + month.rating, 0) / monthlyPerformance.length;
  const totalHours = monthlyPerformance.reduce((sum, month) => sum + month.hours, 0);
  
  // Use real wellness score if available, otherwise use mock data for non-wellness calculations
  const avgWellness = hasWellnessData ? wellnessScore : 0;

  const currentMonth = monthlyPerformance[monthlyPerformance.length - 1];
  const previousMonth = monthlyPerformance[monthlyPerformance.length - 2];
  
  const earningsGrowth = ((currentMonth.earnings - previousMonth.earnings) / previousMonth.earnings) * 100;
  const tripsGrowth = ((currentMonth.trips - previousMonth.trips) / previousMonth.trips) * 100;
  const wellnessGrowth = hasWellnessData ? 5.2 : 0; // Mock growth since we don't have historical data yet

  const wellnessStatus = hasWellnessData ? getWellnessStatus(wellnessScore) : null;

  return (
    <DashboardLayout
      title="Analytics Dashboard"
      subtitle="Performance Insights & Data Analysis"
      badge={{
        icon: FiActivity,
        text: "Live Data"
      }}
    >
      <div className="p-6">
        {/* Time Range Filter */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-2">
            {["1m", "3m", "6m", "1y"].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range === "1m" ? "1 Bulan" : range === "3m" ? "3 Bulan" : range === "6m" ? "6 Bulan" : "1 Tahun"}
              </Button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <FiFilter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <FiDownload className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <FiRefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Total Earnings</p>
                  <p className="text-3xl font-bold">Rp {Math.round(totalEarnings / 1000000)}M</p>
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
                  <LineChart data={monthlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis yAxisId="earnings" orientation="left" stroke="#64748b" tickFormatter={(value) => `${value / 1000000}M`} />
                    <YAxis yAxisId="wellness" orientation="right" stroke="#64748b" />
                    <Tooltip 
                      formatter={(value: any, name: string) => {
                        if (name === 'earnings') return [`Rp ${value.toLocaleString('id-ID')}`, 'Pendapatan'];
                        if (name === 'trips') return [value, 'Trips'];
                        if (name === 'wellness') return [`${value}%`, 'Wellness Score'];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Line 
                      yAxisId="earnings"
                      type="monotone" 
                      dataKey="earnings" 
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
                    <YAxis yAxisId="earnings" orientation="left" stroke="#64748b" tickFormatter={(value) => `${value / 1000}K`} />
                    <YAxis yAxisId="wellness" orientation="right" stroke="#64748b" />
                    <Tooltip 
                      formatter={(value: any, name: string) => {
                        if (name === 'earnings') return [`Rp ${value.toLocaleString('id-ID')}`, 'Pendapatan'];
                        if (name === 'wellness') return [`${value}%`, 'Wellness'];
                        return [value, name];
                      }}
                    />
                    <Bar yAxisId="earnings" dataKey="earnings" fill="#10b981" name="Pendapatan" radius={[4, 4, 0, 0]} />
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
                        if (name === 'earnings') return [`Rp ${value.toLocaleString('id-ID')}`, 'Pendapatan'];
                        if (name === 'fatigue') return [`${value}%`, 'Fatigue Level'];
                        return [value, name];
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="earnings" 
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
                    <YAxis stroke="#64748b" tickFormatter={(value) => `${value / 1000000}M`} />
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
                        Rp {(item.amount / 1000000).toFixed(1)}M
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
                    
                    {/* Risk Assessment */}
                    {riskData && (
                      <div className="p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <FiShield className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium text-red-800">Risk Assessment</span>
                        </div>
                        <div className="space-y-2">
                          {riskData.risks?.map((risk: any, index: number) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${
                                risk.level === 'High' ? 'bg-red-500' : 
                                risk.level === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                              }`}></div>
                              <span className="text-xs text-slate-700">{risk.category}: {risk.level}</span>
                            </div>
                          ))}
                          <p className="text-xs text-red-700 mt-2">
                            Overall Risk: <strong>{riskData.overallRisk}</strong>
                          </p>
                        </div>
                      </div>
                    )}

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

                {hasWellnessData && riskData && riskData.overallRisk !== 'Low' && (
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="text-sm font-medium text-yellow-800 mb-1">⚠️ Health Alert</h4>
                    <p className="text-xs text-yellow-700">
                      Risk level {riskData.overallRisk}. {riskData.overallRisk === 'High' ? 'Pertimbangkan break lebih sering dan konsultasi kesehatan.' : 'Monitor kondisi kesehatan secara berkala.'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 