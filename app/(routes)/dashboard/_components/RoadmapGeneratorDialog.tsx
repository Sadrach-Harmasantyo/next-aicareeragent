import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2Icon, Sparkles } from "lucide-react";
import axios from "axios";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function RoadmapGeneratorDialog({
  openRoadmap,
  setOpenRoadmap,
}: any) {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { has } = useAuth();

  const GenerateRoadmap = async () => {
    const roadmapId = v4();

    setLoading(true);
    try {
      //@ts-ignore
      const hasSubscriptionEnabled = await has({ plan: "pro" });
      if (!hasSubscriptionEnabled) {
        const resultHistory = await axios.get("/api/history");
        const hidtoryList = resultHistory.data;
        const isPresent = hidtoryList.find(
          (item: any) => item?.aiAgentType == "/ai-tools/ai-roadmap-agent"
        );

        router.push("/billing");

        if (isPresent) {
          return null;
        }
      }

      const result = await axios.post("/api/ai-roadmap-agent", {
        roadmapId,
        userInput,
      });
      console.log(result.data);
      router.push(`/ai-tools/ai-roadmap-agent/${roadmapId}`);
      setOpenRoadmap(false);
      setLoading(false);
    } catch (error) {
      console.error("Process error:", error);
      // Display error to user
      //   alert("Failed to process request. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={openRoadmap} onOpenChange={setOpenRoadmap}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Position/Skills to Generate Roadmap</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-2">
              <Input
                placeholder="e.g Full Stack Developer"
                onChange={(e) => setUserInput(e?.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"outline"} onClick={() => setOpenRoadmap(false)}>
            Cancel
          </Button>
          <Button onClick={GenerateRoadmap} disabled={loading || !userInput}>
            {loading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
