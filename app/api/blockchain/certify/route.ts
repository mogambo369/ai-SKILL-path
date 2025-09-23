import { NextRequest, NextResponse } from "next/server";
import { certifyUser } from "@/lib/blockchain";
await certifyUser(userId, courseId, timestamp);


export async function POST(req: NextRequest) {
  try {
    const { userId, courseId, timestamp } = await req.json();

    if (!userId || !courseId || !timestamp) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const res = await fetch("/api/blockchain/certify", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userId, courseId, timestamp: new Date().toISOString() }),
});
const data = await res.json();
if (data.success) {

}


    const fakeTxId = `${userId}-${courseId}-${Date.now()}`;

    return NextResponse.json({
      success: true,
      message: "Certification recorded on blockchain",
      transactionId: fakeTxId,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
