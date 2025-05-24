"use client";

import React, { useState, useEffect } from "react";
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
  FiCheckCircle,
  FiRefreshCw,
  FiTrendingUp
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
import {
  wellnessQuestions,
  saveWellnessData,
  loadWellnessData,
  hasCompletedWellnessToday,
  calculateWellnessScore,
  getWellnessStatus,
  getWellnessRecommendations,
  getTimeUntilNextAssessment,
  WellnessAnswer,
  WellnessData
} from "@/lib/wellnessManager";

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
  const [existingData, setExistingData] = useState<WellnessData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing wellness data on mount
  useEffect(() => {
    const data = loadWellnessData();
    if (data && data.isCompleted) {
      setExistingData(data);
      setIsCompleted(true);
      setWellnessScore(data.overallScore);
      
      // Convert answers back to string format for display
      const answersMap: Record<string, string> = {};
      Object.keys(data.answers).forEach(questionId => {
        answersMap[questionId] = data.answers[questionId].value;
      });
      setAnswers(answersMap);
    }
  }, []);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateAndSaveWellnessScore = async () => {
    setIsSubmitting(true);
    
    try {
      // Convert answers to WellnessAnswer format
      const wellnessAnswers: Record<string, WellnessAnswer> = {};
      
      wellnessQuestions.forEach(question => {
        const answer = answers[question.id];
        if (answer) {
          const option = question.options.find(opt => opt.value === answer);
          if (option) {
            wellnessAnswers[question.id] = {
              questionId: question.id,
              value: answer,
              score: option.score,
              timestamp: new Date()
            };
          }
        }
      });

      // Calculate overall score
      const overallScore = calculateWellnessScore(wellnessAnswers);
      
      // Create wellness data object
      const wellnessData: WellnessData = {
        answers: wellnessAnswers,
        overallScore,
        lastAssessment: new Date(),
        isCompleted: true
      };

      // Save to localStorage
      saveWellnessData(wellnessData);

      // Update state
      setWellnessScore(overallScore);
      setIsCompleted(true);
      setExistingData(wellnessData);

    } catch (error) {
      console.error('Error saving wellness data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetakeAssessment = () => {
    setAnswers({});
    setIsCompleted(false);
    setWellnessScore(0);
    setExistingData(null);
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

  const canSubmit = wellnessQuestions.every(question => answers[question.id]);

  const wellnessStatus = getWellnessStatus(wellnessScore);
  const recommendations = getWellnessRecommendations(wellnessScore);

  return (
    <DashboardLayout
      title="Wellness Guardian"
      subtitle={existingData ? 
        `Last assessment: ${existingData.lastAssessment.toLocaleDateString('id-ID')} ${existingData.lastAssessment.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}` :
        "Monitor kesehatan harian untuk performa optimal"
      }
      badge={{
        icon: FiShield,
        text: isCompleted ? `Score: ${wellnessScore}%` : "Assessment"
      }}
    >
      <div className="p-6">
        {/* Show existing assessment results */}
        {isCompleted && existingData ? (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Assessment Results Header */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 mb-4">
                <span className="text-3xl">{wellnessStatus.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: wellnessStatus.color }}>
                    Wellness Score: {wellnessScore}%
                  </h2>
                  <p className="text-slate-600">{wellnessStatus.text}</p>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={handleRetakeAssessment}
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100"
                >
                  <FiRefreshCw className="mr-2 h-4 w-4" />
                  Retake Assessment
                </Button>
                
                {getTimeUntilNextAssessment() > 0 && (
                  <div className="flex items-center px-4 py-2 bg-yellow-50 rounded-lg border border-yellow-200">
                    <FiSun className="mr-2 h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800">
                      Next assessment dalam {getTimeUntilNextAssessment()} jam
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Results Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Individual Metrics */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FiActivity className="h-5 w-5 text-emerald-600" />
                    <span>Metric Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {wellnessQuestions.map(question => {
                    const answer = existingData.answers[question.id];
                    if (!answer) return null;
                    
                    const selectedOption = question.options.find(opt => opt.value === answer.value);
                    return (
                      <div key={question.id} className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-slate-800">{question.category}</h4>
                          <span className="text-sm font-bold" style={{ 
                            color: answer.score >= 80 ? '#10b981' : answer.score >= 60 ? '#3b82f6' : '#ef4444' 
                          }}>
                            {answer.score}%
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{question.question}</p>
                        <p className="text-sm font-medium text-slate-700">
                          ✓ {selectedOption?.label}
                        </p>
                        <Progress value={answer.score} className="h-2 mt-2" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FiTrendingUp className="h-5 w-5 text-blue-600" />
                    <span>Personalized Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border border-blue-200">
                      <div className="flex items-start space-x-3">
                        <span className="text-xl">
                          {wellnessScore >= 80 ? "🎉" : wellnessScore >= 60 ? "😌" : "🚨"}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{rec}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Weekly Trend */}
                  <div className="mt-6">
                    <h4 className="font-medium text-slate-800 mb-3">Weekly Wellness Trend</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={weeklyWellnessData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="day" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="overall" 
                          stroke="#8b5cf6" 
                          strokeWidth={3}
                          name="Overall"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Assessment */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiShield className="h-5 w-5 text-red-500" />
                  <span>Risk Assessment & Safety Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {riskFactors.map((factor, index) => (
                    <div key={factor.name} className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { value: factor.value },
                                { value: 100 - factor.value }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={25}
                              outerRadius={40}
                              startAngle={90}
                              endAngle={-270}
                              dataKey="value"
                            >
                              <Cell fill={factor.color} />
                              <Cell fill="#e2e8f0" />
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="relative -mt-12 text-center">
                          <span className="text-lg font-bold" style={{ color: factor.color }}>
                            {factor.value}%
                          </span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-1">{factor.name}</h3>
                      <p className="text-xs text-slate-600">{factor.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
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
                          <div key={option.value} className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                            <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                            <Label 
                              htmlFor={`${question.id}-${option.value}`} 
                              className="flex-1 cursor-pointer text-sm"
                            >
                              {option.label}
                            </Label>
                            <span className="text-xs text-slate-500 font-medium">
                              {option.score}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              ))}

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  onClick={calculateAndSaveWellnessScore}
                  disabled={!canSubmit || isSubmitting}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-lg"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <FiRefreshCw className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle className="mr-2 h-5 w-5" />
                      Complete Wellness Check
                    </>
                  )}
                </Button>
                
                {!canSubmit && (
                  <p className="mt-2 text-sm text-slate-500">
                    Jawab semua pertanyaan untuk melanjutkan ({wellnessQuestions.filter(q => answers[q.id]).length}/{wellnessQuestions.length} completed)
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 