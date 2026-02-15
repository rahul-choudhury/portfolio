import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#fafafa",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #e5e5e5",
        borderRadius: "32px",
      }}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#171717"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="3" x2="12" y2="21" />
        <line x1="4.2" y1="7.5" x2="19.8" y2="16.5" />
        <line x1="4.2" y1="16.5" x2="19.8" y2="7.5" />
      </svg>
    </div>,
    {
      ...size,
    },
  );
}
