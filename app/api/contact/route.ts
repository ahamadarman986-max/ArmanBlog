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

  // 3. Send email notification via Resend API (if configured)
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`
        },
        body: JSON.stringify({
          from: "Arman Ahamad Blog <onboarding@resend.dev>",
          to: "ahamadarman986@gmail.com",
          subject: `New Web Inquiry: ${projectType || "General"} from ${name}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #111;">
              <h2 style="color: #b9894b; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Contact Inquiry</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Project Type:</strong> ${projectType || "Not Specified"}</p>
              <p><strong>Message:</strong></p>
              <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #b9894b; white-space: pre-wrap;">${message}</div>
              <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;" />
              <p style="font-size: 12px; color: #666;">This message was submitted through the contact form on your portfolio website.</p>
            </div>
          `
        })
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error("❌ Resend API response error:", errorText);
      } else {
        console.log("🚀 Email notification sent successfully via Resend");
      }
    } catch (err) {
      console.error("❌ Failed to send email via Resend API:", err);
    }
  } else {
    console.log("⚠️ Resend API Key is not configured; skipped sending email.");
  }

  // 4. Send WhatsApp notification via CallMeBot (if configured)
  const callmebotKey = process.env.CALLMEBOT_API_KEY;
  if (callmebotKey) {
    try {
      const waText = `🔔 *New Contact Inquiry*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n💼 *Project:* ${projectType || "Not Specified"}\n💬 *Message:* ${message}`;
      const encodedText = encodeURIComponent(waText);
      const callmebotUrl = `https://api.callmebot.com/whatsapp.php?phone=9779716293191&text=${encodedText}&apikey=${callmebotKey}`;
      
      const waResponse = await fetch(callmebotUrl);
      if (!waResponse.ok) {
        const errorText = await waResponse.text();
        console.error("❌ CallMeBot WhatsApp API response error:", errorText);
      } else {
        console.log("🚀 WhatsApp notification sent successfully via CallMeBot");
      }
    } catch (err) {
      console.error("❌ Failed to send WhatsApp notification via CallMeBot:", err);
    }
  } else {
    console.log("⚠️ CallMeBot API Key is not configured; skipped sending WhatsApp message.");
  }

  return NextResponse.json({ ok: true });
}
