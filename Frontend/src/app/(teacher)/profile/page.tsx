"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  BookOpen,
  Award,
  Calendar,
  Camera,
  Save,
  Edit3,
} from "lucide-react";
import TeacherNavbar from "@/components/navigation/TeacherNavbar";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Prof. Sarah Wilson",
    email: "sarah.wilson@university.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    institution: "Stanford University",
    location: "Palo Alto, California",
    bio: "Passionate educator with over 15 years of experience in computer science. Specializing in data structures, algorithms, and AI. Committed to innovative teaching methods and student success.",
    subjects: ["Data Structures", "Algorithms", "Machine Learning", "Python Programming"],
  });

  const stats = [
    { label: "Years Teaching", value: "15+", icon: Calendar },
    { label: "Courses Taught", value: "48", icon: BookOpen },
    { label: "Awards", value: "12", icon: Award },
    { label: "Students Taught", value: "2,500+", icon: User },
  ];

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <TeacherNavbar userName={profile.name} userEmail={profile.email} />

      <main className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Card */}
          <Card className="relative overflow-hidden">
            {/* Banner */}
            <div className="h-32 bg-gradient-hero" />

            {/* Profile Content */}
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center border-4 border-card">
                    <span className="text-2xl font-bold text-primary-foreground">SW</span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-card hover:opacity-90 transition-opacity">
                    <Camera className="w-4 h-4 text-primary-foreground" />
                  </button>
                </div>

                {/* Name & Role */}
                <div className="flex-1 pt-2 mt-10">
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <p className="text-muted-foreground">
                    {profile.department} • {profile.institution}
                  </p>
                </div>

                {/* Edit Button */}
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => setIsEditing(!isEditing)}
                  className={isEditing ? "bg-gradient-primary text-primary-foreground" : ""}
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-lg bg-muted/50"
                  >
                    <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Bio Section */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">About</h2>
            {isEditing ? (
              <Textarea
                value={profile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="min-h-[120px]"
              />
            ) : (
              <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
            )}
          </Card>

          {/* Personal Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Personal Information</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    value={profile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                ) : (
                  <p className="font-medium">{profile.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                ) : (
                  <p className="font-medium">{profile.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                {isEditing ? (
                  <Input
                    value={profile.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                ) : (
                  <p className="font-medium">{profile.phone}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  Location
                </Label>
                {isEditing ? (
                  <Input
                    value={profile.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                ) : (
                  <p className="font-medium">{profile.location}</p>
                )}
              </div>

              {/* Institution */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <Building className="w-4 h-4" />
                  Institution
                </Label>
                {isEditing ? (
                  <Input
                    value={profile.institution}
                    onChange={(e) => handleInputChange("institution", e.target.value)}
                  />
                ) : (
                  <p className="font-medium">{profile.institution}</p>
                )}
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  Department
                </Label>
                {isEditing ? (
                  <Input
                    value={profile.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                  />
                ) : (
                  <p className="font-medium">{profile.department}</p>
                )}
              </div>
            </div>
          </Card>

          {/* Subjects */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Subjects & Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {profile.subjects.map((subject, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {subject}
                </span>
              ))}
              {isEditing && (
                <button className="px-4 py-2 border-2 border-dashed border-muted-foreground/30 text-muted-foreground rounded-full text-sm hover:border-primary hover:text-primary transition-colors">
                  + Add Subject
                </button>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
