"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { gsap } from "gsap";

// Hook untuk intersection observer - trigger once on viewport enter
const useInViewOnce = (threshold = 0.3) => {
  const [hasEntered, setHasEntered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEntered) {
          setHasEntered(true);
          // Disconnect observer after first trigger untuk performa
          observer.disconnect();
        }
      },
      { 
        threshold,
        rootMargin: '50px 0px -50px 0px' // Trigger sedikit sebelum masuk viewport
      }
    );

    const currentRef = ref.current;
    if (currentRef && !hasEntered) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, hasEntered]);

  return { ref, hasEntered };
};

export default function LiveDemonstrationSection() {
  const { ref: sectionRef, hasEntered } = useInViewOnce(0.1);
  const headerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const demoVideoRef = useRef<HTMLDivElement>(null);
  const demoIconRef = useRef<HTMLDivElement>(null);
  const demoContentRef = useRef<HTMLDivElement>(null);
  const featureCardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const featureIconsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const featureImagesRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const demoFeatures = [
    {
      title: "Earnings Calculator",
      description: "Drivers enter their working hours, preferred area, and number of working days. FairLeap AI predicts weekly income with a confidence score, displayed through real-time graphs and location-based heatmaps.",
      icon: <FiSearch className="w-8 h-8" />,
      image: "/images/earnings-calculator.jpg",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Wellness Check",
      description: "Drivers select their current condition, and the system responds with personalized wellness advice. A live health score meter visualizes overall driver well-being to encourage safer work habits.",
      icon: <FiHeart className="w-8 h-8" />,
      image: "/images/wellness check.jpg",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Financial Assistant",
      description: "Drivers ask sample financial or insurance-related questions. The AI chatbot responds instantly with relevant and empathetic answers, using a conversational interface powered by a large language model.",
      icon: <FiMessageCircle className="w-8 h-8" />,
      image: "/images/financial-assitant.jpg",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  // GSAP Animations - trigger hanya sekali saat masuk viewport
  useEffect(() => {
    if (!hasEntered || animationCompleted) return;

    // Set animationCompleted immediately to prevent re-triggering
    setAnimationCompleted(true);

    const tl = gsap.timeline({
      delay: 0.2, // Small delay untuk smooth entrance
      onStart: () => {
        // Ensure visibility during animation
        gsap.set(sectionRef.current, { visibility: 'visible' });
      }
    });

    // Set initial states for header elements
    gsap.set(badgeRef.current, {
      opacity: 0,
      y: -30,
      scale: 0.8,
      visibility: 'visible' // Ensure visibility for animation
    });

    gsap.set(titleRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.95
    });

    gsap.set(descriptionRef.current, {
      opacity: 0,
      y: 30
    });

    // Set initial states for demo video
    gsap.set(demoVideoRef.current, {
      opacity: 0,
      y: 100,
      scale: 0.9,
      rotationX: 15
    });

    gsap.set(demoIconRef.current, {
      opacity: 0,
      scale: 0,
      rotation: -180
    });

    gsap.set(demoContentRef.current, {
      opacity: 0,
      y: 50
    });

    // Set initial states for feature cards
    gsap.set(featureCardsRefs.current, {
      opacity: 0,
      y: 120,
      scale: 0.8,
      rotationX: 25
    });

    gsap.set(featureIconsRefs.current, {
      opacity: 0,
      scale: 0,
      rotation: -90
    });

    gsap.set(featureImagesRefs.current, {
      opacity: 0,
      scale: 1.2,
      clipPath: "circle(0% at 50% 50%)"
    });

    // Animation timeline
    tl.to(badgeRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6")
    .to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.7")
    .to(demoVideoRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.5")
    .to(demoIconRef.current, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: "back.out(2)"
    }, "-=0.8")
    .to(demoContentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.6")
    .to(featureCardsRefs.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 1,
      stagger: {
        each: 0.3,
        from: "start"
      },
      ease: "power3.out"
    }, "-=0.4")
    .to(featureIconsRefs.current, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.6,
      stagger: 0.3,
      ease: "back.out(1.7)"
    }, "-=0.9")
    .to(featureImagesRefs.current, {
      opacity: 1,
      scale: 1,
      clipPath: "circle(100% at 50% 50%)",
      duration: 0.8,
      stagger: 0.3,
      ease: "power2.out"
    }, "-=0.8");

    // Floating animation for demo icon
    const demoIconAnimation = gsap.to(demoIconRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 2
    });

    // Subtle floating animation for feature icons
    const iconAnimations = featureIconsRefs.current.map((icon, index) => {
      return gsap.to(icon, {
        y: -8,
        rotation: 5,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 3 + index * 0.3
      });
    });

    // Cleanup function
    return () => {
      tl.kill();
      demoIconAnimation?.kill();
      iconAnimations.forEach(anim => anim?.kill());
    };

  }, [hasEntered, animationCompleted]);

  // Card Hover Animations
  const handleCardHover = (ref: HTMLDivElement | null, isEntering: boolean) => {
    if (!ref) return;

    if (isEntering) {
      gsap.to(ref, {
        scale: 1.02,
        y: -8,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(ref, {
        boxShadow: "0 25px 50px rgba(59, 130, 246, 0.15)",
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(ref, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(ref, {
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="demo" 
      className={`py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden ${!hasEntered ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full opacity-15 blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-emerald-200 rounded-full opacity-10 blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-16">
          <div ref={badgeRef} className="mb-6">
            <Badge 
              variant="outline" 
              className="border-blue-300 text-blue-700 bg-blue-100/80 backdrop-blur-sm"
            >
              <FiPlay className="w-4 h-4 mr-2" />
              Live Demo
            </Badge>
          </div>
          
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Empowering Every Ride with <span className="text-primary">FairLeap AI</span>
          </h2>
          
          <p 
            ref={descriptionRef}
            className="text-lg text-slate-600 leading-relaxed"
          >
            This integrated demo showcases how FairLeap AI transforms daily driving into a data-informed, 
            wellness-supported journey for GOTO drivers.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Demo Video Section */}
          <Card
            ref={demoVideoRef}
            className="bg-white/90 backdrop-blur-lg border-white/60 shadow-xl overflow-hidden"
          >
            <CardContent className="p-8">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center relative">
                <div ref={demoContentRef} className="text-center">
                  <div 
                    ref={demoIconRef}
                    className="bg-white/80 backdrop-blur-sm rounded-full p-6 mb-6 inline-flex shadow-lg"
                  >
                    <FiMonitor className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Interactive Demo Coming Soon</h3>
                  <p className="text-slate-600 mb-6">
                    Experience the full power of FairLeap AI with our interactive demonstration
                  </p>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 shadow-lg"
                  >
                    <FiPlay className="mr-2" size={20} />
                    Watch Demo Video
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Demo Cards */}
          <div className="space-y-8">
            {demoFeatures.map((feature, index) => (
              <Card
                key={index}
                ref={el => { featureCardsRefs.current[index] = el; }}
                className="bg-white/90 backdrop-blur-lg border-white/60 shadow-xl overflow-hidden cursor-pointer transition-all duration-300"
                onMouseEnter={() => handleCardHover(featureCardsRefs.current[index], true)}
                onMouseLeave={() => handleCardHover(featureCardsRefs.current[index], false)}
              >
                <CardContent className="p-8">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                    {/* Image */}
                    <div 
                      ref={el => { featureImagesRefs.current[index] = el; }}
                      className={`relative rounded-xl overflow-hidden aspect-video shadow-lg ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                    >
                      <Image
                        src={feature.image}
                        alt={`${feature.title} Interface`}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    
                    {/* Content */}
                    <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                      <div className="flex items-center space-x-4">
                        <div 
                          ref={el => { featureIconsRefs.current[index] = el; }}
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
                        >
                          <div className="text-white">
                            {feature.icon}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">{feature.title}</h3>
                      </div>
                      
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {feature.description}
                      </p>
                      
                      <Button variant="outline" size="lg" className="group">
                        Learn More
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
