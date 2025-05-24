"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiTrendingUp, FiUsers, FiDollarSign, FiClock } from "react-icons/fi";

export default function ImpactMetricsSection() {
  const metrics = [
    {
      icon: <FiTrendingUp className="w-8 h-8 text-primary" />,
      value: "300%",
      label: "Average ROI Increase",
      description:
        "Organizations see significant returns within the first quarter",
    },
    {
      icon: <FiUsers className="w-8 h-8 text-primary" />,
      value: "1M+",
      label: "Lives Impacted",
      description: "Individuals benefiting from fairer systems worldwide",
    },
    {
      icon: <FiDollarSign className="w-8 h-8 text-primary" />,
      value: "$50B",
      label: "Economic Value Created",
      description: "Total economic impact generated through fair practices",
    },
    {
      icon: <FiClock className="w-8 h-8 text-primary" />,
      value: "90%",
      label: "Time Savings",
      description: "Reduction in manual processes and decision-making time",
    },
  ];

  const caseStudies = [
    {
      company: "Global Financial Corp",
      industry: "Finance",
      impact: "Reduced loan approval bias by 95%",
      metric: "40% increase in diverse approvals",
    },
    {
      company: "TechHire Solutions",
      industry: "HR Technology",
      impact: "Eliminated hiring discrimination",
      metric: "60% more diverse hires",
    },
    {
      company: "Healthcare Alliance",
      industry: "Healthcare",
      impact: "Improved patient outcome equity",
      metric: "25% better care distribution",
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
            Measurable <span className="text-primary">Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Real organizations achieving extraordinary results with FairLeap.
            See the transformative power of fair AI in action.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-8">
                <div className="mb-4 flex justify-center">{metric.icon}</div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {metric.value}
                </div>
                <div className="font-semibold mb-2">{metric.label}</div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Case Studies */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">
            Success Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-4">
                    {study.industry}
                  </Badge>
                  <h4 className="font-semibold text-lg mb-3">
                    {study.company}
                  </h4>
                  <p className="text-muted-foreground mb-4">{study.impact}</p>
                  <div className="text-2xl font-bold text-primary">
                    {study.metric}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-2xl p-8 border">
            <h3 className="text-2xl font-bold mb-4">Ready to Create Impact?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join these leading organizations in creating a more fair and
              equitable future.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">
                  Active Organizations
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">150</div>
                <div className="text-sm text-muted-foreground">
                  Countries Served
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">
                  Customer Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
