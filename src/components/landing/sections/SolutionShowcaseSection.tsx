"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FiZap,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiCpu,
  FiGlobe,
} from "react-icons/fi";

export default function SolutionShowcaseSection() {
  const solutions = [
    {
      icon: <FiZap className="w-8 h-8 text-primary" />,
      title: "AI-Powered Automation",
      description:
        "Streamline processes with intelligent automation that adapts to your specific needs while maintaining fairness.",
      benefits: [
        "90% faster processing",
        "Zero bias algorithms",
        "24/7 operation",
      ],
    },
    {
      icon: <FiShield className="w-8 h-8 text-primary" />,
      title: "Transparent Decision Making",
      description:
        "Every decision is traceable and explainable, ensuring accountability and building trust.",
      benefits: ["Full audit trails", "Explainable AI", "Compliance ready"],
    },
    {
      icon: <FiTrendingUp className="w-8 h-8 text-primary" />,
      title: "Predictive Analytics",
      description:
        "Anticipate trends and opportunities with advanced analytics that level the playing field.",
      benefits: ["Market insights", "Risk assessment", "Growth optimization"],
    },
    {
      icon: <FiUsers className="w-8 h-8 text-primary" />,
      title: "Inclusive Access",
      description:
        "Democratize powerful tools with intuitive interfaces designed for users of all backgrounds.",
      benefits: [
        "User-friendly design",
        "Multi-language support",
        "Accessibility first",
      ],
    },
    {
      icon: <FiCpu className="w-8 h-8 text-primary" />,
      title: "Scalable Infrastructure",
      description:
        "Grow without limits on cloud infrastructure that scales with your success.",
      benefits: ["Auto-scaling", "Global availability", "99.9% uptime"],
    },
    {
      icon: <FiGlobe className="w-8 h-8 text-primary" />,
      title: "Global Integration",
      description:
        "Connect with existing systems and workflows seamlessly across borders and platforms.",
      benefits: ["API-first design", "Cross-platform", "Real-time sync"],
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Solution
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Transforming Industries with{" "}
            <span className="text-primary">Fair AI</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Our comprehensive platform addresses every aspect of fairness and
            efficiency, creating opportunities for everyone to succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-8">
                <div className="mb-6 flex justify-center">{solution.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-center">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {solution.description}
                </p>
                <ul className="space-y-2">
                  {solution.benefits.map((benefit, benefitIndex) => (
                    <li
                      key={benefitIndex}
                      className="flex items-center text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Why Choose FairLeap?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're not just another AI platform. We're a movement towards
              creating a more equitable and efficient future for all.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Bias-Free</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50x</div>
                <div className="text-sm text-muted-foreground">Faster ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
