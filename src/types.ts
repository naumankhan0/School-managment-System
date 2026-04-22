export type UserRole = 'admin' | 'teacher' | 'parent' | 'student';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  createdAt: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  name: string;
  admissionNo: string;
  rollNo: string;
  classId: string;
  section: string;
  parentId: string;
}

export interface ClassInfo {
  id: string;
  name: string;
  sections: string[];
}

export interface SubjectInfo {
  id: string;
  name: string;
  classId: string;
  teacherId: string;
}
