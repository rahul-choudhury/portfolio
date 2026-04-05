import {
  createOgImage,
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
} from "@workspace/design-system/next"

export const alt = "Bookmarks - A keyboard-focused bookmark manager"
export const size = OG_IMAGE_SIZE
export const contentType = OG_IMAGE_CONTENT_TYPE

function BookmarksMark() {
  return (
    <svg
      aria-hidden="true"
      width="172"
      height="172"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#e5e5e5"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
    </svg>
  )
}

function BookmarksSubtitle() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <span
        style={{
          background: "#f5f5f5",
          border: "1px solid #e5e5e5",
          padding: "6px 14px",
          borderRadius: 8,
          fontFamily: "JetBrainsMono",
          fontSize: 18,
          color: "#737373",
          letterSpacing: "0.02em",
        }}
      >
        kbd
      </span>
      <span>focused bookmark manager</span>
    </div>
  )
}

export default async function Image() {
  return createOgImage({
    title: "Bookmarks",
    subtitle: <BookmarksSubtitle />,
    site: "bookmarks.rchoudhury.dev",
    mark: <BookmarksMark />,
  })
}
