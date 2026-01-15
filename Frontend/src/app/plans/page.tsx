import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Sparkles,
  Brain,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Best for individual educators & practice",
    icon: Sparkles,
    features: [
      "AI quiz generation (limited)",
      "Auto grading (MCQs)",
      "Basic analytics",
      "Up to 50 students",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19 / month",
    description: "Perfect for teachers & small institutions",
    icon: Brain,
    features: [
      "Unlimited AI quizzes",
      "Descriptive answer grading",
      "Advanced analytics",
      "Live quiz sessions",
      "Up to 500 students",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Designed for universities & organizations",
    icon: Shield,
    features: [
      "Unlimited everything",
      "Custom AI rubrics",
      "Anti-cheating controls",
      "Team collaboration",
      "Dedicated support",
    ],
    highlight: false,
  },
];

const PlansPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            Quizora Pricing Plans
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparent pricing with powerful AI tools to transform your
            assessment workflow.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`p-8 border-2 transition-all duration-300 hover:-translate-y-2
                ${
                  plan.highlight
                    ? "border-primary shadow-xl scale-105"
                    : "border-border"
                }`}
              >
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center">
                      <plan.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="text-4xl font-extrabold text-primary">
                    {plan.price}
                  </div>
                  <p className="text-muted-foreground">
                    {plan.description}
                  </p>

                  <div className="space-y-3 text-left">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/register">
                    <Button
                      className={`w-full mt-6 ${
                        plan.highlight
                          ? "bg-gradient-primary"
                          : "variant-outline"
                      }`}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlansPage;
