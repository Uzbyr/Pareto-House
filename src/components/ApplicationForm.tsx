
import { useState } from "react";
import { toast } from "sonner";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    linkedin: "",
    twitter: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted successfully!");
    // Handle form submission logic here
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100000000) { // 100MB limit
        toast.error("Video file is too large. Please upload a file smaller than 100MB");
        return;
      }
      setVideo(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 text-left">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-pareto-pink mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full px-4 py-2 bg-white/10 border border-pareto-pink/20 rounded text-white"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="school" className="block text-sm font-medium text-pareto-pink mb-1">
            School
          </label>
          <input
            type="text"
            id="school"
            required
            className="w-full px-4 py-2 bg-white/10 border border-pareto-pink/20 rounded text-white"
            value={formData.school}
            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-pareto-pink mb-1">
            LinkedIn URL
          </label>
          <input
            type="url"
            id="linkedin"
            required
            className="w-full px-4 py-2 bg-white/10 border border-pareto-pink/20 rounded text-white"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="twitter" className="block text-sm font-medium text-pareto-pink mb-1">
            Twitter Handle
          </label>
          <input
            type="text"
            id="twitter"
            className="w-full px-4 py-2 bg-white/10 border border-pareto-pink/20 rounded text-white"
            value={formData.twitter}
            onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-pareto-pink mb-1">
            Resume (PDF)
          </label>
          <input
            type="file"
            id="resume"
            accept=".pdf"
            required
            className="w-full px-4 py-2 bg-white/10 border border-pareto-pink/20 rounded text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pareto-pink file:text-black hover:file:bg-white"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
          />
        </div>

        <div>
          <label htmlFor="video" className="block text-sm font-medium text-pareto-pink mb-1">
            90-Second Video Introduction
          </label>
          <input
            type="file"
            id="video"
            accept="video/*"
            required
            className="w-full px-4 py-2 bg-white/10 border border-pareto-pink/20 rounded text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pareto-pink file:text-black hover:file:bg-white"
            onChange={handleVideoUpload}
          />
          <p className="text-xs text-pareto-pink mt-1">
            Accepted formats: MP4, MOV, AVI, WebM (max 100MB)
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-8 py-4 bg-pareto-pink text-black font-semibold hover:bg-white transition-colors duration-300"
      >
        Submit Application
      </button>
    </form>
  );
};

export default ApplicationForm;
