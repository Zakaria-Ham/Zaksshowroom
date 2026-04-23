"use client";
import "../styles/Dev.css";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";

const PROFILE = {
  name:     "H.Zakaria",
  alias:    "Zak",
  role:     "Front-End Developer",
  Studies:  "University of Algiers 1 - La Fac Centrale",
  degree:   "1st year Computer Science — Web",
  location: "Algeria · DZ",
  status:   "available",
};

const SKILLS: { category: string; color: "blue" | "green" | "yellow" | "red"; items: string[] }[] = [
  { category: "Languages",        color: "blue",   items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "C"] },
  { category: "Frameworks",       color: "green",  items: ["React", "Next.js", "Tailwind CSS"] },
  { category: "Tools & Workflow", color: "yellow", items: ["Git", "GitHub", "VS Code", "Vite", "npm", "Code Blocks"] },
  { category: "Concepts",         color: "red",    items: ["Responsive Design", "Component Architecture", "UI/UX Fundamentals"] },
];

const EXPERIENCE = [
  { hash: "s2a2l4p", year: "2026", type: "build", msg: "built my first deployed project with my uni club" },
  { hash: "f4a2c9e", year: "2025", type: "feat",  msg: "learned more about technologies — React, Next" },
  { hash: "b3d8f12", year: "2025", type: "build", msg: "built my first Next.js + TypeScript app" },
  { hash: "7e1c403", year: "2024", type: "build", msg: "built my 1st animated UI" },
  { hash: "a0c5d77", year: "2023", type: "init",  msg: "learned the basics HTML CSS — built first landing page" },
];

const CONTACT = [
  { label: "github  ", value: "github.com/Zakaria-Ham",          href: "https://github.com/Zakaria-Ham" },
  { label: "pro     ", value: "linkedin.com/in/Zakaria-ham/",    href: "https://www.linkedin.com/in/Zakaria-ham/" },
  { label: "email   ", value: "contact.zakariaham@gmail.com",    href: "mailto:contact.zakariaham@gmail.com" },
];

const TYPE_CLASS: Record<string, string> = {
  feat:  "git-feat",
  build: "git-build",
  init:  "git-init",
};

export default function DevRepo() {
  const router = useRouter();
  const ps1 = PROFILE.alias.toLowerCase();

  return (
    <main className="dev-root">
      <Navbar variant="dev" />
      <div className="dev-scanlines" aria-hidden="true" />

      <div className="dev-terminal dev-enter">
        <header className="dev-titlebar">
          <div className="dev-dots">
            <span className="dev-dot dot-close" onClick={() => router.back()} title="Back" />
            <span className="dev-dot dot-min" />
            <span className="dev-dot dot-max" />
          </div>
          <span className="dev-title-text">{ps1}@hmd — ~/showroom/dev-repo</span>
          <span className="dev-title-right">zsh</span>
        </header>

        <div className="dev-body">

          <section className="dev-block dev-anim-1">
            <p className="dev-cmd"><span className="dev-ps1">{ps1}@redled</span><span className="dev-ps2">:~/dev$</span> whoami</p>
            <div className="dev-whoami">
              <p className="dev-out-name">{PROFILE.name} — <span className="dev-green">{PROFILE.role}</span></p>
              <p className="dev-out-sub">alias <span className="dev-blue">{PROFILE.alias}</span>&nbsp;·&nbsp;<span className="dev-dim">{PROFILE.location}</span></p>
              <span className={`dev-status ${PROFILE.status === "available" ? "status-on" : "status-off"}`}>● {PROFILE.status}</span>
            </div>
          </section>

          <section className="dev-block dev-anim-2">
            <p className="dev-cmd"><span className="dev-ps1">{ps1}@redled</span><span className="dev-ps2">:~/dev$</span> cat profile.json</p>
            <div className="dev-json">
              <p><span className="jb">{"{"}</span></p>
              <p>&nbsp;&nbsp;<span className="jk">&quot;name&quot;</span><span className="jp">:</span> <span className="js">&quot;{PROFILE.name}&quot;</span><span className="jp">,</span></p>
              <p>&nbsp;&nbsp;<span className="jk">&quot;alias&quot;</span><span className="jp">:</span> <span className="js">&quot;{PROFILE.alias}&quot;</span><span className="jp">,</span></p>
              <p>&nbsp;&nbsp;<span className="jk">&quot;role&quot;</span><span className="jp">:</span> <span className="js">&quot;{PROFILE.role}&quot;</span><span className="jp">,</span></p>
              <p>&nbsp;&nbsp;<span className="jk">&quot;studies&quot;</span><span className="jp">:</span> <span className="js">&quot;{PROFILE.Studies}&quot;</span><span className="jp">,</span></p>
              <p>&nbsp;&nbsp;<span className="jk">&quot;degree&quot;</span><span className="jp">:</span> <span className="js">&quot;{PROFILE.degree}&quot;</span><span className="jp">,</span></p>
              <p>&nbsp;&nbsp;<span className="jk">&quot;available&quot;</span><span className="jp">:</span> <span className="jbool">true</span><span className="jp">,</span></p>
              <p>&nbsp;&nbsp;<span className="jk">&quot;location&quot;</span><span className="jp">:</span> <span className="js">&quot;{PROFILE.location}&quot;</span></p>
              <p><span className="jb">{"}"}</span></p>
            </div>
          </section>

          <section className="dev-block dev-anim-3">
            <p className="dev-cmd"><span className="dev-ps1">{ps1}@redled</span><span className="dev-ps2">:~/dev$</span> ls -la skills/</p>
            <div className="dev-skills-grid">
              {SKILLS.map((group) => (
                <div className="dev-skill-group" key={group.category} data-color={group.color}>
                  <p className="dev-skill-cat"><span className="dev-comment">// </span>{group.category}</p>
                  <div className="dev-skill-tags">
                    {group.items.map((item) => (
                      <span className="dev-skill-tag" key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="dev-block dev-anim-4">
            <p className="dev-cmd"><span className="dev-ps1">{ps1}@redled</span><span className="dev-ps2">:~/dev$</span> git log --oneline --graph</p>
            <div className="dev-gitlog">
              {EXPERIENCE.map((e) => (
                <div className="dev-git-row" key={e.hash}>
                  <span className="dev-git-tree">*</span>
                  <span className="dev-git-hash">{e.hash}</span>
                  <span className="dev-git-year">({e.year})</span>
                  <span className={`dev-git-type ${TYPE_CLASS[e.type] ?? ""}`}>{e.type}:</span>
                  <span className="dev-git-msg">{e.msg}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="dev-block dev-anim-5">
            <p className="dev-cmd"><span className="dev-ps1">{ps1}@redled</span><span className="dev-ps2">:~/dev$</span> cat contact.txt</p>
            <div className="dev-contact">
              {CONTACT.map((c) => (
                <p key={c.label}>
                  <span className="dev-contact-label">{c.label}</span>
                  <a className="dev-contact-link" href={c.href} target="_blank" rel="noreferrer">{c.value}</a>
                </p>
              ))}
            </div>
          </section>

          <p className="dev-cmd dev-anim-5">
            <span className="dev-ps1">{ps1}@redled</span><span className="dev-ps2">:~/dev$</span>&nbsp;<span className="dev-cursor">█</span>
          </p>

        </div>
      </div>

      <button className="dev-back" onClick={() => router.back()}><span className="dev-dim">$</span> cd ..</button>
    </main>
  );
}