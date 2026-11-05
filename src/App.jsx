import React, { useEffect, useRef } from 'react';

const LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Severain logo"><path fill="#099b72" d="M48 8C25 8 8 23 8 43s16 35 38 35h8L40 96l28-20c15-6 24-18 24-33C92 23 74 8 48 8Z"/><path fill="#ff624f" d="M54 15h8c19 0 32 12 32 29S81 73 62 73H43l17-14H45c-16 0-27-9-27-22S30 15 48 15Z"/><path fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" d="M37 18c-12 5-18 14-18 24 0 15 12 24 29 24h15c16 0 26-8 26-21 0-7-3-13-8-17"/><circle cx="36" cy="39" r="6" fill="#1a2931"/><circle cx="68" cy="57" r="6" fill="#1a2931"/></svg>`;

const REACT_SAMPLE = `import { useState } from 'react';

function Portfolio() {
  const [ideas, setIdeas] = useState(22);

  return (
    <main className="portfolio">
      <h1>Building ideas into reality</h1>
      <p>{ideas}+ projects, made with care.</p>
    </main>
  );
}

export default Portfolio;`;

function installPortfolioEffects(frame) {
  try {
    const doc = frame.contentDocument;
    if (!doc) return undefined;

    const brand = doc.querySelector('.nav-brand-logo');
    if (brand) {
      brand.innerHTML = LOGO;
      brand.setAttribute('aria-label', 'Severain logo');
      brand.setAttribute('role', 'img');
    }

    const style = doc.createElement('style');
    style.textContent = `
      .nav-brand-logo { width:56px!important;height:56px!important;padding:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important }
      .nav-brand-logo svg { display:block;width:100%;height:100%;filter:drop-shadow(0 0 10px rgba(100,255,218,.25)) }
      .hero-card .code-block.react-typing { min-height:17rem;white-space:pre;overflow-x:auto }
      .hero-card .code-block.react-typing .typing-output { color:#b0c4d8 }
      .hero-card .code-block.react-typing .typing-cursor { vertical-align:-2px }
    `;
    doc.head.appendChild(style);

    const code = doc.querySelector('.hero-card .code-block');
    if (!code) return undefined;
    code.classList.add('react-typing');
    code.setAttribute('aria-label', 'Animated React code sample');
    code.setAttribute('aria-live', 'off');
    code.replaceChildren();

    const output = doc.createElement('span');
    output.className = 'typing-output';
    const cursor = doc.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    code.append(output, cursor);

    if (doc.defaultView.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      output.textContent = REACT_SAMPLE;
      cursor.hidden = true;
      return undefined;
    }

    let index = 0;
    let timer;
    const type = () => {
      if (index >= REACT_SAMPLE.length) {
        timer = doc.defaultView.setTimeout(() => {
          index = 0;
          output.textContent = '';
          type();
        }, 2200);
        return;
      }
      const character = REACT_SAMPLE.charAt(index++);
      output.textContent += character;
      timer = doc.defaultView.setTimeout(type, character === '\n' ? 170 : 28);
    };
    timer = doc.defaultView.setTimeout(type, 450);
    return () => doc.defaultView.clearTimeout(timer);
  } catch {
    // Keep the original portfolio working if the iframe is ever hosted cross-origin.
    return undefined;
  }
}

export default function App() {
  const frameRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    let cleanup;
    const handleLoad = () => {
      if (cleanup) cleanup();
      cleanup = installPortfolioEffects(frame);
    };
    frame.addEventListener('load', handleLoad);
    if (frame.contentDocument?.readyState === 'complete') handleLoad();
    return () => {
      frame.removeEventListener('load', handleLoad);
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <main className="portfolio-shell">
      <iframe
        ref={frameRef}
        src="/portiforio.html"
        title="Severain's developer portfolio"
      />
    </main>
  );
}
