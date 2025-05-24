"use client";

import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FiCpu,
  FiCloud,
  FiLock,
  FiZap,
} from "react-icons/fi";
import { 
  Sparkles, 
  Brain,
  MessageSquare,
  TrendingUp,
  Database,
  Shield,
  Clock
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

// Component untuk animated counter
const AnimatedCounter = ({ end, suffix = "", duration = 2000, delay = 0 }: {
  end: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    
    const timer = setTimeout(() => {
      setHasAnimated(true);
      let startTime = Date.now();
      
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function untuk smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(end * easeOutCubic));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }, delay);

    return () => clearTimeout(timer);
  }, [end, duration, delay, hasAnimated]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

export default function TechnologyCredibilitySection() {
  const { ref: sectionRef, isInView } = useInView(0.1);
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);

  const keyTechnologies = [
    { 
      name: "Machine Learning Models", 
      icon: <Brain className="w-6 h-6" />,
      description: "Advanced AI models for accurate predictions",
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      name: "Natural Language Processing", 
      icon: <MessageSquare className="w-6 h-6" />,
      description: "Powered by Qwen LLM for intelligent insights",
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      name: "Predictive Analytics", 
      icon: <TrendingUp className="w-6 h-6" />,
      description: "Real-time earning forecasts and optimization",
      gradient: "from-emerald-500 to-teal-500"
    },
    { 
      name: "Real-time Data Processing", 
      icon: <Database className="w-6 h-6" />,
      description: "Instant data analysis and recommendations",
      gradient: "from-orange-500 to-red-500"
    },
  ];

  const techStackFeatures = [
    {
      title: "Powered by Qwen LLM",
      description: "Advanced language model for intelligent insights",
      icon: <FiCpu className="w-5 h-5" />,
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "Real-time ML Processing",
      description: "Instant machine learning computations",
      icon: <FiZap className="w-5 h-5" />,
      gradient: "from-emerald-500 to-cyan-500"
    },
    {
      title: "Bank-grade Security",
      description: "Enterprise-level data protection",
      icon: <FiLock className="w-5 h-5" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "99.9% Uptime SLA",
      description: "Guaranteed service reliability",
      icon: <Shield className="w-5 h-5" />,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      id="technology" 
      className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden"
    >
      {/* Animated Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-200 to-cyan-200 rounded-full opacity-15 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ease-out transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Badge variant="outline" className="mb-6 border-blue-300 text-blue-700 bg-blue-100/80 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Technology
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Built on World-Class
            <br />
            <span className="relative">
              AI Infrastructure
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            Powered by Alibaba Cloud PAI and advanced AI technologies
            for enterprise-grade reliability and performance.
          </p>
        </div>

        {/* Alibaba Cloud PAI Showcase */}
        <div className={`mb-16 transition-all duration-1000 ease-out transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '200ms' }}>
          <Card className="bg-white/80 backdrop-blur-lg border-white/60 shadow-2xl overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <FiCloud className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-slate-800">Alibaba Cloud PAI</h3>
                <p className="text-slate-600">Enterprise AI Platform powering our infrastructure</p>
              </div>

              {/* Tech Stack Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {techStackFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className={`text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 hover:bg-white/80 transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-lg ${
                      isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mx-auto mb-3 shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-3`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h4 className="font-bold text-sm mb-1 text-slate-800">{feature.title}</h4>
                    <p className="text-xs text-slate-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Technologies */}
        <div className={`mb-16 transition-all duration-1000 ease-out transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '400ms' }}>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800">
              Key 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Technologies</span>
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Advanced AI technologies working together to deliver accurate predictions and insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyTechnologies.map((tech, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ease-out transform ${
                  isInView 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${600 + index * 150}ms` }}
                onMouseEnter={() => setHoveredTech(index)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <Card className="group relative hover:shadow-2xl transition-all duration-500 ease-out transform hover:scale-105 border-white/60 backdrop-blur-lg bg-white/80 overflow-hidden h-full">
                  {/* Gradient Background Overlay saat Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <CardContent className="p-6 text-center relative z-10 h-full flex flex-col">
                    {/* Icon dengan Animated Background */}
                    <div className="relative mb-4 flex justify-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.gradient} flex items-center justify-center shadow-lg transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3`}>
                        <div className="text-white transition-all duration-300 group-hover:scale-110">
                          {tech.icon}
                        </div>
                      </div>
                      
                      {/* Floating particles effect saat hover */}
                      {hoveredTech === index && (
                        <>
                          <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
                          <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        </>
                      )}
                    </div>
                    
                    <h4 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-slate-900 transition-colors duration-300 flex-grow">
                      {tech.name}
                    </h4>
                    
                    <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                      {tech.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className={`bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl transition-all duration-1000 ease-out transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800">
              Enterprise-Grade 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Performance</span>
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Reliable infrastructure delivering consistent results for your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: 99.9, suffix: "%", label: "Uptime SLA", icon: <Clock className="w-5 h-5" />, gradient: "from-emerald-500 to-green-500" },
              { value: 50, suffix: "ms", label: "Response Time", icon: <FiZap className="w-5 h-5" />, gradient: "from-blue-500 to-cyan-500" },
              { value: 95, suffix: "%", label: "Accuracy Rate", icon: <TrendingUp className="w-5 h-5" />, gradient: "from-purple-500 to-pink-500" },
              { value: 24, suffix: "/7", label: "Support", icon: <Shield className="w-5 h-5" />, gradient: "from-orange-500 to-red-500" }
            ].map((metric, index) => (
              <div
                key={index}
                className={`group p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40 hover:bg-white/80 transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-xl ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${1000 + index * 150}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center mx-auto mb-3 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <div className="text-white">
                    {metric.icon}
                  </div>
                </div>
                
                <div className={`text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}>
                  {isInView ? (
                    <AnimatedCounter 
                      end={metric.value} 
                      suffix={metric.suffix}
                      delay={1200 + index * 200}
                    />
                  ) : (
                    `${metric.value}${metric.suffix}`
                  )}
                </div>
                
                <div className="text-slate-600 text-sm font-medium">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
