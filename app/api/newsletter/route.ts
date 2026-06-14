import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = body?.email;

  if (typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  // 1. Log to server console for dev visibility
  console.log("\n========================================");
  console.log("📨 NEW NEWSLETTER SUBSCRIPTION");
  console.log(`📧 Email: ${email}`);
  console.log("========================================\n");

  // 2. Save submission locally in data/newsletter_submissions.json
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, "newsletter_submissions.json");
    let subscriptions: Array<{ email: string; id: string; createdAt: string }> = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      subscriptions = JSON.parse(fileContent || "[]");
    }

    // Only add if not already subscribed to avoid duplicates
    if (!subscriptions.some((sub) => sub.email.toLowerCase() === email.toLowerCase())) {
      subscriptions.push({
        id: Math.random().toString(36).substring(2, 9),
        email,
        createdAt: new Date().toISOString()
      });
      fs.writeFileSync(filePath, JSON.stringify(subscriptions, null, 2), "utf-8");
    }
  } catch (error) {
    console.error("❌ Failed to save newsletter subscription locally:", error);
  }

  return NextResponse.json({ ok: true });
}
