"use client";

import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Link2,
  Brain,
  TrendingUp,
  Target,
  Trophy,
  Sparkles,
  Play,
  Pause,
  ArrowLeft,
  ArrowRight,
  Smartphone,
  BarChart3,
  MapPin,
  Zap,
  Crown
} from "lucide-react";

// Hook untuk intersection observer
const useInView = (threshold = 0.2) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isInView };
};

// Component untuk visualisasi tiap step
const StepVisualization = ({ step }: { step: any }) => {
  const [connectStatus, setConnectStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Reset animation when step changes
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [step.step]);

  const handleConnect = () => {
    if (connectStatus === 'disconnected') {
      setConnectStatus('connecting');
      setTimeout(() => {
        setConnectStatus('connected');
      }, 2000);
    }
  };

  switch (step.step) {
    case 1:
      return (
        <div className={`bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6 h-full flex items-center justify-center transition-all duration-500 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
          <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-sm transform transition-all duration-500 hover:scale-105">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center animate-pulse">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-slate-700">GOTO Connect</span>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-50 rounded-lg p-3 transition-all duration-300 hover:bg-slate-100">
                <div className="text-sm text-slate-600">Account Status</div>
                <div className={`font-semibold flex items-center space-x-2 transition-all duration-300 ${
                  connectStatus === 'connected' ? 'text-green-600' : 
                  connectStatus === 'connecting' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {connectStatus === 'connecting' && (
                    <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                  )}
                  <span>
                    {connectStatus === 'connected' ? '✓ Connected' : 
                     connectStatus === 'connecting' ? 'Connecting...' : '✗ Disconnected'}
                  </span>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 transition-all duration-300 hover:bg-slate-100">
                <div className="text-sm text-slate-600">Security</div>
                <div className={`font-semibold transition-all duration-300 ${connectStatus === 'connected' ? 'text-green-600' : 'text-slate-400'}`}>
                  {connectStatus === 'connected' ? '🔒 Encrypted' : '🔓 Not Secured'}
                </div>
              </div>
              <Button 
                onClick={handleConnect}
                disabled={connectStatus === 'connecting' || connectStatus === 'connected'}
                className={`w-full transition-all duration-300 transform hover:scale-105 ${
                  connectStatus === 'connected' ? 'bg-green-500 hover:bg-green-600' :
                  connectStatus === 'connecting' ? 'bg-yellow-500' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {connectStatus === 'connected' ? 'Connected ✓' :
                 connectStatus === 'connecting' ? 'Connecting...' : 'Connect Account'}
              </Button>
            </div>
          </div>
        </div>
      );
    
    case 2:
      return (
        <div className={`bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 h-full flex items-center justify-center transition-all duration-500 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
          <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-sm transform transition-all duration-500 hover:scale-105">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center animate-pulse">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-slate-700">AI Analysis</span>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-3 transition-all duration-300 hover:bg-slate-100">
                <div className="text-sm text-slate-600 mb-2">Processing Data</div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full w-3/4 animate-pulse transition-all duration-1000"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-purple-50 p-2 rounded transition-all duration-300 hover:bg-purple-100 transform hover:scale-105">
                  <div className="text-purple-600 font-semibold animate-pulse">120+</div>
                  <div className="text-slate-600">Data Points</div>
                </div>
                <div className="bg-purple-50 p-2 rounded transition-all duration-300 hover:bg-purple-100 transform hover:scale-105">
                  <div className="text-purple-600 font-semibold animate-pulse">AI ML</div>
                  <div className="text-slate-600">Algorithm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    
    case 3:
      return (
        <div className={`bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-6 h-full flex items-center justify-center transition-all duration-500 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
          <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-sm transform transition-all duration-500 hover:scale-105">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center animate-pulse">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-slate-700">Income Forecast</span>
            </div>
            <div className="space-y-3">
              <div className="bg-emerald-50 rounded-lg p-3 transition-all duration-300 hover:bg-emerald-100 transform hover:scale-105">
                <div className="text-sm text-slate-600">Today's Prediction</div>
                <div className="text-2xl font-bold text-emerald-600 animate-pulse">Rp 450K</div>
                <div className="text-xs text-emerald-500">+15% from yesterday</div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['Mon', 'Tue', 'Wed'].map((day, index) => (
                  <div key={day} className="text-center transition-all duration-300 hover:bg-emerald-50 p-1 rounded transform hover:scale-110" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="text-slate-600">{day}</div>
                    <div className="font-semibold animate-pulse">{['420K', '450K', '390K'][index]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    
    case 4:
      return (
        <div className={`bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-6 h-full flex items-center justify-center transition-all duration-500 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
          <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-sm transform transition-all duration-500 hover:scale-105">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center animate-pulse">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-slate-700">Smart Analytics</span>
            </div>
            <div className="space-y-3">
              <div className="bg-orange-50 rounded-lg p-3 transition-all duration-300 hover:bg-orange-100 transform hover:scale-105">
                <div className="text-sm text-slate-600">Earnings Forecast</div>
                <div className="text-orange-600 font-semibold animate-pulse">Rp 450K Today</div>
                <div className="text-xs text-orange-500">85% of target reached</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 p-2 rounded text-xs transition-all duration-300 hover:bg-slate-100 transform hover:scale-105">
                  <div className="text-slate-600">Peak Hours</div>
                  <div className="font-semibold animate-pulse">17:00-19:00</div>
                </div>
                <div className="bg-slate-50 p-2 rounded text-xs transition-all duration-300 hover:bg-slate-100 transform hover:scale-105">
                  <div className="text-slate-600">Wellness</div>
                  <div className="font-semibold animate-pulse text-green-600">78%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    
    case 5:
      return (
        <div className={`bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 h-full flex items-center justify-center transition-all duration-500 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
          <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-sm transform transition-all duration-500 hover:scale-105">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center animate-pulse">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-slate-700">Success Dashboard</span>
            </div>
            <div className="space-y-3">
              <div className="bg-yellow-50 rounded-lg p-3 transition-all duration-300 hover:bg-yellow-100 transform hover:scale-105">
                <div className="text-sm text-slate-600">Monthly Income</div>
                <div className="text-2xl font-bold text-yellow-600 animate-pulse">Rp 12.5M</div>
                <div className="text-xs text-yellow-500">+35% increase</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 p-2 rounded transition-all duration-300 hover:bg-slate-100 transform hover:scale-105">
                  <div className="text-slate-600">Work-Life</div>
                  <div className="font-semibold text-green-600 animate-pulse">Balanced ✓</div>
                </div>
                <div className="bg-slate-50 p-2 rounded transition-all duration-300 hover:bg-slate-100 transform hover:scale-105">
                  <div className="text-slate-600">Health Score</div>
                  <div className="font-semibold text-green-600 animate-pulse">95/100</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    
    default:
      return null;
  }
};

export default function HowItWorksSection() {
  const { ref: sectionRef, isInView } = useInView(0.1);
  const [currentStep, setCurrentStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const steps = [
    {
      step: 1,
      icon: <Link2 className="w-5 h-5" />,
      title: "Connect",
      subtitle: "Link Your GOTO Account",
      description: "Securely integrate your GOTO driver account with bank-level encryption. The data synchronization process requires just one click.",
      features: [
        "One-click secure integration",
        "Bank-level data encryption",
        "No external data storage"
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      step: 2,
      icon: <Brain className="w-5 h-5" />,
      title: "Analyze",
      subtitle: "AI Analyzes Earning Patterns",
      description: "Our AI system analyzes over 100 data points to understand your earning patterns with advanced machine learning algorithms.",
      features: [
        "Processes 100+ unique data points",
        "Advanced machine learning algorithms",
        "Real-time pattern recognition"
      ],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      step: 3,
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Predict",
      subtitle: "Accurate Income Forecasting",
      description: "Get accurate income predictions with 95% precision rate. Real-time updates for daily, weekly, and monthly projections.",
      features: [
        "Continuous real-time predictions",
        "95% accuracy rate",
        "Daily, weekly & monthly projections"
      ],
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      step: 4,
      icon: <Target className="w-5 h-5" />,
      title: "Optimize",
      subtitle: "Analytics & Recommendations",
      description: "Receive personalized recommendations to maximize earnings while reducing fatigue with smart analytics and wellness monitoring.",
      features: [
        "Maximize earning potential",
        "Reduce fatigue with wellness insights",
        "Peak hour analytics & health alerts"
      ],
      gradient: "from-orange-500 to-red-500",
    },
    {
      step: 5,
      icon: <Trophy className="w-5 h-5" />,
      title: "Thrive",
      subtitle: "Achieve Sustainable Success",
      description: "Build consistent and sustainable income with better work-life balance for long-term financial growth.",
      features: [
        "Build consistent & sustainable income",
        "Better work-life balance",
        "Long-term financial growth"
      ],
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  // Auto-advance steps dengan interval lebih lama
  useEffect(() => {
    if (!isAutoPlaying || !isInView) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length) {
          return 1;
        }
        return prev + 1;
      });
    }, 7000); // Diperpanjang dari 4000ms ke 7000ms

    return () => clearInterval(interval);
  }, [isAutoPlaying, isInView, steps.length]);

  const handleStepChange = (step: number) => {
    if (step === currentStep || isTransitioning) return;
    
    setIsTransitioning(true);
    setIsAutoPlaying(false);
    
    // Smooth transition dengan fade out lalu fade in
    setTimeout(() => {
      setCurrentStep(step);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200); // Slightly faster untuk better responsiveness
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <section ref={sectionRef} id="how-it-works" className="relative py-20 bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-200 to-blue-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-15 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-6 border-emerald-300 text-emerald-700 bg-emerald-100/80 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            How it Works
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Manage Your Earnings
            <br />
            <span className="relative">
              in 5 Simple Steps
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full"></div>
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Our application is designed very simply. With just 5 steps, you can easily optimize your earning potential as a driver.
          </p>
        </div>

        {/* Main Tutorial Container */}
        <div className="max-w-6xl mx-auto">
          <Card className="border-2 border-white/60 backdrop-blur-lg bg-white/80 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              {/* Tab Indicators */}
              <div className="bg-gradient-to-r from-slate-100 to-emerald-50 px-6 py-4 border-b border-white/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {steps.map((step) => (
                      <button
                        key={step.step}
                        onClick={() => handleStepChange(step.step)}
                        disabled={isTransitioning}
                        className={`relative group transition-all duration-300 ease-out ${isTransitioning ? 'pointer-events-none' : ''}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ease-out transform ${
                          currentStep === step.step
                            ? `bg-gradient-to-br ${step.gradient} text-white shadow-lg scale-110`
                            : 'bg-white/60 text-slate-400 hover:bg-white/80 hover:text-slate-600 hover:scale-105'
                        } ${isTransitioning ? 'blur-sm' : ''}`}>
                          <span className="text-sm font-bold">{step.step.toString().padStart(2, '0')}</span>
                        </div>
                        {currentStep === step.step && (
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full animate-pulse"></div>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="border-emerald-200 hover:bg-emerald-50 transition-all duration-300"
                    >
                      {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStepChange(Math.max(1, currentStep - 1))}
                      disabled={currentStep === 1 || isTransitioning}
                      className="border-emerald-200 hover:bg-emerald-50 transition-all duration-300"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStepChange(Math.min(steps.length, currentStep + 1))}
                      disabled={currentStep === steps.length || isTransitioning}
                      className="border-emerald-200 hover:bg-emerald-50 transition-all duration-300"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content Area dengan Wipe Animation */}
              <div className="p-8 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[400px]">
                  {/* Text Content dengan Wipe dari Kiri ke Kanan */}
                  <div 
                    key={`text-${currentStep}`}
                    className={`space-y-6 transition-all duration-600 ease-out transform ${
                      isTransitioning 
                        ? 'opacity-0 -translate-x-8 scale-95' 
                        : 'opacity-100 translate-x-0 scale-100'
                    }`}
                  >
                    {/* Step Header */}
                    <div className={`flex items-center space-x-4 transition-all duration-500 ${
                      isTransitioning ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'
                    }`} style={{ transitionDelay: isTransitioning ? '0ms' : '100ms' }}>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentStepData.gradient} flex items-center justify-center shadow-lg transition-all duration-500 transform ${
                        isTransitioning ? 'scale-90 rotate-12' : 'scale-100 rotate-0'
                      }`}>
                        <div className="text-white">
                          {currentStepData.icon}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">
                          Step {currentStep}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">
                          {currentStepData.title}
                        </h3>
                      </div>
                    </div>

                    {/* Subtitle */}
                    <div className={`transition-all duration-500 ${
                      isTransitioning ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'
                    }`} style={{ transitionDelay: isTransitioning ? '0ms' : '200ms' }}>
                      <Badge variant="outline" className="border-emerald-300 text-emerald-700 bg-emerald-50 mb-4">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {currentStepData.subtitle}
                      </Badge>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {currentStepData.description}
                      </p>
                    </div>

                    {/* Features dengan Wipe Animation */}
                    <div className={`space-y-3 transition-all duration-500 ${
                      isTransitioning ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'
                    }`} style={{ transitionDelay: isTransitioning ? '0ms' : '300ms' }}>
                      {currentStepData.features.map((feature, index) => (
                        <div 
                          key={index}
                          className={`flex items-start space-x-3 group transition-all duration-400 ease-out ${
                            isTransitioning ? 'opacity-0 -translate-x-6' : 'opacity-100 translate-x-0'
                          }`}
                          style={{ 
                            transitionDelay: isTransitioning ? '0ms' : `${400 + index * 100}ms`
                          }}
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full mt-2.5 group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-slate-600 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progress */}
                    <div className={`pt-4 transition-all duration-500 ${
                      isTransitioning ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'
                    }`} style={{ transitionDelay: isTransitioning ? '0ms' : '600ms' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-500 font-medium">Progress</span>
                        <span className="text-sm text-emerald-600 font-bold">{(currentStep / steps.length * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2 rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${currentStep / steps.length * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Visualization dengan Wipe dari Kanan ke Kiri */}
                  <div 
                    key={`visual-${currentStep}`}
                    className={`transition-all duration-600 ease-out transform ${
                      isTransitioning 
                        ? 'opacity-0 translate-x-8 scale-95' 
                        : 'opacity-100 translate-x-0 scale-100'
                    }`}
                    style={{ transitionDelay: isTransitioning ? '0ms' : '200ms' }}
                  >
                    <StepVisualization step={currentStepData} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Metrics */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: '50K+', label: 'Active Drivers', gradient: 'from-emerald-500 to-green-600' },
                { number: '35%', label: 'Income Increase', gradient: 'from-purple-500 to-pink-600' },
                { number: '95%', label: 'Prediction Accuracy', gradient: 'from-orange-500 to-yellow-600' },
                { number: '4.9★', label: 'User Rating', gradient: 'from-blue-500 to-cyan-600' }
              ].map((metric, index) => (
                <div key={index} className="text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/70">
                  <div className={`text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}>
                    {metric.number}
                  </div>
                  <div className="text-slate-600 text-sm font-medium">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
