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
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { File, Loader2Icon, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ResumeUploadDialog({ openResume, setOpenResume }: any) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { has } = useAuth();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle the uploaded file here
      console.log("Uploaded file:", file.name);
      setUploadedFile(file);
    }
  };

  const onUploadAndAnalyze = async () => {
    setLoading(true);
    try {
      const recordId = uuidv4();

      const formData = new FormData();
      formData.append("resumeFile", uploadedFile!);
      formData.append("recordId", recordId);

      //@ts-ignore
      const hasSubscriptionEnabled = await has({ plan: "pro" });
      if (!hasSubscriptionEnabled) {
        const resultHistory = await axios.get("/api/history");
        const hidtoryList = resultHistory.data;
        const isPresent = hidtoryList.find(
          (item: any) => item?.aiAgentType == "/ai-tools/ai-resume-analyzer"
        );

        router.push("/billing");

        if (isPresent) {
          return null;
        }
      }

      //send data to backend
      const result = await axios.post("/api/ai-resume-agent", formData);
      console.log(result.data);

      router.push(`/ai-tools/ai-resume-analyzer/${recordId}`);
      setOpenResume(false);
    } catch (error) {
      console.error("Upload error:", error);
      // Display error to user
      alert("Failed to upload resume. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={openResume} onOpenChange={setOpenResume}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Resume PDF File</DialogTitle>
          <DialogDescription asChild>
            <div>
              <label
                htmlFor="resumeUpload"
                className="flex items-center flex-col justify-center p-7 border border-dashed rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <File className="size-10" />
                {uploadedFile ? (
                  <p className="mt-3 text-blue-600">{uploadedFile?.name}</p>
                ) : (
                  <p className="mt-3">Click here to upload PDF file</p>
                )}
              </label>
              <input
                id="resumeUpload"
                type="file"
                className="hidden"
                accept="application/pdf"
                onChange={onFileChange}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"outline"} onClick={() => setOpenResume(false)}>
            Cancel
          </Button>
          <Button
            onClick={onUploadAndAnalyze}
            disabled={!uploadedFile || loading}
          >
            {loading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}{" "}
            Upload & Analyze
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
