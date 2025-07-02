import './App.css';
import LinoLogo from './assets/LinoLogo.svg';
import CeoPhoto from './assets/ceo_profile.jpg';
import React, { useEffect, useState } from 'react';

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

function App() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

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

  return (
    <div className="min-h-screen bg-linoBlue text-desertSand flex flex-col items-center justify-start py-4 px-2 md:py-8 md:px-4 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <header className={`sticky top-0 z-30 w-full flex flex-row items-center justify-between px-2 md:px-12 py-4 mb-6 bg-[#14213d] bg-opacity-90 shadow-lg rounded-2xl backdrop-blur-md transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        {/* Full logo (bulb + text) on top left, always visible */}
        <div className="flex items-center gap-3">
          <img src={LinoLogo} alt="Lino.AI Co. Ltd. Logo" className="h-14 w-auto object-contain align-middle" />
        </div>
        <nav className="flex flex-row gap-2 md:gap-6 items-center">
          <a href="https://instagram.com/lino.ai.co" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="animated-link"><InstagramIcon /></a>
          <a href="https://tiktok.com/@lino.ai.co" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="animated-link"><TikTokIcon /></a>
          <a href="mailto:lino.ai.bot@gmail.com" aria-label="Gmail" className="animated-link"><GmailIcon /></a>
        </nav>
      </header>
      {/* Popup on scroll down (desktop only) */}
      {showPopup && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#14213d] bg-opacity-95 rounded-2xl shadow-2xl p-6 w-[420px] max-w-[90vw] border-2 border-desertSand animate-fade-in hidden lg:block card">
          <button onClick={() => setShowPopup(false)} className="absolute top-2 right-3 text-desertSand/80 hover:text-desertSand text-2xl font-bold modern-btn">&times;</button>
          <div className="flex flex-col gap-4">
            {/* CEO Info */}
            <div className="flex items-center gap-4 mb-2">
              <img src={CeoPhoto} alt="CEO" className="w-16 h-16 rounded-full border-2 border-desertSand shadow" />
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
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2 text-desertSand drop-shadow-lg text-center animated-headline">AI FOR GOOD</h1>
        <p className="max-w-2xl text-center text-base md:text-xl text-desertSand/90 mb-2 px-2 md:px-0">
          Lino.AI Co. Ltd. is an AI technology company offering seamless AI integration solutions for a better world.
        </p>
        <p className="max-w-2xl text-center text-base md:text-lg mission-highlight font-semibold bg-[#14213d]/70 rounded-lg px-4 py-2 mb-4 shadow-md">
          Building localized AI tools that empower African developers with accessible automation, ethical intelligence, and context-aware solutions for real-world challenges.
        </p>
      </section>

      {/* CEO Section - independent */}
      <section id="ceo" className="w-full max-w-2xl mb-8 flex flex-col items-center justify-center px-2 md:px-0 section">
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-center break-words">Meet Our CEO</h3>
        <img src={CeoPhoto} alt="CEO" className="w-28 h-28 md:w-36 md:h-36 max-w-full max-h-[144px] rounded-full object-cover border-4 border-desertSand shadow-lg mb-2" />
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
            We specialize in integrating agentic chatbots on websites and portals for instant responses and direct inquiries, ensuring there is no delay in conversation flow. In institutions, we integrate chatbots on portals so students, employees, and anyone inquiring can get feedback as fast as possible. We also create modern, responsive websites for individuals, businesses, and institutions.
          </p>
          <p className="text-desertSand/90 mb-2 text-center md:text-left">
            Looking ahead, Lino.AI Co. Ltd. is committed to scaling into a comprehensive AI technology company that supports and empowers all sectors—education, healthcare, finance, and legal, among others. Our mission is to provide accessible, free, and reliable AI-driven research and support, making information retrieval seamless and transparent. We strive to bridge knowledge gaps and foster innovation, ensuring that individuals and organizations in every field can benefit from the transformative power of artificial intelligence.
          </p>
          <p className="text-desertSand/70 text-center md:text-left">
            Our vision is to empower the world with AI autonomy and practical knowledge for a better future.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full max-w-5xl mb-10 px-2 md:px-0 break-words section">
        <h2 className="text-xl md:text-3xl font-bold mb-6 text-center">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: 'Agentic Chatbot Integration',
              desc: 'We integrate agentic chatbots on websites and portals for instant responses and direct inquiries, ensuring seamless conversation flow.',
            },
            {
              title: 'Custom Chatbots',
              desc: 'Custom AI chatbots for support, inquiries, and automation for businesses and institutions.',
            },
            {
              title: 'Website Creation',
              desc: 'We design and build modern, responsive websites for individuals, businesses, and institutions.',
            },
            {
              title: 'AI Education',
              desc: 'Lessons on AI use, software, websites, and content creation.',
            },
            {
              title: 'Workshops',
              desc: 'Workshops for students and institutions on practical AI and chatbot integration.',
            },
            {
              title: 'Technical Writing',
              desc: 'Technical writing for presentations and reports.',
            },
          ].map((service, idx) => (
            <div
              key={service.title}
              className="service-card rounded-xl p-4 md:p-6 flex flex-col items-center border border-transparent group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 mb-3 flex items-center justify-center rounded-full bg-desertSand/20 group-hover:bg-desertSand/40">
                <span className="text-xl md:text-2xl font-bold text-desertSand">{String.fromCodePoint(0x1F916 + idx)}</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-desertSand text-center">{service.title}</h3>
              <p className="text-center text-desertSand/80 group-hover:text-desertSand/100">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-[#183153] rounded-xl p-4 md:p-6 shadow-lg w-full max-w-2xl mb-8 px-2 md:px-0 break-words section">
        <h3 className="text-lg md:text-xl font-bold mb-2">Contact Us</h3>
        <p>Email: <a href="mailto:lino.ai@bot.com" className="underline hover:text-desertSand animated-link">lino.ai@bot.com</a></p>
        <p>Phone: <a href="tel:+254759778961" className="underline hover:text-desertSand animated-link">+254 759 778 961</a></p>
      </section>

      <footer className="mt-auto text-center text-desertSand/60 text-xs md:text-sm py-4">
        &copy; {new Date().getFullYear()} Lino.AI Co. Ltd.. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
