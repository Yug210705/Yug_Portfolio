export const PixelScene = ({ art, className }) => {
  const amber = "#ffb000";
  const green = "#33ff33";
  const dim = "#234e2a";
  const silver = "#c0c0c0";
  const common = { shapeRendering: "crispEdges", className, viewBox: "0 0 64 48" };

  switch (art) {
    case "laptop":
      return (
        <svg {...common}>
          <rect x="8" y="6" width="48" height="30" fill={silver} />
          <rect x="12" y="10" width="40" height="22" fill="#0c0d12" />
          <rect x="14" y="12" width="12" height="2" fill={green} />
          <rect x="14" y="16" width="22" height="2" fill={green} />
          <rect x="14" y="20" width="16" height="2" fill={green} />
          <rect x="14" y="24" width="2" height="2" fill={amber} />
          <rect x="4" y="38" width="56" height="6" fill="#9a9a9a" />
          <rect x="26" y="40" width="12" height="2" fill="#5a5a5a" />
        </svg>
      );
    case "paint":
      return (
        <svg {...common}>
          <rect x="6" y="6" width="52" height="36" fill="#ffffff" />
          <rect x="14" y="20" width="28" height="8" fill="#e03131" />
          <rect x="18" y="14" width="16" height="6" fill="#e03131" />
          <rect x="14" y="28" width="6" height="6" fill="#222" />
          <rect x="36" y="28" width="6" height="6" fill="#222" />
          <rect x="48" y="10" width="4" height="4" fill={amber} />
          <rect x="52" y="14" width="4" height="4" fill={green} />
        </svg>
      );
    case "game":
      return (
        <svg {...common}>
          <rect x="14" y="8" width="36" height="26" fill={silver} />
          <rect x="17" y="11" width="30" height="20" fill="#0c0d12" />
          <rect x="20" y="26" width="6" height="4" fill="#e03131" />
          <rect x="40" y="14" width="5" height="5" fill={amber} />
          <rect x="8" y="36" width="10" height="8" fill={silver} />
          <rect x="46" y="36" width="10" height="8" fill={silver} />
          <rect x="26" y="38" width="12" height="4" fill={green} />
        </svg>
      );
    case "qbasic":
      return (
        <svg {...common}>
          <rect x="6" y="4" width="52" height="40" fill="#0c0d12" />
          <rect x="6" y="4" width="52" height="6" fill="#000080" />
          <text x="10" y="22" fill={amber} fontSize="9" fontFamily="VT323, monospace">0 1 1 0</text>
          <text x="10" y="32" fill={green} fontSize="9" fontFamily="VT323, monospace">1 0 0 1_</text>
        </svg>
      );
    case "scratch":
      return (
        <svg {...common}>
          <rect x="8" y="8" width="22" height="10" fill="#8a4dd6" />
          <rect x="34" y="22" width="22" height="10" fill="#d67a00" />
          <rect x="20" y="24" width="22" height="10" fill="#2a9d3a" />
          <rect x="52" y="38" width="8" height="8" fill="#2a9d3a" />
          <polygon points="54,40 54,44 58,42" fill="#fff" />
        </svg>
      );
    case "cpp":
      return (
        <svg {...common}>
          <rect x="30" y="8" width="4" height="4" fill={amber} />
          <rect x="26" y="14" width="12" height="4" fill={amber} />
          <rect x="22" y="20" width="20" height="4" fill={amber} />
          <rect x="18" y="26" width="28" height="4" fill={amber} />
          <rect x="14" y="32" width="36" height="4" fill={amber} />
          <text x="44" y="14" fill={green} fontSize="8" fontFamily="VT323, monospace">{ }*</text>
        </svg>
      );
    case "arduino":
      return (
        <svg {...common}>
          <rect x="18" y="10" width="28" height="18" fill="#1d7d6e" />
          <rect x="26" y="14" width="12" height="10" fill="#0c0d12" />
          <rect x="28" y="16" width="3" height="3" fill={amber} />
          <rect x="33" y="16" width="3" height="3" fill={green} />
          <rect x="10" y="32" width="44" height="10" fill="#c9a36a" />
          <rect x="14" y="28" width="4" height="6" fill={silver} />
          <rect x="46" y="28" width="4" height="6" fill={silver} />
          <circle cx="18" cy="42" r="3" fill="#222" />
          <circle cx="46" cy="42" r="3" fill="#222" />
        </svg>
      );
    case "aws":
      return (
        <svg {...common}>
          <rect x="10" y="8" width="44" height="30" fill="#fff" />
          <text x="14" y="24" fill="#b45309" fontSize="14" fontFamily="VT323, monospace">₹3,000</text>
          <rect x="14" y="30" width="36" height="2" fill="#b45309" />
          <text x="16" y="46" fill="#e03131" fontSize="9" fontFamily="VT323, monospace">!! BILLING ALERT !!</text>
        </svg>
      );
    case "timer":
      return (
        <svg {...common}>
          <rect x="14" y="8" width="36" height="34" fill={silver} />
          <rect x="18" y="12" width="28" height="14" fill="#0c0d12" />
          <text x="20" y="24" fill="#e03131" fontSize="11" fontFamily="VT323, monospace">72:00</text>
          <rect x="30" y="4" width="4" height="4" fill={silver} />
          <rect x="22" y="30" width="8" height="4" fill="#8a8a8a" />
          <rect x="34" y="30" width="8" height="4" fill="#8a8a8a" />
        </svg>
      );
    case "gdg":
      return (
        <svg {...common}>
          <circle cx="20" cy="18" r="6" fill="#2a9d3a" />
          <circle cx="34" cy="14" r="6" fill="#d67a00" />
          <circle cx="44" cy="22" r="6" fill="#2a6dd6" />
          <rect x="10" y="32" width="44" height="3" fill={silver} />
          <rect x="14" y="38" width="36" height="3" fill={silver} />
        </svg>
      );
    case "mittal":
      return (
        <svg {...common}>
          <rect x="16" y="12" width="32" height="26" fill="#8a5a2a" />
          <rect x="16" y="20" width="32" height="4" fill="#5a3a1a" />
          <rect x="29" y="8" width="6" height="6" fill={silver} />
          <rect x="30" y="18" width="4" height="8" fill={amber} />
        </svg>
      );
    case "resilience":
      return (
        <svg {...common}>
          <rect x="6" y="4" width="52" height="40" fill="#0c0d12" />
          <rect x="6" y="4" width="52" height="6" fill="#1d5c2a" />
          <rect x="10" y="14" width="18" height="10" fill="#173a22" />
          <rect x="32" y="14" width="22" height="10" fill="#173a22" />
          <rect x="10" y="28" width="44" height="12" fill="#173a22" />
          <rect x="13" y="17" width="10" height="2" fill={green} />
          <rect x="13" y="20" width="14" height="2" fill={green} />
          <rect x="35" y="17" width="12" height="2" fill={green} />
          <rect x="13" y="32" width="20" height="2" fill={amber} />
          <rect x="13" y="35" width="26" height="2" fill={green} />
        </svg>
      );
    case "obs":
      return (
        <svg {...common}>
          <rect x="6" y="4" width="52" height="40" fill="#0c0d12" />
          <rect x="10" y="10" width="20" height="14" fill="#14161c" />
          <rect x="34" y="10" width="20" height="14" fill="#14161c" />
          <rect x="10" y="28" width="44" height="12" fill="#14161c" />
          <circle cx="20" cy="17" r="5" fill="none" stroke={amber} strokeWidth="2" />
          <circle cx="44" cy="17" r="5" fill="none" stroke={green} strokeWidth="2" />
          <rect x="13" y="32" width="24" height="2" fill={green} />
          <rect x="13" y="36" width="16" height="2" fill={amber} />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="20" y="14" width="24" height="20" fill={dim} />
          <rect x="28" y="20" width="8" height="8" fill={amber} />
        </svg>
      );
  }
};

export default PixelScene;
