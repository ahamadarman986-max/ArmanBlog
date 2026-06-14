import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const required = ["name", "email", "message"];
  const isValid = required.every((field) => typeof body?.[field] === "string" && body[field].trim().length > 1);

  if (!isValid) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const { name, email, projectType, message } = body;

  // 1. Log to server console for dev visibility
  console.log("\n========================================");
  console.log("📩 NEW CONTACT FORM INQUIRY RECEIVED");
  console.log(`👤 Name:         ${name}`);
  console.log(`📧 Email:        ${email}`);
  console.log(`💼 Project Type: ${projectType || "Not Specified"}`);
  console.log(`💬 Message:      ${message}`);
  console.log("========================================\n");

  // 2. Save submission locally in data/contact_submissions.json
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, "contact_submissions.json");
    let submissions = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      submissions = JSON.parse(fileContent || "[]");
    }

    submissions.push({
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      projectType: projectType || null,
      message,
      createdAt: new Date().toISOString()
    });

    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), "utf-8");
  } catch (error) {
    console.error("❌ Failed to save contact submission locally:", error);
  }

  return NextResponse.json({ ok: true });
}
