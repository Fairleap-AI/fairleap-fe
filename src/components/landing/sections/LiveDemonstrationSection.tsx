"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FiPlay,
  FiMonitor,
  FiSearch,
  FiHeart,
  FiMessageCircle,
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LiveDemonstrationSection() {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Demo section animation
    if (demoRef.current) {
      gsap.fromTo(
        demoRef.current,
        {
          y: 80,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: demoRef.current,
            start: "top 75%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Cards animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section id="demo" className="pt-20 bg-muted/30 mb-[600px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-left mb-16">
          <Badge
            variant="outline"
            className="mb-4 bg-background/20 backdrop-blur-sm border-black/20"
          >
            Live Demo
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Empowering Every Ride with{" "}
            <span className="text-primary">FairleapAI</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
            This integrated demo showcases how FairLeap AI transforms daily
            driving into a data-informed, wellness-supported journey for Gojek
            drivers.
          </p>
        </div>

        <div className="relative pb-[500px]">
          <div
            ref={demoRef}
            className="bg-background/30 backdrop-blur-xl border border-white/20 rounded-2xl p-8 aspect-video flex items-center justify-center relative z-0 shadow-2xl"
          >
            <div className="text-center">
              <div className="bg-background/40 backdrop-blur-sm rounded-full p-4 mb-6 inline-flex">
                <FiMonitor className="w-16 h-16 text-primary" />
              </div>
              <p className="text-muted-foreground mb-6 text-lg font-medium">
                Interactive Demo Coming Soon
              </p>
              <Button
                size="lg"
                className="bg-primary/90 backdrop-blur-sm hover:bg-primary"
              >
                <FiPlay className="mr-2" size={20} />
                Watch Demo Video
              </Button>
            </div>
          </div>

          <div className="absolute top-1/2 left-0 right-0 z-10">
            <Card
              ref={addToRefs}
              className="bg-background/20 backdrop-blur-xl shadow-2xl border border-black/20 relative z-10"
            >
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="rounded-xl overflow-hidden aspect-video">
                    <Image
                      src="/images/earnings-calculator.jpg"
                      alt="Earnings Calculator Interface"
                      width={500}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-6">
                    <div className="text-center lg:text-left">
                      <FiSearch className="w-10 h-10 text-primary mx-auto lg:mx-0 mb-4" />
                      <h3 className="text-3xl font-bold">
                        Earnings Calculator
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      Drivers enter their working hours, preferred area, and
                      number of working days. FairLeap AI predicts weekly income
                      with a confidence score, displayed through real-time
                      graphs and location-based heatmaps.
                    </p>
                    <Button variant="outline" size="lg">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              ref={addToRefs}
              className="bg-background/20 backdrop-blur-xl shadow-2xl border border-black/20 relative z-20 -mt-16"
            >
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="rounded-xl overflow-hidden aspect-video">
                    <Image
                      src="/images/wellness check.jpg"
                      alt="Wellness Dashboard Interface"
                      width={500}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-6">
                    <div className="text-center lg:text-left">
                      <FiHeart className="w-10 h-10 text-primary mx-auto lg:mx-0 mb-4" />
                      <h3 className="text-3xl font-bold"> Wellness Check</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      Drivers select their current condition, and the system
                      responds with personalized wellness advice. A live health
                      score meter visualizes overall driver well-being to
                      encourage safer work habits.
                    </p>
                    <Button variant="outline" size="lg">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              ref={addToRefs}
              className="bg-background/20 backdrop-blur-xl shadow-2xl border border-black/20 relative z-30 -mt-16"
            >
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="rounded-xl overflow-hidden aspect-video">
                    <Image
                      src="/images/financial-assitant.jpg"
                      alt="Financial Assistant Chat Interface"
                      width={500}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-6">
                    <div className="text-center lg:text-left">
                      <FiMessageCircle className="w-10 h-10 text-primary mx-auto lg:mx-0 mb-4" />
                      <h3 className="text-3xl font-bold">
                        Financial Assistant
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      Drivers ask sample financial or insurance-related
                      questions. The AI chatbot responds instantly with relevant
                      and empathetic answers, using a conversational interface
                      powered by a large language model.
                    </p>
                    <Button variant="outline" size="lg">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
