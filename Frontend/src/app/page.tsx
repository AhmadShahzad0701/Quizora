import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import Link from "next/link";
import {
  Sparkles,
  Brain,
  BarChart3,
  Shield,
  Users,
  Clock,
  Award,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/footer/Footer";

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Quiz Creation",
      description:
        "Generate intelligent quizzes from documents, topics, or notes automatically",
      color: "text-primary",
    },
    {
      icon: Sparkles,
      title: "Smart Grading",
      description:
        "Rubric-based AI evaluation for objective and descriptive answers",
      color: "text-secondary",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Real-time insights into student performance and learning patterns",
      color: "text-accent",
    },
    {
      icon: Shield,
      title: "Cheating Prevention",
      description:
        "Tab-switching detection, time tracking, and question randomization",
      color: "text-primary",
    },
    {
      icon: Users,
      title: "Collaboration Tools",
      description: "Share quizzes, templates, and work together with your team",
      color: "text-secondary",
    },
    {
      icon: Clock,
      title: "Live Quiz Sessions",
      description: "Conduct real-time assessments with instant leaderboards",
      color: "text-accent",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Educators" },
    { value: "100K+", label: "Quizzes Created" },
    { value: "50K+", label: "Students Assessed" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  const benefits = [
    "Reduce grading time by 70%",
    "Increase assessment accuracy",
    "Engage students effectively",
    "Track progress in real-time",
    "Generate print-ready exams",
    "Support multiple question types",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8 animate-fade-in-up">
          <Link href="/room-code">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-primary text-white text-sm font-semibold shadow-md hover:opacity-90 transition cursor-pointer">
              <Users className="w-4 h-4" />
              Join Quiz (Students)
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Smart Quizzes.
            </span>
            <br />
            <span className="text-foreground">Smarter Teaching.</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Automate quiz creation, grading, and analytics with AI-powered tools
            designed for modern educators.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-lg px-8 shadow-lg"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link  href="/#features">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-7xl mx-auto animate-fade-in">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Powerful Features for Modern Education
            </h2>
            <p className="text-xl text-muted-foreground mt-4">
              Everything you need to create, manage, and evaluate assessments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <Card
                key={i}
                className="p-6 border-2 hover:border-primary/50 hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <f.icon className={`w-12 h-12 ${f.color} mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id = "about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT CONTENT */}
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold">
                Why Educators Choose Quizora
              </h2>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Join thousands of educators who have transformed their assessment
                process with our intelligent platform.
              </p>

              <div className="space-y-4 pt-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link href="/register" className="inline-block pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-accent hover:opacity-90"
                >
                  Get Started Today
                  <Award className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* RIGHT SIDE CARD */}
            <div className="relative">
              {/* Glow Background */}
              <div className="aspect-square rounded-2xl bg-gradient-hero opacity-20 blur-3xl absolute inset-0" />

              <Card className="relative p-8 bg-card/50 backdrop-blur border-2 animate-scale-in">
                <div className="space-y-6">

                  <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">AI Quiz Generator</div>
                      <div className="text-sm text-muted-foreground">
                        Generate quizzes in seconds
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-secondary/10 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Analytics Dashboard</div>
                      <div className="text-sm text-muted-foreground">
                        Track performance trends
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-accent/10 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Secure Assessment</div>
                      <div className="text-sm text-muted-foreground">
                        Advanced cheating prevention
                      </div>
                    </div>
                  </div>

                </div>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-hero relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-xl text-white/90">
            Join thousands of educators using Quizora to create smarter
            assessments.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/signup">
              <Button className="bg-white text-primary text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
            <a href="#contact">
              <Button className="bg-primary text-white text-lg px-8">
                Contact Sales
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
