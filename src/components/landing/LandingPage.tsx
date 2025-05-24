import React from "react";
import LandingHeader from "./LandingHeader";
import LandingFooter from "./LandingFooter";
import HeroSection from "./sections/HeroSection";
import ProblemStatementSection from "./sections/ProblemStatementSection";
import SolutionShowcaseSection from "./sections/SolutionShowcaseSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import LiveDemonstrationSection from "./sections/LiveDemonstrationSection";
import ImpactMetricsSection from "./sections/ImpactMetricsSection";
import TechnologyCredibilitySection from "./sections/TechnologyCredibilitySection";

import CallToActionSection from "./sections/CallToActionSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        <HeroSection />
        <ProblemStatementSection />
        <SolutionShowcaseSection />
        <HowItWorksSection />
        <LiveDemonstrationSection />
        <ImpactMetricsSection />
        <TechnologyCredibilitySection />
        <CallToActionSection />
      </main>
      <LandingFooter />
    </div>
  );
}
