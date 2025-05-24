"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FiShield,
  FiCpu,
  FiCloud,
  FiLock,
  FiGlobe,
  FiZap,
} from "react-icons/fi";

export default function TechnologyCredibilitySection() {
  const technologies = [
    { name: "Advanced ML Algorithms", icon: <FiCpu className="w-6 h-6" /> },
    { name: "Cloud Infrastructure", icon: <FiCloud className="w-6 h-6" /> },
    { name: "Enterprise Security", icon: <FiLock className="w-6 h-6" /> },
    { name: "Global CDN", icon: <FiGlobe className="w-6 h-6" /> },
    { name: "Real-time Processing", icon: <FiZap className="w-6 h-6" /> },
    { name: "ISO 27001 Compliant", icon: <FiShield className="w-6 h-6" /> },
  ];

  const certifications = [
    "ISO 27001",
    "SOC 2 Type II",
    "GDPR Compliant",
    "HIPAA Ready",
    "FedRAMP",
    "PCI DSS",
  ];

  return (
    <section id="technology" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Technology
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Enterprise-Grade <span className="text-primary">Technology</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Built on cutting-edge infrastructure with the highest security
            standards and compliance certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {technologies.map((tech, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-primary mb-4 flex justify-center">
                  {tech.icon}
                </div>
                <h3 className="font-semibold">{tech.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold mb-8">
            Certifications & Compliance
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-2">
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-8 border text-center">
          <h3 className="text-2xl font-bold mb-4">
            Trusted by Industry Leaders
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Fortune 500 companies and government agencies rely on our platform
            for their most critical AI applications.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">99.99%</div>
              <div className="text-sm text-muted-foreground">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">&lt;50ms</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">256-bit</div>
              <div className="text-sm text-muted-foreground">Encryption</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
