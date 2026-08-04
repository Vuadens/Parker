export function ParkerIcon({
  size = 26,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="1.5"
        width="21"
        height="21"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 6.5v7.5m0 0 3-3m-3 3-3-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 17h9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
