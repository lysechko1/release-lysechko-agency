import type React from "react"

interface IconProps {
  className?: string
  size?: number
}

export const GlobalReachIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M2 12h20" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="12" cy="12" r="2" fill="currentColor" className="animate-pulse" />
  </svg>
)

export const GrowthFocusIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 7h4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7" cy="17" r="1" fill="currentColor" className="animate-bounce" />
    <circle cx="13" cy="13" r="1" fill="currentColor" className="animate-bounce" style={{ animationDelay: "0.1s" }} />
    <circle cx="21" cy="7" r="1" fill="currentColor" className="animate-bounce" style={{ animationDelay: "0.2s" }} />
  </svg>
)

export const AIInnovationIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="15" cy="15" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M9 11l6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="9" cy="9" r="1" fill="currentColor" className="animate-pulse" />
    <circle cx="15" cy="15" r="1" fill="currentColor" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
  </svg>
)

export const CommunicationIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="9" cy="10" r="1" fill="currentColor" className="animate-pulse" />
    <circle cx="12" cy="10" r="1" fill="currentColor" className="animate-pulse" style={{ animationDelay: "0.2s" }} />
    <circle cx="15" cy="10" r="1" fill="currentColor" className="animate-pulse" style={{ animationDelay: "0.4s" }} />
  </svg>
)

export const LowSalesIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 15h4v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 11l-8 8-4-4-6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle
      cx="12"
      cy="12"
      r="8"
      stroke="#ef4444"
      strokeWidth="1"
      fill="none"
      opacity="0.2"
      className="animate-pulse"
    />
  </svg>
)

export const IrrelevantLeadsIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    <path
      d="M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83M6.34 17.66l2.83-2.83M14.83 9.17l2.83-2.83"
      stroke="#f59e0b"
      strokeWidth="1"
      opacity="0.7"
      className="animate-spin"
      style={{ animationDuration: "3s" }}
    />
  </svg>
)

export const BudgetWasteIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 8l8 8M16 8l-8 8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <circle cx="12" cy="12" r="1" fill="currentColor" className="animate-pulse" />
  </svg>
)

export const TriedBeforeIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M12 2a10 10 0 0 0-10 10" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    <circle cx="12" cy="12" r="3" stroke="#f59e0b" strokeWidth="1" fill="none" className="animate-pulse" />
  </svg>
)

export const ChatbotIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <rect x="3" y="3" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M7 21l5-4 5 4v-4H7v4z" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="9" cy="9" r="1" fill="currentColor" className="animate-pulse" />
    <circle cx="15" cy="9" r="1" fill="currentColor" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
    <path d="M9 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle
      cx="12"
      cy="6"
      r="2"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.3"
      className="animate-ping"
    />
  </svg>
)

export const AutomationIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
    <path
      d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r="1" fill="currentColor" className="animate-spin" />
    <circle
      cx="12"
      cy="12"
      r="6"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.2"
      className="animate-pulse"
    />
  </svg>
)

export const AutoRepliesIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <polyline
      points="22,6 12,13 2,6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 10l4 3 4-3"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.5"
    />
    <circle cx="18" cy="8" r="2" fill="#10b981" className="animate-bounce" />
    <path d="M17 8h2" stroke="white" strokeWidth="1" strokeLinecap="round" />
  </svg>
)

export const CRMSyncIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M10 6.5h4M10 17.5h4M6.5 10v4M17.5 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="2" fill="currentColor" className="animate-pulse" />
    <circle cx="6.5" cy="6.5" r="1" fill="#10b981" className="animate-ping" />
    <circle cx="17.5" cy="17.5" r="1" fill="#3b82f6" className="animate-ping" style={{ animationDelay: "0.5s" }} />
  </svg>
)

export const StarIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <polygon
      points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" className="animate-pulse" />
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21.02L12 17.77z" fill="currentColor" opacity="0.1" />
  </svg>
)

export const DiamondIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <path d="M6 3h12l4 6-10 12L2 9l4-6z" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M6 3l6 18L18 3" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M2 9h20" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3" className="animate-pulse" />
    <path d="M6 3h12l4 6-10 12z" fill="currentColor" opacity="0.05" />
  </svg>
)

export const ChartIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
    <rect x="7" y="13" width="2" height="4" fill="currentColor" className="animate-pulse" />
    <rect
      x="11"
      y="9"
      width="2"
      height="8"
      fill="currentColor"
      className="animate-pulse"
      style={{ animationDelay: "0.2s" }}
    />
    <rect
      x="15"
      y="11"
      width="2"
      height="6"
      fill="currentColor"
      className="animate-pulse"
      style={{ animationDelay: "0.4s" }}
    />
    <path
      d="M7 7l4 4 4-2 4 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.5"
    />
  </svg>
)

export const TrendingIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <polyline
      points="23 6 13.5 15.5 8.5 10.5 1 18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="17 6 23 6 23 12"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8.5" cy="10.5" r="1.5" fill="currentColor" className="animate-bounce" />
    <circle
      cx="13.5"
      cy="15.5"
      r="1.5"
      fill="currentColor"
      className="animate-bounce"
      style={{ animationDelay: "0.2s" }}
    />
    <circle cx="23" cy="6" r="1.5" fill="currentColor" className="animate-bounce" style={{ animationDelay: "0.4s" }} />
  </svg>
)

export const GlobeIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M2 12h20" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path d="M8 12a15.3 15.3 0 0 0 8 0" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" className="animate-pulse" />
    <circle
      cx="12"
      cy="12"
      r="6"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.1"
      className="animate-ping"
    />
  </svg>
)

export const HandshakeIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" fill="currentColor" />
    <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" fill="currentColor" />
    <path d="M12 21c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" fill="currentColor" />
    <path d="M12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" fill="currentColor" />
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.3"
      className="animate-pulse"
    />
  </svg>
)
