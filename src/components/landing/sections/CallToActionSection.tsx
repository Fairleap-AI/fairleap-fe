"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FiArrowRight, FiClock, FiShield, FiZap } from "react-icons/fi";

export default function CallToActionSection() {
  const benefits = [
    {
      icon: <FiClock className="w-5 h-5" />,
      text: "5-minute setup",
    },
    {
      icon: <FiShield className="w-5 h-5" />,
      text: "30-day free trial",
    },
    {
      icon: <FiZap className="w-5 h-5" />,
      text: "No credit card required",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Organization with{" "}
            <span className="text-primary">Fair AI?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Join thousands of forward-thinking organizations creating a more
            equitable future. Start your journey towards fairness today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Free Trial
              <FiArrowRight className="ml-2" size={20} />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Schedule Demo
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-muted-foreground"
              >
                <div className="text-primary">{benefit.icon}</div>
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-2xl p-8 border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">
                  10,000+
                </div>
                <div className="text-muted-foreground">
                  Organizations Trust Us
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">
                  99.9%
                </div>
                <div className="text-muted-foreground">Uptime Guarantee</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Expert Support</div>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            Start building fairer systems today. No commitment, cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
