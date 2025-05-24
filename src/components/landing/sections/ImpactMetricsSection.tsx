"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiTrendingUp, FiUsers, FiHeart, FiDollarSign } from "react-icons/fi";

export default function ImpactMetricsSection() {
  const metrics = [
    {
      icon: <FiTrendingUp className="w-8 h-8 text-green-600" />,
      title: "📈 Income Growth",
      value: "+32%",
      subtitle: "average weekly increase",
      description:
        "Drivers optimized their schedules using earnings predictions — boosting income from Rp850K to Rp1.12M weekly.",
    },
    {
      icon: <FiUsers className="w-8 h-8 text-blue-600" />,
      title: "🔄 Driver Retention",
      value: "82%",
      subtitle: "more likely to stay on-platform",
      description:
        "Reduced app-switching and improved trust through transparent earnings and wellness support.",
    },
    {
      icon: <FiHeart className="w-8 h-8 text-purple-600" />,
      title: "🧘 Work-Life Balance",
      value: "68%",
      subtitle: "report improved daily well-being",
      description:
        "With real-time fatigue alerts and actionable wellness tips, drivers reduced burnout and improved rest quality.",
    },
    {
      icon: <FiDollarSign className="w-8 h-8 text-orange-600" />,
      title: "💰 Financial Resilience",
      value: "Rp12M",
      subtitle: "in savings potential",
      description:
        "Drivers gained access to financial tips, insurance clarity, and budgeting tools — leading to better financial planning and early-stage investments.",
    },
  ];

  return (
    <section id="impact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Impact & Results
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Real Impact <span className="text-primary">Real Drivers</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            These simulated metrics illustrate FairLeap AI's measurable impact
            across four key areas: income optimization, driver retention,
            well-being, and financial stability. Designed with real drivers in
            mind, every feature is built to deliver value at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  {metric.icon}
                  <h3 className="text-xl font-bold">{metric.title}</h3>
                </div>
                <div className="mb-2">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {metric.subtitle}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          ))}
                </div>
      </div>
    </section>
  );
}
