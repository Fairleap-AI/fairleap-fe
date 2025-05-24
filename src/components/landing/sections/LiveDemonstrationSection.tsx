"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiPlay, FiMonitor, FiActivity } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LiveDemonstrationSection() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section id="demo" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          <Badge variant="outline" className="mb-4">
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

        <div className="relative space-y-12">
          <div className="bg-muted/50 rounded-2xl p-8 aspect-video flex items-center justify-center">
            <div className="text-center">
              <FiMonitor className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-6">
                Interactive Demo Coming Soon
              </p>
              <Button size="lg">
                <FiPlay className="mr-2" size={20} />
                Watch Demo Video
              </Button>
            </div>
          </div>

          <div ref={cardRef} className="relative -mt-20 z-10">
            <Card className="bg-background/95 backdrop-blur-sm shadow-2xl border-2">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <FiActivity className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Real-time Processing
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Watch as data flows through our fairness algorithms
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-4">
                    <FiActivity className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Bias Detection
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        See how our system identifies and corrects biases
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-4">
                    <FiActivity className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Transparent Results
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Every decision is explained with complete transparency
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center pt-8">
            <Button variant="outline" size="lg">
              Request Personal Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
