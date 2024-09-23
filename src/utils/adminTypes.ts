export interface AdminState {
  value: number;
  loading: boolean;
  error: string | null;
  token: string | null;
  user: userObj | null;
  analytics: Analytics | null;
}

interface userObj {
  email: string;
  id: number;
  name: string;
  profile_photo: string;
}

interface Analytics {
  totalUsers: number;
  totalCourses: number;
  totalCertificates: number;
  usersPerMonth: usersPerMonth[];
  courseCompletionsPerCourse: CourseCompletionsPerCourse[];
  courseCompletionsPerUserType: CoursesCompletionsPerUserType;
}

interface CoursesCompletionsPerUserType {
  studentCompletionRate: string;
  educatorCompletionRate: string;
}

interface CourseCompletionsPerCourse {
  title: string;
  numberOfCourseCompletions: number;
}

interface usersPerMonth {
  month: string;
  userCount: number;
}
