import {
  createFavicon,
  FAVICON_SIZE,
  FAVICON_CONTENT_TYPE,
} from "@workspace/design-system/next"

export const size = FAVICON_SIZE
export const contentType = FAVICON_CONTENT_TYPE

export default function Icon() {
  return createFavicon({
    mark: (
      <svg
        aria-hidden="true"
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
    ),
  })
}
