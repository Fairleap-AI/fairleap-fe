"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { gsap } from "gsap";
import { 
  FiTwitter, 
  FiLinkedin, 
  FiGithub, 
  FiMail,
  FiSend,
  FiMapPin,
  FiPhone,
  FiArrowRight
} from "react-icons/fi";

// Hook untuk intersection observer
const useInView = (threshold = 0.2) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isInView };
};

export default function LandingFooter() {
  const { ref: footerRef, isInView } = useInView(0.1);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const socialLinks = [
    {
      href: "#",
      icon: <FiTwitter size={20} />,
      label: "Twitter",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      href: "#",
      icon: <FiLinkedin size={20} />,
      label: "LinkedIn", 
      gradient: "from-blue-600 to-blue-800"
    },
    {
      href: "#",
      icon: <FiGithub size={20} />,
      label: "GitHub",
      gradient: "from-gray-600 to-gray-800"
    },
    {
      href: "#",
      icon: <FiMail size={20} />,
      label: "Email",
      gradient: "from-emerald-500 to-emerald-700"
    }
  ];

  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "Earnings Prediction", href: "#prediction" },
        { label: "Route Optimization", href: "#optimization" },
        { label: "Driver Insights", href: "#insights" },
        { label: "Performance Analytics", href: "#analytics" }
      ]
    },
    {
      title: "For Drivers",
      links: [
        { label: "GOTO Partnership", href: "#goto" },
        { label: "Earnings Calculator", href: "#calculator" },
        { label: "Driver Community", href: "#community" },
        { label: "Success Stories", href: "#stories" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", href: "#help" },
        { label: "API Documentation", href: "#docs" },
        { label: "Driver Guide", href: "#guide" },
        { label: "Safety Tips", href: "#safety" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About FairLeap", href: "#about" },
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" },
        { label: "Contact Support", href: "#contact" }
      ]
    }
  ];

  // GSAP Animations
  useEffect(() => {
    if (!isInView || animationCompleted) return;

    const tl = gsap.timeline({
      onComplete: () => setAnimationCompleted(true)
    });

    // Set initial states
    gsap.set(mainContentRef.current, {
      opacity: 0,
      y: 80
    });

    gsap.set(newsletterRef.current, {
      opacity: 0,
      y: 60,
      scale: 0.95
    });

    gsap.set(bottomBarRef.current, {
      opacity: 0,
      y: 40
    });

    gsap.set(socialLinksRef.current, {
      opacity: 0,
      scale: 0.8
    });

    // Animation timeline
    tl.to(mainContentRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(newsletterRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .to(socialLinksRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .to(bottomBarRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3");

  }, [isInView, animationCompleted]);

  // Social Link Hover Animation
  const handleSocialHover = (element: HTMLElement | null, isEntering: boolean) => {
    if (!element) return;

    if (isEntering) {
      gsap.to(element, {
        scale: 1.1,
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(element, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-gradient-to-br from-slate-100 via-emerald-50 to-blue-100 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-emerald-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-15 blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-purple-200 rounded-full opacity-10 blur-xl animate-pulse" style={{ animationDelay: '6s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
                 {/* Newsletter Section */}
         <div ref={newsletterRef} className="mb-16">
           <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-3xl"></div>
             <div className="relative z-10 max-w-4xl mx-auto text-center">
               <Badge variant="outline" className="mb-6 border-white/40 text-white bg-white/20 backdrop-blur-sm">
                 <FiSend className="w-4 h-4 mr-2" />
                 Stay Updated
               </Badge>
               
               <h3 className="text-2xl md:text-3xl font-bold mb-4">
                 Get the Latest Driver Insights & Tips
               </h3>
               
               <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                 Join 50,000+ drivers who receive weekly earnings tips, route optimizations, 
                 and exclusive insights to maximize their income.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                 <Input
                   type="email"
                   placeholder="Enter your email address"
                   className="bg-white/30 border-white/40 text-white placeholder:text-white/70 backdrop-blur-sm"
                 />
                 <Button 
                   size="lg" 
                   className="bg-white text-emerald-700 hover:bg-white/90 font-semibold group"
                 >
                   Subscribe
                   <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </div>
             </div>
           </div>
         </div>

        {/* Main Footer Content */}
        <div ref={mainContentRef} className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-12">
          
                     {/* Company Info */}
           <div className="md:col-span-2 space-y-6">
             <div>
               <Image
                 src="/logo-full.png"
                 alt="FairLeap Logo"
                 width={160}
                 height={56}
                 className="h-12 w-auto mb-6"
               />
               <p className="text-slate-600 leading-relaxed">
                 Empowering GOTO drivers with AI-powered insights to predict earnings, 
                 optimize routes, and build financial wellbeing for a sustainable livelihood.
               </p>
             </div>
             
             <div className="space-y-4">
               <div className="flex items-center text-slate-600">
                 <FiMapPin className="w-5 h-5 mr-3 text-emerald-600" />
                 Jakarta, Indonesia
               </div>
               <div className="flex items-center text-slate-600">
                 <FiPhone className="w-5 h-5 mr-3 text-emerald-600" />
                 +62 21 1234 5678
               </div>
               <div className="flex items-center text-slate-600">
                 <FiMail className="w-5 h-5 mr-3 text-emerald-600" />
                 support@fairleap.ai
               </div>
             </div>
           </div>

                     {/* Footer Sections */}
           {footerSections.map((section, index) => (
             <div key={section.title} className="space-y-4">
               <h4 className="font-semibold text-slate-800 text-lg">{section.title}</h4>
               <ul className="space-y-3">
                 {section.links.map((link) => (
                   <li key={link.label}>
                     <a 
                       href={link.href} 
                       className="text-slate-600 hover:text-emerald-600 transition-colors duration-300 hover:translate-x-1 inline-block"
                     >
                       {link.label}
                     </a>
                   </li>
                 ))}
               </ul>
             </div>
           ))}
        </div>

        {/* Social Links */}
        <div ref={socialLinksRef} className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.gradient} flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:shadow-xl`}
                onMouseEnter={(e) => handleSocialHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleSocialHover(e.currentTarget, false)}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

                 {/* Bottom Bar */}
         <div ref={bottomBarRef} className="border-t border-slate-300 pt-8">
           <div className="flex flex-col md:flex-row justify-between items-center text-slate-500">
             <p className="mb-4 md:mb-0">
               &copy; 2025 FairLeap AI. All rights reserved. Built for Indonesian drivers.
             </p>
             <div className="flex space-x-6 text-sm">
               <a href="#privacy" className="hover:text-emerald-600 transition-colors">
                 Privacy
               </a>
               <a href="#terms" className="hover:text-emerald-600 transition-colors">
                 Terms
               </a>
               <a href="#cookies" className="hover:text-emerald-600 transition-colors">
                 Cookies
               </a>
             </div>
           </div>
         </div>
      </div>
    </footer>
  );
}
