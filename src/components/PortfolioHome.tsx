"use client";

import { useEffect, useState } from "react";
import { experience, profile, projects, skills } from "@/data/portfolio";

const nav = [["About", "#about"], ["Experience", "#experience"], ["Skills", "#skills"], ["Projects", "#projects"], ["Contact", "#contact"]];

export default function PortfolioHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("farid-theme");
    const initial = saved === "light" ? "light" : "dark";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
    const timer = window.setTimeout(() => setVisible(true), 80);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("shown"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => { window.clearTimeout(timer); observer.disconnect(); };
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("farid-theme", next);
  };

  return <main id="top">
    <header className="header">
      <a className="brand" href="#top"><img className="brand-mark" src={profile.photo} alt="Sheik Farid"/><span>SHEIK FARID<small>OPERATIONS · CUSTOMER EXPERIENCE</small></span></a>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? "×" : "☰"}</button>
      <nav className={menuOpen ? "nav nav-open" : "nav"}>{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
      <div className="header-actions"><button className="theme-toggle" onClick={toggleTheme} aria-label="Switch color theme"><span className="theme-cord"><i /></span><span>{theme === "dark" ? "LIGHT MODE" : "DARK MODE"}</span></button><a className="nav-cta" href="#contact">Let&apos;s talk <span>↗</span></a></div>
    </header>

    <section className={`hero wrap ${visible ? "hero-ready" : ""}`}>
      <div className="hero-copy">
        <div className="eyebrow"><i /> OPEN TO PROFESSIONAL OPPORTUNITIES</div>
        <p className="hello">HELLO, I&apos;M</p>
        <h1>Sheik<br/><em>Farid.</em></h1>
        <div className="role-pill">OPERATION &amp; SCSE <span>✳</span> CUSTOMER EXPERIENCE</div>
        <p className="hero-text">I bring people, processes and digital tools together to solve customer problems and keep operations moving smoothly.</p>
        <div className="hero-buttons"><a className="button primary" href="#contact">Let&apos;s connect ↗</a><a className="button secondary" href={profile.resume} download>Download resume ↓</a></div>
        <div className="hero-meta"><span>BASED IN {profile.location.toUpperCase()}</span><span>SCROLL TO EXPLORE ↓</span></div>
      </div>
      <div className="portrait-wrap">
        <div className="portrait-backdrop"></div>
        <div className="portrait-card"><img src={profile.photo} alt="Sheik Farid portrait"/><div className="portrait-label"><img className="sf-photo-label" src={profile.photo} alt="Sheik Farid"/><span>REAL PERSON. REAL WORK.</span></div></div>
        <div className="float-card float-top"><span className="float-icon">✳</span><span>People first<br/><b>Always.</b></span></div>
        <div className="float-card float-bottom"><b>2019</b><span>Career journey<br/>begins</span></div>
        <div className="portrait-caption">01 / THE PERSON BEHIND THE WORK</div>
      </div>
      <div className="hero-bottom"><span>CUSTOMER EXPERIENCE</span><span>OPERATIONS</span><span>DIGITAL PAYMENTS</span><span>CONTINUOUS LEARNING</span></div>
    </section>

    <section className="ticker"><div>PEOPLE FIRST ✳ CLEAR SOLUTIONS ✳ CUSTOMER EXPERIENCE ✳ RELIABLE OPERATIONS ✳ PEOPLE FIRST ✳ CLEAR SOLUTIONS ✳</div></section>

    <section className="section wrap about" id="about" data-reveal>
      <div className="section-kicker">01 / ABOUT ME</div>
      <div className="two-col"><h2>More than<br/><em>a Job Title.</em></h2><div><p className="lead">{profile.about}</p><p className="muted">My journey spans customer support, banking kiosk operations and sales administration. I also enjoy building practical digital products, experimenting with automation and turning everyday operational challenges into useful tools.</p><div className="signature"><img className="sf-photo-signature" src={profile.photo} alt="Sheik Farid"/><span>CURIOUS BY NATURE. PRACTICAL BY CHOICE.</span></div></div></div>
    </section>

    <section className="section experience-section" id="experience" data-reveal><div className="wrap">
      <div className="section-kicker">02 / PROFESSIONAL JOURNEY</div><div className="section-title-row"><h2>Experience that<br/><em>builds trust.</em></h2><p>Grounded in real customer conversations, responsible service and day-to-day operational problem-solving.</p></div>
      {experience.map((item, index) => <article className="experience-card" key={`${item.company}-${item.period}`}><div className="timeline-dot"></div><div className="exp-date">{item.period}</div><div className="exp-main"><span className="company-chip">{item.company.toUpperCase()}</span><h3>{item.role}</h3><p className="muted">{item.company}</p><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></div><div className="exp-number">0{index + 1}</div></article>)}
    </div></section>

    <section className="section wrap" id="skills" data-reveal><div className="section-kicker">03 / WHAT I BRING</div><div className="section-title-row"><h2>My <em>toolkit.</em></h2><p>Practical strengths that help make each customer interaction and workflow more effective.</p></div><div className="skill-grid">{skills.map(([name, desc], i) => <article className="skill-card" key={name}><span>0{i+1}</span><h3>{name}</h3><p>{desc}</p><b>✳</b></article>)}</div></section>

    <section className="section projects-section" id="projects" data-reveal><div className="wrap"><div className="section-kicker">04 / SELECTED WORK</div><div className="section-title-row"><h2>Ideas into<br/><em>real tools.</em></h2><p>A selection of professional initiatives and personal digital product explorations.</p></div><div className="project-grid">{projects.map((project, i) => <article className={`project-card project-${i+1}`} key={project.name}><div className="project-art"><span>{project.tag}</span><b>0{i+1} / WORK</b></div><div className="project-type">{project.type.toUpperCase()}</div><h3>{project.name}</h3><p>{project.description}</p></article>)}</div><p className="disclaimer">Some entries describe professional work or product concepts, not standalone commercial products.</p></div></section>

    <section className="education wrap" data-reveal><div className="section-kicker">05 / EDUCATION</div><div className="education-content"><div><h2>Learning is<br/><em>always in progress.</em></h2></div><div className="education-card"><span>2019</span><h3>Higher Secondary (Class 12)</h3><p>CBSE · Silbari Junior College</p></div></div></section>

    <section className="contact wrap" id="contact" data-reveal><div className="contact-panel"><img className="contact-watermark" src={profile.photo} alt=""/><div className="section-kicker">06 / LET&apos;S CONNECT</div><h2>Have a good<br/><em>challenge?</em></h2><p>I&apos;m interested in opportunities where thoughtful support, dependable operations and a learning mindset make a real difference.</p><div className="contact-actions"><a className="button white-button" href={`mailto:${profile.email}`}>Email me ↗</a><a className="button outline-button" href={`https://wa.me/91${profile.phone}`} target="_blank" rel="noreferrer">WhatsApp ↗</a><a className="button outline-button" href={profile.resume} download>Download resume ↓</a></div><div className="contact-details"><span>{profile.email}</span><span>+91 {profile.phone}</span><span>{profile.location}</span></div></div></section>

    <footer className="footer wrap"><a className="brand" href="#top"><img className="brand-mark" src={profile.photo} alt="Sheik Farid"/><span>SHEIK FARID<small>PERSONAL PORTFOLIO</small></span></a><p>DESIGNED WITH INTENTION. BUILT TO KEEP EVOLVING.</p><a href="#top">BACK TO TOP ↑</a><small>© {new Date().getFullYear()} SHEIK FARID</small></footer>
  </main>;
}
