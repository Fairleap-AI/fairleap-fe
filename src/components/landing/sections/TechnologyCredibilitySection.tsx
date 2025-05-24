"use client";

import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { gsap } from "gsap";
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
  Shield
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

export default function TechnologyCredibilitySection() {
  const { ref: sectionRef, isInView } = useInView(0.1);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const techCardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metricsCardRef = useRef<HTMLDivElement>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  // Main hero card data
  const heroCard = {
    title: 'Alibaba Cloud PAI',
    subtitle: 'Enterprise AI Platform',
    icon: <FiCloud className="w-10 h-10" />,
    gradient: 'from-orange-500 to-red-500',
    description: 'Powered by cutting-edge AI infrastructure with enterprise-grade reliability and scalability for mission-critical applications.',
    features: [
      { text: 'Powered by Qwen LLM', icon: <FiCpu className="w-5 h-5" /> },
      { text: 'Real-time ML Processing', icon: <FiZap className="w-5 h-5" /> },
      { text: 'Bank-grade Security', icon: <FiLock className="w-5 h-5" /> },
      { text: '99.9% Uptime SLA', icon: <Shield className="w-5 h-5" /> }
    ]
  };

  // Tech cards data
  const techCards = [
    {
      title: 'Machine Learning Models',
      description: 'Advanced AI models for accurate earning predictions',
      icon: <Brain className="w-8 h-8" />,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Natural Language Processing',
      description: 'Qwen LLM for intelligent insights and analysis',
      icon: <MessageSquare className="w-8 h-8" />,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Predictive Analytics',
      description: 'Real-time earning forecasts and optimization',
      icon: <TrendingUp className="w-8 h-8" />,
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Real-time Processing',
      description: 'Instant data analysis and recommendations',
      icon: <Database className="w-8 h-8" />,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  // Performance metrics
  const performanceMetrics = [
    { value: '99.9%', label: 'Uptime SLA', gradient: 'from-emerald-500 to-green-600' },
    { value: '<50ms', label: 'Response Time', gradient: 'from-blue-500 to-cyan-600' },
    { value: '95%', label: 'AI Accuracy', gradient: 'from-purple-500 to-pink-600' },
    { value: '24/7', label: 'Support', gradient: 'from-orange-500 to-red-600' }
  ];

  // GSAP Animations
  useEffect(() => {
    if (!isInView || animationCompleted) return;

    const tl = gsap.timeline({
      onComplete: () => setAnimationCompleted(true)
    });

    // Set initial states
    gsap.set([headerRef.current, heroCardRef.current, metricsCardRef.current], {
      opacity: 0,
      y: 50
    });

    gsap.set(techCardsRefs.current, {
      opacity: 0,
      scale: 0.8,
      y: 30
    });

    // Animation timeline
    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(heroCardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .to(techCardsRefs.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out"
    }, "-=0.4")
    .to(metricsCardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.2");

  }, [isInView, animationCompleted]);

  // Card Hover Animations
  const handleCardHover = (ref: HTMLDivElement | null, isEntering: boolean) => {
    if (!ref) return;

    if (isEntering) {
      gsap.to(ref, {
        scale: 1.02,
        y: -8,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(ref, {
        boxShadow: "0 25px 50px rgba(59, 130, 246, 0.15)",
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(ref, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(ref, {
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="technology" 
      className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full opacity-15 blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-emerald-200 rounded-full opacity-10 blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-6 border-blue-300 text-blue-700 bg-blue-100/80 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Technology
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Built on World-Class AI Infrastructure
          </h2>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            Powered by Alibaba Cloud PAI and advanced AI technologies for enterprise-grade reliability
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Card - Alibaba Cloud PAI */}
          <Card
            ref={heroCardRef}
            className="bg-white/90 backdrop-blur-lg border-white/60 shadow-xl overflow-hidden cursor-pointer transition-all duration-300"
            onMouseEnter={() => handleCardHover(heroCardRef.current, true)}
            onMouseLeave={() => handleCardHover(heroCardRef.current, false)}
          >
            <CardContent className="p-8">
              <div className="flex items-start space-x-6">
                <div className={`w-20 h-20 bg-gradient-to-br ${heroCard.gradient} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <div className="text-white">
                    {heroCard.icon}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{heroCard.title}</h3>
                    <p className="text-lg text-slate-600 mb-4">{heroCard.subtitle}</p>
                    <p className="text-slate-600 leading-relaxed">{heroCard.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {heroCard.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                        <div className="text-blue-600 flex-shrink-0">
                          {feature.icon}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tech Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techCards.map((card, index) => (
              <Card
                key={index}
                ref={el => { techCardsRefs.current[index] = el; }}
                className="bg-white/90 backdrop-blur-lg border-white/60 shadow-xl overflow-hidden cursor-pointer transition-all duration-300"
                onMouseEnter={() => handleCardHover(techCardsRefs.current[index], true)}
                onMouseLeave={() => handleCardHover(techCardsRefs.current[index], false)}
              >
                <CardContent className="p-6 h-full flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <div className="text-white">
                      {card.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-slate-800">{card.title}</h4>
                    <p className="text-slate-600">{card.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance Metrics */}
          <Card
            ref={metricsCardRef}
            className="bg-white/90 backdrop-blur-lg border-white/60 shadow-xl overflow-hidden cursor-pointer transition-all duration-300"
            onMouseEnter={() => handleCardHover(metricsCardRef.current, true)}
            onMouseLeave={() => handleCardHover(metricsCardRef.current, false)}
          >
            <CardContent className="p-8">
              <h4 className="text-xl font-bold text-slate-800 mb-8 text-center">Performance Metrics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {performanceMetrics.map((metric, idx) => (
                  <div key={idx} className="text-center">
                    <div className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-slate-600 font-medium">{metric.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
