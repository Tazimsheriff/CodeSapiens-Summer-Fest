/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Zap, 
  Code, 
  ChevronRight, 
  ChevronDown,
  Mail, 
  Github, 
  Twitter, 
  Linkedin,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Mic2,
  Terminal,
  Trophy
} from 'lucide-react';

// --- Types ---
interface Session {
  name: string;
  time: string;
  link: string;
  type: 'SPEAKER' | 'WORKSHOP' | 'CONTEST';
  speakerImg?: string;
}

interface Track {
  id: number;
  name: string;
  color: string;
  textColor: string;
  sessions: Session[];
}

const TRACKS_FLOW: Track[] = [
  {
    id: 1,
    name: 'TRACK 1',
    color: 'border-red-500',
    textColor: 'text-red-500',
    sessions: [
      { name: 'Keerthana K - Data Structures Review', time: '10:00 AM - 11:00 AM', link: 'https://tinyurl.com/CSF-Track-1-Speaker-1', type: 'SPEAKER' },
      { name: 'Bharanivelan - Portfolio Building', time: '11:10 AM - 12:30 PM', link: 'https://tinyurl.com/CSF-Track-1-Contest', type: 'CONTEST' },
      { name: 'Subashini Mannuraj - Product R&D', time: '3:30 PM - 4:30 PM', link: 'https://tinyurl.com/CSF-Track-1-Speaker-2', type: 'SPEAKER' },
      { name: 'Velayutham TN - Resume Workshop', time: '4:40 PM - 5:30 PM', link: 'https://tinyurl.com/CSF-Track-1-Workshop', type: 'WORKSHOP' },
    ]
  },
  {
    id: 2,
    name: 'TRACK 2',
    color: 'border-blue-500',
    textColor: 'text-blue-500',
    sessions: [
      { name: 'Abinesh Magudeeswaran - Introduction to Machine Learning', time: '10:00 AM - 11:00 AM', link: 'https://tinyurl.com/CSF-Track-2-Speaker-1', type: 'SPEAKER' },
      { name: 'Kevin DS - UI/UX Designing', time: '11:10 AM - 12:10 PM', link: 'https://tinyurl.com/CSF-Track-2-Workshop', type: 'WORKSHOP' },
      { name: 'Gurmannat Kaur - AI Trends', time: '3:00 PM - 4:00 PM', link: 'https://tinyurl.com/CSF-Track-2-Speaker-2', type: 'SPEAKER' },
      { name: 'Akash D - Soft Skills', time: '4:10 PM - 5:30 PM', link: 'https://tinyurl.com/CSF-Track-2-Contest', type: 'CONTEST' },
    ]
  },
  {
    id: 3,
    name: 'TRACK 3',
    color: 'border-green-500',
    textColor: 'text-green-500',
    sessions: [
      { name: 'Subiksha A - OS and Networks', time: '10:00 AM - 11:00 AM', link: 'https://tinyurl.com/CSF-Track-3-Speaker-1', type: 'SPEAKER' },
      { name: 'Subikeesh M - E-SIM Simulation Workshop', time: '11:10 AM - 12:10 PM', link: 'https://tinyurl.com/CSF-Track-3-Workshop', type: 'WORKSHOP' },
      { name: 'Haritha Sivasankaran - Clean Code and Refactoring', time: '3:00 PM - 4:30 PM', link: 'https://tinyurl.com/CSF-Track-3-Contest', type: 'CONTEST' },
      { name: 'Lochan Pokali - DBMS Essential', time: '4:40 PM - 5:30 PM', link: 'https://tinyurl.com/CSF-Track-3-Speaker-2', type: 'SPEAKER' },
    ]
  }
];

// --- Components ---

const TypeIcon = ({ type }: { type: Session['type'] }) => {
  switch (type) {
    case 'SPEAKER': return <Mic2 size={12} className="text-brand-green" />;
    case 'WORKSHOP': return <Terminal size={12} className="text-brand-green" />;
    case 'CONTEST': return <Trophy size={12} className="text-brand-green" />;
    default: return null;
  }
};

const Stars = () => {
  return (
    <div className="stars-container">
      {[...Array(100)].map((_, i) => (
        <div 
          key={i} 
          className="star" 
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`, 
            width: `${Math.random() * 2 + 1}px`, 
            height: `${Math.random() * 2 + 1}px`,
            '--duration': `${Math.random() * 3 + 2}s`
          } as any} 
        />
      ))}
    </div>
  );
};

const Countdown = ({ timeLeft }: { timeLeft: { days: number; hours: number; minutes: number; seconds: number } }) => {
  const TimeUnit = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center px-4 md:px-6 py-6 rounded-lg border border-brand-green/40 bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-all duration-300" 
         style={{
           boxShadow: '0 0 20px rgba(57, 255, 20, 0.3), inset 0 0 20px rgba(57, 255, 20, 0.05)'
         }}>
      <div className="text-4xl md:text-6xl font-black font-display tracking-tighter mb-2 animate-pulse-glow" 
           style={{ color: '#39FF14', textShadow: '0 0 10px #39FF14, 0 0 20px rgba(57, 255, 20, 0.5)' }}>
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white/50 font-bold font-mono">
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
      <TimeUnit label="Days" value={timeLeft.days} />
      <div className="text-2xl md:text-4xl font-bold animate-blink" style={{ color: '#39FF14', textShadow: '0 0 10px #39FF14' }}>:</div>
      <TimeUnit label="Hours" value={timeLeft.hours} />
      <div className="text-2xl md:text-4xl font-bold animate-blink" style={{ color: '#39FF14', textShadow: '0 0 10px #39FF14' }}>:</div>
      <TimeUnit label="Minutes" value={timeLeft.minutes} />
      <div className="text-2xl md:text-4xl font-bold animate-blink" style={{ color: '#39FF14', textShadow: '0 0 10px #39FF14' }}>:</div>
      <TimeUnit label="Seconds" value={timeLeft.seconds} />
    </div>
  );
};

const Tag = ({ type }: { type: string }) => {
  return (
    <span className="px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-widest bg-brand-green text-black">
      {type}
    </span>
  );
};

const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const bootLines = [
    "> INITIALIZING SYSTEM...",
    "> CONNECTING TO CSF_SERVER_2026...",
    "> LOADING NEURAL NETWORK...",
    "> DEPLOYING ASSETS...",
    "> FINALIZING BOOT SEQUENCE...",
    "> ACCESS GRANTED."
  ];

  useEffect(() => {
    let currentLine = 0;
    const lineInterval = setInterval(() => {
      if (currentLine < bootLines.length) {
        setLines(prev => [...prev, bootLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(lineInterval);
      }
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center p-6 font-mono"
    >
      <div className="w-full max-w-md flex flex-col items-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="mb-8 w-20 h-20 border-2 border-brand-green p-4 relative"
        >
          <div className="absolute inset-0 border border-brand-green/20 animate-pulse" />
          <img src="https://i.ibb.co/Wv8FVTGQ/codesapiens-logo.jpg" alt="Logo" className="w-full h-full object-contain filter invert" referrerPolicy="no-referrer" />
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-display font-black tracking-tighter text-white mb-2 uppercase italic glow-text-sm">CODESAPIENS</h2>
        <div className="text-[10px] text-brand-green font-bold tracking-[0.3em] mb-12 uppercase opacity-80 italic">BOOT_SEQUENCE_V2.6</div>
        
        <div className="w-full space-y-2 mb-12 h-32 overflow-hidden flex flex-col justify-end">
          {lines.map((line, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-[10px] tracking-widest ${line && line.includes('GRANTED') ? 'text-brand-green font-black' : 'text-white/40'}`}
            >
              {line}
            </motion.div>
          ))}
        </div>

        <div className="w-full h-1 bg-white/5 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-brand-green shadow-[0_0_10px_#39FF14]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between w-full mt-2 text-[8px] text-white/20 tracking-tighter uppercase font-bold">
          <span>{progress}% COMPLETED</span>
          <span>STABLE_BUILD_X64</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [view, setView] = useState<'home' | 'select-path' | 'track-agenda'>('home');
  const [isBooting, setIsBooting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<() => void>(() => {});
  const [selectedTrackId, setSelectedTrackId] = useState<number | null>(null);
  const [activeTrackShift, setActiveTrackShift] = useState<number>(1); // For the legacy schedule section

  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-05-10T10:00:00');
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);
      
      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      
      if (difference < 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalHoursLeft = (timeLeft.days * 24) + timeLeft.hours;

  const selectedTrack = selectedTrackId ? TRACKS_FLOW.find(t => t.id === selectedTrackId) : null;

  const handleBootTransition = (navigationFn: () => void) => {
    setPendingNavigation(() => navigationFn);
    setIsBooting(true);
    setIsMenuOpen(false);
  };

  const navigateToHome = () => setView('home');
  const navigateToSelectPath = () => {
    setView('select-path');
    window.scrollTo(0, 0);
  };
  const navigateToTrackAgenda = (id: number) => {
    setSelectedTrackId(id);
    setView('track-agenda');
    window.scrollTo(0, 0);
  };

  const navigateToHomeAndScroll = (id: string) => {
    setView('home');
    setTimeout(() => {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const navLinks = [
    { label: 'HOME', href: '#home', action: () => handleBootTransition(() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }) },
    { label: 'TRACKS', href: '#schedule', action: () => handleBootTransition(navigateToSelectPath) },
    { label: 'AGENDA', href: '#schedule', action: () => handleBootTransition(() => navigateToHomeAndScroll('#schedule')) },
    { label: 'COMMUNITY', href: '#social', action: () => handleBootTransition(() => navigateToHomeAndScroll('#social')) },
  ];

  return (
    <div className="min-h-screen bg-brand-black overflow-x-hidden font-sans">
      <AnimatePresence>
        {isBooting && (
          <BootScreen 
            onComplete={() => {
              setIsBooting(false);
              pendingNavigation();
            }} 
          />
        )}
      </AnimatePresence>
      
      <Stars />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:py-6 flex justify-between items-center bg-brand-black/20 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleBootTransition(() => setView('home'))}>
            <img src="https://i.ibb.co/Wv8FVTGQ/codesapiens-logo.jpg" alt="CSF Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" referrerPolicy="no-referrer" />
          <div className="flex flex-col">
            <span className="font-display font-black text-xl md:text-3xl tracking-tighter leading-none text-white uppercase italic glow-text-sm">CODESAPIENS</span>
            <span className="text-[8px] md:text-[10px] font-mono text-brand-green tracking-[0.4em] font-bold uppercase">SUMMER FEST '26</span>
          </div>
        </div>
        
        <div className="hidden md:flex gap-10 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
          {navLinks.map(link => (
            <button key={link.label} onClick={() => link.action && link.action()} className="hover:text-brand-green transition-colors cursor-pointer uppercase">{link.label}</button>
          ))}
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-[9px] font-mono font-bold text-white uppercase">Google Student</span>
            <span className="text-[8px] font-mono text-white/40 uppercase">Ambassador</span>
          </div>
          <button 
            onClick={() => handleBootTransition(navigateToSelectPath)}
            className="border border-purple-500 text-purple-400 px-4 md:px-6 py-2 font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            {view === 'home' ? 'REGISTER' : 'REGISTERED'}
          </button>
          
          <button 
            className="md:hidden text-white/60 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <CheckCircle2 className="rotate-45" size={24} /> : <div className="flex flex-col gap-1 w-6"><div className="h-0.5 bg-current w-full"></div><div className="h-0.5 bg-current w-full"></div><div className="h-0.5 bg-current w-full"></div></div>}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[45] bg-brand-black flex flex-col items-center justify-center p-6"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map(link => (
                <button 
                  key={link.label} 
                  onClick={() => {
                    link.action && link.action();
                    setIsMenuOpen(false);
                  }} 
                  className="text-2xl font-display font-black tracking-widest text-white/40 hover:text-brand-green transition-colors uppercase"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {view === 'select-path' ? (
        <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
          <button 
            onClick={() => handleBootTransition(navigateToHome)}
            className="self-start flex items-center gap-2 text-white/40 hover:text-white transition-colors font-mono text-[10px] uppercase tracking-widest mb-12"
          >
            <ArrowLeft size={14} /> BACK TO HOME
          </button>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter text-center mb-4">
             <span className="text-brand-cyan glow-text italic">SELECT YOUR PATH</span>
          </h1>
          <p className="text-white/40 font-mono text-sm uppercase tracking-widest text-center mb-20">
             CHOOSE A TRACK TO VIEW SCHEDULE
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            {TRACKS_FLOW.map(track => (
              <motion.div
                key={track.id}
                whileHover={{ y: -10 }}
                onClick={() => handleBootTransition(() => navigateToTrackAgenda(track.id))}
                className={`p-1 border-2 ${track.color} rounded-2xl cursor-pointer bg-black/40 backdrop-blur-sm group h-96 flex flex-col items-center justify-center relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h2 className={`text-4xl md:text-5xl font-display font-black mb-4 ${track.textColor}`}>{track.name}</h2>
                <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest group-hover:text-white transition-colors">VIEW EVENTS</span>
              </motion.div>
            ))}
          </div>
        </section>
      ) : view === 'track-agenda' && selectedTrack ? (
        <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto flex flex-col items-center min-h-screen">
          <button 
            onClick={() => handleBootTransition(navigateToSelectPath)}
            className="self-start flex items-center gap-2 text-white/40 hover:text-white transition-colors font-mono text-[10px] uppercase tracking-widest mb-16"
          >
            <ArrowLeft size={14} /> BACK TO TRACKS
          </button>

          <div className="w-full text-center mb-16">
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter mb-4 ${selectedTrack.textColor}`}>
               {selectedTrack.name}
            </h1>
            <div className={`h-1 w-24 mx-auto mb-8 bg-current ${selectedTrack.textColor}`} />
            <p className="text-white/40 font-mono text-xs uppercase tracking-widest">
               Click on an event to proceed with registration.
            </p>
          </div>

          <div className="w-full space-y-4">
            {selectedTrack.sessions.map((session, i) => (
              <motion.a
                key={i}
                href={session.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                className="w-full p-6 bg-white/5 border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group transition-all"
              >
                <div className="flex items-center gap-6">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-4 text-brand-cyan font-mono text-[10px]">
                            <div className="flex items-center gap-2">
                              <Clock size={14} />
                              {session.time}
                            </div>
                            <div className="flex items-center gap-2">
                              <TypeIcon type={session.type} />
                              <span className="text-brand-green font-bold tracking-widest px-2 py-0.5 border border-brand-green/30 rounded uppercase">
                                {session.type}
                              </span>
                            </div>
                          </div>
                          <h3 className="text-xl md:text-3xl font-display font-bold leading-tight group-hover:text-brand-green transition-colors">
                            {session.name.includes(' - ') ? session.name.split(' - ').slice(1).join(' - ') : session.name}
                          </h3>
                        </div>
                </div>
                <ExternalLink size={20} className="text-white/20 group-hover:text-white transition-colors" />
              </motion.a>
            ))}
          </div>
        </section>
      ) : (
        <>
          {/* Hero */}
          <section id="home" className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-32 md:pt-40 hero-bg">
        {/* Textures */}
        <div className="absolute inset-0 scanlines opacity-5 z-[1]" />
        <div className="absolute inset-0 dot-grid opacity-5 z-[1]" />
        
        <div className="text-center space-y-4 relative z-10 mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-black leading-none tracking-[0.2em] text-white glow-white mb-2 italic uppercase"
          >
            CODESAPIENS
          </motion.h2>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 md:gap-8">
              <motion.h1 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-display font-black leading-none tracking-tighter text-white glow-white"
              >
                SUMMER
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative w-16 h-16 md:w-32 md:h-32 p-2 border border-brand-green/30 rounded-lg bg-brand-green/5 backdrop-blur-sm"
              >
                 <div className="absolute inset-0 bg-brand-green/10 blur-xl rounded-full animate-pulse" />
                 <img 
                    src="https://i.ibb.co/wh3SnnB7/csf-logo.jpg" 
                    alt="CSF" 
                    className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]" 
                    referrerPolicy="no-referrer"
                  />
              </motion.div>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-display font-black leading-none tracking-tighter text-brand-green italic glow-neon mt-4 md:mt-10"
            >
              FEST '26
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#4a7a4a] text-sm md:text-base font-mono tracking-[0.1em] uppercase cursor-blink pt-8"
          >
            Explore. Evolve. Engineer. // The Student Community.
          </motion.p>
        </div>

        {/* Info Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 bg-black/40 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-2xl mb-12"
        >
          <div className="flex items-center gap-3">
            <Zap size={16} className="text-brand-cyan" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">3 Tracks</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
          <div className="flex items-center gap-3">
            <Code size={16} className="text-brand-green" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">12 Events</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
          <div className="flex items-center gap-3">
            <Clock size={16} className="text-brand-green" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">10:00 AM - 8:30 PM</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-brand-green" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">MAY 10, 2026</span>
          </div>
        </motion.div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleBootTransition(navigateToSelectPath)}
          className="cyber-button text-xs md:text-sm px-8 md:px-12 py-4 md:py-5 border-2 relative group overflow-hidden"
        >
          <span className="relative z-10 font-black">JOIN THE REVOLUTION</span>
          <div className="absolute inset-0 bg-brand-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform" />
        </motion.button>

        {/* Floating background elements for animations */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.div
            animate={{ 
              y: [0, 12, 0],
              opacity: [0.4, 1, 0.4],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="text-brand-green glow-neon cursor-pointer"
            onClick={() => {
              const statsSection = document.getElementById('stats');
              statsSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ChevronDown size={36} strokeWidth={3} />
          </motion.div>
        </div>
      </section>

      {/* Stats/Countdown Mini */}
      <section id="stats" className="py-16 md:py-24 bg-black flex justify-center items-center relative z-10">
        <div className="max-w-6xl w-full px-6 text-center">
          <div className="mb-12 md:mb-16">
            <h3 className="text-sm md:text-base font-mono uppercase tracking-[0.3em] text-brand-green mb-4">// SYSTEM INITIALIZATION //</h3>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter mb-2">
              EVENT LAUNCHES IN
            </h2>
          </div>
          <Countdown timeLeft={timeLeft} />
        </div>
      </section>

      {/* System Diagnostics Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-5xl md:text-7xl font-display font-black tracking-tighter leading-none mb-4"
              >
                SYSTEM <br/> 
                <span className="text-stroke text-white group-hover:text-brand-cyan transition-colors">DIAGNOSTICS</span>
              </motion.h2>
              <div className="monospace-label">// ABOUT CODESAPIENS SUMMER FEST</div>
            </div>

            <div className="space-y-6 text-white/60 leading-relaxed text-sm md:text-md">
              <p>
                <span className="text-brand-green font-black uppercase tracking-widest mr-2">INITIATING SUMMER PROTOCOL...</span>
                CodeSapiens Summer Fest is now live. This isn’t just another online event—it’s a convergence of builders, thinkers, and creators pushing the boundaries of technology. A digital arena where ideas compile into impact.
              </p>
              <p>
                We’ve engineered a <span className="text-white font-bold">fully online immersive experience</span> designed to challenge, inspire, and elevate. From AI and development to product thinking and problem-solving, every domain is activated—no limits, no borders.
              </p>
              
              <div className="pl-6 border-l-4 border-purple-500 py-2 italic font-mono text-white/80 bg-white/5">
                “Our objective is clear: Build, break, learn, and evolve. Leave with skills that outlast the event.”
              </div>
            </div>
          </div>

          {/* Right Column: Cards Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="terminal-card p-6 border-brand-cyan/20 group h-full"
            >
              <div className="text-brand-cyan mb-4 group-hover:scale-110 transition-transform">
                <ChevronRight size={24} strokeWidth={3} />
              </div>
              <h3 className="text-xl font-display font-black mb-2 uppercase italic">Speaking</h3>
              <p className="text-[10px] text-white/40 leading-relaxed">
                <span className="text-white font-bold block mb-1">10+ Expert Sessions</span>
                Insights from industry leaders, founders, and innovators shaping the future.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="terminal-card p-6 border-purple-500/20 group h-full"
            >
              <div className="text-purple-500 mb-4 group-hover:scale-110 transition-transform">
                <Users size={24} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-display font-black mb-2 uppercase italic">Contests</h3>
              <p className="text-[10px] text-white/40 leading-relaxed">
                <span className="text-white font-bold block mb-1">Coding Battles</span>
                Compete in high-intensity problem-solving rounds designed to test both logic and creativity.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="terminal-card p-6 border-brand-green/20 group h-full"
            >
              <div className="text-brand-green mb-4 group-hover:scale-110 transition-transform">
                <Zap size={24} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-display font-black mb-2 uppercase italic">Workshops</h3>
              <p className="text-[10px] text-white/40 leading-relaxed">
                <span className="text-white font-bold block mb-1">8 Hands-on Labs</span>
                Build real-world projects guided by mentors and experts.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="terminal-card p-6 border-white/20 group h-full bg-gradient-to-br from-brand-cyan/5 to-purple-500/5"
            >
              <h3 className="text-4xl font-display font-black mb-1 group-hover:text-brand-cyan transition-colors">100%</h3>
              <div className="text-xs font-mono font-black text-brand-green tracking-[0.3em] uppercase mb-4">ONLINE</div>
              <p className="text-[10px] text-white/40 leading-relaxed italic">
                Participate from anywhere. All you need is a device and ambition.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Schedule / Timeline */}
      <section id="schedule" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10 relative">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="monospace-label mb-2 uppercase">// Terminal Access // Live Agenda</div>
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-12">
              EVENT <span className="text-brand-green italic">SCHEDULE</span>
            </h2>
            
            {/* Shift Tabs */}
            <div className="flex gap-4 md:gap-12 border-b border-white/10 w-full justify-center overflow-x-auto no-scrollbar">
              {['Morning', 'Evening'].map((shift) => (
                <button
                  key={shift}
                  onClick={() => setActiveTrackShift(shift === 'Morning' ? 1 : 2)}
                  className={`pb-4 px-6 text-sm font-mono font-bold tracking-[0.2em] uppercase transition-all cursor-pointer ${
                    (activeTrackShift === 1 && shift === 'Morning') || (activeTrackShift === 2 && shift === 'Evening') 
                    ? 'border-b-2 border-brand-cyan text-white' 
                    : 'text-white/20 hover:text-white/40'
                  }`}
                >
                  {shift}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRACKS_FLOW.map((track) => {
              const sessions = activeTrackShift === 1 ? track.sessions.slice(0, 2) : track.sessions.slice(2);
              return (
                <div key={track.id} className="space-y-6">
                  {sessions.map((session, idx) => (
                    <motion.div
                      key={`${track.id}-${idx}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => navigateToTrackAgenda(track.id)}
                      className={`terminal-card p-6 border-t-2 relative group overflow-hidden cursor-pointer ${
                         track.id === 1 ? 'border-t-brand-green' : track.id === 2 ? 'border-t-purple-500' : 'border-t-brand-cyan'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <Tag type="Session" />
                        <span className={`track-pill track-pill-${track.id}`}>T{track.id}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 mb-3">
                        <Clock size={12} className="text-brand-green" />
                        <span>{session.time}</span>
                      </div>
                      
                      <h4 className="text-2xl font-display font-black leading-tight mb-4 group-hover:text-brand-green transition-colors">
                        {session.name}
                      </h4>
                      
                      <p className="text-[10px] text-white/40 leading-relaxed mb-6">
                        Engaging hands-on session focusing on the core principles and architecture of {session.name}.
                      </p>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <TypeIcon type={session.type} />
                            <span className="text-[10px] font-bold text-brand-green tracking-widest">
                               {session.type}
                            </span>
                         </div>
                         <ChevronRight size={14} className="text-white/20 group-hover:text-brand-green group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Volunteer Nexus Section */}
      <section id="nexus" className="py-24 px-6 border-t border-white/10 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20">
            <div className="monospace-label mb-2 uppercase">// Core Contributors // The Nexus</div>
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter">
              THE <span className="text-brand-green italic">NEXUS</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "R TAZIM SHERIFF", role: "Event Lead", img: "https://i.ibb.co/ZzrDNtSm/tazzz.jpg", linkedin: "https://www.linkedin.com/in/tazim-sheriff-r-15a355230/" },
              { name: "J.MUKESHWAR RAUDRA (P r o f e s s o r)", role: "Co-Lead", img: "https://i.ibb.co/1GjL7ssp/proffesor.jpg", linkedin: "https://www.linkedin.com/in/mukeshwar-raudra" },
              { name: "GIRIPRASAD K", role: "Co-Lead", img: "https://i.ibb.co/Txt7xt4P/giri.jpg", linkedin: "https://www.linkedin.com/in/girii73?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
              { name: "JAYASRI S", role: "Documentation Lead", img: "https://i.ibb.co/rKkFTNT2/jayasree.jpg", linkedin: "https://www.linkedin.com/in/jayasri-s-ai" },
              { name: "PRINCE KEVIN KARTHIK I", role: "Event Speaker Manager", img: "https://i.ibb.co/VWrj4T7M/prince.jpg", linkedin: "https://www.linkedin.com/in/princek6" },
              { name: "HARSHA VARDHINI R", role: "Event Speaker Management", img: "https://i.ibb.co/5X3G6ZR9/harsha.jpg", linkedin: "https://www.linkedin.com/in/harsha-vardhini-05783036a?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
              { name: "PRIYANGA RADHAKRISHNAN", role: "Design Team", img: "https://i.ibb.co/KxVT5jXm/Priyanga.jpg", linkedin: "https://www.linkedin.com/in/priyanga-radhakrishnan-53b505380?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
              { name: "PULI PHANINDRA", role: "Community Partners Team", img: "https://i.ibb.co/tw4KFD4G/puli-og.jpg", linkedin: "https://www.linkedin.com/in/puli-phanindhra-475ba3375/" },
              { name: "SARVESH S", role: "Event Speaker Manager", img: "https://i.ibb.co/r2QMFLZk/sarvesh-s.jpg", linkedin: "https://www.linkedin.com/in/sarvesh-sivasankaran?utm_source=share_via&utm_content=profile&utm_medium=member_android" }
            ].map((volunteer, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="aspect-[4/5] bg-white/5 border border-white/10 overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all duration-700 relative">
                   <div className="absolute inset-0 bg-brand-green/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {volunteer.linkedin ? (
                    <a href={volunteer.linkedin} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                      <img 
                        src={volunteer.img} 
                        alt={volunteer.name} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-700 cursor-pointer" 
                        referrerPolicy="no-referrer"
                      />
                    </a>
                  ) : (
                    <img 
                      src={volunteer.img} 
                      alt={volunteer.name} 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-700" 
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-display font-bold text-lg leading-tight uppercase group-hover:text-brand-green transition-colors">{volunteer.name}</h3>
                    <p className="font-mono text-[8px] text-white/40 tracking-widest uppercase mt-1">{volunteer.role}</p>
                  </div>
                  <span className="text-[10px] font-mono text-white/10 font-black">0{i+1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section id="sponsors" className="py-24 bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div className="monospace-label">// SYSTEM_SUPPORTERS //</div>
            <h2 className="text-4xl font-display font-black tracking-tighter uppercase">COMMUNITY <span className="text-brand-green italic">PARTNERS</span></h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Google Student Ambassador', img: 'https://i.ibb.co/WpqFQshk/gsa.jpg' },
              { name: 'Namma Flutter', img: 'https://i.ibb.co/ZzZJMxsc/Whats-App-Image-2026-05-05-at-9-47-59-flutter.jpg' },
              { name: 'Nexora', img: 'https://i.ibb.co/rfTnMRqy/Whats-App-Image-2026-05-05-at-9-47-59-PM.jpg' },
              { name: 'Microsoft Learn Student Ambassador', img: 'https://i.ibb.co/gLjbdWGN/MIC-Student-Ambassadors-Badge-Program-Color-BG.png' },
              { name: 'CSF', img: 'https://i.ibb.co/wh3SnnB7/csf-logo.jpg' }
            ].map((partner, i) => (
              <div 
                key={i} 
                className="w-full sm:w-64 h-48 bg-brand-black flex items-center justify-center p-6 transition-all duration-300 group cursor-crosshair border border-white/5"
              >
                <img 
                  src={partner.img} 
                  alt={partner.name} 
                  className="max-w-[85%] max-h-[85%] object-contain opacity-80 group-hover:opacity-100 transition-all" 
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neural Network Section */}
      <section id="social" className="py-24 px-6 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter">
              JOIN THE <span className="text-brand-green italic">NEURAL NETWORK</span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-base font-medium">
              Connect with 5000+ developers, designers, and innovators in our official community. 
              Follow the hashtag <span className="text-brand-green">#CodeSapiens26</span>
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              name: 'LinkedIn', 
              label: 'Connect', 
              icon: <Linkedin size={32} />, 
              color: 'text-blue-400', 
              hoverBorder: 'hover:border-blue-500/50',
              link: 'https://www.linkedin.com/company/codesapiens-community/'
            },
            { 
              name: 'Website', 
              label: 'Explore', 
              icon: <Code size={32} />, 
              color: 'text-brand-green', 
              hoverBorder: 'hover:border-brand-green/50',
              link: 'https://www.codesapiens.in/'
            },
            { 
              name: 'Instagram', 
              label: 'Follow Us', 
              icon: <Users size={32} />, 
              color: 'text-pink-500', 
              hoverBorder: 'hover:border-pink-500/50',
              link: 'https://www.instagram.com/codesapiens.in/'
            }
          ].map((social, i) => (
            <motion.a 
              key={i}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -5 }}
              className={`terminal-card p-12 flex flex-col items-center justify-center gap-6 group transition-all duration-500 ${social.hoverBorder}`}
            >
              <div className={`${social.color} opacity-40 group-hover:opacity-100 transition-opacity`}>
                {social.icon}
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-display font-bold mb-2 uppercase tracking-tight">{social.name}</h3>
                <div className={`flex items-center gap-2 text-[10px] font-mono font-black uppercase tracking-[0.2em] ${social.color} opacity-60 group-hover:opacity-100 transition-opacity`}>
                  {social.label} <ArrowRight size={12} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>



      {/* Registration Pre-footer Section */}
      <section className="py-24 px-6 bg-black flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-block bg-red-600 text-white font-mono text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded">
             FINAL CALL
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-brand-cyan">
             REGISTRATION
          </h2>
          <p className="text-white/60 text-sm md:text-md font-medium tracking-wide">
             This is your last chance to be part of the Google Student Ambassadors history. <br/>
             Registration closes in <span className="text-pink-500 font-bold">{totalHoursLeft} {totalHoursLeft === 1 ? 'hour' : 'hours'}.</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 border border-white/10 p-12 rounded-3xl mt-12 text-left">
             <div className="space-y-4">
               {[
                 'Access to all 12 Sessions',
                 'Special Event access',
                 'Participation Certificate'
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={24} className="text-brand-green" />
                    <span className="text-white/80 font-medium">{item}</span>
                 </div>
               ))}
             </div>
             <div className="space-y-4">
               {[
                 'Career Networking Session',
                 'Contest Entry Eligibility'
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={24} className="text-brand-green" />
                    <span className="text-white/80 font-medium">{item}</span>
                 </div>
               ))}
             </div>

             <div className="col-span-full pt-12 flex flex-col items-center gap-4">
               <button 
                 onClick={() => handleBootTransition(navigateToSelectPath)}
                 className="w-full max-w-md border-2 border-brand-cyan text-brand-cyan py-5 font-display font-black text-xl tracking-tight hover:bg-brand-cyan hover:text-black transition-all"
               >
                 START REGISTRATION
               </button>
               <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest text-center">
                 By registering, you agree to our Terms of Service. No spam, just code.
               </span>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-brand-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-mono tracking-widest uppercase text-white/40">
           <div className="flex items-center gap-4">
             <img src="https://i.ibb.co/Wv8FVTGQ/codesapiens-logo.jpg" alt="" className="w-8 h-8 object-contain opacity-80" referrerPolicy="no-referrer" />
             <span className="text-brand-green font-bold">Terminal_v2.5</span>
             <span>// Codesapiens System Execution (c) 2026</span>
           </div>
           
           <div className="flex gap-8">
             <a href="https://www.codesapiens.in/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">Official_Website</a>
             <a href="https://discord.gg/BEUfEjp6X" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">Discord_Server</a>
             <a href="https://github.com/Tazimsheriff/CodeSapiens-Summer-Fest" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">Github_Repo</a>
           </div>


        </div>
      </footer>
    </>
  )}
</div>
);
}
