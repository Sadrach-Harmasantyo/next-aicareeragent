import { db } from "@/configs/db";
import { NextResponse } from "next/server";
import { HistoryTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { content, recordId, aiAgentType } = await req.json();
  const user = await currentUser();

  try {
    //insert record
    const result = await db.insert(HistoryTable).values({
      content,
      recordId,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: new Date().toString(),
      aiAgentType: aiAgentType,
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PUT(req: Request) {
  const { content, recordId } = await req.json();
  const user = await currentUser();

  try {
    //insert record
    const result = await db
      .update(HistoryTable)
      .set({
        content,
      })
      .where(eq(HistoryTable.recordId, recordId));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const recordId = searchParams.get("recordId");
//   const user = await currentUser();

//   try {
//     if (recordId) {
//       const result = await db
//         .select()
//         .from(HistoryTable)
//         .where(eq(HistoryTable.recordId, recordId));
//       return NextResponse.json(result[0]);
//     } else {
//       const result = await db
//         .select()
//         .from(HistoryTable)
//         .where(
//           eq(HistoryTable.userEmail, user?.primaryEmailAddress?.emailAddress)
//         );
//       return NextResponse.json(result);
//     }

//     return NextResponse.json({});
//   } catch (error) {
//     return NextResponse.json(error);
//   }
// }
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const recordId = searchParams.get("recordId");
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress; // Ambil email sekali

  try {
    if (recordId) {
      // Pastikan recordId tidak null atau undefined sebelum digunakan dengan eq
      if (!recordId) {
        return NextResponse.json(
          { error: "recordId is required when provided" },
          { status: 400 }
        );
      }
      const result = await db
        .select()
        .from(HistoryTable)
        .where(eq(HistoryTable.recordId, recordId)); // eq di sini juga butuh string, bukan string | null
      return NextResponse.json(result[0] || null); // Kembalikan null jika tidak ada hasil
    } else {
      // Hanya query berdasarkan userEmail jika userEmail ada
      if (userEmail) {
        const result = await db
          .select()
          .from(HistoryTable)
          .where(eq(HistoryTable.userEmail, userEmail))
          .orderBy(desc(HistoryTable.id)); // userEmail di sini PASTI string
        return NextResponse.json(result);
      } else {
        // Jika tidak ada recordId dan tidak ada userEmail (misalnya user tidak login)
        // Putuskan apa yang akan dikembalikan. Mungkin array kosong atau error.
        console.warn(
          "Attempted to GET history without recordId and no authenticated user email."
        );
        return NextResponse.json([]); // Kembalikan array kosong sebagai contoh
        // Atau:
        // return NextResponse.json({ error: "User not authenticated or email not available" }, { status: 401 });
      }
    }
  } catch (error) {
    console.error("Error in GET /api/history:", error);
    // Hindari mengirimkan objek error mentah ke client dalam produksi
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch history", details: errorMessage },
      { status: 500 }
    );
  }
}
