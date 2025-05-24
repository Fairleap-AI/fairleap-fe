"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FiArrowRight, FiClock, FiShield, FiZap } from "react-icons/fi";
import Image from "next/image";

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
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-2xl p-8 border shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">
                  Ready to Transform Your{" "}
                  <span className="text-primary">Driving Career?</span>
                </h2>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="text-lg px-8 py-6">
                    Get Early Access
                    <FiArrowRight className="ml-2" size={20} />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6"
                  >
                    Schedule Demo
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-start justify-start gap-6">
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
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md h-80 rounded-xl overflow-hidden">
                  <Image
                    src="/images/laptop.png"
                    alt="Transform your driving career"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
