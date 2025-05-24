"use client";

import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Heart,
  DollarSign,
  BarChart3,
  MapPin,
  Activity,
  Shield,
  MessageCircle,
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle,
  Send,
} from "lucide-react";

// Custom hook for viewport intersection
const useInView = (threshold = 0.3) => {
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

// Animated Counter Hook - now with trigger
const useCountUp = (end: number, duration: number = 2000, trigger: boolean = false) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!trigger) {
      setCount(0);
      return;
    }

    let startTime: number;
    let animationFrame: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, trigger]);
  
  return count;
};

// Live Dashboard Mockup Component
const LiveDashboardMockup = ({ isVisible }: { isVisible: boolean }) => {
  const earnings = useCountUp(847, 2500, isVisible);
  const [progressWidth, setProgressWidth] = useState(0);
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setProgressWidth(75), 500);
      return () => clearTimeout(timer);
    } else {
      setProgressWidth(0);
    }
  }, [isVisible]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-emerald-100 rounded-lg p-4 border border-blue-200 h-48 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-700">Today's Earnings Forecast</h4>
        <Badge className={`bg-green-500 text-white text-xs shadow-lg ${isVisible ? 'animate-pulse' : ''}`}>Live</Badge>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-600">Predicted Earnings</span>
          <span className="text-emerald-600 font-bold text-lg">Rp{earnings.toLocaleString()}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full transition-all duration-2000 ease-out shadow-sm"
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white/60 backdrop-blur-sm p-2 rounded border border-blue-200 hover:bg-white/80 transition-colors shadow-sm">
            <div className="text-slate-500">Peak Hours</div>
            <div className="text-slate-700 font-semibold">6-9 PM</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-2 rounded border border-blue-200 hover:bg-white/80 transition-colors shadow-sm">
            <div className="text-slate-500">Hot Zone</div>
            <div className="text-slate-700 font-semibold flex items-center">
              <div className={`w-2 h-2 bg-red-400 rounded-full mr-1 ${isVisible ? 'animate-ping' : ''}`}></div>
              Mall Area
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wellness Dashboard Component
const WellnessDashboard = ({ isVisible }: { isVisible: boolean }) => {
  const healthScore = useCountUp(85, 2000, isVisible);
  const activeHours = useCountUp(72, 2000, isVisible);
  const breaks = useCountUp(4, 1500, isVisible);
  const [fatigueLevel, setFatigueLevel] = useState(0);
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setFatigueLevel(33), 1000);
      return () => clearTimeout(timer);
    } else {
      setFatigueLevel(0);
    }
  }, [isVisible]);

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-lg p-4 border border-emerald-200 h-48 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-700">Health Monitor</h4>
        <div className="flex items-center space-x-1">
          <div className={`w-2 h-2 bg-green-500 rounded-full ${isVisible ? 'animate-pulse' : ''}`}></div>
          <span className="text-xs text-green-600 font-medium">Healthy</span>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600">Fatigue Level</span>
          <div className="flex items-center space-x-2">
            <div className="w-16 bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-1.5 rounded-full transition-all duration-1500 ease-out"
                style={{ width: `${fatigueLevel}%` }}
              ></div>
            </div>
            <span className="text-xs text-yellow-600 font-medium">Low</span>
          </div>
        </div>
        <div className={`bg-amber-50 border border-amber-200 rounded p-2 flex items-center space-x-2 ${isVisible ? 'animate-pulse' : ''}`}>
          <Clock className="w-3 h-3 text-amber-600" />
          <span className="text-xs text-amber-700">Break recommended in 30 min</span>
        </div>
        <div className="grid grid-cols-3 gap-1 text-xs">
          <div className="text-center bg-white/50 backdrop-blur-sm rounded p-1 border border-green-200">
            <div className="text-lg font-bold text-green-600">{healthScore}</div>
            <div className="text-slate-500">Health Score</div>
          </div>
          <div className="text-center bg-white/50 backdrop-blur-sm rounded p-1 border border-blue-200">
            <div className="text-lg font-bold text-blue-600">{activeHours / 10}h</div>
            <div className="text-slate-500">Active Time</div>
          </div>
          <div className="text-center bg-white/50 backdrop-blur-sm rounded p-1 border border-purple-200">
            <div className="text-lg font-bold text-purple-600">{breaks}</div>
            <div className="text-slate-500">Breaks</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Chat Interface Demo Component
const ChatInterfaceDemo = ({ isVisible }: { isVisible: boolean }) => {
  const [messages, setMessages] = useState([
    { type: 'ai', text: 'Halo! Saya lihat earning Anda naik 15% minggu ini. Mau saya buatkan rencana investasi?', visible: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom function
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Auto scroll when messages change or typing state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isVisible) {
      // Reset chat state when not visible
      setMessages([
        { type: 'ai', text: 'Halo! Saya lihat earning Anda naik 15% minggu ini. Mau saya buatkan rencana investasi?', visible: true }
      ]);
      setIsTyping(false);
      return;
    }

    const timers: NodeJS.Timeout[] = [];
    
    // User response
    timers.push(setTimeout(() => {
      setMessages(prev => [...prev, { type: 'user', text: 'Iya, tolong buatkan!', visible: true }]);
    }, 2000));
    
    // AI typing indicator
    timers.push(setTimeout(() => {
      setIsTyping(true);
    }, 3000));
    
    // AI response
    timers.push(setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        type: 'ai', 
        text: 'Perfect! Berdasarkan income Anda, saya rekomendasikan investasi Rp500.000/bulan di reksa dana.', 
        visible: true 
      }]);
    }, 4500));
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [isVisible]);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-100 rounded-lg border border-purple-200 shadow-xl h-48 flex flex-col overflow-hidden">
      <div className="border-b p-3 flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-sm">
          <MessageCircle className="w-3 h-3 text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-700">FairLeap AI Advisor</div>
          <div className="text-xs text-green-500 flex items-center">
            <div className={`w-1.5 h-1.5 bg-green-500 rounded-full mr-1 ${isVisible ? 'animate-pulse' : ''}`}></div>
            Online
          </div>
        </div>
      </div>
      
      <div 
        ref={chatContainerRef}
        className="p-2 flex-1 overflow-y-auto space-y-2 bg-gradient-to-b from-white/50 to-white/80 scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : ''} animate-fadeIn`}>
            <div className={`rounded-lg p-2 max-w-[85%] shadow-sm text-xs ${
              message.type === 'user' 
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white' 
                : 'bg-white border border-slate-200'
            }`}>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex animate-fadeIn">
            <div className="bg-white rounded-lg p-2 max-w-[85%] border border-slate-200 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-2 flex items-center space-x-2 bg-white/70 backdrop-blur-sm border-purple-200">
        <input 
          className="flex-1 text-xs border border-slate-200 rounded px-2 py-1 bg-white focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none transition-all" 
          placeholder="Tanya tentang keuangan..."
          readOnly
        />
        <Send className="w-4 h-4 text-emerald-500" />
      </div>
    </div>
  );
};

export default function SolutionShowcaseSection() {
  const { ref: sectionRef, isInView } = useInView(0.3);

  const features = [
    {
      icon: <TrendingUp className="w-10 h-10 text-emerald-600" />,
      title: "Predictive Earnings Intelligence",
      headline: "Know Tomorrow's Income Today",
      description:
        "Advanced ML algorithms analyze historical data, demand patterns, and your work preferences to forecast earnings with 95% accuracy",
      benefits: [
        {
          icon: <BarChart3 className="w-4 h-4 text-emerald-600" />,
          text: "Daily & weekly income predictions",
        },
        {
          icon: <MapPin className="w-4 h-4 text-emerald-600" />,
          text: "Optimal hours & location suggestions",
        },
        {
          icon: <Activity className="w-4 h-4 text-emerald-600" />,
          text: "Real-time demand heatmaps",
        },
      ],
      visual: <LiveDashboardMockup isVisible={isInView} />,
    },
    {
      icon: <Heart className="w-10 h-10 text-emerald-600" />,
      title: "Wellness Guardian",
      headline: "Your Health is Your Wealth",
      description:
        "Personalized AI monitoring that tracks your work patterns and suggests optimal rest schedules to maximize earnings while preventing burnout",
      benefits: [
        {
          icon: <Activity className="w-4 h-4 text-emerald-600" />,
          text: "Fatigue level monitoring",
        },
        {
          icon: <Clock className="w-4 h-4 text-emerald-600" />,
          text: "Smart break reminders",
        },
        {
          icon: <Shield className="w-4 h-4 text-emerald-600" />,
          text: "Health score tracking",
        },
      ],
      visual: <WellnessDashboard isVisible={isInView} />,
    },
    {
      icon: <DollarSign className="w-10 h-10 text-emerald-600" />,
      title: "Financial Empowerment Hub",
      headline: "Build Your Financial Future",
      description:
        "Access personalized financial literacy modules, savings recommendations, and seamless integration with GoPay financial services",
      benefits: [
        {
          icon: <MessageCircle className="w-4 h-4 text-emerald-600" />,
          text: "AI financial advisor chatbot",
        },
        {
          icon: <TrendingDown className="w-4 h-4 text-emerald-600" />,
          text: "Micro-investment opportunities",
        },
        {
          icon: <Shield className="w-4 h-4 text-emerald-600" />,
          text: "Insurance & loan access",
        },
      ],
      visual: <ChatInterfaceDemo isVisible={isInView} />,
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4 border-emerald-200 text-emerald-700">
            AI-Powered Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Your <span className="text-emerald-600">AI-Powered Success</span> Partner
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Empowering Gojek drivers with intelligent tools that predict earnings, protect wellbeing, and build financial prosperity together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-2xl transition-all duration-500 border-2 hover:border-emerald-200 h-full group hover:scale-105"
            >
              <CardContent className="p-8 h-full flex flex-col">
                {/* Icon Section - Fixed Height */}
                <div className="mb-6 flex justify-center h-16 items-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                
                {/* Title Section - Fixed Height */}
                <div className="text-center mb-6 h-24 flex flex-col justify-center">
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">
                    {feature.title}
                </h3>
                  <h4 className="text-2xl font-bold text-slate-800">
                    {feature.headline}
                  </h4>
                </div>
                
                {/* Description Section - Fixed Height */}
                <div className="mb-8 h-20 flex items-center">
                  <p className="text-muted-foreground leading-relaxed text-center text-sm">
                    {feature.description}
                  </p>
                </div>

                {/* Key Benefits Section - Fixed Height */}
                <div className="mb-8 h-32">
                  <h5 className="font-semibold text-sm uppercase tracking-wide text-center mb-4 text-slate-600">
                    Key Benefits
                  </h5>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                    <li
                      key={benefitIndex}
                        className="flex items-center text-sm hover:text-emerald-700 transition-colors"
                    >
                        <div className="mr-3 flex-shrink-0">{benefit.icon}</div>
                        <span>{benefit.text}</span>
                    </li>
                  ))}
                </ul>
                </div>

                {/* Visual Section - Fixed Height */}
                <div className="mt-auto">
                  {feature.visual}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-50 to-green-100 rounded-2xl p-8 border border-emerald-200 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-slate-800">Why Drivers Trust FairLeap</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of Gojek drivers who have already increased their earnings and improved their quality of life with our AI-powered platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">50,000+</div>
                <div className="text-sm text-muted-foreground">Active Drivers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">95%</div>
                <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">Rp25M+</div>
                <div className="text-sm text-muted-foreground">Earnings Boost</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">24/7</div>
                <div className="text-sm text-muted-foreground">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}
