"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  FiCpu,
  FiMessageSquare,
  FiBarChart,
  FiClock,
  FiShield,
  FiServer,
} from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TechnologyCredibilitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const foundationsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate title
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      // Animate logos with stagger
      tl.fromTo(
        logosRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );

      // Animate foundation cards
      tl.fromTo(
        foundationsRef.current?.children || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Animate stats
      tl.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const techFoundations = [
    {
      icon: <FiCpu className="w-6 h-6" />,
      title: "Machine Learning Models",
      description: "Smart predictions from behavioral data",
    },
    {
      icon: <FiMessageSquare className="w-6 h-6" />,
      title: "Natural Language Processing",
      description: "Understands driver queries in natural language",
    },
    {
      icon: <FiBarChart className="w-6 h-6" />,
      title: "Predictive Analytics",
      description: "Forecasts earnings, trends, and patterns",
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Real-time Data Processing",
      description: "Instant insights and system responsiveness",
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Bank-grade Security",
      description: "Encrypted data storage and transfer",
    },
    {
      icon: <FiServer className="w-6 h-6" />,
      title: "99.9% Uptime SLA",
      description: "Reliable infrastructure with enterprise-grade availability",
    },
  ];

  return (
    <section ref={sectionRef} id="technology" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Technology
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Backed by{" "}
            <span className="text-primary">World-Class Tech Stack</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Built on cutting-edge infrastructure with the highest security
            standards and compliance certifications.
          </p>
        </div>

        {/* Logos Section */}
        <div ref={logosRef} className="flex justify-center items-center gap-12 mb-16">
          <div className="grayscale opacity-60 hover:opacity-80 transition-opacity">
            <Image
              src="/icons/1.png"
              alt="Technology Logo 1"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
          <div className="grayscale opacity-60 hover:opacity-80 transition-opacity">
            <Image
              src="/icons/2.png"
              alt="Technology Logo 2"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
          <div className="grayscale opacity-60 hover:opacity-80 transition-opacity">
            <Image
              src="/icons/3.png"
              alt="Technology Logo 3"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
        </div>

        {/* Key Technology Foundations */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold mb-8">
            Key Technology Foundations
          </h3>
          <div ref={foundationsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techFoundations.map((tech, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-primary mb-4 flex justify-center">
                    {tech.icon}
                  </div>
                  <h4 className="font-semibold mb-2">{tech.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {tech.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="text-center">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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
