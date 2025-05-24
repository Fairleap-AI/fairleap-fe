"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { gsap } from "gsap";
import {  FiShoppingCart,  FiTarget,  FiTrendingUp,  FiBarChart,} from "react-icons/fi";

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

export default function ImpactMetricsSection() {
  const { ref: sectionRef, isInView } = useInView(0.1);
  const headerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const featureCardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const features = [
    {
      id: "expense-analysis",
      title: "Expense Analysis",
      description: "Expense analysis enhances budgeting, cuts costs, boosts efficiency, optimizing resources and financial health indispensably.",
      icon: <FiShoppingCart className="w-6 h-6" />,
      gradient: "from-emerald-400 to-emerald-600",
      position: "top-left"
    },
    {
      id: "budget-tracking", 
      title: "Budget Tracking",
      description: "Budget tracking ensures goals, controlled spending, and offers flexibility for optimal financial management of income and expenses.",
      icon: <FiTarget className="w-6 h-6" />,
      gradient: "from-emerald-400 to-emerald-600",
      position: "bottom-left"
    },
    {
      id: "trend-forecasting",
      title: "Trend Forecasting", 
      description: "Trend forecasting predicts future trends using past data, helping businesses adapt strategies for market changes and consumer preferences.",
      icon: <FiTrendingUp className="w-6 h-6" />,
      gradient: "from-emerald-400 to-emerald-600",
      position: "top-right"
    },
    {
      id: "comparative-analysis",
      title: "Comparative Analysis",
      description: "Comparative analysis evaluates entity similarities, differences, gains insights, informs decisions, and identifies strengths and weaknesses.",
      icon: <FiBarChart className="w-6 h-6" />,
      gradient: "from-emerald-400 to-emerald-600", 
      position: "bottom-right"
    }
  ];

  // GSAP Animations
  useEffect(() => {
    if (!isInView || animationCompleted) return;

    const tl = gsap.timeline({
      onComplete: () => setAnimationCompleted(true)
    });

    // Set initial states
    gsap.set(headerRef.current, {
      opacity: 0,
      y: 50
    });

    gsap.set(mockupRef.current, {
      opacity: 0,
      scale: 0.8,
      y: 100
    });

    gsap.set(featureCardsRefs.current, {
      opacity: 0,
      scale: 0.9,
      y: 80
    });

    // Animation timeline
    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(mockupRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.4")
    .to(featureCardsRefs.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    }, "-=0.8");

    // Floating animation for mockup
    gsap.to(mockupRef.current, {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 2
    });

  }, [isInView, animationCompleted]);

  // Card Hover Animations
  const handleCardHover = (ref: HTMLDivElement | null, isEntering: boolean) => {
    if (!ref) return;

    if (isEntering) {
      gsap.to(ref, {
        scale: 1.05,
        y: -10,
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
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="impact" 
      className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full opacity-15 blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-200 rounded-full opacity-10 blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-6 border-emerald-300 text-emerald-700 bg-emerald-100/80 backdrop-blur-sm">
            Impact & Results
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Real Impact <span className="text-primary">Real Drivers</span>
          </h2>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            These metrics illustrate FairLeap AI's measurable impact across financial management, 
            helping drivers optimize their earnings and improve financial stability.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side Features */}
            <div className="lg:col-span-3 space-y-6">
              {features.slice(0, 2).map((feature, index) => (
                <Card
                  key={feature.id}
                  ref={el => { featureCardsRefs.current[index] = el; }}
                  className="bg-white/90 backdrop-blur-lg border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => handleCardHover(featureCardsRefs.current[index], true)}
                  onMouseLeave={() => handleCardHover(featureCardsRefs.current[index], false)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 text-slate-800">{feature.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Center Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <div ref={mockupRef} className="relative">
                <Image
                  src="/MockStatistic.png"
                  alt="FairLeap AI Statistics Mockup"
                  width={400}
                  height={700}
                  className="w-auto h-[600px] max-w-full object-contain drop-shadow-2xl"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-[3rem] blur-xl -z-10 scale-110"></div>
              </div>
            </div>

            {/* Right Side Features */}
            <div className="lg:col-span-3 space-y-6">
              {features.slice(2, 4).map((feature, index) => (
                <Card
                  key={feature.id}
                  ref={el => { featureCardsRefs.current[index + 2] = el; }}
                  className="bg-white/90 backdrop-blur-lg border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => handleCardHover(featureCardsRefs.current[index + 2], true)}
                  onMouseLeave={() => handleCardHover(featureCardsRefs.current[index + 2], false)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 text-slate-800">{feature.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom Stats */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">+32%</div>
              <div className="text-sm text-slate-600 font-medium">Income Growth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">82%</div>
              <div className="text-sm text-slate-600 font-medium">Driver Retention</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">68%</div>
              <div className="text-sm text-slate-600 font-medium">Better Well-being</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">Rp12M</div>
              <div className="text-sm text-slate-600 font-medium">Savings Potential</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
