export interface TeacherRegistrationForm {
  fullName: string;
  fatherOrHusbandName: string;
  mobileNumber: string;
  whatsappNumber: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  sanadDegree: "Aalima" | "Fazila" | "Muftiya" | "Hafiza" | "Other";
  islamicInstitution: string;
  asriEducation?: string;
  teachingExperienceYears: number;
  subjectsCanTeach: string[];
  preferredLocation: string;
  expectedSalary?: string;
}

export interface MadarsaRequirementForm {
  madarsaName: string;
  managementName: string;
  contactPerson: string;
  mobileNumber: string;
  whatsappNumber: string;
  madarsaAddress: string;
  city: string;
  state: string;
  requiredPost: string;
  numberOfTeachersNeeded: number;
  hostelProvided: boolean;
  foodProvided: boolean;
  offeredSalaryRange: string;
  specificRequirements?: string;
}
