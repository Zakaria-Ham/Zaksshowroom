import "./styles/App.css";
import { useState, useEffect, useRef } from "react";

/* ─── Fluid cursor component ─── */
function FluidCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);

  // Glow follows with heavy lerp (laggy = fluid feel)
  const glowPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const mouse   = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafId   = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Outer & inner snap immediately via CSS transition
      if (outerRef.current) {
        outerRef.current.style.left = `${e.clientX}px`;
        outerRef.current.style.top  = `${e.clientY}px`;
      }
      if (innerRef.current) {
        innerRef.current.style.left = `${e.clientX}px`;
        innerRef.current.style.top  = `${e.clientY}px`;
      }
    };

    const loop = () => {
      // Lerp the glow towards mouse — creates the fluid trailing feel
      glowPos.current.x += (mouse.current.x - glowPos.current.x) * 0.05;
      glowPos.current.y += (mouse.current.y - glowPos.current.y) * 0.05;

      if (glowRef.current) {
        glowRef.current.style.left = `${glowPos.current.x}px`;
        glowRef.current.style.top  = `${glowPos.current.y}px`;
      }
      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div ref={glowRef}  className="cursor-glow"  />
      <div ref={outerRef} className="cursor-outer" />
      <div ref={innerRef} className="cursor-inner" />
    </>
  );
}

/* ─── Card data ─── */
const CARDS = [
  {
    id: "Dev-card",
    tag: "Code",
    title: "Developer",
    desc: "Building interactive scalable products",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    alt: "Code on screen",
  },
  {
    id: "Editing-card",
    tag: "Visual",
    title: "Editor",
    desc: "Crafting stories through cuts",
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
    alt: "Video editing timeline",
  },
  {
    id: "Design-card",
    tag: "Inspire",
    title: "Designer",
    desc: "Shaping ideas into Creatives",
    img: "https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=600&q=80",
    alt: "Design workspace",
  },
];

/* ─── App ─── */
export default function App() {
  const [view, setView] = useState<"landing" | "cards">("landing");

  return (
    <>
      <FluidCursor />

      {view === "landing" ? (
        <div className="landing-container page-enter">
          <div className="Landing-background">
            <div className="grid-lines" />
            <div className="landing-content">
              <h1>Zak's ShowRoom</h1>
              <p className="subtitle">also known as RedLed. or redled.fx</p>
              <button
                className="Experience-button"
                onClick={() => setView("cards")}
              >
                Experience
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="Cards-page page-enter">
          <div className="Cards-container">
            {CARDS.map((c) => (
              <div className="card" id={c.id} key={c.id}>
                <span className="card-tag">{c.tag}</span>
                <div className="card-image">
                  <img src={c.img} alt={c.alt} />
                </div>
                <div className="card-details">
                  <h2>{c.title}</h2>
                  <div className="card-accent-line" />
                  <p>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <nav className="back-nav">
            <button className="back-button" onClick={() => setView("landing")}>
              ← Back
            </button>
          </nav>
        </div>
      )}
    </>
  );
}