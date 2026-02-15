type IconProps = {
  className?: string;
  strokeWidth?: number;
};

export function ArrowUpRight({ className, strokeWidth = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className={className}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M64 192 192 64m0 88V64h-88"
      />
    </svg>
  );
}
