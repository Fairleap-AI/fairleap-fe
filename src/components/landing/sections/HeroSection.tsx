"use client";

import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FiArrowRight, FiPlay, FiShield, FiTrendingUp, FiUsers, FiStar, FiZap } from "react-icons/fi";
import { gsap } from "gsap";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const ctaTextRef = useRef<HTMLSpanElement>(null);
  const ctaHoverTextRef = useRef<HTMLSpanElement>(null);
  const floatingCardsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Langsung set initialized untuk mencegah flicker
    setIsInitialized(true);

    const ctx = gsap.context(() => {
      // Set CTA text elements untuk hover effect
      if (ctaTextRef.current && ctaHoverTextRef.current) {
        gsap.set(ctaTextRef.current, { opacity: 1, y: 0 });
        gsap.set(ctaHoverTextRef.current, { opacity: 0, y: 20 });
      }

      // Background animation yang tidak mengganggu main content
      if (backgroundRef.current?.children) {
        gsap.set(backgroundRef.current.children, { scale: 0, opacity: 0 });
        gsap.to(backgroundRef.current.children, {
          scale: 1,
          opacity: 1,
          duration: 2,
          stagger: 0.3,
          ease: "power3.out",
          delay: 0.5
        });
      }

      // Floating cards dengan delay yang aman
      if (floatingCardsRef.current?.children) {
        gsap.set(floatingCardsRef.current.children, { opacity: 0, y: 100 });
        gsap.to(floatingCardsRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "power3.out",
          delay: 1
        });

        // Continuous floating setelah entrance
        gsap.to(floatingCardsRef.current.children, {
          y: "random(-20, 20)",
          x: "random(-10, 10)",
          rotation: "random(-5, 5)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.5,
          delay: 2.5
        });
      }

      // CTA Button hover animations
      const handleCTAHover = () => {
        if (ctaTextRef.current && ctaHoverTextRef.current) {
          gsap.to(ctaTextRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(ctaHoverTextRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            delay: 0.1
          });
        }
      };

      const handleCTALeave = () => {
        if (ctaTextRef.current && ctaHoverTextRef.current) {
          gsap.to(ctaHoverTextRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(ctaTextRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            delay: 0.1
          });
        }
      };

      // Add event listeners
      const button = ctaButtonRef.current;
      if (button) {
        button.addEventListener('mouseenter', handleCTAHover);
        button.addEventListener('mouseleave', handleCTALeave);

        return () => {
          button.removeEventListener('mouseenter', handleCTAHover);
          button.removeEventListener('mouseleave', handleCTALeave);
        };
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (    <section      ref={heroRef}      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 pb-20"      style={{        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`,      }}    >
      {/* Clean Dynamic Background */}
      <div ref={backgroundRef} className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-gradient-to-bl from-blue-400/15 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-gradient-to-tr from-orange-400/15 to-yellow-500/10 rounded-full blur-3xl"></div>

        {/* Subtle animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20"></div>
      </div>

      {/* Floating Cards */}
      <div ref={floatingCardsRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2">
            <FiTrendingUp className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-semibold text-slate-700">+₹2,340 today</span>
          </div>
        </div>

        <div className="absolute top-48 right-20 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2">
            <FiZap className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-slate-700">Peak hours: 6-9 PM</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Trust Badge - Visible dari awal tanpa animation heavy */}
          <div
            className={`inline-flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200/50 text-emerald-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 mt-8 shadow-lg backdrop-blur-sm transition-opacity duration-700 ${
              isInitialized ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="w-3 h-3 fill-emerald-500 text-emerald-500" />
              ))}
            </div>
            <span>Trusted by 50,000+ drivers</span>
            <FiShield className="w-4 h-4" />
          </div>

          {/* Headline - Stable dari awal */}
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[0.9] transition-all duration-700 ${
              isInitialized ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="relative inline-block">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                Predict Your
              </span>
            </div>
            <br />
            <div className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 bg-clip-text text-transparent relative">
                Earnings
              </span>
              <div className="absolute -bottom-4 left-0 right-0 h-4 bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200 -skew-x-12 opacity-70 rounded-full"></div>
            </div>
            <br />
            <div className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 bg-clip-text text-transparent">
                Protect Your
              </span>
            </div>
            <br />
            <div className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
                Wellbeing
              </span>
            </div>
            <br />
            <div className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                Prosper
              </span>
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                {" "}
                Together
              </span>
            </div>
          </h1>

          {/* Subheadline - Stable */}
          <p
            className={`text-lg md:text-xl lg:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed font-medium transition-all duration-700 ${
              isInitialized ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            AI-powered income forecasting and personalized wellness platform designed exclusively for{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent font-bold">
              GOTO drivers
            </span>
          </p>

          {/* CTA Button - Stable dengan hover smooth */}
          <div 
            className={`flex justify-center mb-12 transition-all duration-700 ${
              isInitialized ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <Button
              ref={ctaButtonRef}
              size="lg"
              className="relative text-lg px-12 py-7 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 transform hover:scale-105 rounded-2xl font-semibold overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <span ref={ctaTextRef} className="flex items-center">
                  Start Your Prediction
                  <FiArrowRight className="ml-3" size={20} />
                </span>
                <span ref={ctaHoverTextRef} className="absolute inset-0 flex items-center justify-center">
                  <FiPlay className="mr-3" size={20} />
                  See Live Demo
                </span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </Button>
          </div>

          {/* Trust Indicators - Staggered appearance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: FiUsers,
                value: "50,000+",
                label: "Trusted Drivers",
                sublabel: "Growing community",
                colors: "emerald",
                delay: "400ms"
              },
              {
                icon: FiTrendingUp,
                value: "95%",
                label: "Prediction Accuracy",
                sublabel: "AI-powered precision",
                colors: "blue",
                delay: "500ms"
              },
              {
                icon: FiZap,
                value: "₹2.5M+",
                label: "Average Monthly Earnings Increase",
                sublabel: "Proven results",
                colors: "orange",
                delay: "600ms"
              }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index}
                  className={`group relative bg-gradient-to-br from-white to-${stat.colors}-50/50 backdrop-blur-sm border border-${stat.colors}-200/50 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 ${
                    isInitialized ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: stat.delay }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-${stat.colors}-500/5 to-${stat.colors}-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`p-3 bg-gradient-to-br from-${stat.colors}-100 to-${stat.colors}-200 rounded-2xl shadow-lg`}>
                        <IconComponent className={`w-6 h-6 text-${stat.colors}-600`} />
                      </div>
                    </div>
                    <div className={`text-4xl lg:text-5xl font-black bg-gradient-to-r from-${stat.colors}-600 to-${stat.colors}-700 bg-clip-text text-transparent mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-slate-600 font-semibold text-lg">{stat.label}</div>
                    <div className="text-sm text-slate-500 mt-2">{stat.sublabel}</div>
                  </div>
                </div>
              );
            })}
                   </div>        </div>      </div>      {/* Smooth bottom fade untuk transisi ke section berikutnya */}      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>            {/* Modern scroll indicator */}      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">        <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center">          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>        </div>      </div>    </section>  );} 