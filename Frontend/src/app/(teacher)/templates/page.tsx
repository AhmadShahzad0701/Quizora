import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, BookOpen, Timer, Layers } from "lucide-react";
import Navbar from "@/components/navigation/Navbar";

const templates = [
    {
        title: "MCQs – Quick Assessment",
        description: "10 MCQs, auto-evaluation enabled",
        questions: 10,
        duration: "15 mins",
        icon: Brain,
        level: "Beginner",
    },
    {
        title: "Mid-Term Template",
        description: "Mixed MCQs + Short Questions",
        questions: 25,
        duration: "60 mins",
        icon: BookOpen,
        level: "Intermediate",
    },
    {
        title: "Timed Practice Quiz",
        description: "Speed-based assessment template",
        questions: 20,
        duration: "20 mins",
        icon: Timer,
        level: "Advanced",
    },
    {
        title: "Concept Check",
        description: "Conceptual understanding focused quiz",
        questions: 15,
        duration: "30 mins",
        icon: Layers,
        level: "Beginner",
    },
];

const TemplatesPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-20 pb-12 px-4">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Ready-made Templates</h1>
                        <p className="text-muted-foreground text-lg">
                            Use prebuilt quiz templates to save time and get started instantly
                        </p>
                    </div>

                    {/* Templates Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map((template, index) => (
                            <Card
                                key={index}
                                className="p-6 hover:shadow-xl transition-all hover:-translate-y-1"
                            >
                                <div className="space-y-4">
                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center">
                                        <template.icon className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">
                                            {template.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {template.description}
                                        </p>
                                    </div>

                                    {/* Meta */}
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>{template.questions} Questions</span>
                                        <span>{template.duration}</span>
                                    </div>

                                    {/* Level */}
                                    <div>
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                            {template.level}
                                        </span>
                                    </div>

                                    {/* Action */}
                                    <Button className="w-full mt-2">Use Template</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TemplatesPage;
