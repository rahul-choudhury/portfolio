import {
  createOgImage,
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
} from "@workspace/design-system/next"

export const alt = "Rahul Choudhury - Frontend Developer"
export const size = OG_IMAGE_SIZE
export const contentType = OG_IMAGE_CONTENT_TYPE

function PortfolioMark() {
  return (
    <svg
      aria-hidden="true"
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
  )
}

export default async function Image() {
  return createOgImage({
    title: "Rahul Choudhury",
    subtitle: "Frontend Developer",
    site: "rchoudhury.dev",
    mark: <PortfolioMark />,
  })
}
