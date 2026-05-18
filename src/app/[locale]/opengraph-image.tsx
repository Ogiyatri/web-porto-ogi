import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ogi Yatri Malakiano — Fullstack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tags = ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Kubernetes"];

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0d0d14 0%, #0f0a1e 50%, #0d0d14 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glows */}
        <div style={{
          position: "absolute", top: "-100px", right: "-100px",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute", bottom: "-80px", left: "100px",
          width: "350px", height: "350px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)",
          display: "flex",
        }} />

        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "28px", fontWeight: "800", color: "#a78bfa", letterSpacing: "-0.5px" }}>
            Ogi.
          </span>
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
            borderRadius: "999px", padding: "8px 16px",
          }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", display: "flex" }} />
            <span style={{ fontSize: "14px", color: "#86efac", fontWeight: "600" }}>Available for work</span>
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "16px", color: "#7c3aed", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase" }}>
            Fullstack Developer
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            <span style={{ fontSize: "72px", fontWeight: "800", color: "#f3f4f6", lineHeight: "1.1", letterSpacing: "-2px" }}>
              Ogi Yatri
            </span>
            <span style={{ fontSize: "72px", fontWeight: "800", color: "#f3f4f6", lineHeight: "1.1", letterSpacing: "-2px" }}>
              Malakiano
            </span>
          </div>
          <div style={{ fontSize: "20px", color: "#9ca3af", lineHeight: "1.5", maxWidth: "700px" }}>
            Building production-grade apps for Kemendagri, DPR RI, and national organizations.
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)",
                  borderRadius: "6px", padding: "6px 12px",
                  fontSize: "13px", color: "#c4b5fd", fontWeight: "500",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#6b7280", fontSize: "14px" }}>
            <span>📍</span>
            <span>Jakarta, Indonesia</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
