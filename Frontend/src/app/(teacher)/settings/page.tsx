import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Bell,
  Shield,
  Palette,
  Globe,
  Key,
  Trash2,
  ChevronRight,
} from "lucide-react";
import TeacherNavbar from "@/components/navigation/TeacherNavbar";

const Settings = () => {
  const settingsSections = [
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { label: "Email notifications", description: "Receive quiz updates via email", enabled: true },
        { label: "Push notifications", description: "Get alerts on your browser", enabled: true },
        { label: "Quiz reminders", description: "Remind students before quizzes", enabled: false },
      ],
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      items: [
        { label: "Two-factor authentication", description: "Add extra security to your account", enabled: false },
        { label: "Login notifications", description: "Get notified of new logins", enabled: true },
        { label: "Profile visibility", description: "Make your profile public", enabled: true },
      ],
    },
  ];

  const quickActions = [
    { label: "Change Password", description: "Update your password", icon: Key },
    { label: "Language", description: "English (US)", icon: Globe },
    { label: "Appearance", description: "Light mode", icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-background">
      <TeacherNavbar userName="Prof. Sarah Wilson" userEmail="sarah.wilson@university.edu" />

      <main className="pt-20 pb-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences</p>
          </div>

          {/* Settings Sections */}
          {settingsSections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">{section.title}</h2>
              </div>
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">{item.label}</Label>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked={item.enabled} />
                  </div>
                ))}
              </div>
            </Card>
          ))}

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-1">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-muted">
                      <action.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">{action.label}</p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-destructive/30">
            <h2 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h2>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Delete Account</p>
                <p className="text-xs text-muted-foreground">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
