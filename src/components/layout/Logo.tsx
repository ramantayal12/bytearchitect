import { Link } from 'react-router'

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
        <rect width="32" height="32" rx="8" className="fill-primary" />
        <path
          d="M9 22V10h6.5a3.5 3.5 0 0 1 0 7H9m6.5 0H17a3 3 0 0 1 0 6H9"
          fill="none"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        Byte<span className="text-primary">Architect</span>
      </span>
    </Link>
  )
}
