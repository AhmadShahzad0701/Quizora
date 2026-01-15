import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Plus,
  BookOpen,
  BarChart3,
  Users,
  TrendingUp,
  Award,
  Brain,
} from "lucide-react";
import TeacherNavbar from "@/components/navigation/TeacherNavbar";

import Link from "next/link";

const TeacherDashboard = () => {
  const stats = [
    {
      label: "Total Quizzes",
      value: "24",
      change: "+3 this week",
      icon: BookOpen,
      color: "text-primary",
    },
    {
      label: "Live Sessions",
      value: "8",
      change: "This week",
      icon: Users,
      color: "text-secondary",
    },
    {
      label: "AI Generated Quizzes",
      value: "18",
      change: "75% AI usage",
      icon: Brain,
      color: "text-success",
    },
    {
      label: "Public Quizzes",
      value: "10",
      change: "Shared with students",
      icon: TrendingUp,
      color: "text-accent",
    },
  ];

  const recentQuizzes = [
    {
      title: "Data Structures - Mid Term",
      subject: "Computer Science",
      students: 45,
      avgScore: 82,
      status: "completed",
    },
    {
      title: "Calculus Chapter 5",
      subject: "Mathematics",
      students: 38,
      avgScore: 75,
      status: "active",
    },
    {
      title: "Physics - Thermodynamics",
      subject: "Physics",
      students: 52,
      avgScore: 68,
      status: "scheduled",
    },
  ];

  const quickActions = [
    {
      title: "Create AI-Quiz",
      description: "Generate AI-powered quizzes",
      icon: Plus,
      link: "/create-quiz",
      color: "bg-gradient-primary",
    },
    {
      title: "Templates",
      description: "Reusable ready quiz templates",
      icon: Brain,
      link: "/templates",
      color: "bg-gradient-secondary",
    },
    {
      title: "Analytics",
      description: "View detailed reports",
      icon: BarChart3,
      link: "/analytics",
      color: "bg-gradient-accent",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <TeacherNavbar />

      <main className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold mb-1">
                Welcome back, Professor!
              </h1>
              <p className="text-base text-muted-foreground">
                Here is what’s happening with your classes today
              </p>
            </div>
            <Link href="/create-quiz">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                <Plus className="w-5 h-5 mr-2" />
                Create New Quiz
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-semibold">
                      {stat.value}
                    </p>
                    <p className="text-xs text-success">
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-2.5 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.link}>
                  <Card className="p-5 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                    <div className="space-y-3">
                      <div
                        className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center`}
                      >
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium">
                          {action.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Quizzes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">Recent Quizzes</h2>
              <Link href="/quizzes">
                <Button variant="ghost">View All</Button>
              </Link>
            </div>

            <div className="space-y-3">
              {recentQuizzes.map((quiz, index) => (
                <Card key={index} className="p-5 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 bg-muted rounded-lg">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium">
                          {quiz.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {quiz.subject}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Students</p>
                        <p className="text-lg font-semibold">
                          {quiz.students}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Score</p>
                        <p className="text-lg font-semibold text-success">
                          {quiz.avgScore}%
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${quiz.status === "completed"
                            ? "bg-success/10 text-success"
                            : quiz.status === "active"
                              ? "bg-primary/10 text-primary"
                              : "bg-accent/10 text-accent"
                          }`}
                      >
                        {quiz.status.charAt(0).toUpperCase() +
                          quiz.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievement */}
          <Card className="p-7 bg-gradient-hero relative overflow-hidden">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  You’re doing great! 🚀
                </h3>
                <p className="text-sm text-white/90">
                  You saved 24 hours this month using AI-powered grading
                </p>
              </div>
              <Award className="w-20 h-20 text-white/20 absolute right-6" />
            </div>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
