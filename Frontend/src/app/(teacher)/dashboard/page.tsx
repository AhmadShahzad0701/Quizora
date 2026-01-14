import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Plus,
  BookOpen,
  BarChart3,
  Users,
  Clock,
  TrendingUp,
  Award,
  Brain,
} from "lucide-react";
import Navbar from "../../../components/navigation/Navbar";
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
      label: "Active Students",
      value: "156",
      change: "+12 this month",
      icon: Users,
      color: "text-secondary",
    },
    {
      label: "Avg. Score",
      value: "78%",
      change: "+5% from last week",
      icon: TrendingUp,
      color: "text-success",
    },
    {
      label: "Time Saved",
      value: "24 hrs",
      change: "This month",
      icon: Clock,
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
      description: "Reusable Ready Template Quiz",
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
      <Navbar />

      <main className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, Professor!</h1>
              <p className="text-muted-foreground text-lg">
                Here is what happening with your classes today
              </p>
            </div>
            <Link href="/create-quiz"> 
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                <Plus className="w-5 h-5 mr-2" />
                Create New Quiz
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-xs text-success">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.link}> {/* Correct usage of Link with href */}
                  <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                    <div className="space-y-4">
                      <div
                        className={`w-14 h-14 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <action.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Recent Quizzes</h2>
              <Link href="/quizzes"> {/* Correct usage of Link with href */}
                <Button variant="ghost">View All</Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentQuizzes.map((quiz, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 bg-muted rounded-lg">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{quiz.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {quiz.subject}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Students</p>
                        <p className="text-xl font-semibold">{quiz.students}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Avg Score</p>
                        <p className="text-xl font-semibold text-success">
                          {quiz.avgScore}%
                        </p>
                      </div>
                      <div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            quiz.status === "completed"
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
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievement Banner */}
          <Card className="p-8 bg-gradient-hero relative overflow-hidden">
            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">
                  You are on fire! 🔥
                </h3>
                <p className="text-white/90">
                  You have saved 24 hours this month using AI-powered grading
                </p>
              </div>
              <Award className="w-24 h-24 text-white/20 absolute right-8" />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
