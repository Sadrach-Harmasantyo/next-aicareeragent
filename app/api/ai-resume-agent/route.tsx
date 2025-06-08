import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import axios from "axios";
import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const resumeFile = formData.get("resumeFile") as File;
    const recordId = formData.get("recordId") as string;
    const user = await currentUser();

    const loader = new WebPDFLoader(resumeFile);
    const docs = await loader.load();
    console.log(docs[0]); //raw content

    const arrayBuffer = await resumeFile.arrayBuffer();
    const base64ResumeFile = Buffer.from(arrayBuffer).toString("base64");

    const resultIds = await inngest.send({
      name: "AiResumeAgent",
      data: {
        recordId,
        base64ResumeFile,
        pdfText: docs[0]?.pageContent,
        aiAgentType: "/ai-tools/ai-resume-analyzer",
        userEmail: user?.primaryEmailAddress?.emailAddress,
      },
    });

    const runId = resultIds?.ids[0];

    let runStatus;

    while (true) {
      runStatus = await getRuns(runId);

      if (runStatus?.data[0]?.status === "Completed") {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    
    // Perbaikan: Pastikan data dapat di-serialisasi
    try {
      // Coba ambil data output
      const outputData = runStatus.data?.[0].output?.output[0];
      
      // Jika outputData adalah objek, kembalikan langsung
      if (typeof outputData === 'object' && outputData !== null) {
        return NextResponse.json(outputData);
      }
      
      // Jika string, coba parse sebagai JSON
      if (typeof outputData === 'string') {
        try {
          const parsedData = JSON.parse(outputData);
          return NextResponse.json(parsedData);
        } catch {
          // Jika bukan JSON valid, kembalikan sebagai string biasa
          return NextResponse.json({ result: outputData });
        }
      }
      
      // Fallback jika tidak ada output yang valid
      return NextResponse.json({ success: true, recordId });
    } catch (serializationError) {
      console.error("Serialization error:", serializationError);
      // Kembalikan respons minimal yang pasti dapat di-serialisasi
      return NextResponse.json({ success: true, recordId });
    }
  } catch (error) {
    console.error("Error processing resume:", error);
    return NextResponse.json({ error: "Failed to process resume" }, { status: 500 });
  }
}

export async function getRuns(runId: string) {
  const result = await axios.get(
    `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs
`,
    {
      headers: {
        Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
      },
    }
  );

  return result.data;
}
