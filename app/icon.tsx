import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#d4d4d4",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid black",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <line x1="12" y1="4" x2="12" y2="20" />
        <line x1="5.07" y1="8" x2="18.93" y2="16" />
        <line x1="5.07" y1="16" x2="18.93" y2="8" />
      </svg>
    </div>,
    {
      ...size,
    },
  );
}
