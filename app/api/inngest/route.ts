import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {
  AICareerAgent,
  AiResumeAgent,
  AiRoadmapAgent,
  helloWorld,
} from "@/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    // helloWorld,
    AICareerAgent,
    AiResumeAgent,
    AiRoadmapAgent,
  ],
});
