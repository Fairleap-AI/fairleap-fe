"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiPlay, FiMonitor, FiActivity } from "react-icons/fi";

export default function LiveDemonstrationSection() {
  return (
    <section id="demo" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Live Demo
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            See FairLeap in <span className="text-primary">Action</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Experience the power of fair AI with our interactive demonstration.
            See real-time results and transparent decision-making processes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
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
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <FiActivity className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">Real-time Processing</h3>
                    <p className="text-muted-foreground text-sm">
                      Watch as data flows through our fairness algorithms
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <FiActivity className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">Bias Detection</h3>
                    <p className="text-muted-foreground text-sm">
                      See how our system identifies and corrects biases
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <FiActivity className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">Transparent Results</h3>
                    <p className="text-muted-foreground text-sm">
                      Every decision is explained with complete transparency
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="pt-4">
              <Button variant="outline" size="lg" className="w-full">
                Request Personal Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
