"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiUpload, FiSettings, FiZap, FiCheckCircle } from "react-icons/fi";

export default function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      icon: <FiUpload className="w-8 h-8 text-primary" />,
      title: "Connect Your Data",
      description:
        "Securely integrate your existing systems and data sources with our platform using our simple API or drag-and-drop interface.",
      details: [
        "One-click integrations",
        "Enterprise security",
        "Real-time synchronization",
      ],
    },
    {
      step: 2,
      icon: <FiSettings className="w-8 h-8 text-primary" />,
      title: "Configure Fairness Rules",
      description:
        "Define your specific fairness criteria and business rules. Our AI learns and adapts to your unique requirements.",
      details: [
        "Custom rule engine",
        "Bias detection",
        "Compliance frameworks",
      ],
    },
    {
      step: 3,
      icon: <FiZap className="w-8 h-8 text-primary" />,
      title: "AI Processing",
      description:
        "Our advanced algorithms process your data while continuously monitoring for bias and ensuring fair outcomes.",
      details: [
        "Real-time processing",
        "Continuous monitoring",
        "Automated optimization",
      ],
    },
    {
      step: 4,
      icon: <FiCheckCircle className="w-8 h-8 text-primary" />,
      title: "Get Fair Results",
      description:
        "Receive transparent, explainable results with detailed audit trails and actionable insights for your business.",
      details: ["Detailed reports", "Actionable insights", "Full transparency"],
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Process
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Our streamlined process makes it easy to implement fair AI solutions
            in your organization, regardless of your technical expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        {step.icon}
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        Step {step.step}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-center text-sm"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-primary/20"></div>
              )}
            </div>
          ))}
        </div>

        {/* Process Timeline Visual */}
        <div className="mt-16 lg:hidden">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {steps.map((_, index) => (
                <React.Fragment key={index}>
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-12 h-0.5 bg-primary/20"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-2xl p-8 border">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join thousands of organizations already using FairLeap to create
              more equitable and efficient processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5 min</div>
                <div className="text-sm text-muted-foreground">Setup time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">30 days</div>
                <div className="text-sm text-muted-foreground">Free trial</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99%</div>
                <div className="text-sm text-muted-foreground">
                  Satisfaction rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
