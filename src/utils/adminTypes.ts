export interface AdminState {
  value: number;
  loading: boolean;
  error: string | null;
  token: string | null;
  user: userObj | null;
  analytics: Analytics | null;
  allUsers: userObj[] | null;
  allCourses: CoursesObj[] | null;
  userStats: UserStats | null;
  singleUser: singleUserObj | null;
  userCourses: userCoursesObj[] | null;
  coursesStats: CoursesStats | null;
  courseDetails: CourseObj | null;
}

export interface CourseObj {
  id?: number;
  title: string;
  description: string;
  thumbnail_image?: string;
  video_url?: string;
  createdAt?: string;
  updatedAt?: string;
  duration?: number;
  objectives?: string[];
  status?: string;
}

export interface userCoursesObj {
  courseTitle: string;
  enrolledDate: string;
  completionDate: string | null;
  quizzesAttempted: number;
  highestQuizGrade: string | null;
}

interface CoursesObj {
  id: number;
  title: string;
  description: string;
  thumbnail_image: string;
  createdAt: string;
  updatedAt: string;
}

interface singleUserObj {
  user: {
    id: number;
    name: string;
    email: string;
    password: string;
    type: string;
    organisation: string;
    role: string;
    no_of_students_to_reach: number;
    work_with_maginalized_populations: boolean;
    profile_photo: string;
    createdAt: string;
    updatedAt: string;
  };
  totalCertificates: number;
  quizesByUser: number;
  quizSuccessRate: number | null;
  totalCoursesTakenByUser: number;
  totalCourseCompletedbyUser: number;
  percentageCompleted: number;
}

interface userObj {
  email: string;
  id: number;
  name: string;
  profile_photo: string;
  type: string;
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

interface UserStats {
  totalUsers: {
    value: number;
    percentageIncreaseInTotalUsers: number;
    usersLastMonth: number;
  };
  totalEducators: {
    value: number;
    percentageIncreaseInTotalEducators: number;
  };
  totalStudents: {
    value: number;
    percentageIncreaseInTotalStudents: number;
  };
}

interface CoursesStats {
  totalCourses: number;
  totalActiveCourses: number;
  totalArchivedCourses: number;
  totalCertificates: number;
  totalQuizes: number;
  quizSuccessRate: number;
  failedQuizesRate: number;
}

export interface PasswordChangeObj {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
