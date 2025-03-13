import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#EC4899",
  "#8B5CF6",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

const genderData = [
  { name: "Male", value: 54 },
  { name: "Female", value: 42 },
  { name: "Non-binary", value: 3 },
  { name: "Prefer not to say", value: 1 },
];

const ethnicityData = [
  { name: "White", value: 38 },
  { name: "Asian", value: 32 },
  { name: "Hispanic/Latino", value: 12 },
  { name: "Black", value: 10 },
  { name: "Multiracial", value: 6 },
  { name: "Other", value: 2 },
];

const ageData = [
  { name: "18-19", value: 28 },
  { name: "20-21", value: 45 },
  { name: "22-23", value: 19 },
  { name: "24+", value: 8 },
];

const educationData = [
  { name: "Computer Science", value: 35 },
  { name: "Business", value: 18 },
  { name: "Engineering", value: 15 },
  { name: "Mathematics", value: 12 },
  { name: "Physics", value: 8 },
  { name: "Other", value: 12 },
];

const DemographicsChart = () => {
  const [activeChart, setActiveChart] = useState<
    "gender" | "ethnicity" | "age" | "education"
  >("gender");

  const getActiveData = () => {
    switch (activeChart) {
      case "gender":
        return genderData;
      case "ethnicity":
        return ethnicityData;
      case "age":
        return ageData;
      case "education":
        return educationData;
      default:
        return genderData;
    }
  };

  return (
    <Card className="bg-zinc-800 border-zinc-700 p-6">
      <h2 className="text-xl font-bold text-white mb-6">
        Applicant Demographics
      </h2>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={activeChart === "gender" ? "pink" : "outline"}
          className={
            activeChart !== "gender"
              ? "border-zinc-700 text-gray-300 hover:bg-zinc-800"
              : ""
          }
          onClick={() => setActiveChart("gender")}
          size="sm"
        >
          Gender
        </Button>
        <Button
          variant={activeChart === "ethnicity" ? "pink" : "outline"}
          className={
            activeChart !== "ethnicity"
              ? "border-zinc-700 text-gray-300 hover:bg-zinc-800"
              : ""
          }
          onClick={() => setActiveChart("ethnicity")}
          size="sm"
        >
          Ethnicity
        </Button>
        <Button
          variant={activeChart === "age" ? "pink" : "outline"}
          className={
            activeChart !== "age"
              ? "border-zinc-700 text-gray-300 hover:bg-zinc-800"
              : ""
          }
          onClick={() => setActiveChart("age")}
          size="sm"
        >
          Age
        </Button>
        <Button
          variant={activeChart === "education" ? "pink" : "outline"}
          className={
            activeChart !== "education"
              ? "border-zinc-700 text-gray-300 hover:bg-zinc-800"
              : ""
          }
          onClick={() => setActiveChart("education")}
          size="sm"
        >
          Field of Study
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={getActiveData()}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {getActiveData().map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  color: "#F9FAFB",
                }}
                formatter={(value) => [`${value}%`, ""]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getActiveData()}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9CA3AF" />
              <YAxis
                dataKey="name"
                type="category"
                stroke="#9CA3AF"
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  color: "#F9FAFB",
                }}
                formatter={(value) => [`${value}%`, ""]}
              />
              <Bar dataKey="value" fill="#EC4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="text-sm text-gray-400 mt-4">
        Demographic information is self-reported by applicants and used for
        diversity monitoring purposes only. This data is not considered during
        the application review process.
      </p>
    </Card>
  );
};

export default DemographicsChart;
