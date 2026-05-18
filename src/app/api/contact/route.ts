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

    // ── 1. Save to Supabase ──────────────────────────────────────────────
    try {
      const supabase = getSupabaseClient();
      const { error: dbError } = await supabase
        .from("contact_messages")
        .insert([{ name, email, subject, message }]);

      if (dbError) console.error("[Supabase] insert error:", dbError.message);
    } catch (e) {
      console.error("[Supabase] client error:", e);
    }

    // ── 2. Send email via Resend ─────────────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.warn("[Resend] RESEND_API_KEY is not set — skipping email");
    } else {
      const resend = new Resend(resendKey);
      const contactEmail =
        process.env.CONTACT_EMAIL ?? "ogiyatrimalakiano23@gmail.com";

      const { error: emailError } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: contactEmail,
        subject: `[Portfolio] ${subject}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#7c3aed;">New message from your portfolio</h2>
            <table style="background:#f9fafb;border-radius:8px;padding:20px;width:100%;border-collapse:collapse;">
              <tr><td style="padding:4px 0"><strong>From:</strong> ${name}</td></tr>
              <tr><td style="padding:4px 0"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:4px 0"><strong>Subject:</strong> ${subject}</td></tr>
            </table>
            <div style="background:#f9fafb;border-radius:8px;padding:20px;margin-top:12px;">
              <strong>Message:</strong>
              <p style="line-height:1.6;margin-top:8px;">${message.replaceAll("\n", "<br>")}</p>
            </div>
            <p style="color:#9ca3af;font-size:12px;margin-top:20px;">
              Sent via ogiyatrimalakiano portfolio
            </p>
          </div>
        `,
      });

      if (emailError) {
        console.error("[Resend] send error:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API] unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
