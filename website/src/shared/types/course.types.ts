export interface CourseItem {
  id: string;
  slug: string;
  title: string;
  duration: string;
  level: string;
  mode: "Online" | "Offline" | "Hybrid (Online + Offline)";
  eligibility: string;
  shortDescription: string;
  syllabusHighlights: string[];
  isFlagship?: boolean;
}
