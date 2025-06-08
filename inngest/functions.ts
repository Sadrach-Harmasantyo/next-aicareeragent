import { db } from "@/configs/db";
import { inngest } from "./client";
import { createAgent, gemini, openai } from "@inngest/agent-kit";
import ImageKit from "imagekit";
import { HistoryTable } from "@/configs/schema";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const AiCareerChatAgent = createAgent({
  name: "AiCareerChatAgent",
  description: "An Ai Agent that answers career realted questions",
  system: `You are a helpful, professional AI Career Coach Agent. Your role is to guide users with questions related to careers, including job search advice, interview preparation, resume improvement, skill development, career transitions, and industry trends.
  
  Always respond with clarity, encouragement, and actionable advice tailored to user's needs.
  
  If the user asks something unrelated to careers (e.g., topics like health, relationships, coding help, or general trivia) gently inform them that you are a career coash and suggest relevant career-focused questions instead.`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY,
  }),
});

export const AiResumeAnalyzerAgent = createAgent({
  name: "AiResumeAnalyzerAgent",
  description: "AI Resume Analyzer Agent help to Return Report",
  system: `You are an advanced Al Resume Analyzer Agent.
Your task is to evaluate a candidate's resume and return a detailed analysis in the following structured JSON schema format.
The schema must match the layout and structure of a visual UI that includes overall score, section scores, summary feedback, improvement tips, strengths, and weaknesses.

INPUT: I will provide a plain text resume.
GOAL: Output a JSON report as per the schema below. The report should reflect:

overall_score (0-100)

overall_feedback (short message e.g., "Excellent", "Needs improvement")

summary_comment (1-2 sentence evaluation summary)

Section scores for:

Contact Info

Experience

Education

Skills

Each section should include:

score (as percentage)

Optional comment about that section

Tips for improvement (3-5 tips)

What's Good (1-3 strengths)

Needs Improvement (1-3 weaknesses)

Output JSON Schema:
json
Copy
Edit
{
"overall_score": 85,
"overall_feedback": "Excellent!",
"summary_comment": "Your resume is strong, but there are areas to refine.",
"sections": {
"contact_info": {
"score": 95,
"comment": "Perfectly structured and complete."
},
"experience": {
"score": 88,
"comment": "Strong bullet points and impact."
},
"education": {
"score": 70,
"comment": "Consider adding relevant coursework."
},
"skills": {
"score": 60,
"comment": "Expand on specific skill proficiencies."
}
},
"tips_for_improvement": [
"Add more numbers and metrics to your experience section to show impact.",
"Integrate more industry-specific keywords relevant to your target roles.",
"Start bullet points with strong action verbs to make your achievements stand out."
],
"whats_good": [
"Clean and professional formatting.",
"Clear and concise contact information.",
"Relevant work experience."
],
"needs_improvement": [
"Skills section lacks detail.",
"Some experience bullet points could be stronger.",
"Missing a professional summary/objective."
]
}`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY,
  }),
});

export const AiRoadmapGeneratorAgent = createAgent({
  name: "AiRoadmapGeneratorAgent",
  description: "Generate Details Tree Like Flow Roadmap",
  //   system: `Generate a React Flow tree-structured learning roadmap for the user's input (position/skills).
  // The output must be in JSON format.

  // Follow these formatting guidelines strictly:

  // 1.  **Overall Structure:**
  //     *   Create a vertical tree structure.
  //     *   The layout should be visually similar to roadmap.sh, emphasizing a clear, step-by-step progression.
  //     *   Order steps logically from fundamental concepts to more advanced topics.
  //     *   Include branching for different specializations or alternative paths where applicable.

  // 2.  **Node Positioning (Crucial for Clarity):**
  //     *   Assign meaningful x and y positions to each node to form a clear, easy-to-follow flow.
  //     *   **Ensure ample spacing between nodes, both vertically and horizontally, to prevent overcrowding and improve readability. Nodes should not overlap or appear too close to each other.**
  //     *   **Vertical Spacing:** Maintain a consistent and generous vertical distance between sequential nodes in a direct path. For example, a minimum of 100-150 units vertically.
  //     *   **Horizontal Spacing:** When branching, or for nodes at the same conceptual level, ensure sufficient horizontal separation. For example, a minimum of 200-300 units horizontally between sibling branches.
  //     *   The root node (e.g., id: '1') should typically start at or near { x: 0, y: 0 }.

  // 3.  **Node Data:**
  //     *   Each node object must include:
  //         *   id: A unique string identifier (e.g., '1', '2a', '3b-1').
  //         *   type: Must always be 'turbo'.
  //         *   position: An object with x and y numerical coordinates.
  //         *   data: An object containing:
  //             *   title: A concise title for the step.
  //             *   description: A short (1-3 lines) explanation of what the step covers.
  //             *   link: A relevant and helpful URL for learning this step.

  // 4.  **Edge Data:**
  //     *   Each edge object must include:
  //         *   id: A unique string identifier for the edge (e.g., 'e1-2', 'e2a-3a').
  //         *   source: The id of the source node.
  //         *   target: The id of the target node.

  // 5.  **JSON Output Format:**
  //     The entire response must be a single JSON object with the following top-level keys:
  //     {
  //       "roadmapTitle": "Descriptive Title of the Roadmap",
  //       "description": "A 3-5 line overview of what this roadmap covers.",
  //       "duration": "Estimated total duration (e.g., '3-6 months', '120 hours')",
  //       "initialNodes": [
  //         {
  //           "id": "1",
  //           "type": "turbo",
  //           "position": { "x": 0, "y": 0 },
  //           "data": {
  //             "title": "Example: Introduction to Core Concept",
  //             "description": "This is the foundational step covering the basics.",
  //             "link": "https://example.com/intro-core-concept"
  //           }
  //         }
  //         // ... more nodes
  //       ],
  //       "initialEdges": [
  //         {
  //           "id": "e1-2",
  //           "source": "1",
  //           "target": "2"
  //         }
  //         // ... more edges
  //       ]
  //     }
  // `,
  system: `Generate a React Flow tree-structured learning roadmap based on user input (position/skills). Follow the format below:

Visual Format:
- Use a vertical tree layout (like roadmap.sh) that flows top-to-bottom.
- Ensure nodes are spaced out clearly — avoid overlap or tight clustering.
- Set 'position.x' to vary horizontally for branch separation.
- Set 'position.y' to increase by a fixed step (e.g., 200–300 units) for each new level in the tree.
- Branches must be placed distinctly (e.g., Frontend vs Backend should not be too close).
- Always make sure the layout is readable and logical.

Each node must include:
- A unique 'id'
- type: always 'turbo'
- position: { x, y }
- data: { title, description, link } //all data must be not null

Edge Format:
- Use unique 'id' for each edge
- source and target should refer to node 'id'

Final Output:
Respond only with valid JSON format as follows:

{
  roadmapTitle: "<Roadmap Title>",
  description: "<3–5 line roadmap description>",
  duration: "<e.g. 3–6 months>",
  initialNodes: [ ... ],
  initialEdges: [ ... ]
}
`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY,
  }),
});

export const AICareerAgent = inngest.createFunction(
  { id: "AiCareerAgent" },
  { event: "AiCareerAgent" },
  async ({ event, step }) => {
    const { userInput } = await event?.data;
    const result = await AiCareerChatAgent.run(userInput);

    return result;
  }
);

var imagekit = new ImageKit({
  // @ts-ignore
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  // @ts-ignore
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  // @ts-ignore
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const AiResumeAgent = inngest.createFunction(
  { id: "AiResumeAgent" },
  { event: "AiResumeAgent" },
  async ({ event, step }) => {
    const { recordId, base64ResumeFile, pdfText, aiAgentType, userEmail } =
      await event?.data;

    //upload to cloud storage
    const uploadFileUrl = await step.run(
      "Upload Image to Cloud Storage",
      async () => {
        const imageKitFile = await imagekit.upload({
          file: base64ResumeFile,
          fileName: `resume-${Date.now()}.pdf`,
          isPublished: true,
        });
        return imageKitFile.url;
      }
    );

    const aiResumeReport = await AiResumeAnalyzerAgent.run(pdfText);
    // @ts-ignore
    const rawContent = aiResumeReport.output[0].content;
    const rawContentJson = rawContent.replace("```json", "").replace("```", "");
    const parseJson = JSON.parse(rawContentJson);

    // return parseJson;

    //save to DB
    const saveToDb = await step.run("Save to DB", async () => {
      const result = await db.insert(HistoryTable).values({
        recordId: recordId,
        content: parseJson,
        aiAgentType: aiAgentType,
        createdAt: new Date().toString(),
        userEmail: userEmail,
        metaData: uploadFileUrl,
      });
      console.log("result", result);
      return parseJson;
    });
  }
);

export const AiRoadmapAgent = inngest.createFunction(
  { id: "AiRoadmapAgent" },
  { event: "AiRoadmapAgent" },
  async ({ event, step }) => {
    const { roadmapId, userInput, userEmail } = await event?.data;
    const roadmapResult = await AiRoadmapGeneratorAgent.run(userInput);

    // @ts-ignore
    const rawContent = roadmapResult.output[0].content;
    const rawContentJson = rawContent.replace("```json", "").replace("```", "");
    const parseJson = JSON.parse(rawContentJson);

    //save to DB
    const saveToDb = await step.run("Save to DB", async () => {
      const result = await db.insert(HistoryTable).values({
        recordId: roadmapId,
        content: parseJson,
        aiAgentType: "/ai-tools/ai-roadmap-agent",
        createdAt: new Date().toString(),
        userEmail: userEmail,
        metaData: userInput,
      });
      console.log("result", result);
      return parseJson;
    });

    // return roadmapResult;
  }
);
