import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name}, full-stack software engineer in Lagos. Available now for new roles.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontsDir = join(process.cwd(), "src/assets/fonts");

export default async function OpengraphImage() {
  const [display, body] = await Promise.all([
    readFile(join(fontsDir, "BricolageGrotesque-Bold.ttf")),
    readFile(join(fontsDir, "InstrumentSans-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0a0a09",
          color: "#f1f0ec",
          fontFamily: "Instrument Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 999,
              border: "2px solid #2a2926",
              borderTopColor: "#f5b53d",
              fontFamily: "Bricolage Grotesque",
              fontSize: 28,
              letterSpacing: -1.5,
            }}
          >
            TO
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 22px",
              borderRadius: 999,
              border: "1.5px solid rgba(110, 231, 183, 0.35)",
              background: "rgba(110, 231, 183, 0.1)",
              color: "#6ee7b7",
              fontSize: 24,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#6ee7b7" }} />
            {profile.availability}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Bricolage Grotesque",
              fontSize: 92,
              lineHeight: 0.98,
              letterSpacing: -3,
            }}
          >
            <span>Full-stack engineer</span>
            <span>shipping fintech, AI</span>
            <span style={{ color: "#9c9a94" }}>and travel products.</span>
          </div>
          <div style={{ display: "flex", marginTop: 36, fontSize: 28, color: "#9c9a94" }}>
            {profile.name}
            <span style={{ color: "#f5b53d", margin: "0 14px" }}>/</span>
            Lagos, Nigeria
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage Grotesque", data: display, weight: 700, style: "normal" },
        { name: "Instrument Sans", data: body, weight: 400, style: "normal" },
      ],
    },
  );
}
