"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FiAlertTriangle, FiTrendingDown, FiUsers } from "react-icons/fi";

export default function ProblemStatementSection() {
  const problems = [
    {
      icon: <FiAlertTriangle className="w-8 h-8 text-destructive" />,
      title: "Systemic Bias",
      description:
        "Traditional systems perpetuate unfair advantages and discrimination, leaving countless individuals and businesses behind.",
    },
    {
      icon: <FiTrendingDown className="w-8 h-8 text-destructive" />,
      title: "Inefficient Processes",
      description:
        "Manual workflows and outdated technologies create bottlenecks that waste time, resources, and opportunities.",
    },
    {
      icon: <FiUsers className="w-8 h-8 text-destructive" />,
      title: "Limited Accessibility",
      description:
        "Complex interfaces and high barriers to entry prevent small businesses and individuals from accessing powerful tools.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            The Problem We're <span className="text-destructive">Solving</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Current industry standards create inequality and inefficiency. It's
            time for a fundamental shift towards fairness and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <Card
              key={index}
              className="border-destructive/20 hover:border-destructive/40 transition-colors"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">{problem.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{problem.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-destructive mb-2">
                65%
              </div>
              <div className="text-muted-foreground">
                of businesses report unfair competitive disadvantages
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-destructive mb-2">
                $2.4T
              </div>
              <div className="text-muted-foreground">
                annual global economic loss due to inefficiencies
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-destructive mb-2">
                40%
              </div>
              <div className="text-muted-foreground">
                of potential remains untapped due to access barriers
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
