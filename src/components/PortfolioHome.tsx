"use client";

import { useEffect, useRef, useState } from "react";
import { experience, profile, projects, skills } from "@/data/portfolio";

const nav = [["About", "#about"], ["Expertise", "#expertise"], ["Projects", "#projects"], ["Experience", "#experience"], ["Contact", "#contact"]];
const roles = ["OPERATIONS & CUSTOMER SUPPORT", "CUSTOMER EXPERIENCE", "DIGITAL PAYMENT OPERATIONS", "PROBLEM SOLVER"];

function LocalTime() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 15000);
    return () => window.clearInterval(id);
  }, []);
  return <span>{time} IST</span>;
}

export default function PortfolioHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [roleIndex, setRoleIndex] = useState(0);
  const [pull, setPull] = useState(0);
  const pullRef = useRef(0);
  const dragStart = useRef(0);
  const suppressClick = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("farid-theme");
      const initial = saved === "light" ? "light" : "dark";
      setTheme(initial);
      document.documentElement.dataset.theme = initial;
    } catch {
      document.documentElement.dataset.theme = "dark";
    }
    const timer = window.setTimeout(() => setVisible(true), 1200);
    const roleTimer = window.setInterval(() => setRoleIndex((n) => (n + 1) % roles.length), 2800);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("shown"); observer.unobserve(entry.target); }
    }), { threshold: 0.13 });
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => { window.clearTimeout(timer); window.clearInterval(roleTimer); observer.disconnect(); };
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      setTheme(next);
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("farid-theme", next); } catch { /* storage is optional */ }
    };
    const doc = document as Document & { startViewTransition?: (callback: () => void) => { ready: Promise<void> } };
    if (doc.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const transition = doc.startViewTransition(apply);
      transition.ready.then(() => {
        const r = Math.hypot(window.innerWidth, window.innerHeight);
        document.documentElement.animate(
          { clipPath: ["circle(0px at " + (window.innerWidth - 48) + "px 0px)", "circle(" + r + "px at " + (window.innerWidth - 48) + "px 0px)"] },
          { duration: 850, easing: "cubic-bezier(.76,0,.24,1)", pseudoElement: "::view-transition-new(root)" }
        );
      }).catch(() => {});
    } else apply();
  };

  const onPullStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = event.clientY;
    pullRef.current = 0;
    setPull(0);
  };
  const onPullMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const value = Math.max(0, Math.min(112, event.clientY - dragStart.current));
    pullRef.current = value;
    setPull(value);
  };
  const onPullEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (pullRef.current > 38) {
      suppressClick.current = true;
      toggleTheme();
    }
    pullRef.current = 0;
    setPull(0);
  };
  const onCordClick = () => {
    if (suppressClick.current) { suppressClick.current = false; return; }
    toggleTheme();
  };

  return <main id="top" className={visible ? "site-ready" : "site-loading"}>
    <div className={"intro-loader " + (visible ? "loader-away" : "")} aria-hidden="true">
      <div className="loader-mark">SF<span>.</span></div>
      <div className="loader-name">SHEIK FARID</div>
      <div className="loader-track"><i /></div>
      <div className="loader-caption">PORTFOLIO · 2026</div>
    </div>

    <header className="site-header">
      <a className="wordmark" href="#top"><span className="wordmark-icon">SF</span><span>SHEIK FARID<small>OPERATIONS · CUSTOMER EXPERIENCE</small></span></a>
      <nav className={menuOpen ? "main-nav nav-open" : "main-nav"}>
        {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <div className="header-right"><span className="availability"><i /> AVAILABLE FOR OPPORTUNITIES</span><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? "CLOSE" : "MENU"}</button></div>
    </header>

    <div
      className={"pull-cord " + (pull > 38 ? "cord-armed" : "")}
      style={{ transform: "translateY(" + (pull * 0.22) + "px)" }}
      role="button"
      tabIndex={0}
      aria-label={"Pull to switch to " + (theme === "dark" ? "light" : "dark") + " theme"}
      onPointerDown={onPullStart}
      onPointerMove={onPullMove}
      onPointerUp={onPullEnd}
      onPointerCancel={onPullEnd}
      onClick={onCordClick}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggleTheme(); } }}
    >
      <svg viewBox="0 0 80 245" aria-hidden="true">
        <rect x="29" y="0" width="22" height="8" rx="2" className="cord-mount" />
        <path d={"M40 6 Q " + (40 + Math.min(18, pull * .12)) + " " + (25 + pull * .44) + " 40 " + (55 + pull)} className="cord-line" />
        <path d={"M40 6 Q " + (40 + Math.min(18, pull * .12)) + " " + (25 + pull * .44) + " 40 " + (55 + pull)} className="cord-beads" />
        <g transform={"translate(40 " + (55 + pull) + ")"}>
          <circle r="11" className="cord-handle-shadow" />
          <circle r="8" className="cord-handle" />
          <circle r="3" className="cord-handle-core" />
        </g>
      </svg>
      <span className="cord-label">{pull > 38 ? "RELEASE" : theme === "dark" ? "PULL FOR LIGHT" : "PULL FOR DARK"}</span>
    </div>

    <section className="hero" id="home" aria-label="Introduction">
      <div className="hero-topline"><span>PORTFOLIO / 2026</span><span>INDEPENDENT PROFESSIONAL PROFILE</span></div>
      <div className="hero-copy">
        <div className="hero-kicker"><span className="kicker-rule" /> HELLO, I&apos;M</div>
        <div className="role-window"><span key={roleIndex}>{roles[roleIndex]}</span></div>
        <h1 className="hero-name"><span>SHEIK</span><span>FARID<span className="name-period">.</span></span></h1>
        <p className="hero-summary">I make complex customer issues feel simple — with thoughtful communication, operational discipline and a genuine focus on getting things done.</p>
        <div className="hero-actions"><a href="#projects" className="action-primary">EXPLORE MY WORK <span>↘</span></a><a href={profile.resume} className="action-text" download>DOWNLOAD RESUME <span>↗</span></a></div>
      </div>

      <div className="hero-portrait" aria-label="Portrait of Sheik Farid">
        <div className="portrait-orbit orbit-one" /><div className="portrait-orbit orbit-two" />
        <div className="portrait-image-wrap"><img src={profile.photo} alt="Sheik Farid" /></div>
        <div className="portrait-index">01 <span>—</span> THE PERSON BEHIND THE WORK</div>
        <div className="round-stamp"><svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="stamp-circle" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" /></defs><text><textPath href="#stamp-circle">CUSTOMER FIRST · PEOPLE ALWAYS · </textPath></text></svg><b>SF</b></div>
      </div>
      <div className="hero-side-note">DARRANG, ASSAM<br/>INDIA <span>↙</span></div>
      <div className="hero-bottomline"><div className="hero-values"><span>CUSTOMER EXPERIENCE</span><i /> <span>OPERATIONS</span><i /> <span>DIGITAL PAYMENTS</span></div><a href="#about" className="scroll-cue"><span>SCROLL TO DISCOVER</span><b>↓</b></a><div className="hero-clock"><LocalTime /></div></div>
    </section>

    <div className="ticker"><div>PEOPLE FIRST <b>✳</b> CLEAR SOLUTIONS <b>✳</b> CUSTOMER EXPERIENCE <b>✳</b> RELIABLE OPERATIONS <b>✳</b> CONTINUOUS LEARNING <b>✳</b>&nbsp;&nbsp;&nbsp; PEOPLE FIRST <b>✳</b> CLEAR SOLUTIONS <b>✳</b></div></div>

    <section className="editorial-section about-section" id="about" data-reveal>
      <div className="section-index">01 / ABOUT ME</div>
      <div className="about-grid"><h2>More than<br/><em>a job title.</em></h2><div className="about-copy"><p className="about-lead">{profile.about}</p><p>My experience spans customer support, banking kiosk operations and sales administration. I enjoy understanding how systems work, improving everyday processes and exploring digital products that solve practical problems.</p><div className="signature-line"><span>SF.</span><small>CURIOUS BY NATURE. PRACTICAL BY CHOICE.</small></div></div></div>
    </section>

    <section className="editorial-section expertise-section" id="expertise" data-reveal>
      <div className="section-index">02 / WHAT I BRING</div><div className="section-heading"><h2>Skills &amp; <em>expertise.</em></h2><p>A practical toolkit built through customer-facing work, problem-solving and operational responsibility.</p></div>
      <div className="expertise-grid">{skills.map(([name, desc], index) => <article className="expertise-item" key={name}><span className="item-index">0{index + 1}</span><div><h3>{name}</h3><p>{desc}</p></div><span className="item-arrow">↗</span></article>)}</div>
    </section>

    <section className="projects-section editorial-section" id="projects" data-reveal>
      <div className="section-index">03 / SELECTED WORK</div><div className="section-heading"><h2>Ideas into<br/><em>useful tools.</em></h2><p>Digital projects and operational initiatives that reflect my interest in building practical solutions.</p></div>
      <div className="projects-grid">{projects.map((project, index) => <article className={"project-tile"} key={project.name}><div className={"project-artwork artwork-" + (index + 1)}><span>{project.tag}</span><small>0{index + 1} / SELECTED WORK</small><i>↗</i></div><div className="project-meta"><span>{project.type.toUpperCase()}</span><span>2025—26</span></div><h3>{project.name}</h3><p>{project.description}</p></article>)}</div>
      <p className="project-footnote">Project concepts and professional work are identified by their descriptions; not every item represents a separately launched commercial product.</p>
    </section>

    <section className="editorial-section experience-section" id="experience" data-reveal>
      <div className="section-index">04 / PROFESSIONAL JOURNEY</div><div className="section-heading"><h2>Work that<br/><em>shapes me.</em></h2><p>Learning through real customer conversations, service delivery, coordination and day-to-day operations.</p></div>
      <div className="experience-list">{experience.map((item, index) => <article className="experience-row" key={item.company + item.period}><div className="experience-period">{item.period}</div><div className="experience-detail"><span className="experience-company">{item.company}</span><h3>{item.role}</h3><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></div><div className="experience-number">0{index + 1}</div></article>)}</div>
    </section>

    <section className="education-strip" data-reveal><div className="section-index">05 / EDUCATION</div><div><h2>Always <em>learning.</em></h2><p>Higher Secondary (Class 12) · CBSE · Silbari Junior College</p></div><span>2019</span></section>

    <section className="contact-section editorial-section" id="contact" data-reveal><div className="section-index">06 / LET&apos;S CONNECT</div><div className="contact-content"><h2>Have a good<br/><em>challenge?</em></h2><p>I&apos;m interested in opportunities where thoughtful support, dependable operations and a learning mindset make a real difference.</p><div className="contact-links"><a href={"mailto:" + profile.email}>EMAIL ME <span>↗</span></a><a href={"https://wa.me/91" + profile.phone} target="_blank" rel="noreferrer">WHATSAPP <span>↗</span></a><a href={profile.resume} download>MY RESUME <span>↓</span></a></div><div className="contact-details"><span>{profile.email}</span><span>+91 {profile.phone}</span><span>{profile.location}</span></div></div></section>

    <footer className="site-footer"><a className="wordmark" href="#top"><span className="wordmark-icon">SF</span><span>SHEIK FARID<small>PERSONAL PORTFOLIO</small></span></a><span>BUILT WITH INTENTION. ALWAYS EVOLVING.</span><a href="#top">BACK TO TOP ↑</a><small>© {new Date().getFullYear()} SHEIK FARID</small></footer>
  </main>;
}
