import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "Rahul Choudhury - Frontend Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const spaceGroteskBold = await readFile(
    join(process.cwd(), "assets/fonts/SpaceGrotesk-Bold.woff"),
  );
  const spaceMonoRegular = await readFile(
    join(process.cwd(), "assets/fonts/SpaceMono-Regular.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        background: "#d4d4d4",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "48px",
        border: "12px solid black",
        fontFamily: "SpaceMono",
        color: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Rahul Choudhury
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "SpaceGrotesk",
          fontSize: 128,
          fontWeight: 700,
          lineHeight: 0.85,
          letterSpacing: "-0.05em",
          textTransform: "uppercase",
          gap: "10px",
        }}
      >
        <span>Frontend</span>
        <span>Developer</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "flex-end",
        }}
      >
        <div style={{ fontSize: 24, opacity: 0.6, textTransform: "uppercase" }}>
          Building Products at Growth Panda
        </div>
        <div style={{ fontSize: 24, textDecoration: "underline" }}>
          rchoudhury.dev
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "SpaceGrotesk",
          data: spaceGroteskBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "SpaceMono",
          data: spaceMonoRegular,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
