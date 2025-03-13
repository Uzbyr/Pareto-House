import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomTextarea from "./CustomTextarea";
import GraduationYearInput from "./GraduationYearInput";

interface CustomApplicationFormProps {
  formState: {
    about: string;
    projects: string;
    name: string;
    email: string;
    university: string;
    graduationYear: string;
    videoUrl: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const CustomApplicationForm = ({
  formState,
  handleInputChange,
  handleSubmit,
}: CustomApplicationFormProps) => {
  return (
    <div className="p-6 bg-zinc-800 rounded-lg shadow-lg">
      <div className="text-lg font-medium mb-6">Custom Form with Fixes</div>
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-pareto-pink">
            Basic Information
          </h3>
          <div className="mb-6">
            <Label htmlFor="name" className="block mb-2 text-white">
              Full Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              className="w-full p-3 text-white bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-pareto-pink"
              placeholder="Your full name"
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="email" className="block mb-2 text-white">
              Email Address
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              className="w-full p-3 text-white bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-pareto-pink"
              placeholder="your.email@university.edu"
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="university" className="block mb-2 text-white">
              University
            </Label>
            <Input
              type="text"
              id="university"
              name="university"
              value={formState.university}
              onChange={handleInputChange}
              className="w-full p-3 text-white bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-pareto-pink"
              placeholder="Your university name"
            />
          </div>
          <GraduationYearInput
            value={formState.graduationYear}
            onChange={handleInputChange as any}
          />
        </div>

        {/* About You */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-pareto-pink">
            About You
          </h3>
          <CustomTextarea
            label="Tell us about yourself"
            placeholder="Share your background, interests, and what drives you..."
            name="about"
            value={formState.about}
            onChange={handleInputChange}
            maxLength={1000}
          />
          <CustomTextarea
            label="What are you working on?"
            placeholder="Tell us about your current projects, research, or initiatives..."
            name="projects"
            value={formState.projects}
            onChange={handleInputChange}
            maxLength={1000}
          />
        </div>

        {/* Video Introduction */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-pareto-pink">
            Video Introduction
          </h3>
          <div className="mb-6">
            <Label htmlFor="videoUrl" className="block mb-2 text-white">
              YouTube Video URL (60-second introduction)
            </Label>
            <Input
              type="text"
              id="videoUrl"
              name="videoUrl"
              value={formState.videoUrl}
              onChange={handleInputChange}
              className="w-full p-3 text-white bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-pareto-pink"
              placeholder="https://www.youtube.com/watch?v=..."
              onClick={(e) => e.stopPropagation()} // Prevent form submission on click
              onKeyDown={(e) => {
                // Prevent form submission when pressing Enter in the URL field
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
            <p className="mt-2 text-xs text-zinc-400">
              Upload a 60-second video of yourself to YouTube (unlisted is fine)
              and paste the URL here.
            </p>
          </div>
        </div>

        <Button type="submit" variant="pink" className="w-full py-6 text-lg">
          Submit Application
        </Button>
      </form>
    </div>
  );
};

export default CustomApplicationForm;
