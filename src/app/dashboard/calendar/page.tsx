"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiMapPin,
  FiClock,
  FiTarget,
  FiSun,
  FiCloud,
  FiCloudRain
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Extended AI Calendar predictions
const calendarPredictions = [
  { date: new Date(2025, 0, 20), prediction: "high", earnings: 450000, note: "Peak demand - Mall areas", weather: "sunny", events: ["Payday Weekend", "Mall Promotions"] },
  { date: new Date(2025, 0, 21), prediction: "medium", earnings: 320000, note: "Normal weekday", weather: "cloudy", events: ["Regular Day"] },
  { date: new Date(2025, 0, 22), prediction: "high", earnings: 380000, note: "Weekend boost", weather: "sunny", events: ["Weekend", "Shopping Centers"] },
  { date: new Date(2025, 0, 23), prediction: "medium", earnings: 310000, note: "Sunday moderate", weather: "cloudy", events: ["Sunday Leisure"] },
  { date: new Date(2025, 0, 24), prediction: "low", earnings: 250000, note: "Monday slow start", weather: "rainy", events: ["Work Start"] },
  { date: new Date(2025, 0, 25), prediction: "medium", earnings: 330000, note: "Mid-week pickup", weather: "sunny", events: ["Business District"] },
  { date: new Date(2025, 0, 26), prediction: "high", earnings: 420000, note: "Salary day peak", weather: "sunny", events: ["Salary Day", "Restaurant Areas"] },
  { date: new Date(2025, 0, 27), prediction: "high", earnings: 480000, note: "Friday night peak", weather: "cloudy", events: ["TGIF", "Entertainment Areas"] },
  { date: new Date(2025, 0, 28), prediction: "high", earnings: 460000, note: "Weekend shopping", weather: "sunny", events: ["Weekend Shopping", "Family Outings"] },
  { date: new Date(2025, 0, 29), prediction: "medium", earnings: 340000, note: "Sunday family day", weather: "sunny", events: ["Family Day", "Recreation"] },
  { date: new Date(2025, 0, 30), prediction: "low", earnings: 280000, note: "Month-end quiet", weather: "rainy", events: ["Month End"] },
];

// Weekly earnings projection
const weeklyData = [
  { week: "Week 1", predicted: 2100000, actual: 2050000 },
  { week: "Week 2", predicted: 2250000, actual: 2180000 },
  { week: "Week 3", predicted: 2350000, actual: 2320000 },
  { week: "Week 4", predicted: 2500000, actual: 2450000 },
];

// Best time slots
const timeSlotData = [
  { time: "06:00-08:00", demand: 85, earnings: 120000 },
  { time: "08:00-10:00", demand: 65, earnings: 95000 },
  { time: "10:00-12:00", demand: 55, earnings: 80000 },
  { time: "12:00-14:00", demand: 90, earnings: 135000 },
  { time: "14:00-16:00", demand: 60, earnings: 85000 },
  { time: "16:00-18:00", demand: 95, earnings: 145000 },
  { time: "18:00-20:00", demand: 100, earnings: 150000 },
  { time: "20:00-22:00", demand: 70, earnings: 100000 },
];

// Area distribution
const areaData = [
  { name: "Business District", value: 35, color: "#3b82f6" },
  { name: "Shopping Malls", value: 25, color: "#10b981" },
  { name: "Residential", value: 20, color: "#f59e0b" },
  { name: "Entertainment", value: 15, color: "#8b5cf6" },
  { name: "Others", value: 5, color: "#ef4444" }
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

export default function CalendarPlannerPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const getPredictionForDate = (date: Date) => {
    return calendarPredictions.find(p => 
      p.date.toDateString() === date.toDateString()
    );
  };

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'sunny': return <FiSun className="h-4 w-4 text-yellow-500" />;
      case 'cloudy': return <FiCloud className="h-4 w-4 text-gray-500" />;
      case 'rainy': return <FiCloudRain className="h-4 w-4 text-blue-500" />;
      default: return <FiSun className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getPredictionBadgeColor = (prediction: string) => {
    switch (prediction) {
      case 'high': return 'border-green-300 text-green-700 bg-green-50';
      case 'medium': return 'border-yellow-300 text-yellow-700 bg-yellow-50';
      case 'low': return 'border-red-300 text-red-700 bg-red-50';
      default: return 'border-gray-300 text-gray-700 bg-gray-50';
    }
  };

  const currentMonth = new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  const monthlyTotal = calendarPredictions.reduce((sum, pred) => sum + pred.earnings, 0);
  const averageDaily = Math.round(monthlyTotal / calendarPredictions.length);

  return (
    <DashboardLayout
      title="AI Calendar Planner"
      badge={{
        icon: FiTarget,
        text: "Smart Planning Mode"
      }}
    >
      <div className="p-6">
        {/* View Mode Toggle */}
        <div className="flex justify-end mb-6">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'month' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode('month')}
              className="text-xs"
            >
              Month
            </Button>
            <Button
              variant={viewMode === 'week' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode('week')}
              className="text-xs"
            >
              Week
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">{currentMonth}</p>
                  <p className="text-2xl font-bold">Rp {Math.round(monthlyTotal / 1000000 * 10) / 10}M</p>
                  <p className="text-emerald-100 text-xs">Prediksi Total</p>
                </div>
                <FiCalendar className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Rata-rata Harian</p>
                  <p className="text-2xl font-bold">Rp {Math.round(averageDaily / 1000)}K</p>
                  <p className="text-blue-100 text-xs">AI Prediction</p>
                </div>
                <FiTrendingUp className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">High Demand Days</p>
                  <p className="text-2xl font-bold">{calendarPredictions.filter(p => p.prediction === 'high').length}</p>
                  <p className="text-purple-100 text-xs">This Month</p>
                </div>
                <FiTarget className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Best Time Slot</p>
                  <p className="text-2xl font-bold">18:00</p>
                  <p className="text-orange-100 text-xs">Peak Demand</p>
                </div>
                <FiClock className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Calendar */}
          <div className="lg:col-span-2 space-y-8">
            {/* Calendar Component */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiCalendar className="h-5 w-5 text-purple-600" />
                  <span>AI-Powered Calendar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border w-full bg-white"
                      defaultMonth={new Date(2025, 0)}
                      showOutsideDays={true}
                      weekStartsOn={1}
                      formatters={{
                        formatWeekdayName: (date: Date) => {
                          const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
                          return days[date.getDay() === 0 ? 6 : date.getDay() - 1];
                        },
                        formatCaption: (date: Date) => {
                          const months = [
                            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
                          ];
                          return `${months[date.getMonth()]} ${date.getFullYear()}`;
                        }
                      }}
                      modifiers={{
                        high: calendarPredictions.filter(p => p.prediction === 'high').map(p => p.date),
                        medium: calendarPredictions.filter(p => p.prediction === 'medium').map(p => p.date),
                        low: calendarPredictions.filter(p => p.prediction === 'low').map(p => p.date),
                      }}
                      modifiersStyles={{
                        high: { backgroundColor: '#dcfce7', color: '#15803d', fontWeight: 'bold' },
                        medium: { backgroundColor: '#fef3c7', color: '#d97706', fontWeight: 'bold' },
                        low: { backgroundColor: '#fee2e2', color: '#dc2626', fontWeight: 'bold' },
                      }}
                    />
                    
                    <div className="mt-4 flex items-center justify-center space-x-6 text-sm border-t pt-4 border-slate-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-200 rounded border"></div>
                        <span className="text-slate-600">High Demand</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-yellow-200 rounded border"></div>
                        <span className="text-slate-600">Medium</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-200 rounded border"></div>
                        <span className="text-slate-600">Low</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="xl:col-span-1">
                    {selectedDate && getPredictionForDate(selectedDate) ? (
                      <div className="p-4 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg border h-fit">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-slate-800 text-sm">
                            {selectedDate.toLocaleDateString('id-ID', { 
                              weekday: 'long', 
                              day: 'numeric', 
                              month: 'long' 
                            })}
                          </h4>
                          <div className="flex items-center space-x-2">
                            {getWeatherIcon(getPredictionForDate(selectedDate)?.weather || 'sunny')}
                            <Badge 
                              variant="outline" 
                              className={getPredictionBadgeColor(getPredictionForDate(selectedDate)?.prediction || 'medium')}
                            >
                              {getPredictionForDate(selectedDate)?.prediction.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Prediksi Penghasilan</span>
                            <span className="font-bold text-emerald-600 text-lg">
                              Rp {getPredictionForDate(selectedDate)?.earnings.toLocaleString('id-ID')}
                            </span>
                          </div>
                          
                          <div>
                            <p className="text-sm text-slate-600 mb-2">Events & Insights:</p>
                            <div className="flex flex-wrap gap-1">
                              {getPredictionForDate(selectedDate)?.events.map((event, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {event}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-sm text-slate-700 bg-white/60 p-3 rounded border">
                            💡 {getPredictionForDate(selectedDate)?.note}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-slate-300 h-fit">
                        <div className="text-center">
                          <FiCalendar className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-slate-600 text-sm">
                            Pilih tanggal untuk melihat prediksi AI
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Trends */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiTrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Weekly Performance Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="week" stroke="#64748b" />
                    <YAxis 
                      stroke="#64748b" 
                      tickFormatter={(value) => `${value / 1000000}M`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID')}`, '']}
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
                      strokeDasharray="5 5"
                      name="Aktual"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Analytics */}
          <div className="space-y-8">
            {/* Best Time Slots */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiClock className="h-5 w-5 text-orange-600" />
                  <span>Optimal Time Slots</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={timeSlotData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      type="number" 
                      stroke="#64748b" 
                      tickFormatter={(value) => `${value}%`}
                    />
                    <YAxis 
                      dataKey="time" 
                      type="category" 
                      stroke="#64748b" 
                      width={80}
                      fontSize={12}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, 'Demand']}
                    />
                    <Bar 
                      dataKey="demand" 
                      fill="#f59e0b"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Area Distribution */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiMapPin className="h-5 w-5 text-green-600" />
                  <span>Area Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={areaData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${value}%`}
                    >
                      {areaData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="mt-4 space-y-2">
                  {areaData.map((area, index) => (
                    <div key={area.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: area.color }}
                        ></div>
                        <span className="text-sm text-slate-700">{area.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-600">{area.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiTarget className="h-5 w-5 text-emerald-600" />
                  <span>Smart Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <h4 className="font-semibold text-emerald-800 mb-2">🎯 This Week Focus</h4>
                  <p className="text-sm text-emerald-700">
                    Target Jumat (27 Jan) untuk peak earnings. Prediksi Rp 480K dengan TGIF demand.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">⏰ Best Hours</h4>
                  <p className="text-sm text-blue-700">
                    Jam 18:00-20:00 konsisten memberikan demand tertinggi (100%) di area entertainment.
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">🌦️ Weather Alert</h4>
                  <p className="text-sm text-yellow-700">
                    Hujan diprediksi 24 & 30 Jan. Siapkan strategi indoor destinations.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">💰 Monthly Goal</h4>
                  <p className="text-sm text-purple-700">
                    Target {Math.round(monthlyTotal / 1000000 * 10) / 10}M bulan ini achievable dengan konsistensi 85%.
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