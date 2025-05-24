"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  FiDollarSign,
  FiClock,
  FiMapPin,
  FiTrendingUp,
  FiTarget,
  FiActivity
} from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const areas = [
  { value: "menteng", label: "Menteng", multiplier: 1.2 },
  { value: "kelapa-gading", label: "Kelapa Gading", multiplier: 1.1 },
  { value: "kemang", label: "Kemang", multiplier: 1.15 },
  { value: "senayan", label: "Senayan", multiplier: 1.0 },
  { value: "pik", label: "PIK", multiplier: 0.95 },
  { value: "thamrin", label: "Thamrin", multiplier: 1.25 },
  { value: "kuningan", label: "Kuningan", multiplier: 1.18 }
];

const timeSlots = [
  { hour: "06:00", demand: 65, base: 25000 },
  { hour: "07:00", demand: 85, base: 30000 },
  { hour: "08:00", demand: 95, base: 35000 },
  { hour: "09:00", demand: 70, base: 28000 },
  { hour: "10:00", demand: 60, base: 25000 },
  { hour: "11:00", demand: 75, base: 30000 },
  { hour: "12:00", demand: 90, base: 33000 },
  { hour: "13:00", demand: 80, base: 31000 },
  { hour: "14:00", demand: 70, base: 28000 },
  { hour: "15:00", demand: 65, base: 26000 },
  { hour: "16:00", demand: 80, base: 32000 },
  { hour: "17:00", demand: 100, base: 40000 },
  { hour: "18:00", demand: 98, base: 38000 },
  { hour: "19:00", demand: 85, base: 34000 },
  { hour: "20:00", demand: 75, base: 30000 },
  { hour: "21:00", demand: 60, base: 25000 }
];

export default function EarningsCalculatorPage() {
  const [workingHours, setWorkingHours] = useState([8]);
  const [workingDays, setWorkingDays] = useState([6]);

  const calculateEarnings = () => {
    const baseEarning = 35000; // Base earning per hour
    const hoursPerDay = workingHours[0];
    const daysPerWeek = workingDays[0];
    
    const dailyEarnings = baseEarning * hoursPerDay * 0.85; // efficiency factor
    const weeklyEarnings = dailyEarnings * daysPerWeek;
    const monthlyEarnings = weeklyEarnings * 4.3;

    return {
      daily: Math.round(dailyEarnings),
      weekly: Math.round(weeklyEarnings),
      monthly: Math.round(monthlyEarnings),
      confidence: Math.min(95, 75 + (hoursPerDay * 2) + (daysPerWeek * 1.5))
    };
  };

  const earnings = calculateEarnings();

  const generateProjectionData = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      earnings: earnings.daily + (Math.random() - 0.5) * earnings.daily * 0.2,
      trend: earnings.daily * (1 + (i / 100))
    }));
  };

  const projectionData = generateProjectionData();

  return (
    <DashboardLayout
      title="Earnings Calculator"
      badge={{
        icon: FiActivity,
        text: `AI Prediction: ${earnings.confidence.toFixed(0)}% Accurate`
      }}
    >
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiTarget className="h-5 w-5 text-emerald-600" />
                  <span>Setup Prediksi</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Working Hours */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">
                    Jam Kerja per Hari: {workingHours[0]} jam
                  </Label>
                  <Slider
                    value={workingHours}
                    onValueChange={setWorkingHours}
                    max={16}
                    min={2}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>2 jam</span>
                    <span>16 jam</span>
                  </div>
                </div>

                {/* Working Days */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">
                    Hari Kerja per Minggu: {workingDays[0]} hari
                  </Label>
                  <Slider
                    value={workingDays}
                    onValueChange={setWorkingDays}
                    max={7}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>1 hari</span>
                    <span>7 hari</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prediction Results */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiDollarSign className="h-5 w-5" />
                  <span>Prediksi Penghasilan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/20 p-4 rounded-lg">
                    <p className="text-emerald-100 text-sm">Harian</p>
                    <p className="text-2xl font-bold">Rp {earnings.daily.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-lg">
                    <p className="text-emerald-100 text-sm">Mingguan</p>
                    <p className="text-2xl font-bold">Rp {earnings.weekly.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-lg">
                    <p className="text-emerald-100 text-sm">Bulanan</p>
                    <p className="text-2xl font-bold">Rp {earnings.monthly.toLocaleString('id-ID')}</p>
                  </div>
                </div>

                <div className="bg-white/10 p-3 rounded-lg">
                  <p className="text-emerald-100 text-xs">Tingkat Kepercayaan AI</p>
                  <p className="text-lg font-semibold">{earnings.confidence.toFixed(0)}%</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Analysis */}
          <div className="lg:col-span-2 space-y-8">
            {/* 30-Day Projection */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiTrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Proyeksi 30 Hari Ke Depan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis 
                      stroke="#64748b" 
                      tickFormatter={(value) => `${Math.round(value / 1000)}K`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`Rp ${Math.round(value).toLocaleString('id-ID')}`, 'Penghasilan']}
                      labelFormatter={(label) => `Hari ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="earnings" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Prediksi Harian"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="trend" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Tren"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Hourly Demand Pattern */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiClock className="h-5 w-5 text-purple-600" />
                  <span>Pola Demand Berdasarkan Jam</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={timeSlots}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="hour" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, 'Demand']}
                    />
                    <Bar 
                      dataKey="demand" 
                      fill="#8b5cf6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>💡 AI Insights & Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">🎯 Optimasi Jam Kerja</h4>
                    <p className="text-sm text-blue-700">
                      Dengan {workingHours[0]} jam/hari, Anda berada di zona optimal produktivitas
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">📅 Konsistensi Kerja</h4>
                    <p className="text-sm text-green-700">
                      {workingDays[0]} hari kerja/minggu memberikan keseimbangan work-life yang baik
                    </p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚡ Target Harian</h4>
                    <p className="text-sm text-yellow-700">
                      Target harian Rp {earnings.daily.toLocaleString('id-ID')} sangat achievable
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">🏆 Potensi Bonus</h4>
                    <p className="text-sm text-purple-700">
                      Dengan konsistensi ini, bonus bulanan bisa mencapai Rp 750K
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 