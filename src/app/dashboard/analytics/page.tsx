"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  FiPieChart,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiClock,
  FiMapPin,
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
  FiRefreshCw
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
  { month: "Jan", earnings: 8500000, trips: 165, hours: 180, rating: 4.6, fuel: 1200000 },
  { month: "Feb", earnings: 9200000, trips: 180, hours: 195, rating: 4.7, fuel: 1350000 },
  { month: "Mar", earnings: 8800000, trips: 170, hours: 185, rating: 4.5, fuel: 1280000 },
  { month: "Apr", earnings: 9500000, trips: 190, hours: 200, rating: 4.8, fuel: 1400000 },
  { month: "Mei", earnings: 10200000, trips: 205, hours: 210, rating: 4.9, fuel: 1500000 },
  { month: "Jun", earnings: 11100000, trips: 220, hours: 225, rating: 4.8, fuel: 1650000 }
];

// Daily earnings pattern
const dailyEarnings = [
  { day: "Senin", earnings: 320000, trips: 12, avg_per_trip: 26667 },
  { day: "Selasa", earnings: 295000, trips: 11, avg_per_trip: 26818 },
  { day: "Rabu", earnings: 285000, trips: 10, avg_per_trip: 28500 },
  { day: "Kamis", earnings: 310000, trips: 12, avg_per_trip: 25833 },
  { day: "Jumat", earnings: 350000, trips: 14, avg_per_trip: 25000 },
  { day: "Sabtu", earnings: 420000, trips: 16, avg_per_trip: 26250 },
  { day: "Minggu", earnings: 380000, trips: 15, avg_per_trip: 25333 }
];

// Hourly performance
const hourlyData = [
  { hour: "06", earnings: 45000, trips: 2, demand: 30 },
  { hour: "07", earnings: 85000, trips: 3, demand: 65 },
  { hour: "08", earnings: 120000, trips: 4, demand: 85 },
  { hour: "09", earnings: 95000, trips: 3, demand: 60 },
  { hour: "10", earnings: 75000, trips: 3, demand: 45 },
  { hour: "11", earnings: 85000, trips: 3, demand: 50 },
  { hour: "12", earnings: 110000, trips: 4, demand: 70 },
  { hour: "13", earnings: 95000, trips: 3, demand: 65 },
  { hour: "14", earnings: 80000, trips: 3, demand: 55 },
  { hour: "15", earnings: 75000, trips: 3, demand: 50 },
  { hour: "16", earnings: 95000, trips: 3, demand: 65 },
  { hour: "17", earnings: 140000, trips: 5, demand: 90 },
  { hour: "18", earnings: 155000, trips: 5, demand: 95 },
  { hour: "19", earnings: 125000, trips: 4, demand: 80 },
  { hour: "20", earnings: 95000, trips: 3, demand: 60 },
  { hour: "21", earnings: 75000, trips: 3, demand: 45 }
];

// Zone performance
const zonePerformance = [
  { zone: "Menteng", trips: 45, earnings: 1250000, avg_rating: 4.8, time_spent: 15 },
  { zone: "Kelapa Gading", trips: 38, earnings: 980000, avg_rating: 4.6, time_spent: 12 },
  { zone: "Senayan", trips: 42, earnings: 1100000, avg_rating: 4.7, time_spent: 14 },
  { zone: "Kemang", trips: 35, earnings: 925000, avg_rating: 4.5, time_spent: 11 },
  { zone: "PIK", trips: 28, earnings: 750000, avg_rating: 4.4, time_spent: 8 }
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

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6m");
  const [selectedMetric, setSelectedMetric] = useState("earnings");

  // Calculate key metrics
  const totalEarnings = monthlyPerformance.reduce((sum, month) => sum + month.earnings, 0);
  const totalTrips = monthlyPerformance.reduce((sum, month) => sum + month.trips, 0);
  const avgRating = monthlyPerformance.reduce((sum, month) => sum + month.rating, 0) / monthlyPerformance.length;
  const totalHours = monthlyPerformance.reduce((sum, month) => sum + month.hours, 0);

  const currentMonth = monthlyPerformance[monthlyPerformance.length - 1];
  const previousMonth = monthlyPerformance[monthlyPerformance.length - 2];
  
  const earningsGrowth = ((currentMonth.earnings - previousMonth.earnings) / previousMonth.earnings) * 100;
  const tripsGrowth = ((currentMonth.trips - previousMonth.trips) / previousMonth.trips) * 100;

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
                <FiMapPin className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Avg Rating</p>
                  <p className="text-3xl font-bold">{avgRating.toFixed(1)}</p>
                  <div className="flex items-center space-x-1 text-purple-100 text-xs">
                    <FiStar className="h-3 w-3" />
                    <span>Excellent performance</span>
                  </div>
                </div>
                <FiStar className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Total Hours</p>
                  <p className="text-3xl font-bold">{totalHours}h</p>
                  <div className="flex items-center space-x-1 text-orange-100 text-xs">
                    <FiClock className="h-3 w-3" />
                    <span>Rp {Math.round(totalEarnings / totalHours / 1000)}K/hour</span>
                  </div>
                </div>
                <FiClock className="h-8 w-8 text-orange-200" />
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
                    <YAxis yAxisId="trips" orientation="right" stroke="#64748b" />
                    <Tooltip 
                      formatter={(value: any, name: string) => {
                        if (name === 'earnings') return [`Rp ${value.toLocaleString('id-ID')}`, 'Pendapatan'];
                        if (name === 'trips') return [value, 'Trips'];
                        if (name === 'rating') return [value, 'Rating'];
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
                      yAxisId="trips"
                      type="monotone" 
                      dataKey="trips" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      name="Jumlah Trip"
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      yAxisId="trips"
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

            {/* Daily Performance */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiBarChart className="h-5 w-5 text-blue-600" />
                  <span>Performance Harian</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyEarnings}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis stroke="#64748b" tickFormatter={(value) => `${value / 1000}K`} />
                    <Tooltip 
                      formatter={(value: any, name: string) => {
                        if (name === 'earnings') return [`Rp ${value.toLocaleString('id-ID')}`, 'Pendapatan'];
                        if (name === 'trips') return [value, 'Trips'];
                        return [value, name];
                      }}
                    />
                    <Bar dataKey="earnings" fill="#10b981" name="Pendapatan" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Hourly Analysis */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiClock className="h-5 w-5 text-purple-600" />
                  <span>Analisis Per Jam</span>
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
                        if (name === 'demand') return [`${value}%`, 'Demand'];
                        return [value, name];
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="earnings" 
                      stroke="#8b5cf6" 
                      fill="#8b5cf6" 
                      fillOpacity={0.3}
                      name="Pendapatan"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="demand" 
                      stroke="#f59e0b" 
                      fill="#f59e0b" 
                      fillOpacity={0.2}
                      name="Demand"
                    />
                  </AreaChart>
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
                    Top 10% driver dalam zona Menteng bulan ini! 🏆
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

            {/* Zone Performance */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiMapPin className="h-5 w-5 text-orange-600" />
                  <span>Performance per Zona</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {zonePerformance.map((zone, index) => (
                  <div key={zone.zone} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800">{zone.zone}</h4>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700">
                        #{index + 1}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-slate-500">Trips</p>
                        <p className="font-bold text-slate-700">{zone.trips}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Earnings</p>
                        <p className="font-bold text-emerald-600">Rp {(zone.earnings / 1000000).toFixed(1)}M</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Rating</p>
                        <div className="flex items-center space-x-1">
                          <FiStar className="h-3 w-3 text-yellow-500" />
                          <p className="font-medium text-slate-700">{zone.avg_rating}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-500">Time</p>
                        <p className="font-medium text-slate-700">{zone.time_spent}h</p>
                      </div>
                    </div>
                  </div>
                ))}
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
                  <h4 className="text-sm font-medium text-blue-800 mb-1">📈 Best Day</h4>
                  <p className="text-xs text-blue-700">
                    Sabtu adalah hari terbaik dengan rata-rata Rp 420K
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="text-sm font-medium text-green-800 mb-1">⏰ Peak Hours</h4>
                  <p className="text-xs text-green-700">
                    17:00-18:00 jam tersibuk dengan Rp 155K/jam
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="text-sm font-medium text-purple-800 mb-1">🎯 Top Zone</h4>
                  <p className="text-xs text-purple-700">
                    Menteng memberikan earnings tertinggi Rp 1.25M
                  </p>
                </div>
                
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="text-sm font-medium text-orange-800 mb-1">⭐ Rating</h4>
                  <p className="text-xs text-orange-700">
                    Rating meningkat 0.3 poin dalam 6 bulan terakhir
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