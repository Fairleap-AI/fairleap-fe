"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiTrendingUp, FiUsers, FiHeart, FiDollarSign } from "react-icons/fi";
import Image from "next/image";

export default function ImpactMetricsSection() {
  const metrics = [
    {
      icon: <FiTrendingUp className="w-6 h-6 text-green-600" />,
      title: "Expense Analysis",
      description:
        "Expense analysis enhances budgeting, cuts costs, boosts efficiency, optimizing resources and financial health indispensably.",
      position: "top-left",
    },
    {
      icon: <FiUsers className="w-6 h-6 text-green-600" />,
      title: "Trend Forecasting",
      description:
        "Trend forecasting predicts future trends using past data, helping businesses adapt strategies for market changes and consumer preferences.",
      position: "top-right",
    },
    {
      icon: <FiHeart className="w-6 h-6 text-green-600" />,
      title: "Budget Tracking",
      description:
        "Budget tracking ensures goals, controlled spending, and offers flexibility for optimal financial management of income and expenses.",
      position: "bottom-left",
    },
    {
      icon: <FiDollarSign className="w-6 h-6 text-green-600" />,
      title: "Comparative Analysis",
      description:
        "Comparative analysis evaluates entity similarities, differences, gains insights, informs decisions, and identifies strengths and weaknesses.",
      position: "bottom-right",
    },
  ];

  return (
    <section id="impact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Impact & Results
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Real Impact <span className="text-primary">Real Drivers</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            These simulated metrics illustrate FairLeap AI's measurable impact
            across four key areas: income optimization, driver retention,
            well-being, and financial stability. Designed with real drivers in
            mind, every feature is built to deliver value at scale.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-4 items-center min-h-[700px]">
            {" "}
            {/* Left Column */}{" "}
            <div className="space-y-4">
              {" "}
              {/* Expense Analysis - Top Left */}{" "}
              <div className="mb-8">
                {" "}
                <Card className="hover:shadow-lg transition-shadow duration-300 bg-white shadow-sm">
                  {" "}
                  <CardContent className="p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="p-3 bg-green-100 rounded-full">
                        {metrics[0].icon}
                      </div>
                      <h3 className="text-lg font-semibold">
                        {metrics[0].title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {metrics[0].description}
                    </p>
                  </CardContent>
                </Card>
              </div>
              {/* Budget Tracking - Bottom Left */}{" "}
              <div>
                {" "}
                <Card className="hover:shadow-lg transition-shadow duration-300 bg-white shadow-sm">
                  {" "}
                  <CardContent className="p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="p-3 bg-green-100 rounded-full">
                        {metrics[2].icon}
                      </div>
                      <h3 className="text-lg font-semibold">
                        {metrics[2].title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {metrics[2].description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* Center Column - Phone */}{" "}
            <div className="flex justify-center items-end">
              {" "}
              <div className="relative">
                {" "}
                {/* Green circular background */}{" "}
                <div className="absolute inset-0 flex items-center justify-center">
                  {" "}
                  <div className="w-96 h-96 bg-green-200 rounded-full opacity-30"></div>{" "}
                </div>{" "}
                {/* Phone Image */}{" "}
                <div className="relative z-10 w-96">
                  {" "}
                  <Image
                    src="/images/phone.png"
                    alt="Mobile App Interface"
                    width={400}
                    height={800}
                    className="w-full h-auto object-contain drop-shadow-2xl rounded-3xl"
                    priority
                  />{" "}
                </div>{" "}
              </div>{" "}
            </div>
            {/* Right Column */}{" "}
            <div className="space-y-4">
              {" "}
              {/* Trend Forecasting - Top Right */}{" "}
              <div className="mb-8">
                {" "}
                <Card className="hover:shadow-lg transition-shadow duration-300 bg-white shadow-sm">
                  {" "}
                  <CardContent className="p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="p-3 bg-green-100 rounded-full">
                        {metrics[1].icon}
                      </div>
                      <h3 className="text-lg font-semibold">
                        {metrics[1].title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {metrics[1].description}
                    </p>
                  </CardContent>
                </Card>
              </div>
              {/* Comparative Analysis - Bottom Right */}{" "}
              <div>
                {" "}
                <Card className="hover:shadow-lg transition-shadow duration-300 bg-white shadow-sm">
                  {" "}
                  <CardContent className="p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="p-3 bg-green-100 rounded-full">
                        {metrics[3].icon}
                      </div>
                      <h3 className="text-lg font-semibold">
                        {metrics[3].title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {metrics[3].description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Phone Image for Mobile */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-green-200 rounded-full opacity-30"></div>
              </div>
              <div className="relative z-10 w-48">
                <Image
                  src="/images/phone.png"
                  alt="Mobile App Interface"
                  width={240}
                  height={480}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Cards for Mobile */}
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300 bg-white shadow-sm"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-full">
                    {metric.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{metric.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
