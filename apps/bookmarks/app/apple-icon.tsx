import {
  createAppleIcon,
  APPLE_ICON_SIZE,
  FAVICON_CONTENT_TYPE,
} from "@workspace/design-system/next"

export const size = APPLE_ICON_SIZE
export const contentType = FAVICON_CONTENT_TYPE

export default function Icon() {
  return createAppleIcon({
    mark: (
      <svg
        aria-hidden="true"
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#171717"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
      </svg>
    ),
  })
}
