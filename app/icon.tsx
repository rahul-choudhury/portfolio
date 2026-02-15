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
        background: "#fafafa",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #e5e5e5",
        borderRadius: "6px",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#171717"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
