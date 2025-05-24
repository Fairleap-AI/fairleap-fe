"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FiStar } from "react-icons/fi";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Chief Technology Officer",
      company: "Global Finance Corp",
      content:
        "FairLeap transformed how we approach lending decisions. We've seen a 95% reduction in bias while maintaining our approval standards.",
      rating: 5,
      avatar: "SC",
    },
    {
      name: "Marcus Johnson",
      role: "Head of HR",
      company: "TechHire Solutions",
      content:
        "The transparency and fairness of our hiring process improved dramatically. Our diversity metrics are at an all-time high.",
      rating: 5,
      avatar: "MJ",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Healthcare Director",
      company: "MediCare Alliance",
      content:
        "Patient care allocation has never been more equitable. FairLeap helps us serve all communities with the same level of excellence.",
      rating: 5,
      avatar: "ER",
    },
    {
      name: "David Kim",
      role: "Operations Manager",
      company: "LogiFlow Inc",
      content:
        "Implementation was seamless and the results immediate. Our operational efficiency increased by 60% while ensuring fair practices.",
      rating: 5,
      avatar: "DK",
    },
    {
      name: "Lisa Thompson",
      role: "Chief Compliance Officer",
      company: "RegTech Solutions",
      content:
        "The audit trail and transparency features exceed our compliance requirements. It's the most robust fair AI platform we've evaluated.",
      rating: 5,
      avatar: "LT",
    },
    {
      name: "Ahmed Hassan",
      role: "Product Director",
      company: "InnovateTech",
      content:
        "FairLeap enabled us to scale globally while maintaining consistent fairness standards across all markets and demographics.",
      rating: 5,
      avatar: "AH",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            What Our <span className="text-primary">Customers</span> Say
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Hear from industry leaders who are already transforming their
            organizations with FairLeap's AI-powered fairness solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-card rounded-2xl p-8 border">
            <h3 className="text-2xl font-bold mb-4">
              Join the Success Stories
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to become our next success story? Join hundreds of
              organizations already transforming their industries with fair AI.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.9/5</div>
                <div className="text-sm text-muted-foreground">
                  Average Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Customers
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">
                  Retention Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
