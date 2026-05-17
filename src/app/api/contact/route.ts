import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const supabase = getSupabaseClient();
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error: dbError } = await supabase.from("contact_messages").insert([
      { name, email, subject, message, created_at: new Date().toISOString() },
    ]);

    if (dbError) {
      console.error("Supabase error:", dbError);
    }

    const contactEmail = process.env.CONTACT_EMAIL || "ogiyatrimalakiano@gmail.com";

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: contactEmail,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">New message from your portfolio</h2>
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px;">
            <p><strong>Message:</strong></p>
            <p style="line-height: 1.6;">${message.replaceAll("\n", "<br>")}</p>
          </div>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
            Sent from ogiyatrimalakiano.dev portfolio
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
