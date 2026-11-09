"use client";

import { useEffect, useState } from "react";
import { experience, profile, skills } from "@/data/portfolio";

const nav = [["About", "#about"], ["Experience", "#experience"], ["Skills", "#skills"], ["Contact", "#contact"]];

export default function PortfolioHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 80);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("shown"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => { window.clearTimeout(timer); observer.disconnect(); };
  }, []);

  return <main id="top">
    <header className="header">
      <a className="brand" href="#top"><img className="brand-mark" src={profile.photo} alt="Sheik Farid"/><span>SHEIK FARID<small>PERSONAL PORTFOLIO</small></span></a>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? "×" : "☰"}</button>
      <nav className={menuOpen ? "nav nav-open" : "nav"}>{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
      <a className="nav-cta" href="#contact">Let&apos;s talk <span>↗</span></a>
    </header>

    <section className={`hero wrap ${visible ? "hero-ready" : ""}`}>
      <div className="hero-copy">
        <div className="eyebrow"><i /> OPEN TO PROFESSIONAL OPPORTUNITIES</div>
        <p className="hello">HELLO, I&apos;M</p>
        <h1>Sheik<br/><em>Farid.</em></h1>
        <div className="role-pill">OPERATION &amp; SCSE <span>✳</span> CUSTOMER SUPPORT</div>
        <p className="hero-text">I turn customer questions into clear solutions through thoughtful communication, problem-solving and dependable support.</p>
        <div className="hero-buttons"><a className="button secondary" href={profile.resume} download>Download resume ↓</a></div>
        <div className="hero-meta"><span>BASED IN {profile.location.toUpperCase()}</span><span>SCROLL TO EXPLORE ↓</span></div>
      </div>
      <div className="portrait-wrap">
        <div className="portrait-backdrop"></div>
        <div className="portrait-card"><img src={profile.photo} alt="Sheik Farid portrait"/><div className="portrait-label"><img className="sf-photo-label" src={profile.photo} alt="Sheik Farid"/><span>REAL PERSON. REAL WORK.</span></div></div>
        <div className="float-card float-top"><span className="float-icon">✳</span><span>Customer first<br/><b>Always.</b></span></div>
        <div className="float-card float-bottom"><b>2025</b><span>Professional journey<br/>at BillHub begins</span></div>
        <div className="portrait-caption">01 / THE PERSON BEHIND THE WORK</div>
      </div>
      <div className="hero-bottom"><span>COMMUNICATION</span><span>PROBLEM SOLVING</span><span>DIGITAL PAYMENTS</span><span>CONTINUOUS LEARNING</span></div>
    </section>

    <section className="ticker"><div>PEOPLE FIRST ✳ CLEAR SOLUTIONS ✳ CUSTOMER EXPERIENCE ✳ RELIABLE OPERATIONS ✳ PEOPLE FIRST ✳ CLEAR SOLUTIONS ✳</div></section>

    <section className="section wrap about" id="about" data-reveal>
      <div className="section-kicker">01 / ABOUT ME</div>
      <div className="two-col"><h2>More than<br/><em>a Job Title.</em></h2><div><p className="lead">{profile.about}</p><p className="muted">My work has taught me to listen carefully, investigate issues, communicate clearly and stay composed when the details matter. Beyond support operations, I enjoy exploring dashboards, creative tools and digital product ideas.</p><div className="signature"><img className="sf-photo-signature" src={profile.photo} alt="Sheik Farid"/><span>CURIOUS BY NATURE. PRACTICAL BY CHOICE.</span></div></div></div>
    </section>

    <section className="section experience-section" id="experience" data-reveal><div className="wrap">
      <div className="section-kicker">02 / PROFESSIONAL JOURNEY</div><div className="section-title-row"><h2>Experience that<br/><em>builds trust.</em></h2><p>Learning through real customer conversations, practical problem-solving and teamwork.</p></div>
      {experience.map((item, index) => <article className="experience-card" key={`${item.company}-${item.period}`}><div className="timeline-dot"></div><div className="exp-date">{item.period}</div><div className="exp-main"><span className="company-chip">{item.company.toUpperCase()}</span><h3>{item.role}</h3><p className="muted">{item.company}</p><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></div><div className="exp-number">0{index + 1}</div></article>)}
    </div></section>

    <section className="section wrap" id="skills" data-reveal><div className="section-kicker">03 / WHAT I BRING</div><div className="section-title-row"><h2>My <em>toolkit.</em></h2><p>Practical strengths that help make every customer interaction better.</p></div><div className="skill-grid">{skills.map(([name, desc], i) => <article className="skill-card" key={name}><span>0{i+1}</span><h3>{name}</h3><p>{desc}</p><b>✳</b></article>)}</div></section>


    <section className="education wrap" data-reveal><div className="section-kicker">04 / EDUCATION</div><div className="education-content"><div><h2>Learning is<br/><em>always in progress.</em></h2></div><div className="education-card"><span>2019</span><h3>Higher Secondary (Class 12)</h3><p>CBSE · Silbari Junior College</p></div></div></section>

    <section className="contact wrap" id="contact" data-reveal><div className="contact-panel"><img className="contact-watermark" src={profile.photo} alt=""/><div className="section-kicker">05 / LET&apos;S CONNECT</div><h2>Have a good<br/><em>challenge?</em></h2><p>I&apos;m interested in opportunities where thoughtful support, dependable operations and a learning mindset make a real difference.</p><div className="contact-actions"><a className="button white-button" href={`mailto:${profile.email}`}>Email me ↗</a><a className="button outline-button" href={`https://wa.me/91${profile.phone}`} target="_blank" rel="noreferrer">WhatsApp ↗</a><a className="button outline-button" href={profile.resume} download>Download resume ↓</a></div><div className="contact-details"><span>{profile.email}</span><span>+91 {profile.phone}</span><span>{profile.location}</span></div></div></section>

    <footer className="footer wrap"><a className="brand" href="#top"><img className="brand-mark" src={profile.photo} alt="Sheik Farid"/><span>SHEIK FARID<small>PERSONAL PORTFOLIO</small></span></a><p>DESIGNED WITH INTENTION. BUILT TO KEEP EVOLVING.</p><a href="#top">BACK TO TOP ↑</a><small>© {new Date().getFullYear()} SHEIK FARID</small></footer>
  </main>;
}
