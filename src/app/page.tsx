"use client";
import "./styles/App.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/* ─── Fluid cursor ─── */
function FluidCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);

  const glowPos = useRef({ x: 0, y: 0 });
  const mouse   = useRef({ x: 0, y: 0 });
  const rafId   = useRef<number>(0);

  useEffect(() => {
    glowPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    mouse.current   = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
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

/* ─── Card data — Next.js routes match the folder names exactly ─── */
const CARDS = [
  {
    id:    "Dev-card",
    tag:   "Code",
    title: "Developer",
    desc:  "Building interactive scalable products",
    img:   "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    alt:   "Code on screen",
    href:  "/Dev-repo",
  },
  {
    id:    "Editing-card",
    tag:   "Visual",
    title: "Editor",
    desc:  "Making stories with sequencial Frames",
    img:   "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
    alt:   "Video editing timeline",
    href:  "/Editor-Timeline",
  },
  {
    id:    "Design-card",
    tag:   "Inspire",
    title: "Designer",
    desc:  "Shaping ideas into Creatives",
    img:   "https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=600&q=80",
    alt:   "Design workspace",
    href:  "/Design-Board",
  },
];

/* ─── Page ─── */
export default function Home() {
  const [view, setView] = useState<"landing" | "cards">("landing");
  const router          = useRouter();

  return (
    <>
      <FluidCursor />

      {view === "landing" ? (
        <div className="landing-container page-enter">
          <div className="Landing-background">
            <div className="grid-lines" />
            <div className="landing-content">
              <h1>Zak&apos;s ShowRoom</h1>
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
              <div
                className="card"
                id={c.id}
                key={c.id}
                onClick={() => router.push(c.href)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && router.push(c.href)}
                style={{ cursor: "pointer" }}
              >
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