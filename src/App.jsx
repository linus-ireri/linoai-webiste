import './App.css';
import LinoLogo from './assets/LinoLogo.svg';
import CeoPhoto from './assets/ceo_profile.jpg';
import LinoBulb from './assets/LinoBulb.svg';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const InstagramIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F87060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:scale-110 transition-transform duration-200">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const TikTokIcon = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:scale-110 transition-transform duration-200">
    <circle cx="24" cy="24" r="24" fill="#F87060"/>
    <path d="M31.5 16.5c.5 2.5 2.5 4.5 5 5v3.5c-2.5 0-4.5-.5-6.5-2v7.5c0 4.5-3.5 8-8 8s-8-3.5-8-8 3.5-8 8-8h1v3c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5V12.5h4V16.5z" fill="#fff"/>
  </svg>
);
const GmailIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:scale-110 transition-transform duration-200">
    <rect width="24" height="24" rx="5" fill="#F87060"/>
    <path d="M4 7.5V16.5C4 17.3284 4.67157 18 5.5 18H18.5C19.3284 18 20 17.3284 20 16.5V7.5C20 6.67157 19.3284 6 18.5 6H5.5C4.67157 6 4 6.67157 4 7.5Z" fill="#fff"/>
    <path d="M4 7.5L12 13.5L20 7.5" stroke="#F87060" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const XIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:scale-110 transition-transform duration-200">
    <rect width="24" height="24" rx="5" fill="#F87060"/>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#fff"/>
  </svg>
);

function App() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showApplicationsSection, setShowApplicationsSection] = useState(false);

  // Inject Chatbase chatbot script on mount
  useEffect(() => {
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...arguments_) => {
        if (!window.chatbase.q) window.chatbase.q = [];
        window.chatbase.q.push(arguments_);
      };
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") return target.q;
          return (...args) => target(prop, ...args);
        },
      });
    }
    const onLoad = function () {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "fjtFzJc1-m4yenqRVvUGS";
      script.domain = "www.chatbase.co";
      document.body.appendChild(script);
    };
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (window.innerWidth >= 1024) { // Desktop only
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
              setShowPopup(true);
            } else if (currentScrollY < lastScrollY) {
              setShowPopup(false);
            }
          }
          if (currentScrollY < 40) {
            setShowHeader(true);
          } else if (currentScrollY > lastScrollY) {
            setShowHeader(false); // scrolling down
          } else {
            setShowHeader(true); // scrolling up
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Add/remove body class for mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    return () => document.body.classList.remove('mobile-menu-open');
  }, [mobileMenuOpen]);

  // Emojis for each AI type (unique, not used elsewhere)
  const aiFrontiersEmojis = [
    '📈', // Predictive AI
    '🎨', // Generative AI
    '🤖', // Agentic AI
    '💬', // Autonomous Agentic Chatbots
    '🦾', // Embodied AI (Robots)
    '🤝', // Multi-Embodied AI (Collaborative Robots)
    '🌌', // Autonomous Intelligent Multi-Embodied AI
  ];

  return (
    <>
      {/* Floating hamburger menu icon (always top right, rendered in portal) */}
      {!mobileMenuOpen && !showApplicationsSection && ReactDOM.createPortal(
        <button className="fixed top-3 right-3 z-50 p-2 focus:outline-none floating-hamburger" aria-label="Open menu" onClick={() => setMobileMenuOpen(true)} style={{background: '#14213d', display: 'flex', opacity: 1, visibility: 'visible', zIndex: 2147483647, position: 'fixed', top: '1.2rem', right: '1.2rem', left: 'auto', margin: 0, border: '2px solid #223a5f', borderRadius: '50%'}}>
          <span className="sr-only">Open menu</span>
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#F87060" strokeWidth="2">
            <line x1="5" y1="7" x2="19" y2="7" strokeLinecap="round" stroke="#F87060"/>
            <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" stroke="#F87060"/>
            <line x1="5" y1="17" x2="19" y2="17" strokeLinecap="round" stroke="#F87060"/>
          </svg>
        </button>,
        document.body
      )}
      <div className="min-h-screen bg-linoBlue text-desertSand flex flex-col items-center justify-start py-4 px-2 md:py-8 md:px-4 w-full max-w-full overflow-x-hidden">
        {/* Header */}
        <header className={`sticky top-0 z-30 w-full flex flex-row items-center justify-between px-2 md:px-12 py-4 mb-6 bg-[#14213d] bg-opacity-90 shadow-lg rounded-2xl backdrop-blur-md transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="flex items-center gap-3">
            <img src={LinoLogo} alt="Lino.AI Co. Ltd. Logo" className="h-14 w-auto object-contain align-middle" />
          </div>
          {/* Social icons in header: visible only on desktop */}
          <div className="flex flex-row gap-2 md:gap-6 items-center hidden lg:flex">
            <a href="https://instagram.com/lino.ai.co" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="animated-link"><InstagramIcon /></a>
            <a href="https://tiktok.com/@lino.ai.co" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="animated-link"><TikTokIcon /></a>
            <a href="mailto:lino.ai.bot@gmail.com" aria-label="Gmail" className="animated-link"><GmailIcon /></a>
          </div>
        </header>
        {/* Desktop: Floating sticky menu bar */}
        <nav className="hidden lg:flex sticky top-[4.5rem] z-40 w-full flex-row items-center justify-center gap-2 md:gap-6 py-2 px-1 md:px-8 bg-[#14213d] bg-opacity-95 shadow-md rounded-xl mb-4 menu-bar">
          <img src={LinoBulb} alt="Lino.AI Bulb Logo" className="h-8 w-8 mr-2 align-middle" style={{display: 'inline-block'}} />
          <a href="#ceo" className="menu-link">Meet Our CEO</a>
          <a href="#about" className="menu-link">About Lino.AI</a>
          <a href="#services" className="menu-link">Our Services</a>
          <a href="#ai-frontiers" className="menu-link">AI Frontiers</a>
          <a href="#contact" className="menu-link">Contact Us</a>
        </nav>
        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-[#14213de6] flex flex-col items-center justify-center px-6 animate-fade-in" style={{width: '100vw', height: '100vh', top: 0, left: 0, right: 0, bottom: 0, position: 'fixed'}}>
            <button
              className="mobile-menu-close"
              style={{position: 'absolute', top: '1.2rem', right: '1.2rem', fontSize: '2.2rem', lineHeight: 1, width: '2.6rem', height: '2.6rem', borderRadius: '50%', background: 'rgba(20,33,61,0.95)', color: '#F87060', border: 'none', cursor: 'pointer', pointerEvents: 'auto', zIndex: 1001}}
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              &times;
            </button>
            <nav className="flex flex-col gap-6 w-full max-w-xs text-center mt-24">
              <a href="#ceo" className="menu-link text-2xl" onClick={() => setMobileMenuOpen(false)}>Meet Our CEO</a>
              <a href="#about" className="menu-link text-2xl" onClick={() => setMobileMenuOpen(false)}>About Lino.AI</a>
              <a href="#services" className="menu-link text-2xl" onClick={() => setMobileMenuOpen(false)}>Our Services</a>
              <a href="#ai-frontiers" className="menu-link text-2xl" onClick={() => setMobileMenuOpen(false)}>AI Frontiers</a>
              <a href="#" className="menu-link text-2xl" onClick={() => { setMobileMenuOpen(false); setShowApplicationsSection(true); }}>AI in Action</a>
              <a href="#contact" className="menu-link text-2xl" onClick={() => setMobileMenuOpen(false)}>Contact Us</a>
            </nav>
          </div>
        )}
        {/* Popup on scroll down (desktop only) */}
        {showPopup && (
          <div className="fixed bottom-8 right-8 z-50 bg-[#14213d] bg-opacity-95 rounded-2xl shadow-2xl p-6 w-[420px] max-w-[90vw] border-2 border-desertSand animate-fade-in hidden lg:block card">
            <button onClick={() => setShowPopup(false)} className="absolute top-2 right-3 text-desertSand/80 hover:text-desertSand text-2xl font-bold modern-btn">&times;</button>
            <div className="flex flex-col gap-4">
              {/* CEO Info */}
              <div className="flex items-center gap-4 mb-2">
                <div style={{display: 'inline-block', borderRadius: '50%', padding: '6px', background: '#fff'}}>
                  <img src={CeoPhoto} alt="CEO" className="w-28 h-28 md:w-36 md:h-36 max-w-full max-h-[144px] rounded-full object-cover" style={{display: 'block', borderRadius: '50%', border: 'none'}} />
                </div>
                <div>
                  <div className="font-bold text-lg text-desertSand">Sir Ireri Linus Mugendi</div>
                  <div className="text-desertSand/80 text-sm">Founder & CEO</div>
                </div>
              </div>
              {/* About */}
              <div>
                <div className="font-bold text-desertSand mb-1">About Lino.AI Co. Ltd.</div>
                <div className="text-desertSand/80 text-sm">Lino.AI Co. Ltd. is an AI technology company offering seamless AI integration solutions for a better world. We empower all sectors with accessible, reliable AI-driven research and support.</div>
              </div>
              {/* Services */}
              <div>
                <div className="font-bold text-desertSand mb-1">Services</div>
                <ul className="list-disc list-inside text-desertSand/80 text-sm">
                  <li>Agentic Chatbot Integration</li>
                  <li>Custom Chatbots</li>
                  <li>Website Creation</li>
                  <li>AI Education</li>
                  <li>Workshops</li>
                  <li>Technical Writing</li>
                </ul>
              </div>
              {/* Contacts */}
              <div>
                <div className="font-bold text-desertSand mb-1">Contact</div>
                <div className="text-desertSand/80 text-sm">Email: <a href="mailto:lino.ai@bot.com" className="underline hover:text-desertSand animated-link">lino.ai@bot.com</a></div>
                <div className="text-desertSand/80 text-sm">Phone: <a href="tel:+254759778961" className="underline hover:text-desertSand animated-link">+254 759 778 961</a></div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="flex flex-col items-center mb-8 mt-2 w-full section">
          <div style={{position: 'relative', display: 'inline-block', width: 'fit-content'}}>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2 text-desertSand drop-shadow-lg text-center animated-headline">AI FOR GOOD</h1>
            <svg className="hero-star" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#glow)">
                <path d="M16 4l2.2 6.6L25 12l-5.4 4.2L21 25l-5-3.2L11 25l1.4-8.8L7 12l6.8-1.4L16 4z" fill="#fff"/>
                <path d="M16 4l2.2 6.6L25 12l-5.4 4.2L21 25l-5-3.2L11 25l1.4-8.8L7 12l6.8-1.4L16 4z" fill="#F87060" fillOpacity="0.5"/>
              </g>
              <defs>
                <filter id="glow" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <animateMotion dur="2.2s" repeatCount="indefinite" keyPoints="0;0.25;0.5;0.75;1" keyTimes="0;0.25;0.5;0.75;1" path="M 8 8 Q 32 0 56 8 Q 64 24 56 40 Q 32 48 8 40 Q 0 24 8 8 Z"/>
            </svg>
          </div>
          <p className="max-w-2xl text-center text-base md:text-xl text-desertSand/90 mb-2 px-2 md:px-0">
            Lino.AI Co. Ltd. is an AI technology company offering seamless AI integration solutions for a better world.
          </p>
          <p className="max-w-2xl text-center text-base md:text-lg mb-4">
            Building localized AI tools that empower African developers with accessible automation, ethical intelligence, and context-aware solutions for real-world challenges.
          </p>
        </section>

        {/* Elite Professionals Banner */}
        <div className="elite-banner-glow w-full flex justify-center mb-10">
          <span className="elite-banner-text">500 Diverse, Elite &amp; Ethical AI Professionals by 2030</span>
        </div>

        {/* CEO Section - independent */}
        <section id="ceo" className="w-full max-w-2xl mb-8 flex flex-col items-center justify-center px-2 md:px-0 section">
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-center break-words">Meet Our CEO</h3>
          <div style={{display: 'inline-block', borderRadius: '50%', padding: '6px', background: '#fff'}}>
            <img src={CeoPhoto} alt="CEO" className="w-28 h-28 md:w-36 md:h-36 max-w-full max-h-[144px] rounded-full object-cover" style={{display: 'block', borderRadius: '50%', border: 'none'}} />
          </div>
          <p className="text-lg md:text-xl font-semibold text-desertSand text-center mb-4 break-words">Founder &amp; CEO - Sir Ireri Linus Mugendi</p>
        </section>

        {/* About Section - after CEO */}
        <section id="about" className="w-full max-w-3xl mb-10 flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center px-2 md:px-0 break-words section">
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-lg md:text-xl font-bold mb-2 text-center md:text-left">About Lino.AI Co. Ltd.</h3>
            <p className="text-desertSand/90 mb-2 text-center md:text-left">
              We are working seamlessly to offer AI solutions to everyone in society by providing real-world, practical solutions. We teach students and professionals how AI works through hands-on projects and multiple AI agents, and help organizations integrate chatbots for instant, reliable support.
            </p>
            <p className="text-desertSand/90 mb-2 text-center md:text-left">
              We specialize in integrating agentic chatbots and developing AI agents for websites and portals. Our AI agents can automate tasks, provide intelligent support, and act autonomously to solve complex problems. Currently, our AI agents assist with customer support, data analysis, and workflow automation. In the future, we envision AI agents evolving to become even more autonomous, capable of learning from their environment, collaborating with humans, and driving innovation across industries.
            </p>
            <p className="text-desertSand/90 mb-2 text-center md:text-left">
              We also create modern, responsive websites for individuals, businesses, and institutions.
            </p>
            <div className="about-goal-highlight text-center md:text-left font-semibold text-[#00c6fb] bg-[#14213d]/60 rounded-lg px-4 py-2 my-4 shadow-md" style={{fontStyle: 'italic', fontFamily: 'Audiowide, Orbitron, Arial, sans-serif', letterSpacing: '0.04em'}}>
              Our goal: 500 Diverse, Elite & Ethical AI Professionals by 2030.
            </div>
            <p className="text-desertSand/90 mb-2 text-center md:text-left">
              Looking ahead, Lino.AI Co. Ltd. is committed to scaling into a comprehensive AI technology company that supports and empowers all sectors—education, healthcare, finance, and legal, among others. Our mission is to provide accessible, free, and reliable AI-driven research and support, making information retrieval seamless and transparent. We strive to bridge knowledge gaps and foster innovation, ensuring that individuals and organizations in every field can benefit from the transformative power of artificial intelligence.
            </p>
            <p className="text-desertSand/70 text-center md:text-left">
              Our vision is to empower the world with AI autonomy and practical knowledge for a better future.
            </p>
          </div>
        </section>

        {/* AI Frontiers Section */}
        <section id="ai-frontiers" className="w-full max-w-6xl mx-auto mb-12 px-2 md:px-0 py-12 ai-frontiers-section" style={{background: 'radial-gradient(ellipse at 60% 0%, #101a36 0%, #0a1026 80%, #000 100%)', backgroundColor: '#000'}}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-white tracking-wide">AI Frontiers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="ai-frontiers-card">
              <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">📈</span></div>
              <h3>Predictive AI</h3>
              <p>Predictive AI uses data and patterns to forecast future events or outcomes. It powers things like recommendation systems, demand forecasting, and risk analysis by learning from historical data to make accurate predictions.</p>
            </div>
            <div className="ai-frontiers-card">
              <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">🎨</span></div>
              <h3>Generative AI (Gen-AI)</h3>
              <p>Generative AI creates new content - text, images, music, or code - by learning from vast datasets. It can write stories, generate art, or even design products, enabling machines to be creative partners.</p>
            </div>
            <div className="ai-frontiers-card">
              <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">🤖</span></div>
              <h3>Agentic AI</h3>
              <p>Agentic AI refers to systems that can make decisions and take actions on their own to achieve specific goals. These AIs can plan, adapt, and interact with their environment, acting as digital agents for users or organizations.</p>
            </div>
            <div className="ai-frontiers-card">
              <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">💬</span></div>
              <h3>Autonomous Agentic Chatbots</h3>
              <p>The next step is chatbots that not only converse but also act independently - handling tasks, making decisions, and learning from each interaction, all with minimal human oversight.</p>
            </div>
            <div className="ai-frontiers-card">
              <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">🦾</span></div>
              <h3>Embodied AI (Robots)</h3>
              <p>Embodied AI brings intelligence into physical form, like robots. These AIs can sense, move, and interact with the real world, enabling applications from manufacturing to healthcare.</p>
            </div>
            <div className="ai-frontiers-card">
              <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">🤝</span></div>
              <h3>Multi-Embodied AI (Collaborative Robots)</h3>
              <p>Multi-embodied AI involves multiple robots or intelligent devices working together. They coordinate, share information, and accomplish complex tasks as a team, much like a swarm or a group of workers.</p>
            </div>
            <div className="ai-frontiers-card">
              <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">🌌</span></div>
              <h3>Autonomous Intelligent Multi-Embodied AI (AIME AI)</h3>
              <p>The ultimate frontier: groups of robots or devices that are fully autonomous, learning from their environment and each other, adapting without human intervention, and performing sophisticated tasks in dynamic, real-world settings.</p>
            </div>
            <div className="ai-frontiers-card">
              <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">🧠🤖</span></div>
              <h3>Artificial General Intelligence (AGI)</h3>
              <p>AGI is the vision of machines with human-level intelligence - able to learn, reason, and adapt to any task or environment. Unlike today's specialized AIs, AGI would be truly general, capable of understanding and solving problems across all domains, and potentially collaborating with humans and other AIs in complex, dynamic settings.</p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full max-w-6xl mb-10 px-2 md:px-0 break-words section">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-center">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: 'Agentic AI Integration',
                desc: 'Seamless integration of intelligent AI agents that can autonomously handle complex tasks, make decisions, and provide contextual responses across your business, institution or company digital platforms.',
                emoji: '🤖',
              },
              {
                title: 'Custom AI Chatbots',
                desc: 'Tailored conversational AI solutions designed specifically for your business, institution or company needs, from customer support to lead generation and process automation.',
                emoji: '💬',
              },
              {
                title: 'Local LLM Hosting',
                desc: 'Secure, private hosting of Large Language Models on your business, institution or company infrastructure, ensuring data sovereignty and compliance with local regulations.',
                emoji: '🏠',
              },
              {
                title: 'RAG Vector Solutions',
                desc: 'Retrieval-Augmented Generation systems with advanced vector databases for accurate, context-aware responses from your business, institution or company proprietary knowledge base.',
                emoji: '🔍',
              },
              {
                title: 'AI Automation Services',
                desc: 'End-to-end automation solutions using AI agents to streamline workflows, reduce manual tasks, and improve operational efficiency for your business, institution or company.',
                emoji: '⚡',
              },
              {
                title: 'AI Education & Training',
                desc: 'Comprehensive AI literacy programs, hands-on workshops, and certification courses for students, professionals, and organizations in your business, institution or company.',
                emoji: '📚',
              },
              {
                title: 'AI Consulting',
                desc: 'Strategic AI implementation guidance, technology assessment, and roadmap development to maximize your business, institution or company AI investment returns.',
                emoji: '🎯',
              },
              {
                title: 'Website Development',
                desc: 'Modern, responsive websites with integrated AI capabilities, optimized for performance, accessibility, and user experience for your business, institution or company.',
                emoji: '💻',
              },
              {
                title: 'Technical Documentation',
                desc: 'Professional technical writing and documentation services using LaTeX, ensuring publication-ready quality for research and business materials for your business, institution or company.',
                emoji: '📝',
              },
            ].map((service, idx) => (
              <div
                key={service.title}
                className="service-card rounded-xl p-4 md:p-6 flex flex-col items-center border border-transparent group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 mb-3 flex items-center justify-center rounded-full bg-desertSand/20 group-hover:bg-desertSand/40">
                  <div className="emoji-circle">
                    <span className="text-2xl md:text-3xl font-bold text-desertSand">{service.emoji}</span>
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-desertSand text-center">{service.title}</h3>
                <p className="text-center text-desertSand/80 group-hover:text-desertSand/100 service-desc">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full max-w-4xl mb-10 px-2 md:px-0 break-words section">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-center">What People Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: 'Wanjiku Mwangi',
                role: 'Software Engineer, Nairobi',
                text: 'Lino.AI helped us automate our customer support. The team is professional and the chatbot is amazing!',
                img: 'https://api.dicebear.com/7.x/adventurer/png?seed=Wanjiku&skinColor=e5c1a1',
              },
              {
                name: 'Brian Otieno',
                role: 'AI Researcher, Kisumu',
                text: 'Their AI solutions are tailored for the African context. Highly recommended for any tech-driven business.',
                img: 'https://api.dicebear.com/7.x/adventurer/png?seed=Brian&skinColor=8d5524',
              },
              {
                name: 'Emily White',
                role: 'Product Manager, Nairobi',
                text: 'The website they built for us is fast, modern, and beautiful. The chatbot integration is seamless!',
                img: 'https://api.dicebear.com/7.x/adventurer/png?seed=Emily&skinColor=f9d9c7',
              },
            ].map((t, idx) => (
              <div key={t.name} className="testimonial-card bg-[#183153] rounded-xl p-6 shadow-xl flex flex-col items-center text-center border border-transparent animate-fade-in" style={{animationDelay: `${0.1 + idx * 0.1}s`}}>
                <img src={t.img} alt={t.name} className="testimonial-avatar w-16 h-16 rounded-full object-cover mb-3 shadow" />
                <div className="font-bold text-desertSand text-lg mb-1">{t.name}</div>
                <div className="text-orange-400 text-sm mb-2">{t.role}</div>
                <div className="text-desertSand/90 text-base">"{t.text}"</div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-[#183153] rounded-xl p-4 md:p-6 shadow-lg w-full max-w-2xl mb-8 px-2 md:px-0 break-words section">
          <h3 className="text-lg md:text-xl font-bold mb-2">Contact Us</h3>
          <p>Email: <a href="mailto:lino.ai.bot@gmail.com" className="underline hover:text-desertSand animated-link">lino.ai.bot@gmail.com</a></p>
          <p>Phone: <a href="tel:+254759778961" className="underline hover:text-desertSand animated-link">+254 759 778 961</a></p>
          {/* Social icons in Contact section: visible on both desktop and mobile */}
          <div className="flex flex-row gap-4 justify-center mt-4 block lg:flex">
            <a href="https://instagram.com/lino.ai.co" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="animated-link"><InstagramIcon /></a>
            <a href="https://tiktok.com/@lino.ai.co" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="animated-link"><TikTokIcon /></a>
            <a href="https://x.com/linoaico" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="animated-link"><XIcon /></a>
            <a href="mailto:lino.ai.bot@gmail.com" aria-label="Gmail" className="animated-link"><GmailIcon /></a>
          </div>
        </section>

        {/* Back to Top Button rendered via portal */}
        {ReactDOM.createPortal(
          <button
            onClick={() => {
              if (showApplicationsSection) {
                const overlay = document.querySelector('.ai-in-action-overlay-scroll');
                if (overlay) overlay.scrollTo({top: 0, behavior: 'smooth'});
              } else {
                window.scrollTo({top: 0, behavior: 'smooth'});
              }
            }}
            className="back-to-top-btn animate-fade-in"
            aria-label="Back to top"
          >
            ↑
          </button>,
          document.body
        )}

        {/* AI in Action Overlay */}
        {showApplicationsSection && (
          <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center px-2 py-8 animate-fade-in overflow-y-auto ai-in-action-overlay-scroll" style={{width: '100vw', height: '100vh', maxHeight: '100vh', top: 0, left: 0, right: 0, bottom: 0, position: 'fixed', background: 'radial-gradient(ellipse at 60% 0%, #101a36 0%, #0a1026 80%, #000 100%)'}}>
            <button
              className="mobile-menu-close"
              style={{position: 'fixed', top: '1.2rem', right: '1.2rem', fontSize: '2.2rem', lineHeight: 1, width: '2.6rem', height: '2.6rem', borderRadius: '50%', background: 'rgba(20,33,61,0.95)', color: '#00c6fb', border: 'none', cursor: 'pointer', pointerEvents: 'auto', zIndex: 10001}}
              aria-label="Close applications section"
              onClick={() => setShowApplicationsSection(false)}
            >
              &times;
            </button>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-white tracking-wide mt-8">AI in Action</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
              {/* Education */}
              <div className="ai-frontiers-card">
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">🎓</span></div>
                <h3>Education</h3>
                <p>Lino.AI's generative chatbots help students and teachers with research, answer questions about school events, and provide instant support on student portals or school websites. Schools can own or integrate their own chatbot for seamless communication and learning.</p>
              </div>
              {/* Business */}
              <div className="ai-frontiers-card">
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">💼</span></div>
                <h3>Business</h3>
                <p>Lino.AI chatbots automate customer support, handle inquiries, and streamline business processes. Agents can manage bookings, answer FAQs, and help with internal workflows, saving time and improving customer satisfaction.</p>
              </div>
              {/* Healthcare */}
              <div className="ai-frontiers-card">
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">🩺</span></div>
                <h3>Healthcare</h3>
                <p>AI agents assist patients with appointment scheduling, provide information about symptoms, and help clinics manage patient flow. Lino.AI's solutions ensure privacy and reliability in sensitive environments.</p>
              </div>
              {/* Transport */}
              <div className="ai-frontiers-card">
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">🚌</span></div>
                <h3>Transport</h3>
                <p>Chatbots provide real-time updates on schedules, help commuters plan routes, and answer questions about delays or services. Agents automate ticketing and customer service for transport companies.</p>
              </div>
              {/* Finance */}
              <div className="ai-frontiers-card">
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">💳</span></div>
                <h3>Finance</h3>
                <p>Lino.AI chatbots answer questions about accounts, help with loan applications, and provide financial advice, making banking more accessible and efficient.</p>
              </div>
              {/* Legal */}
              <div className="ai-frontiers-card">
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">⚖️</span></div>
                <h3>Legal</h3>
                <p>AI agents help users understand legal documents, answer questions about procedures, and connect clients to the right legal resources, making legal help more accessible.</p>
              </div>
              {/* E-commerce */}
              <div className="ai-frontiers-card">
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">🛒</span></div>
                <h3>E-commerce</h3>
                <p>Chatbots recommend products, answer customer questions, and assist with order tracking, improving the shopping experience and boosting sales for businesses.</p>
              </div>
              {/* Government */}
              <div className="ai-frontiers-card">
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">🏛️</span></div>
                <h3>Government</h3>
                <p>Lino.AI chatbots help citizens access information about services, submit requests, and get updates on government programs, making public services more efficient and transparent.</p>
              </div>
              {/* Agriculture */}
              <div className="ai-frontiers-card">
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">🌾</span></div>
                <h3>Agriculture</h3>
                <p>AI agents provide farmers with weather updates, market prices, and best practices, supporting smarter, data-driven farming and improving yields.</p>
              </div>
              {/* Hospitality */}
              <div className="ai-frontiers-card">
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">🏨</span></div>
                <h3>Hospitality</h3>
                <p>Chatbots handle reservations, answer guest questions, and provide local recommendations, enhancing guest experiences and streamlining hotel operations.</p>
              </div>
              {/* Real Estate */}
              <div className="ai-frontiers-card">
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">🏠</span></div>
                <h3>Real Estate</h3>
                <p>AI agents answer property inquiries, schedule viewings, and provide virtual tours, making property management and client engagement more efficient.</p>
              </div>
              {/* Media & Entertainment */}
              <div className="ai-frontiers-card">
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}><span className="emoji-glow">🎬</span></div>
                <h3>Media & Entertainment</h3>
                <p>Chatbots recommend content, answer fan questions, and engage audiences in new ways, helping media companies connect with their audiences.</p>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-auto text-center text-desertSand/60 text-xs md:text-sm py-4">
          &copy; {new Date().getFullYear()} Lino.AI Co. Ltd.. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export default App;
