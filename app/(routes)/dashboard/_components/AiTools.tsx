import React from "react";
import AiToolCard from "./AiToolCard";
import { ITool } from "../_types";

export const aiToolsList = [
  {
    title: "AI Career Q&A Chat",
    description: "Chat With AI Agent",
    image: "/chatbot.png",
    button: "Let's Chat",
    path: "/ai-tools/ai-chat",
  },
  {
    title: "AI Resume Analyzer",
    description: "Improve Your Resume",
    image: "/resume.png",
    button: "Analyze Now",
    path: "/ai-tools/ai-resume-analyzer",
  },
  {
    title: "Career Roadmap Generator",
    description: "Build Your Career Roadmap",
    image: "/roadmap.png",
    button: "Generate Now",
    path: "/ai-tools/ai-roadmap-agent",
  },
  {
    title: "Cover Letter Generator",
    description: "Write Your Cover Letter",
    image: "/cover.png",
    button: "Create Now",
    path: "/ai-cover-letter",
  },
];

export default function AiTools() {
  return (
    <div className="mt-7 p-5 bg-white border rounded-xl">
      <h2 className="font-bold text-lg">Available AI Tools</h2>
      <p>Start Building and Shape Your Career with this exciting AI Tools</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
        {aiToolsList.map((tool, index) => (
          <AiToolCard tool={tool} key={index} />
        ))}
      </div>
    </div>
  );
}
