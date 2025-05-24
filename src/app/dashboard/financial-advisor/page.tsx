"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  FiShield,
  FiTarget,
  FiDollarSign,
  FiTrendingUp,
  FiPieChart,
  FiCreditCard,
  FiHome,
  FiTruck,
  FiBook,
  FiActivity,
  FiInfo
} from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Financial data
const monthlyFinancialData = [
  { month: "Jan", income: 8500000, expenses: 6200000, savings: 2300000 },
  { month: "Feb", income: 9200000, expenses: 6800000, savings: 2400000 },
  { month: "Mar", income: 8800000, expenses: 6500000, savings: 2300000 },
  { month: "Apr", income: 9500000, expenses: 7000000, savings: 2500000 },
  { month: "Mei", income: 10200000, expenses: 7200000, savings: 3000000 },
  { month: "Jun", income: 11100000, expenses: 7500000, savings: 3600000 }
];

const expenseCategories = [
  { name: "BBM", value: 35, amount: 2625000, color: "#ef4444" },
  { name: "Perawatan Kendaraan", value: 15, amount: 1125000, color: "#f59e0b" },
  { name: "Makan & Minum", value: 20, amount: 1500000, color: "#10b981" },
  { name: "Cicilan Kendaraan", value: 20, amount: 1500000, color: "#3b82f6" },
  { name: "Lainnya", value: 10, amount: 750000, color: "#8b5cf6" }
];

const savingsGoals = [
  { id: 1, title: "Dana Darurat", target: 30000000, current: 15000000, priority: "high", icon: FiShield },
  { id: 2, title: "Ganti Kendaraan", target: 50000000, current: 12000000, priority: "medium", icon: FiTruck },
  { id: 3, title: "Rumah", target: 200000000, current: 25000000, priority: "low", icon: FiHome },
  { id: 4, title: "Pendidikan Anak", target: 100000000, current: 8000000, priority: "medium", icon: FiBook }
];

const financialTips = [
  {
    id: 1,
    category: "Penghematan",
    title: "Optimasi Konsumsi BBM",
    description: "Gunakan aplikasi untuk mencari SPBU termurah di rute Anda",
    impact: "Hemat hingga Rp 300K/bulan",
    icon: FiTrendingUp
  },
  {
    id: 2,
    category: "Investasi",
    title: "Reksa Dana Saham",
    description: "Mulai investasi reksa dana dengan return 12-15% per tahun",
    impact: "Potensi keuntungan Rp 1.2M/tahun",
    icon: FiTarget
  },
  {
    id: 3,
    category: "Perlindungan",
    title: "Asuransi Jiwa",
    description: "Lindungi keluarga dengan asuransi jiwa term life",
    impact: "Perlindungan Rp 500M dengan premi Rp 200K/bulan",
    icon: FiShield
  }
];

const investmentOptions = [
  { name: "Deposito", return: 3.5, risk: "Rendah", minAmount: 1000000 },
  { name: "Reksa Dana Pasar Uang", return: 4.5, risk: "Rendah", minAmount: 100000 },
  { name: "Reksa Dana Campuran", return: 8.0, risk: "Sedang", minAmount: 100000 },
  { name: "Reksa Dana Saham", return: 12.0, risk: "Tinggi", minAmount: 100000 },
  { name: "Emas", return: 6.0, risk: "Sedang", minAmount: 500000 }
];

export default function FinancialAdvisorPage() {
  const [emergencyFund, setEmergencyFund] = useState(6);
  const [riskTolerance, setRiskTolerance] = useState(3);

  // Calculate financial health score
  const monthlyIncome = 10200000;
  const monthlyExpenses = 7200000;
  const savings = 25000000;
  const emergencyFundTarget = emergencyFund * monthlyExpenses;
  const savingsRate = ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100;
  
  const financialHealthScore = Math.min(100, 
    (savingsRate * 0.4) + 
    (Math.min(savings / emergencyFundTarget, 1) * 30) + 
    (30) // Base score for having regular income
  );

  return (
    <DashboardLayout
      title="Financial Advisor"
      badge={{
        icon: FiActivity,
        text: `Financial Health: ${Math.round(financialHealthScore)}%`
      }}
    >
      <div className="p-6">
        {/* Financial Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Pendapatan Bulanan</p>
                  <p className="text-3xl font-bold">Rp {Math.round(monthlyIncome / 1000000)}M</p>
                  <p className="text-emerald-100 text-xs">+8% dari bulan lalu</p>
                </div>
                <FiDollarSign className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Pengeluaran Bulanan</p>
                  <p className="text-3xl font-bold">Rp {Math.round(monthlyExpenses / 1000000)}M</p>
                  <p className="text-blue-100 text-xs">70% dari pendapatan</p>
                </div>
                <FiCreditCard className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Tabungan</p>
                  <p className="text-3xl font-bold">Rp {Math.round(savings / 1000000)}M</p>
                  <p className="text-purple-100 text-xs">3.5x pengeluaran bulanan</p>
                </div>
                <FiPieChart className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Skor Kesehatan Finansial</p>
                  <p className="text-3xl font-bold">{Math.round(financialHealthScore)}%</p>
                  <p className="text-orange-100 text-xs">
                    {financialHealthScore >= 80 ? "Excellent" : financialHealthScore >= 60 ? "Good" : "Needs Improvement"}
                  </p>
                </div>
                <FiActivity className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts and Analysis */}
          <div className="lg:col-span-2 space-y-8">
            {/* Income vs Expenses Trend */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiTrendingUp className="h-5 w-5 text-emerald-600" />
                  <span>Tren Keuangan Bulanan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyFinancialData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis 
                      stroke="#64748b" 
                      tickFormatter={(value) => `${value / 1000000}M`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID')}`, '']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="income" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      name="Pendapatan"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      name="Pengeluaran"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="savings" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      name="Tabungan"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Expense Breakdown */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiPieChart className="h-5 w-5 text-blue-600" />
                  <span>Breakdown Pengeluaran Bulanan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={expenseCategories}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {expenseCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-4">
                    {expenseCategories.map((category) => (
                      <div key={category.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span className="font-medium text-slate-700">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-800">Rp {category.amount.toLocaleString('id-ID')}</p>
                          <p className="text-sm text-slate-500">{category.value}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Recommendations */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiTarget className="h-5 w-5 text-purple-600" />
                  <span>Rekomendasi Investasi</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investmentOptions.map((option, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-800">{option.name}</h4>
                        <Badge 
                          variant="outline" 
                          className={
                            option.risk === "Rendah" ? "border-green-300 text-green-700 bg-green-50" :
                            option.risk === "Sedang" ? "border-yellow-300 text-yellow-700 bg-yellow-50" :
                            "border-red-300 text-red-700 bg-red-50"
                          }
                        >
                          {option.risk} Risk
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500">Expected Return</p>
                          <p className="font-bold text-emerald-600">{option.return}% / tahun</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Min. Investasi</p>
                          <p className="font-bold text-slate-700">Rp {option.minAmount.toLocaleString('id-ID')}</p>
                        </div>
                        <div className="text-right">
                          <Button size="sm" variant="outline">
                            Mulai Investasi
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Goals and Tools */}
          <div className="space-y-8">
            {/* Savings Goals */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiTarget className="h-5 w-5 text-emerald-600" />
                  <span>Target Tabungan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {savingsGoals.map((goal) => {
                  const progress = (goal.current / goal.target) * 100;
                  const IconComponent = goal.icon;
                  
                  return (
                    <div key={goal.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-4 w-4 text-slate-600" />
                          <h4 className="font-semibold text-slate-800">{goal.title}</h4>
                        </div>
                        <Badge 
                          variant="outline"
                          className={
                            goal.priority === "high" ? "border-red-300 text-red-700 bg-red-50" :
                            goal.priority === "medium" ? "border-yellow-300 text-yellow-700 bg-yellow-50" :
                            "border-blue-300 text-blue-700 bg-blue-50"
                          }
                        >
                          {goal.priority}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Progress</span>
                          <span className="font-medium">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Rp {Math.round(goal.current / 1000000)}M</span>
                          <span>Rp {Math.round(goal.target / 1000000)}M</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Financial Planning Tools */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiShield className="h-5 w-5 text-blue-600" />
                  <span>Tools Perencanaan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Emergency Fund Calculator */}
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-3 block">
                    Dana Darurat: {emergencyFund} bulan pengeluaran
                  </Label>
                  <input
                    type="range"
                    min={3}
                    max={12}
                    step={1}
                    value={emergencyFund}
                    onChange={(e) => setEmergencyFund(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-2"
                    aria-label="Dana darurat dalam bulan"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mb-3">
                    <span>3 bulan</span>
                    <span>12 bulan</span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg">
                    <p className="text-sm text-emerald-800 font-medium">
                      Target Dana Darurat: Rp {Math.round(emergencyFundTarget / 1000000)}M
                    </p>
                    <p className="text-xs text-emerald-600">
                      Kekurangan: Rp {Math.round(Math.max(0, emergencyFundTarget - savings) / 1000000)}M
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Risk Tolerance */}
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-3 block">
                    Toleransi Risiko: {
                      riskTolerance <= 2 ? "Konservatif" :
                      riskTolerance <= 4 ? "Moderat" : "Agresif"
                    }
                  </Label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={riskTolerance}
                    onChange={(e) => setRiskTolerance(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-2"
                    aria-label="Toleransi risiko investasi"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mb-3">
                    <span>Konservatif</span>
                    <span>Agresif</span>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">
                      Rekomendasi Portofolio
                    </p>
                    <p className="text-xs text-blue-600">
                      {riskTolerance <= 2 ? "70% Deposito, 30% Reksa Dana" :
                       riskTolerance <= 4 ? "40% Deposito, 60% Reksa Dana" :
                       "20% Deposito, 80% Reksa Dana Saham"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Tips */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiInfo className="h-5 w-5 text-orange-600" />
                  <span>Tips Finansial</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {financialTips.map((tip) => {
                  const IconComponent = tip.icon;
                  
                  return (
                    <div key={tip.id} className="p-4 border rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                          <IconComponent className="h-4 w-4 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-slate-800 text-sm">{tip.title}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {tip.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{tip.description}</p>
                          <p className="text-xs font-medium text-emerald-600">{tip.impact}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 