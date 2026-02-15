type IconProps = {
  className?: string;
};

export function ArrowUpRight({ className }: IconProps) {
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
        strokeWidth={24}
        d="M64 192 192 64m0 88V64h-88"
      />
    </svg>
  );
}
