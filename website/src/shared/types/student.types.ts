export interface AdmitCardRequest {
  rollNo?: string;
  registrationNo?: string;
  dob?: string;
}

export interface AdmitCardData {
  studentName: string;
  fatherName: string;
  rollNo: string;
  registrationNo: string;
  courseName: string;
  examCenter: string;
  examCenterCode: string;
  examDate: string;
  examTiming: string;
  photoUrl?: string;
  instructions: string[];
}

export interface ExamResultQuery {
  rollNo: string;
  academicYear?: string;
  semester?: string;
}

export interface SubjectMarks {
  subjectName: string;
  maxMarks: number;
  obtainedMarks: number;
  grade: string;
}

export interface ExamResultData {
  studentName: string;
  fatherName: string;
  rollNo: string;
  enrollmentNo: string;
  courseName: string;
  semester: string;
  academicYear: string;
  subjects: SubjectMarks[];
  totalMarks: number;
  obtainedTotal: number;
  percentage: number;
  division: string;
  resultStatus: "PASS" | "FAIL" | "WITHHELD";
  issuedDate: string;
}

export interface EntranceApplicationForm {
  fullName: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: "female";
  mobileNumber: string;
  alternateNumber?: string;
  email?: string;
  address: string;
  district: string;
  state: string;
  pinCode: string;
  desiredCourse: string;
  previousEducation: string;
  hostelRequired: boolean;
  scholarshipInterest: boolean;
}

export interface DocumentVerificationQuery {
  certificateNo: string;
  enrollmentNo: string;
}

export interface DocumentVerificationData {
  certificateNo: string;
  enrollmentNo: string;
  studentName: string;
  courseCompleted: string;
  passingYear: string;
  gradeOrDivision: string;
  isValid: boolean;
  issueDate: string;
}
