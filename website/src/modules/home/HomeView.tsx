import React from "react";
import { HeroSlider } from "./components/HeroSlider";
import { FlagshipPrograms } from "./components/FlagshipPrograms";
import { AboutFounderSection } from "./components/AboutFounderSection";
import { VisionGoalsSection } from "./components/VisionGoalsSection";
import { TeacherPlacementSection } from "./components/TeacherPlacementSection";
import { NoticeBoardSection } from "./components/NoticeBoardSection";

export const HomeModule: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <HeroSlider />
      <FlagshipPrograms />
      <AboutFounderSection />
      <VisionGoalsSection />
      <NoticeBoardSection />
      <TeacherPlacementSection />
    </div>
  );
};
