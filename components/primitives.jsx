// Shared primitives: Logo, Icons, Reveal-on-scroll
const { useEffect, useRef, useState } = React;

function Logo({ small = false }) {
  return (
    <a href="#/" className="logo" onClick={(e) => { e.preventDefault(); window.navigate('/'); }}>
      <span className="logo-mark"><span>JI</span></span>
      {!small && <span>JI Tecnologia</span>}
    </a>
  );
}

// Inline icon set (stroke-based, 20x20 default)
const Icon = ({ name, size = 20, color = "currentColor", strokeWidth = 1.75 }) => {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "arrow-right": return (<svg {...props}><path d="M5 12h14M13 5l7 7-7 7" /></svg>);
    case "arrow-left": return (<svg {...props}><path d="M19 12H5M11 19l-7-7 7-7" /></svg>);
    case "check": return (<svg {...props}><path d="M5 12l5 5L20 7" /></svg>);
    case "check-circle": return (<svg {...props}><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-6" /></svg>);
    case "x": return (<svg {...props}><path d="M18 6 6 18M6 6l12 12" /></svg>);
    case "chevron-down": return (<svg {...props}><path d="M6 9l6 6 6-6" /></svg>);
    case "chevron-right": return (<svg {...props}><path d="M9 6l6 6-6 6" /></svg>);
    case "chart": return (<svg {...props}><path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 5-6" /></svg>);
    case "phone": return (<svg {...props}><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></svg>);
    case "search": return (<svg {...props}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>);
    case "money": return (<svg {...props}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M5 9v.01M19 15v.01" /></svg>);
    case "globe": return (<svg {...props}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" /></svg>);
    case "spark": return (<svg {...props}><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4" /></svg>);
    case "bot": return (<svg {...props}><rect x="4" y="6" width="16" height="14" rx="3" /><circle cx="9" cy="12" r="1.2" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="1.2" fill="currentColor" stroke="none" /><path d="M12 2v4M9 16h6" /></svg>);
    case "target": return (<svg {...props}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /></svg>);
    case "rocket": return (<svg {...props}><path d="M5 19c-1 1-2 4-2 4s3-1 4-2M14 6l4 4M9 11l-2 2M13 15l-2 2M16 4l4 4-9 9-4 1 1-4 8-10z" /></svg>);
    case "shield": return (<svg {...props}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" /></svg>);
    case "moon": return (<svg {...props}><path d="M21 12.5A9 9 0 1111.5 3a7 7 0 009.5 9.5z" /></svg>);
    case "sun": return (<svg {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>);
    case "menu": return (<svg {...props}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
    case "code": return (<svg {...props}><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>);
    case "clipboard": return (<svg {...props}><rect x="6" y="4" width="12" height="18" rx="2" /><path d="M9 4V2h6v2M9 12h6M9 16h4" /></svg>);
    case "calendar": return (<svg {...props}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>);
    case "users": return (<svg {...props}><circle cx="9" cy="8" r="3.5" /><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" /><path d="M16 4a3 3 0 010 6M22 20c0-2.5-1.5-4.5-4-5.5" /></svg>);
    case "trend": return (<svg {...props}><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></svg>);
    case "flag": return (<svg {...props}><path d="M5 21V4M5 4h11l-2 4 2 4H5" /></svg>);
    case "play": return (<svg {...props}><path d="M6 4l14 8-14 8V4z" fill="currentColor" /></svg>);
    case "wifi": return (<svg {...props}><path d="M12 18h.01M5 13a10 10 0 0114 0M2 9a15 15 0 0120 0M8.5 16.5a5 5 0 017 0" /></svg>);
    default: return null;
  }
};

function Reveal({ children, delay = 0, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${rest.className || ""}`} style={{ transitionDelay: `${delay}ms`, ...(rest.style || {}) }}>
      {children}
    </Tag>
  );
}

// Counter that animates when in view
function Counter({ to, duration = 1400, prefix = "", suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setVal(to * eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{suffix}</span>;
}

Object.assign(window, { Logo, Icon, Reveal, Counter });
