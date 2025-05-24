"use client";

import React, { useRef, useEffect, useState } from "react";import { Button } from "@/components/ui/button";import { FiArrowRight, FiPlay, FiShield, FiTrendingUp, FiUsers, FiStar, FiZap } from "react-icons/fi";import { gsap } from "gsap";import ShinyText from "@/components/shine-effect";

export default function HeroSection() {
    const heroRef = useRef<HTMLElement>(null);  const titleRef = useRef<HTMLHeadingElement>(null);  const subtitleRef = useRef<HTMLParagraphElement>(null);  const statsRef = useRef<HTMLDivElement>(null);  const trustRef = useRef<HTMLDivElement>(null);  const floatingCardsRef = useRef<HTMLDivElement>(null);  const backgroundRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });  const [isInitialized, setIsInitialized] = useState(false);

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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 pb-20"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`,
      }}
    >
            {/* Clean Dynamic Background */}      <div ref={backgroundRef} className="absolute inset-0">        <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl" style={{           background: 'linear-gradient(to bottom right, rgba(0, 170, 19, 0.2), rgba(0, 122, 14, 0.1))'        }}></div>        <div className="absolute top-40 right-32 w-96 h-96 rounded-full blur-3xl" style={{          background: 'linear-gradient(to bottom left, rgba(30, 136, 229, 0.15), rgba(0, 191, 165, 0.1))'        }}></div>        <div className="absolute bottom-32 left-1/3 w-80 h-80 rounded-full blur-3xl" style={{          background: 'linear-gradient(to top right, rgba(255, 107, 53, 0.15), rgba(245, 158, 11, 0.1))'        }}></div>

                {/* Subtle animated grid */}        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20"></div>      </div>      {/* Floating Cards */}      <div ref={floatingCardsRef} className="absolute inset-0 pointer-events-none">        <div className="absolute top-32 left-16 bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-4 shadow-xl">          <div className="flex items-center gap-2">            <FiTrendingUp className="w-5 h-5" style={{ color: '#00AA13' }} />            <span className="text-sm font-semibold text-slate-700">+₹2,340 today</span>          </div>        </div>        <div className="absolute top-48 right-20 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-4 shadow-xl">          <div className="flex items-center gap-2">            <FiZap className="w-5 h-5" style={{ color: '#2C3E50' }} />            <span className="text-sm font-semibold text-slate-700">Peak hours: 6-9 PM</span>          </div>        </div>      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
                    {/* Trust Badge - Visible dari awal tanpa animation heavy */}          <div            ref={trustRef}            className={`inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-green-100 border border-green-200/50 px-6 py-3 rounded-full text-sm font-semibold mb-8 mt-8 shadow-lg backdrop-blur-sm transition-opacity duration-700 ${              isInitialized ? 'opacity-100' : 'opacity-0'            }`}            style={{ color: '#00AA13' }}          >            <div className="flex items-center gap-1">              {[...Array(5)].map((_, i) => (                <FiStar key={i} className="w-3 h-3 fill-current text-current" />              ))}            </div>            <span>Trusted by 50,000+ drivers</span>            <FiShield className="w-4 h-4" />          </div>

          {/* Headline - Stable dari awal */}
          <h1 
            ref={titleRef}
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
            ref={subtitleRef}
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

                    {/* CTA Buttons - Simple and clean */}          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-700 ${
              isInitialized ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {/* Primary CTA - Start Prediction */}
            <Button
              size="lg"
              className="relative text-lg px-12 py-7 text-white shadow-2xl hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 rounded-2xl font-semibold min-w-[280px]"
              style={{                 
                background: 'linear-gradient(to right, #00AA13, #007A0E)',
                boxShadow: '0 25px 50px -12px rgba(0, 170, 19, 0.25)'
              }}
            >
                            <span className="flex items-center justify-center">                <div                  className="text-white transition-transform duration-300 hover:translate-x-1 animate-shine"                  style={{                    backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.8) 60%)',                    backgroundSize: '200% 100%',                    WebkitBackgroundClip: 'text',                    backgroundClip: 'text',                    animationDuration: '3s',                  }}                >                  Start Your Prediction                </div>                <FiArrowRight className="ml-3 transition-all duration-300 hover:translate-x-2 hover:scale-110" size={20} />              </span>
            </Button>

            {/* Secondary CTA - Live Demo */}
            <Button
              size="lg"
              variant="outline"
              className="relative text-lg px-12 py-7 bg-white/90 backdrop-blur-sm border-2 border-slate-300 text-slate-700 shadow-xl hover:shadow-2xl hover:bg-white hover:border-slate-400 hover:text-slate-800 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 rounded-2xl font-semibold min-w-[280px]"
            >
                             <span className="flex items-center justify-center">                 <FiPlay className="mr-3 transition-all duration-300 hover:scale-110" size={20} />                 <div                   className="text-slate-700 transition-transform duration-300 hover:translate-x-1 animate-shine"                   style={{                     backgroundImage: 'linear-gradient(120deg, rgba(71, 85, 105, 0.7) 40%, rgba(71, 85, 105, 1) 50%, rgba(71, 85, 105, 0.7) 60%)',                     backgroundSize: '200% 100%',                     WebkitBackgroundClip: 'text',                     backgroundClip: 'text',                     animationDuration: '4s',                   }}                 >                   See Live Demo                 </div>               </span>
            </Button>
          </div>

          {/* Trust Indicators - Staggered appearance */}
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Trusted Drivers - Primary Green */}
            <div 
              className={`group relative bg-gradient-to-br from-white to-green-50 backdrop-blur-sm border border-green-200 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 ${
                isInitialized ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl shadow-lg">
                    <FiUsers className="w-6 h-6" style={{ color: '#00AA13' }} />
                  </div>
                </div>
                <div className="text-4xl lg:text-5xl font-black mb-2" style={{ 
                  background: 'linear-gradient(to right, #00AA13, #007A0E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  50,000+
                </div>
                <div className="text-slate-600 font-semibold text-lg">Trusted Drivers</div>
                <div className="text-sm text-slate-500 mt-2">Growing community</div>
              </div>
            </div>

            {/* Prediction Accuracy - Trust Blue */}
            <div 
              className={`group relative bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm border border-blue-200 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 ${
                isInitialized ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg">
                    <FiTrendingUp className="w-6 h-6" style={{ color: '#1E88E5' }} />
                  </div>
                </div>
                <div className="text-4xl lg:text-5xl font-black mb-2" style={{ 
                  background: 'linear-gradient(to right, #1E88E5, #1565C0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  95%
                </div>
                <div className="text-slate-600 font-semibold text-lg">Prediction Accuracy</div>
                <div className="text-sm text-slate-500 mt-2">AI-powered precision</div>
              </div>
            </div>

            {/* Earnings Increase - Warm Orange */}
            <div 
              className={`group relative bg-gradient-to-br from-white to-orange-50 backdrop-blur-sm border border-orange-200 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 ${
                isInitialized ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl shadow-lg">
                    <FiZap className="w-6 h-6" style={{ color: '#FF6B35' }} />
                  </div>
                </div>
                <div className="text-4xl lg:text-5xl font-black mb-2" style={{ 
                  background: 'linear-gradient(to right, #FF6B35, #E55A2B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  ₹2.5M+
                </div>
                <div className="text-slate-600 font-semibold text-lg">Average Monthly Earnings Increase</div>
                <div className="text-sm text-slate-500 mt-2">Proven results</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth bottom fade untuk transisi ke section berikutnya */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
      
      {/* Modern scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
