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
        background: "#fafafa",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        fontFamily: "SpaceMono",
        color: "#171717",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          style={{
            fontFamily: "SpaceGrotesk",
            fontSize: 96,
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "#171717",
          }}
        >
          Rahul Choudhury
        </div>

        <div
          style={{
            fontSize: 24,
            color: "#737373",
            letterSpacing: "0.02em",
            marginTop: "8px",
          }}
        >
          Frontend Developer
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: "#a3a3a3",
            letterSpacing: "0.02em",
          }}
        >
          rchoudhury.dev
        </div>

        <svg
          width="160"
          height="160"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e5e5e5"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="4.2" y1="7.5" x2="19.8" y2="16.5" />
          <line x1="4.2" y1="16.5" x2="19.8" y2="7.5" />
        </svg>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "SpaceGrotesk",
          data: spaceGroteskBold,
          style: "normal",
          weight: 500,
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
