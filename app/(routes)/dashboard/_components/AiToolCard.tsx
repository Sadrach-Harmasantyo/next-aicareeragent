"use client";

import Image from "next/image";
import React, { useState } from "react";
import { ITool } from "../_types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import ResumeUploadDialog from "./ResumeUploadDialog";
import RoadmapGeneratorDialog from "./RoadmapGeneratorDialog";

type AiToolCardProps = {
  tool: ITool;
};

export default function AiToolCard({ tool }: AiToolCardProps) {
  const id = uuidv4();

  const { user } = useUser();
  const router = useRouter();

  const [openResume, setOpenResume] = useState(false);
  const [openRoadmap, setOpenRoadmap] = useState(false);

  const onClickButton = async () => {
    if (tool.title == "AI Resume Analyzer") {
      setOpenResume(true);
      return;
    }

    if (tool.path == "/ai-tools/ai-roadmap-agent") {
      setOpenRoadmap(true);
      return;
    }

    //create new record to history table
    const result = await axios.post("/api/history", {
      content: [],
      recordId: id,
      aiAgentType: tool.path,
    });
    console.log(result);

    router.push(tool.path + "/" + id);
  };

  return (
    <div className="p-3 border rounded-lg">
      <Image src={tool.image} alt={tool.title} width={40} height={40} />
      <h2 className="font-medium mt-2">{tool.title}</h2>
      <p className="text-gray-400">{tool.description}</p>

      <Button onClick={onClickButton} className="w-full mt-3">
        {tool.button}
      </Button>

      <ResumeUploadDialog
        openResume={openResume}
        setOpenResume={setOpenResume}
      />

      <RoadmapGeneratorDialog
        openRoadmap={openRoadmap}
        setOpenRoadmap={() => setOpenRoadmap(false)}
      />
    </div>
  );
}
