// import { inngest } from "@/inngest/client";
// import { currentUser } from "@clerk/nextjs/server";
// import axios from "axios";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { roadmapId, userInput } = await req.json();

//   const userEmail = await currentUser();

//   const resultIds = await inngest.send({
//     name: "AiRoadmapAgent",
//     data: {
//       userInput,
//       roadmapId,
//       userEmail: userEmail?.primaryEmailAddress?.emailAddress,
//     },
//   });

//   const runId = resultIds?.ids[0];

//   let runStatus;

//   //use while loop to check if the run is completed
//   while (true) {
//     runStatus = await getRuns(runId);

//     if (runStatus?.data[0]?.status === "Completed") {
//       break;
//     }

//     await new Promise((resolve) => setTimeout(resolve, 500));
//   }

//   return NextResponse.json(runStatus.data?.[0].output?.output[0]);
// }

// export async function getRuns(runId: string) {
//   const result = await axios.get(
//     `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
//       },
//     }
//   );

//   return result.data;
// }
// route.tsx
// app/api/ai-roadmap-agent/route.tsx
import { inngest } from "@/inngest/client"; // Pastikan path ini benar
import { getRuns } from "@/lib/getRuns";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { NextResponse } from "next/server";

// Fungsi untuk mengambil status run Inngest
// export async function getRuns(runId: string) {
//   console.log(`--- SERVER LOG: getRuns called for runId: ${runId}`);

//   if (!process.env.INNGEST_SERVER_HOST || !process.env.INNGEST_SIGNING_KEY) {
//     console.error(
//       "--- SERVER LOG: INNGEST_SERVER_HOST or INNGEST_SIGNING_KEY is not set in environment variables."
//     );
//     throw new Error("Inngest server configuration missing.");
//   }

//   const url = `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`; // Pastikan TIDAK ADA NEWLINE
//   console.log("--- SERVER LOG: Fetching Inngest run status from URL:", url);
//   // Untuk keamanan, jangan log seluruh signing key. Cukup pastikan env var ada.
//   // console.log("--- SERVER LOG: Using INNGEST_SIGNING_KEY (first 5 chars):", process.env.INNGEST_SIGNING_KEY.substring(0,5) + "...");

//   try {
//     const result = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
//         "Content-Type": "application/json",
//       },
//       timeout: 15000, // Timeout untuk request axios, misalnya 15 detik
//     });
//     console.log(
//       "--- SERVER LOG: getRuns - Axios GET successful, status:",
//       result.status
//     );
//     return result.data;
//   } catch (error) {
//     console.error(`--- SERVER LOG: Error in getRuns for runId ${runId}`);
//     if (axios.isAxiosError(error)) {
//       console.error("--- SERVER LOG: Axios error details:", {
//         message: error.message,
//         url: error.config?.url,
//         method: error.config?.method,
//         status: error.response?.status,
//         responseData: error.response?.data,
//       });
//     } else if (error instanceof Error) {
//       console.error(
//         "--- SERVER LOG: Non-Axios error details:",
//         error.message,
//         error.stack
//       );
//     } else {
//       console.error("--- SERVER LOG: Unknown error in getRuns:", error);
//     }
//     throw error; // Re-throw agar ditangkap oleh pemanggil
//   }
// }

// Handler POST untuk API route
export async function POST(req: Request) {
  console.log("--- SERVER LOG: API /api/ai-roadmap-agent POST CALLED ---");
  try {
    const { roadmapId, userInput } = await req.json();
    console.log("--- SERVER LOG: Request body:", { roadmapId, userInput });

    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    console.log("--- SERVER LOG: User email:", userEmail);

    if (!userEmail) {
      console.error(
        "--- SERVER LOG: User email not found, user not authenticated."
      );
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const resultIds = await inngest.send({
      name: "AiRoadmapAgent", // Pastikan nama fungsi Inngest ini benar
      data: {
        userInput,
        roadmapId,
        userEmail,
      },
    });
    console.log("--- SERVER LOG: Inngest send resultIds:", resultIds);

    const runId = resultIds?.ids?.[0];
    if (!runId) {
      console.error("--- SERVER LOG: Inngest runId not found in resultIds.");
      return NextResponse.json(
        { error: "Failed to initiate Inngest job" },
        { status: 500 }
      );
    }
    console.log("--- SERVER LOG: Inngest runId:", runId);

    let runStatus;
    let attempts = 0;
    const maxAttempts = 60; // Max 60 attempts * 1 detik = 60 detik timeout polling
    const pollInterval = 1000; // Poll setiap 1 detik

    console.log(
      `--- SERVER LOG: Starting polling for Inngest runId ${runId} with max ${maxAttempts} attempts.`
    );

    while (attempts < maxAttempts) {
      console.log(
        `--- SERVER LOG: Polling Inngest run status, attempt ${
          attempts + 1
        }/${maxAttempts}`
      );
      try {
        runStatus = await getRuns(runId);
        // Log seluruh runStatus bisa sangat verbose, cukup log bagian penting jika perlu
        // console.log("--- SERVER LOG: Current runStatus (full):", JSON.stringify(runStatus, null, 2));
        console.log(
          "--- SERVER LOG: Current runStatus.data[0].status:",
          runStatus?.data?.[0]?.status
        );
        console.log(
          "--- SERVER LOG: Current runStatus.data[0].output:",
          JSON.stringify(runStatus?.data?.[0]?.output, null, 2)
        );
      } catch (error) {
        console.error(
          "--- SERVER LOG: Error in getRuns inside while loop:",
          error
        );
        // Jika getRuns gagal, kita hentikan polling dan kembalikan error
        return NextResponse.json(
          { error: "Failed to get run status from Inngest during polling" },
          { status: 500 }
        );
      }

      const currentJobStatus = runStatus?.data?.[0]?.status;
      if (currentJobStatus === "Completed") {
        console.log("--- SERVER LOG: Inngest run COMPLETED.");
        break;
      } else if (
        currentJobStatus === "Failed" ||
        currentJobStatus === "Cancelled"
      ) {
        console.error(
          `--- SERVER LOG: Inngest run ${currentJobStatus}. Output:`,
          runStatus?.data?.[0]?.output
        );
        return NextResponse.json(
          {
            error: `Inngest job ${currentJobStatus}`,
            details: runStatus?.data?.[0]?.output,
          },
          { status: 500 }
        );
      }

      attempts++;
      if (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
      }
    }

    if (
      attempts >= maxAttempts &&
      runStatus?.data?.[0]?.status !== "Completed"
    ) {
      console.error(
        "--- SERVER LOG: Polling Inngest timed out. Last status:",
        runStatus?.data?.[0]?.status
      );
      return NextResponse.json(
        { error: "Processing timed out waiting for Inngest job completion" },
        { status: 508 }
      ); // 508 Loop Detected atau 504 Gateway Timeout
    }

    // Ekstraksi dan penanganan output dari Inngest
    const inngestJobOutput = runStatus?.data?.[0]?.output;
    console.log(
      "--- SERVER LOG: Raw output from completed Inngest job:",
      JSON.stringify(inngestJobOutput, null, 2)
    );

    let finalResponseData = null; // Default ke null agar JSON serializable

    // =======================================================================================
    // PENTING: SESUAIKAN LOGIKA DI BAWAH INI BERDASARKAN STRUKTUR OUTPUT FUNGSI INNGEST ANDA
    // =======================================================================================
    // Kasus 1: Output Inngest adalah objek yang memiliki properti 'output' berisi array,
    // dan Anda ingin elemen pertama dari array tersebut. (Sesuai upaya awal Anda)
    // Contoh: Fungsi Inngest mengembalikan: { output: [{ id: 1, name: "item1"}, ...] }
    if (
      inngestJobOutput &&
      typeof inngestJobOutput === "object" &&
      inngestJobOutput.hasOwnProperty("output") &&
      Array.isArray(inngestJobOutput.output) &&
      inngestJobOutput.output.length > 0
    ) {
      finalResponseData = inngestJobOutput.output[0];
      console.log(
        "--- SERVER LOG: Extracted finalResponseData using inngestJobOutput.output[0]"
      );
    }
    // Kasus 2: Output Inngest adalah objek itu sendiri yang ingin Anda kembalikan.
    // Contoh: Fungsi Inngest mengembalikan: { id: 1, name: "item1" }
    else if (
      inngestJobOutput &&
      typeof inngestJobOutput === "object" &&
      !Array.isArray(inngestJobOutput)
    ) {
      finalResponseData = inngestJobOutput;
      console.log(
        "--- SERVER LOG: Extracted finalResponseData using inngestJobOutput directly (as object)"
      );
    }
    // Kasus 3: Output Inngest adalah array itu sendiri yang ingin Anda kembalikan.
    // Contoh: Fungsi Inngest mengembalikan: [{ id: 1, name: "item1"}, ...]
    else if (inngestJobOutput && Array.isArray(inngestJobOutput)) {
      finalResponseData = inngestJobOutput; // Anda mungkin ingin elemen pertama: inngestJobOutput[0] jika hanya satu
      console.log(
        "--- SERVER LOG: Extracted finalResponseData using inngestJobOutput directly (as array)"
      );
    }
    // Kasus 4: Output Inngest adalah nilai primitif (string, number, boolean)
    else if (
      inngestJobOutput !== null &&
      inngestJobOutput !== undefined &&
      (typeof inngestJobOutput === "string" ||
        typeof inngestJobOutput === "number" ||
        typeof inngestJobOutput === "boolean")
    ) {
      finalResponseData = inngestJobOutput;
      console.log(
        "--- SERVER LOG: Extracted finalResponseData using inngestJobOutput directly (as primitive)"
      );
    }
    // Jika output Inngest adalah null atau tidak cocok dengan struktur di atas
    else if (inngestJobOutput === null) {
      console.log(
        "--- SERVER LOG: Inngest job output is null. finalResponseData remains null."
      );
      // finalResponseData sudah null
    } else {
      console.warn(
        "--- SERVER LOG: Inngest job completed, but output is in an unexpected format or empty. finalResponseData remains null. Output was:",
        JSON.stringify(inngestJobOutput, null, 2)
      );
      // finalResponseData sudah null
    }
    // =======================================================================================
    // AKHIR DARI BAGIAN YANG PERLU DISESUAIKAN
    // =======================================================================================

    console.log(
      "--- SERVER LOG: Data being sent to NextResponse.json:",
      JSON.stringify(finalResponseData, null, 2)
    );
    return NextResponse.json(finalResponseData);
  } catch (error: any) {
    console.error(
      "--- SERVER LOG: Unhandled error in /api/ai-roadmap-agent POST handler:",
      error.message,
      error.stack
    );
    // Kirim respons error generik ke client
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}
