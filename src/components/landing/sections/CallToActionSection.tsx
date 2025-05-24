"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { gsap } from "gsap";
import { 
  FiArrowRight, 
  FiClock, 
  FiShield, 
  FiZap, 
  FiUsers,
  FiCheck,
  FiStar
} from "react-icons/fi";

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

export default function CallToActionSection() {
  const { ref: sectionRef, isInView } = useInView(0.1);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const statsCardRef = useRef<HTMLDivElement>(null);
  const primaryButtonRef = useRef<HTMLButtonElement>(null);
  const secondaryButtonRef = useRef<HTMLButtonElement>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const benefits = [
    {
      icon: <FiClock className="w-5 h-5" />,
      text: "5-minute setup",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FiShield className="w-5 h-5" />,
      text: "30-day free trial",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: <FiZap className="w-5 h-5" />,
      text: "No credit card required",
      gradient: "from-purple-500 to-pink-500"
    },
  ];

  const stats = [
    {
      value: "10,000+",
      label: "Organizations Trust Us",
      icon: <FiUsers className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      value: "99.9%",
      label: "Uptime Guarantee", 
      icon: <FiCheck className="w-6 h-6" />,
      gradient: "from-emerald-500 to-green-600"
    },
    {
      value: "24/7",
      label: "Expert Support",
      icon: <FiStar className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-600"
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
      y: 80,
      scale: 0.95
    });

    gsap.set(ctaButtonsRef.current, {
      opacity: 0,
      y: 60
    });

    gsap.set(benefitsRef.current, {
      opacity: 0,
      y: 40
    });

    gsap.set(statsCardRef.current, {
      opacity: 0,
      y: 100,
      scale: 0.9
    });

    // Animation timeline
    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out"
    })
    .to(ctaButtonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .to(benefitsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to(statsCardRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6");

    // Floating animation for primary button
    gsap.to(primaryButtonRef.current, {
      y: -3,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 3
    });

  }, [isInView, animationCompleted]);

  // Button Hover Animations
  const handleButtonHover = (ref: HTMLElement | null, isEntering: boolean, isPrimary = false) => {
    if (!ref) return;

    if (isEntering) {
      gsap.to(ref, {
        scale: 1.05,
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });
      
      if (isPrimary) {
        gsap.to(ref, {
          boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    } else {
      gsap.to(ref, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      if (isPrimary) {
        gsap.to(ref, {
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-emerald-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-15 blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-purple-200 rounded-full opacity-10 blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-blue-500/5"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div ref={headerRef} className="text-center mb-12">
            <Badge variant="outline" className="mb-6 border-emerald-300 text-emerald-700 bg-emerald-100/80 backdrop-blur-sm">
              <FiStar className="w-4 h-4 mr-2" />
              Get Started Today
            </Badge>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Ready to Transform Your Organization with{" "}
              <span className="text-primary">Fair AI?</span>
            </h2>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Join thousands of forward-thinking organizations creating a more
              equitable future. Start your journey towards fairness today.
            </p>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaButtonsRef} className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button 
              ref={primaryButtonRef}
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-xl group transition-all duration-300"
              onMouseEnter={() => handleButtonHover(primaryButtonRef.current, true, true)}
              onMouseLeave={() => handleButtonHover(primaryButtonRef.current, false, true)}
            >
              Start Free Trial
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
                        <Button               ref={secondaryButtonRef}              variant="outline"               size="lg"               className="text-lg px-8 py-6 border-2 border-slate-300 text-slate-700 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"              onMouseEnter={() => handleButtonHover(secondaryButtonRef.current, true)}              onMouseLeave={() => handleButtonHover(secondaryButtonRef.current, false)}            >              Schedule Demo            </Button>
          </div>

          {/* Benefits */}
          <div ref={benefitsRef} className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/40"
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-lg`}>
                  <div className="text-white">
                    {benefit.icon}
                  </div>
                </div>
                <span className="font-medium text-slate-700">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Stats Card */}
          <Card
            ref={statsCardRef}
            className="bg-white/90 backdrop-blur-lg border-white/60 shadow-2xl overflow-hidden"
          >
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg mx-auto`}>
                      <div className="text-white">
                        {stat.icon}
                      </div>
                    </div>
                    <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-slate-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Footer Text */}
          <div className="text-center mt-8">
            <p className="text-sm text-slate-500">
              Start building fairer systems today. No commitment, cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
