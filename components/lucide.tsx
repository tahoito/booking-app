type IconProps = {
  size?: number;
  className?: string;
};

export function EyeIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696C3.423 7.51 7.36 4.5 12 4.5s8.577 3.01 9.938 7.152a1 1 0 0 1 0 .696C20.577 16.49 16.64 19.5 12 19.5s-8.577-3.01-9.938-7.152" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOffIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M10.733 5.08A10.73 10.73 0 0 1 12 5c4.09 0 7.646 2.41 9.168 6a10.96 10.96 0 0 1-1.37 2.394" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499A10.75 10.75 0 0 1 12 19c-4.09 0-7.646-2.41-9.168-6a10.96 10.96 0 0 1 2.157-3.377" />
      <path d="M2 2l20 20" />
    </svg>
  );
}
