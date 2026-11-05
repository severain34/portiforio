import { useEffect, useState } from 'react';

const projects = [
  {
    name: 'Severain AI',
    type: 'AI PRODUCT',
    year: '2024',
    category: 'AI',
    mark: '✳',
    description: 'A conversational AI assistant with streaming responses and contextual chat, designed to make powerful tools feel welcoming.',
    stack: ['React', 'AI', 'LLM'],
    href: 'https://severain-ai.lovable.app',
    featured: true,
  },
  {
    name: 'Training Severain',
    type: 'LEARNING PLATFORM',
    year: '2024',
    category: 'Web',
    mark: '⌘',
    description: 'A hands-on learning platform featuring guided lessons, coding exercises, and progress tracking for developers.',
    stack: ['React', 'Education', 'Web'],
    href: 'https://trainingseverain.lovable.app',
    featured: false,
  },
  {
    name: 'Glass UI Kit',
    type: 'OPEN-SOURCE CONCEPT',
    year: '2023',
    category: 'Design',
    mark: '◈',
    description: 'A reusable glassmorphism-inspired interface concept focused on luminous surfaces, readable type, and polished details.',
    stack: ['UI Design', 'React', 'CSS'],
    href: 'https://github.com/severain34',
    featured: false,
  },
];

const skills = [
  { name: 'React & Next.js', group: 'FRONTEND', level: '95%' },
  { name: 'JavaScript & TypeScript', group: 'LANGUAGES', level: '93%' },
  { name: 'Node.js & Express', group: 'BACKEND', level: '90%' },
  { name: 'PostgreSQL & MongoDB', group: 'DATA', level: '88%' },
  { name: 'AI integrations', group: 'EMERGING TECH', level: '88%' },
  { name: 'Cloud & deployment', group: 'DEVOPS', level: '85%' },
];

const snippets = [
  `import { useState } from 'react';\n\nfunction Portfolio() {\n  const [ideas, setIdeas] = useState(22);\n\n  return (\n    <main className="portfolio">\n      <h1>Building ideas into reality</h1>\n      <p>{ideas}+ projects, made with care.</p>\n    </main>\n  );\n}\n\nexport default Portfolio;`,
  `const developer = {\n  name: 'Severain',\n  role: 'Full-stack developer',\n  location: 'Rwanda',\n  focus: ['Web', 'AI', 'Product'],\n};\n\nexport default developer;`,
];

function BrandMark({ small = false }) {
  return (
    <span className={`brand-mark${small ? ' brand-mark-small' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" role="img">
        <path fill="#099b72" d="M48 8C25 8 8 23 8 43s16 35 38 35h8L40 96l28-20c15-6 24-18 24-33C92 23 74 8 48 8Z" />
        <path fill="#ff624f" d="M54 15h8c19 0 32 12 32 29S81 73 62 73H43l17-14H45c-16 0-27-9-27-22S30 15 48 15Z" />
        <path fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" d="M37 18c-12 5-18 14-18 24 0 15 12 24 29 24h15c16 0 26-8 26-21 0-7-3-13-8-17" />
        <circle cx="36" cy="39" r="6" fill="#1a2931" />
        <circle cx="68" cy="57" r="6" fill="#1a2931" />
      </svg>
    </span>
  );
}

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 16 16 4M6 4h10v10" /></svg>;
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow"><i />{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function CodeWindow() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [visibleCode, setVisibleCode] = useState('');

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setVisibleCode(snippets[0]);
      return undefined;
    }

    let character = 0;
    let deleting = false;
    let timeout;
    const animate = () => {
      const current = snippets[snippetIndex];
      if (!deleting) {
        character += 1;
        setVisibleCode(current.slice(0, character));
        if (character >= current.length) {
          deleting = true;
          timeout = window.setTimeout(animate, 1900);
          return;
        }
      } else {
        character -= 2;
        setVisibleCode(current.slice(0, Math.max(0, character)));
        if (character <= 0) {
          character = 0;
          deleting = false;
          setSnippetIndex((previous) => (previous + 1) % snippets.length);
          return;
        }
      }
      timeout = window.setTimeout(animate, deleting ? 12 : 27);
    };
    timeout = window.setTimeout(animate, 500);
    return () => window.clearTimeout(timeout);
  }, [snippetIndex]);

  return (
    <div className="code-window" aria-label="Animated code sample">
      <div className="window-bar">
        <div className="window-controls" aria-hidden="true"><i /><i /><i /></div>
        <span className="window-filename">severain.tsx</span>
        <span className="window-live"><i /> LIVE</span>
      </div>
      <div className="code-meta"><span>1</span><span>REACT · TYPESCRIPT</span><span>UTF-8</span></div>
      <pre className="code-content"><code>{visibleCode}<span className="typing-caret" aria-hidden="true" /></code></pre>
      <div className="window-footer"><span><i /> All systems operational</span><span>Build something meaningful.</span></div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className={`project-card${project.featured ? ' project-card-featured' : ''}`} style={{ '--card-index': index }}>
      <div className={`project-art project-art-${index + 1}`}>
        <span className="project-art-grid" />
        <span className="project-mark">{project.mark}</span>
        <span className="project-art-label">{project.type}</span>
        <span className="project-year">{project.year}</span>
      </div>
      <div className="project-info">
        <div className="project-title-row"><div><span className="project-kicker">{project.type}</span><h3>{project.name}</h3></div><a className="icon-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}><ArrowIcon /></a></div>
        <p>{project.description}</p>
        <div className="tag-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
    </article>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [formStatus, setFormStatus] = useState('');
  const filteredProjects = activeFilter === 'All' ? projects : projects.filter((project) => project.category === activeFilter);
  const navItems = [['Work', '#work'], ['About', '#about'], ['Stack', '#stack'], ['Contact', '#contact']];

  function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    setFormStatus('Opening your email app…');
    window.location.href = `mailto:senganezaseverain@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <div className="site-shell">
      <div className="ambient ambient-green" aria-hidden="true" /><div className="ambient ambient-coral" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Severain home"><BrandMark /><span className="brand-copy"><strong>SEVERAIN</strong><small>FULL-STACK DEVELOPER</small></span></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">{navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowIcon /></a></nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability"><span className="availability-dot" /> AVAILABLE FOR SELECT PROJECTS</div>
            <p className="hero-intro">Hello, I’m <span>Severain</span> <span className="intro-wave">✳</span></p>
            <h1>I build digital<br /><span className="outline-word">experiences</span><br />that feel <em>alive.</em></h1>
            <p className="hero-description">Full-stack developer from Rwanda. I turn ambitious ideas into thoughtful products — from polished interfaces to intelligent applications.</p>
            <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <ArrowIcon /></a><a className="button button-quiet" href="#contact">Start a conversation <span>↗</span></a></div>
            <div className="hero-social-proof"><div className="avatar-stack"><span>S</span><span>✦</span><span>+</span></div><p><strong>22+ projects shipped</strong><br />Built for people, with purpose.</p></div>
          </div>
          <div className="hero-visual"><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><CodeWindow /><div className="float-note note-top"><span>✳</span><div><strong>Thoughtful by design</strong><small>Built around people</small></div></div><div className="float-note note-bottom"><span className="note-pulse" /><div><strong>Clean code. Clear intent.</strong><small>From first sketch to launch</small></div></div></div>
          <a className="scroll-hint" href="#work"><span /> SCROLL TO EXPLORE</a>
        </section>

        <section className="ticker" aria-label="Areas of focus"><div className="ticker-track">{['PRODUCT ENGINEERING', '✳', 'REACT & FULL-STACK', '✳', 'AI-POWERED EXPERIENCES', '✳', 'DETAIL-DRIVEN DESIGN', '✳', 'PRODUCT ENGINEERING', '✳', 'REACT & FULL-STACK', '✳', 'AI-POWERED EXPERIENCES', '✳', 'DETAIL-DRIVEN DESIGN', '✳'].map((item, index) => <span key={index}>{item}</span>)}</div></section>

        <section className="section-wrap work-section" id="work"><SectionHeading eyebrow="SELECTED WORK · 01" title={<>A few things I’ve <em>put into the world.</em></>} description="A small selection of products and experiments, built with curiosity and care." /><div className="filter-row" role="group" aria-label="Filter projects">{['All', 'AI', 'Web', 'Design'].map((filter) => <button key={filter} type="button" className={activeFilter === filter ? 'filter-chip filter-active' : 'filter-chip'} onClick={() => setActiveFilter(filter)}>{filter}<span>{filter === 'All' ? projects.length : projects.filter((project) => project.category === filter).length}</span></button>)}</div><div className="projects-grid">{filteredProjects.map((project, index) => <ProjectCard project={project} index={index} key={project.name} />)}</div><a className="text-link" href="https://github.com/severain34" target="_blank" rel="noreferrer">More experiments on GitHub <ArrowIcon /></a></section>

        <section className="about-section" id="about"><div className="section-wrap about-grid"><div className="about-stamp"><div className="stamp-ring"><BrandMark /><span>CURIOUS BY NATURE · BUILT WITH INTENT · </span></div><div className="stamp-caption">Kigali, Rwanda <span>—</span> working worldwide</div></div><div className="about-copy"><SectionHeading eyebrow="A LITTLE ABOUT ME · 02" title={<>Good work starts with <em>good questions.</em></>} /><p>I’m a full-stack developer who cares about the whole experience: how a product looks, how it works, and how it makes someone feel. My work spans frontend craft, backend systems, and AI-powered features.</p><p>My journey began at <strong>Lycée de Muhura</strong>, where science and technology sparked a lasting curiosity. I still bring that same energy to every project: stay curious, sweat the details, and make something useful.</p><a className="text-link" href="#contact">A little more about working together <ArrowIcon /></a><div className="about-facts"><div><strong>22+</strong><span>PROJECTS SHIPPED</span></div><div><strong>Full-stack</strong><span>END-TO-END THINKING</span></div><div><strong>Rwanda</strong><span>ROOTED, WORKING GLOBALLY</span></div></div></div></div></section>

        <section className="section-wrap stack-section" id="stack"><div className="stack-intro"><SectionHeading eyebrow="TOOLS OF THE TRADE · 03" title={<>A versatile <em>toolkit.</em></>} description="The right tool for the job, chosen to make products fast, reliable, and a pleasure to use." /><div className="stack-badge"><span>⌘</span><div><strong>Always learning</strong><small>Tools change. Curiosity stays.</small></div></div></div><div className="skills-grid">{skills.map((skill, index) => <article className="skill-card" key={skill.name}><div className="skill-topline"><span>{skill.group}</span><span>0{index + 1}</span></div><h3>{skill.name}</h3><div className="skill-meter" role="img" aria-label={`${skill.name}: ${skill.level}`}><span style={{ '--skill-level': skill.level }} /></div></article>)}</div><div className="tool-cloud"><span>REACT</span><span>NEXT.JS</span><span>TYPESCRIPT</span><span>NODE.JS</span><span>POSTGRESQL</span><span>AI / LLMs</span><span>FIGMA</span><span>GIT</span></div></section>

        <section className="experience-section"><div className="section-wrap"><SectionHeading eyebrow="THE JOURNEY · 04" title={<>Progress, one <em>release at a time.</em></>} description="A path shaped by learning, shipping, and solving increasingly interesting problems." /><div className="timeline"><article className="timeline-item"><span className="timeline-year">2024 — NOW</span><div><span className="timeline-dot" /><h3>Independent Full-stack Developer</h3><p>Building AI-powered applications and learning experiences for people and teams. Focused on end-to-end product work, from interface to deployment.</p></div><span className="timeline-type">INDEPENDENT</span></article><article className="timeline-item"><span className="timeline-year">2023 — 2024</span><div><span className="timeline-dot" /><h3>Full-stack Product Work</h3><p>Created internal tools and customer-facing experiences, with an emphasis on clean implementation and considered visual systems.</p></div><span className="timeline-type">PRODUCT</span></article><article className="timeline-item"><span className="timeline-year">2019 — 2023</span><div><span className="timeline-dot" /><h3>Learning, Building, Repeating</h3><p>Developed a foundation in science and technology at Lycée de Muhura and started turning early ideas into working projects.</p></div><span className="timeline-type">FOUNDATION</span></article></div></div></section>

        <section className="contact-section section-wrap" id="contact"><div className="contact-panel"><div className="contact-copy"><SectionHeading eyebrow="HAVE SOMETHING IN MIND? · 05" title={<>Let’s make it <em>matter.</em></>} description="Have a product idea, a tricky build, or just want to talk through what’s possible? I’d love to hear about it." /><div className="contact-links"><a href="mailto:senganezaseverain@gmail.com"><span className="contact-icon">↗</span><span><small>EMAIL</small><strong>senganezaseverain@gmail.com</strong></span><ArrowIcon /></a><a href="https://wa.me/250792315839" target="_blank" rel="noreferrer"><span className="contact-icon">↗</span><span><small>WHATSAPP</small><strong>+250 792 315 839</strong></span><ArrowIcon /></a><a href="https://github.com/severain34" target="_blank" rel="noreferrer"><span className="contact-icon">↗</span><span><small>GITHUB</small><strong>@severain34</strong></span><ArrowIcon /></a></div></div><form className="contact-form" onSubmit={handleContactSubmit}><div className="form-heading"><span>01 — NEW MESSAGE</span><span className="form-status-dot" /> <span>USUALLY REPLIES IN 24H</span></div><label>Your name<input name="name" autoComplete="name" placeholder="How should I call you?" required /></label><label>Your email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label><label>What are you building?<textarea name="message" placeholder="A little context goes a long way…" rows="4" required /></label><button className="button button-primary form-submit" type="submit">Send an inquiry <ArrowIcon /></button>{formStatus && <p className="form-status" role="status">{formStatus}</p>}<p className="form-note">This opens your email app with the message filled in.</p></form></div></section>
      </main>

      <footer className="site-footer section-wrap"><a className="footer-brand" href="#home"><BrandMark small /><span>SEVERAIN</span></a><p>Designed with intent. Built with care. <span>© {new Date().getFullYear()} Severain</span></p><a className="back-top" href="#home">BACK TO TOP ↑</a></footer>
    </div>
  );
}
