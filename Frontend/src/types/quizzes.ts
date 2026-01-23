export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  score: number;
  percentage: number;
  submittedAt: string;
  timeSpent: string;
  status: "completed" | "pending" | "in-progress";
}

export interface QuizResult {
  id: string;
  title: string;
  subject: string;
  topic: string;
  createdAt: string;
  completedAt: string;
  totalStudents: number;
  completedStudents: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  totalPoints: number;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "completed" | "active" | "scheduled";
  students: Student[];
}

export interface QuizSummary {
  id: string;
  title: string;
  subject: string;
  createdAt: string;
  totalStudents: number;
  averageScore: number;
  status: "completed" | "active" | "scheduled";
}
