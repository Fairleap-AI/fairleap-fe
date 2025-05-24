"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  FiHeart,
  FiActivity,
  FiShield,
  FiSun,
  FiMoon,
  FiAlertTriangle,
  FiCheckCircle
} from "react-icons/fi";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const wellnessQuestions = [
  {
    id: "energy",
    question: "Bagaimana tingkat energi Anda hari ini?",
    options: [
      { value: "low", label: "Lelah sekali", score: 20 },
      { value: "tired", label: "Cukup lelah", score: 40 },
      { value: "normal", label: "Normal", score: 60 },
      { value: "good", label: "Berenergi", score: 80 },
      { value: "excellent", label: "Sangat berenergi", score: 100 }
    ]
  },
  {
    id: "stress",
    question: "Seberapa stres Anda merasa hari ini?",
    options: [
      { value: "none", label: "Tidak stres", score: 100 },
      { value: "low", label: "Sedikit stres", score: 80 },
      { value: "moderate", label: "Lumayan stres", score: 60 },
      { value: "high", label: "Cukup stres", score: 40 },
      { value: "very-high", label: "Sangat stres", score: 20 }
    ]
  },
  {
    id: "sleep",
    question: "Kualitas tidur semalam?",
    options: [
      { value: "poor", label: "Buruk (< 4 jam)", score: 20 },
      { value: "insufficient", label: "Kurang (4-5 jam)", score: 40 },
      { value: "fair", label: "Cukup (6-7 jam)", score: 60 },
      { value: "good", label: "Baik (7-8 jam)", score: 80 },
      { value: "excellent", label: "Sangat baik (> 8 jam)", score: 100 }
    ]
  },
  {
    id: "physical",
    question: "Kondisi fisik saat ini?",
    options: [
      { value: "pain", label: "Ada nyeri/sakit", score: 20 },
      { value: "discomfort", label: "Tidak nyaman", score: 40 },
      { value: "neutral", label: "Biasa saja", score: 60 },
      { value: "comfortable", label: "Nyaman", score: 80 },
      { value: "excellent", label: "Sangat prima", score: 100 }
    ]
  }
];

const weeklyWellnessData = [
  { day: "Sen", energy: 75, stress: 40, sleep: 60, physical: 70, overall: 66 },
  { day: "Sel", energy: 80, stress: 35, sleep: 70, physical: 75, overall: 70 },
  { day: "Rab", energy: 70, stress: 50, sleep: 55, physical: 65, overall: 60 },
  { day: "Kam", energy: 85, stress: 30, sleep: 80, physical: 80, overall: 74 },
  { day: "Jum", energy: 60, stress: 60, sleep: 50, physical: 60, overall: 58 },
  { day: "Sab", energy: 90, stress: 25, sleep: 85, physical: 85, overall: 76 },
  { day: "Min", energy: 95, stress: 20, sleep: 90, physical: 90, overall: 79 }
];

const riskFactors = [
  { name: "Fatigue Risk", value: 35, color: "#ef4444", description: "Tingkat kelelahan moderate" },
  { name: "Stress Level", value: 45, color: "#f59e0b", description: "Stress level masih terkendali" },
  { name: "Sleep Quality", value: 75, color: "#10b981", description: "Kualitas tidur baik" },
  { name: "Physical Health", value: 80, color: "#3b82f6", description: "Kondisi fisik prima" }
];

const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];

export default function WellnessCheckPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [wellnessScore, setWellnessScore] = useState(0);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateWellnessScore = () => {
    let totalScore = 0;
    let answeredQuestions = 0;

    wellnessQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          totalScore += option.score;
          answeredQuestions++;
        }
      }
    });

    const avgScore = answeredQuestions > 0 ? Math.round(totalScore / answeredQuestions) : 0;
    setWellnessScore(avgScore);
    setIsCompleted(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return { status: "Excellent", color: "bg-green-500", icon: FiCheckCircle };
    if (score >= 60) return { status: "Good", color: "bg-yellow-500", icon: FiActivity };
    return { status: "Needs Attention", color: "bg-red-500", icon: FiAlertTriangle };
  };

  const getRecommendations = (score: number) => {
    if (score >= 80) {
      return [
        { icon: "🎉", title: "Kondisi Prima!", desc: "Pertahankan pola hidup sehat Anda" },
        { icon: "💪", title: "Terus Berkarya", desc: "Anda siap untuk hari yang produktif" },
        { icon: "⭐", title: "Jadi Contoh", desc: "Bagikan tips kesehatan ke sesama driver" }
      ];
    } else if (score >= 60) {
      return [
        { icon: "😌", title: "Istirahat Sebentar", desc: "Ambil break 15 menit setiap 2 jam" },
        { icon: "💧", title: "Hidrasi", desc: "Minum air putih minimal 8 gelas hari ini" },
        { icon: "🧘", title: "Relaksasi", desc: "Lakukan peregangan ringan saat istirahat" }
      ];
    } else {
      return [
        { icon: "🚨", title: "Perlu Istirahat", desc: "Pertimbangkan untuk istirahat lebih lama" },
        { icon: "😴", title: "Prioritas Tidur", desc: "Tidur cukup 7-8 jam malam ini" },
        { icon: "🏥", title: "Konsultasi", desc: "Jika berlanjut, konsultasi dengan dokter" }
      ];
    }
  };

  const canSubmit = wellnessQuestions.every(question => answers[question.id]);

  return (
    <DashboardLayout
      title="Wellness Guardian"
      badge={{
        icon: FiShield,
        text: "Your Health is Your Wealth"
      }}
    >
      <div className="p-6">
        {!isCompleted ? (
          /* Wellness Check Form */
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Wellness Check Harian
              </h2>
              <p className="text-slate-600">
                Jawab beberapa pertanyaan singkat untuk mendapatkan rekomendasi kesehatan yang dipersonalisasi
              </p>
            </div>

            <div className="space-y-8">
              {wellnessQuestions.map((question, index) => (
                <Card key={question.id} className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span>{question.question}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={answers[question.id] || ""} 
                      onValueChange={(value) => handleAnswer(question.id, value)}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {question.options.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                            <Label 
                              htmlFor={`${question.id}-${option.value}`}
                              className="cursor-pointer text-sm font-medium flex-1 p-3 rounded-lg border hover:bg-slate-50 transition-colors"
                            >
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              ))}

              <div className="text-center">
                <Button 
                  onClick={calculateWellnessScore}
                  disabled={!canSubmit}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg"
                  size="lg"
                >
                  <FiActivity className="mr-2 h-5 w-5" />
                  Analisis Wellness Score
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Results Dashboard */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Score & Recommendations */}
            <div className="lg:col-span-1 space-y-8">
              {/* Wellness Score */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FiHeart className="h-5 w-5" />
                    <span>Wellness Score Hari Ini</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <div className={`text-6xl font-bold ${getScoreColor(wellnessScore)} text-white`}>
                      {wellnessScore}
                    </div>
                    <div className="text-lg text-purple-100">
                      {getScoreStatus(wellnessScore).status}
                    </div>
                  </div>
                  
                  <div className="bg-white/20 p-4 rounded-lg">
                    <Progress value={wellnessScore} className="h-3 mb-2" />
                    <p className="text-sm text-purple-100">
                      Berdasarkan analisis AI dari 4 faktor kesehatan
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>💡 Rekomendasi AI</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getRecommendations(wellnessScore).map((rec, index) => (
                    <div key={index} className="p-4 bg-emerald-50 rounded-lg">
                      <h4 className="font-semibold text-emerald-800 mb-2 flex items-center">
                        <span className="text-lg mr-2">{rec.icon}</span>
                        {rec.title}
                      </h4>
                      <p className="text-sm text-emerald-700">{rec.desc}</p>
                    </div>
                  ))}
                  
                  <Button 
                    onClick={() => setIsCompleted(false)}
                    variant="outline" 
                    className="w-full mt-4"
                  >
                    Isi Ulang Assessment
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right: Charts & Analysis */}
            <div className="lg:col-span-2 space-y-8">
              {/* Risk Factors */}
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FiShield className="h-5 w-5 text-blue-600" />
                    <span>Analisis Faktor Risiko</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={riskFactors}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {riskFactors.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    
                    <div className="space-y-4">
                      {riskFactors.map((factor, index) => (
                        <div key={factor.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">{factor.name}</span>
                            <span className="text-sm text-slate-500">{factor.value}%</span>
                          </div>
                          <Progress value={factor.value} className="h-2" />
                          <p className="text-xs text-slate-500">{factor.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Trend */}
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FiActivity className="h-5 w-5 text-green-600" />
                    <span>Tren Wellness Mingguan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyWellnessData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="day" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, '']}
                        labelStyle={{ color: '#1f2937' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="overall" 
                        stroke="#8b5cf6" 
                        strokeWidth={3}
                        name="Overall Score"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="energy" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Energy"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sleep" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Sleep"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Health Tips */}
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>🏥 Tips Kesehatan Driver</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-800 flex items-center">
                        <FiSun className="mr-2 text-yellow-500" />
                        Tips Pagi
                      </h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li>• Sarapan bergizi sebelum bekerja</li>
                        <li>• Stretching ringan 5-10 menit</li>
                        <li>• Cek kendaraan untuk keamanan</li>
                        <li>• Siapkan air minum yang cukup</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-800 flex items-center">
                        <FiMoon className="mr-2 text-blue-500" />
                        Tips Malam
                      </h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li>• Hindari makan berat 2 jam sebelum tidur</li>
                        <li>• Batasi screen time 30 menit sebelum tidur</li>
                        <li>• Bersihkan diri dan kendaraan</li>
                        <li>• Rencanakan jadwal esok hari</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 