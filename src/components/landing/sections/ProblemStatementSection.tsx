"use client";

import React, { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FiPieChart,
  FiBatteryCharging,
  FiEyeOff,
  FiTrendingDown,
  FiAlertTriangle,
  FiClock,
} from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ProblemStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      if (cardsRef.current?.children) {
        gsap.fromTo(
          cardsRef.current.children,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animate statistics
      if (statsRef.current?.children) {
        gsap.fromTo(
          statsRef.current.children,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const problems = [
    {
      icon: <FiPieChart className="w-8 h-8" style={{ color: "#EF4444" }} />,
      title: "Income Uncertainty",
      stat: "73%",
      subtitle: "of drivers can't predict next week's earnings",
      description:
        "Unpredictable surge pricing and incentives make financial planning impossible",
      visual: (
        <div className="mt-4 h-20 bg-gradient-to-r from-red-100 to-red-50 rounded-lg p-3 relative overflow-hidden">
          <div className="flex items-end justify-between h-full">
            <div className="w-2 bg-red-400 h-3/4 rounded-sm animate-pulse"></div>
            <div className="w-2 bg-red-600 h-1/2 rounded-sm animate-pulse delay-100"></div>
            <div className="w-2 bg-red-500 h-4/5 rounded-sm animate-pulse delay-200"></div>
            <div className="w-2 bg-red-300 h-1/3 rounded-sm animate-pulse delay-300"></div>
            <div className="w-2 bg-red-600 h-3/5 rounded-sm animate-pulse delay-400"></div>
          </div>
          <div className="absolute top-1 right-2 text-xs text-red-600 font-semibold">
            Volatile
          </div>
        </div>
      ),
    },
    {
      icon: (
        <FiBatteryCharging className="w-8 h-8" style={{ color: "#EF4444" }} />
      ),
      title: "Burnout & Fatigue",
      stat: "64%",
      subtitle: "work beyond safe driving hours",
      description:
        "No personalized rest recommendations lead to dangerous exhaustion",
      visual: (
        <div className="mt-4 h-20 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-3 relative">
          <div className="flex items-center justify-between h-full">
            <div className="flex-1">
              <div className="text-xs text-orange-700 mb-1">Energy Level</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full w-1/4 relative">
                  <div className="absolute -right-1 top-0 w-1 h-3 bg-red-700 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <FiAlertTriangle className="w-6 h-6 text-red-500 ml-2 animate-bounce" />
          </div>
          <div className="absolute bottom-1 right-2 text-xs text-red-600 font-semibold">
            Critical
          </div>
        </div>
      ),
    },
    {
      icon: <FiEyeOff className="w-8 h-8" style={{ color: "#EF4444" }} />,
      title: "Financial Blindness",
      stat: "81%",
      subtitle: "lack financial planning tools",
      description:
        "Limited access to financial services and planning tools keeps drivers struggling without clear financial visibility.",
      visual: (
        <div className="mt-4 h-20 bg-gradient-to-r from-gray-100 to-slate-100 rounded-lg p-3 relative">
          <div className="flex items-center justify-between h-full">
            <div className="flex-1">
              <div className="text-xs text-gray-700 mb-1">
                Financial Planning
              </div>
              <div className="flex justify-start space-x-1 mb-1">
                <div className="w-3 h-4 bg-gray-300 rounded-sm"></div>
                <div className="w-3 h-4 bg-gray-300 rounded-sm"></div>
                <div className="w-3 h-4 bg-gray-300 rounded-sm"></div>
              </div>
              <div className="text-xs text-gray-500">
                <div>Financial Future</div>
              </div>
            </div>
            <FiEyeOff className="w-6 h-6 text-gray-600 ml-2" />
          </div>
          <div className="absolute bottom-1 right-2 text-xs text-gray-600 font-semibold">
            No Data
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-red-50/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            The Daily Struggles of{" "}
            <span className="relative">
              {" "}
              <span
                className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent font-bold"
                style={{
                  background: "linear-gradient(to right, #dc2626, #b91c1c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {" "}
                Being a Driver{" "}
              </span>{" "}
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-red-200 via-red-300 to-red-200 -skew-x-12 opacity-70 rounded-full"></div>{" "}
            </span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Despite being the backbone of the gig economy, drivers face mounting
            challenges that traditional platforms fail to address. Real problems
            need real solutions.
          </p>
        </div>

        {/* Problem Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {problems.map((problem, index) => (
            <Card
              key={index}
              className="group relative border-red-200/50 hover:border-red-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white/80 backdrop-blur-sm overflow-hidden"
            >
              <CardContent className="p-8">
                {/* Icon & Title */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {problem.icon}
                  </div>
                  <div className="text-right">
                    <div
                      className="text-3xl font-black"
                      style={{ color: "#EF4444" }}
                    >
                      {problem.stat}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      of drivers
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  {problem.title}
                </h3>
                <p className="text-red-600 font-semibold text-sm mb-2">
                  {problem.subtitle}
                </p>
                <p className="text-slate-600 leading-relaxed text-sm mb-4">
                  {problem.description}
                </p>

                {/* Visual Element */}
                {problem.visual}

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-red-200/50 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              The Reality Check
            </h3>
            <p className="text-slate-600">
              These aren't just numbers—they represent real drivers struggling
              daily
            </p>
          </div>

          <div
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="group">
              <div className="flex items-center justify-center mb-3">
                <FiTrendingDown className="w-6 h-6 text-red-500 mr-2" />
                <div className="text-4xl font-black text-red-500">IDR 3.5M</div>
              </div>
              <div className="text-slate-600 font-medium">
                Monthly income lost due to poor shift planning
              </div>
            </div>
            <div className="group">
              <div className="flex items-center justify-center mb-3">
                <FiClock className="w-6 h-6 text-red-500 mr-2" />
                <div className="text-4xl font-black text-red-500">12hrs</div>
              </div>
              <div className="text-slate-600 font-medium">
                Average daily working hours (data GOTO Indonesia)
              </div>
            </div>
            <div className="group">
              <div className="flex items-center justify-center mb-3">
                <FiAlertTriangle className="w-6 h-6 text-red-500 mr-2" />
                <div className="text-4xl font-black text-red-500">76%</div>
              </div>
              <div className="text-slate-600 font-medium">
                GOTO drivers don't have a financial safety net
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200/50">
            <p className="text-lg font-semibold text-slate-800 mb-2">
              It's time for a change. Drivers deserve better.
            </p>
            <p className="text-slate-600">
              FairLeap is built to solve these exact problems with AI-powered
              insights and personalized support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
