/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'motion/react';
import { 
  Brain, 
  Cpu, 
  Network, 
  ShieldCheck, 
  Zap, 
  Fingerprint,
  Workflow,
  Sparkles,
  Activity,
  Layers,
  Globe,
  Compass,
  Database,
  Eye,
  Box,
  Share2,
  Lock,
  ZapOff,
  Terminal,
  CpuIcon
} from 'lucide-react';

// --- Animation Variants ---

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const pressEffect = {
  whileHover: { scale: 1.02, y: -5 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 25 }
};

const linkClickEffect = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 500, damping: 15 }
};

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 py-6 ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between px-8 py-4 rounded-full transition-all duration-700 ${
        scrolled ? 'bg-white/30 backdrop-blur-3xl border border-white/30 shadow-2xl' : 'bg-transparent'
      }`}>
        <motion.div 
          {...linkClickEffect}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-2xl group-hover:bg-accent-purple transition-all duration-500">
            <Brain className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-900">BrainFlow <span className="text-accent-purple">3.0</span></span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-12 text-sm font-semibold text-slate-600 tracking-wide">
          {['Концепція', 'Архітектура', 'Модулі', 'Дорожня карта'].map((item) => (
            <motion.a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
              className="relative group hover:text-accent-purple transition-colors"
              {...linkClickEffect}
            >
              {item}
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-accent-purple transition-all duration-500 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <div className="text-xs font-bold uppercase tracking-[0.2em] text-accent-purple/60 hidden lg:block">
          Презентація v3.0
        </div>
      </div>
    </motion.nav>
  );
};

const BackgroundEffects = () => {
  const { scrollY } = useScroll();
  
  // Parallax transforms for background blobs
  const y1 = useTransform(scrollY, [0, 5000], [0, -400]);
  const y2 = useTransform(scrollY, [0, 5000], [0, 300]);
  const y3 = useTransform(scrollY, [0, 5000], [0, -600]);
  const rotate = useTransform(scrollY, [0, 5000], [0, 45]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none grid-bg">
      {/* Large Parallax Blobs */}
      <motion.div 
        style={{ y: y1, rotate }}
        animate={{ 
          x: [0, 80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-accent-lilac/15 rounded-full blur-[140px]"
      />
      <motion.div 
        style={{ y: y2 }}
        animate={{ 
          x: [0, -60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-5%] w-[70%] h-[70%] bg-purple-200/20 rounded-full blur-[160px]"
      />

      {/* Floating Neural Nodes (Parallax Particles) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-accent-purple/20 rounded-full"
          style={{
            top: `${15 + i * 15}%`,
            left: `${10 + (i * 17) % 80}%`,
            y: useTransform(scrollY, [0, 5000], [0, -(300 + i * 200)]),
            x: i % 2 === 0 ? 20 : -20,
            rotate: i * 45,
            width: i % 2 === 0 ? '4px' : '2px',
            height: i % 2 === 0 ? '4px' : '2px',
            boxShadow: '0 0 10px rgba(124,58,237,0.3)'
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#FDFDFD_100%)]" />
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center w-full relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          style={{ y, opacity, scale }}
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            Майбутнє Інтелекту / v3.0.42
          </motion.div>
          
          <motion.div 
            initial={{ scale: 2, y: -100, skewX: -10, opacity: 0 }}
            animate={{ scale: 1, y: 0, skewX: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <h1 className="text-6xl md:text-[7.5rem] font-display font-bold leading-[0.88] text-gradient tracking-tighter uppercase">
              BrainFlow <br />
              <span className="text-slate-300">System 3.0</span>
            </h1>
          </motion.div>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-slate-500 mb-16 max-w-xl leading-relaxed font-medium"
          >
            Синхронізація людського інтелекту та машинного виконання. 
            Ми створюємо майбутнє, де технологія не просто інструмент, а продовження вашої думки.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-8">
            <motion.button
              {...pressEffect}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-accent-purple transition-colors flex items-center gap-3 group"
            >
              Ознайомитись з Whitepaper
              <Zap className="w-4 h-4 text-accent-lilac group-hover:text-white transition-colors" />
            </motion.button>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-slate-100 relative">
                <Activity className="text-accent-purple w-6 h-6 z-10" />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-accent-purple rounded-2xl"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status</div>
                <div className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                  Active Flow <span className="text-accent-purple">98%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative perspective-1000 hidden lg:block"
        >
          <div className="relative w-full aspect-square flex items-center justify-center">
            {/* Visual Asset: Abstract System Core */}
            <div className="relative w-[500px] h-[500px]">
              {/* Hardware-like radial tracks */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[1px] border-dashed border-slate-200 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] border-[1px] border-dashed border-slate-100 rounded-full"
              />
              <motion.div 
                animate={{ rotate: 180 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[40px] border-[1px] border-slate-200/50 rounded-full"
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotateY: [0, 10, 0],
                    rotateX: [0, -5, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="w-72 h-72 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.3)] flex items-center justify-center relative overflow-hidden border border-white/10"
                >
                  <Brain className="w-32 h-32 text-accent-purple drop-shadow-[0_0_20px_rgba(124,58,237,0.5)] z-10" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.2)_0%,transparent_70%)]" />
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
                  
                  {/* Micro-labels on the core */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Core Processor</div>
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Neural Link v3</div>
                </motion.div>
              </div>

              {/* Orbiting Nodes */}
              {[
                { Icon: Cpu, delay: 0, pos: "top-0 left-0", label: "Logic" },
                { Icon: Network, delay: 1, pos: "top-0 right-0", label: "Sync" },
                { Icon: ShieldCheck, delay: 2, pos: "bottom-0 left-0", label: "Sec" },
                { Icon: Zap, delay: 3, pos: "bottom-0 right-0", label: "Flow" }
              ].map((node, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -20, 0], 
                    rotate: [0, 5, 0],
                    x: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0]
                  }}
                  transition={{ duration: 5, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute ${node.pos} w-24 h-24 glass-card rounded-3xl flex flex-col items-center justify-center shadow-2xl z-20 border border-white/40`}
                >
                  <node.Icon className="w-10 h-10 text-accent-purple mb-2" />
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{node.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Scroll to Explore</div>
        <motion.div 
          animate={{ height: [48, 24, 48] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-0.5 bg-gradient-to-b from-accent-purple to-transparent" 
        />
      </div>
    </section>
  );
};

const ConceptSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, 200]);

  return (
    <section id="концепція" className="py-40 px-6 relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 atmosphere -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="text-[10px] font-black text-accent-purple uppercase tracking-[0.4em] mb-6">01 / Візія</div>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-12 tracking-tighter leading-tight uppercase">
              Когнітивний <br /> <span className="text-accent-purple">Суверенітет</span>
            </h2>
            <p className="text-2xl text-slate-500 mb-12 leading-relaxed font-medium">
              BrainFlow 3.0 — це перша у світі ОС, що базується на каузальному ШІ та мультиагентній оркестрації. Ми не просто автоматизуємо завдання, ми створюємо автономні системи, що розуміють контекст.
            </p>
            <div className="space-y-8">
              {[
                { title: "Каузальний Інтелект", desc: "Розуміння причинно-наслідкових зв'язків замість простого аналізу патернів.", icon: Workflow },
                { title: "Мультиагентна Мережа", desc: "Рій спеціалізованих агентів, що працюють синхронно для досягнення цілі.", icon: Network }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  {...pressEffect}
                  className="flex gap-6 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-slate-100 group-hover:border-accent-purple transition-colors">
                    <item.icon className="text-accent-purple w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <div className="relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="glass-card p-12 rounded-[4rem] relative overflow-hidden border border-white/50"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/10 blur-3xl" />
                <div className="relative z-10 space-y-8">
                   <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Analytics</div>
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                         <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Synchronized</span>
                      </div>
                   </div>
                   <div className="space-y-6">
                      {[
                        { label: "Neural Sync", val: 99.9 },
                        { label: "Causal Logic", val: 94.2 },
                        { label: "Agentic Flow", val: 98.7 }
                      ].map((stat, i) => (
                        <div key={i} className="space-y-2">
                           <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              <span>{stat.label}</span>
                              <span>{stat.val}%</span>
                           </div>
                           <div className="h-2 bg-slate-50 rounded-full overflow-hidden relative">
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${stat.val}%` }}
                                transition={{ duration: 2, delay: i * 0.2 }}
                                className="absolute inset-0 bg-accent-purple"
                              />
                           </div>
                        </div>
                      ))}
                   </div>
                   <div className="pt-8 flex items-center justify-between">
                      <div>
                        <div className="text-4xl font-display font-bold text-slate-900 mb-1 tracking-tighter">99.9%</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Когнітивна точність</div>
                      </div>
                      <div className="w-16 h-16 rounded-full border border-slate-100 flex items-center justify-center">
                         <Activity className="text-accent-purple w-6 h-6" />
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ArchitectureSection = () => {
  const layers = [
    { num: "01", title: "Фізичний рівень", desc: "Сенсори та обладнання для збору даних у реальному часі.", icon: Box, tag: "Hardware" },
    { num: "02", title: "Інтеграція даних", desc: "Уніфікація гетерогенних потоків інформації в єдиний контекст.", icon: Database, tag: "Context" },
    { num: "03", title: "Каузальний аналіз", desc: "Визначення причинно-наслідкових зв'язків у потоках даних.", icon: Workflow, tag: "Logic" },
    { num: "04", title: "Оркестрація", desc: "Управління роєм агентів для виконання складних сценаріїв.", icon: Share2, tag: "Swarm" },
    { num: "05", title: "Когнітивний інтерфейс", desc: "Адаптивна візуалізація та взаємодія з оператором.", icon: Eye, tag: "UX" },
    { num: "06", title: "Автономне виконання", desc: "Замкнений цикл прийняття рішень та дій без затримок.", icon: Zap, tag: "Action" }
  ];

  return (
    <section id="архітектура" className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <div className="text-[10px] font-black text-accent-purple uppercase tracking-[0.4em] mb-6">02 / Архітектура</div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter uppercase">6 Рівнів <span className="text-accent-purple">Системи</span></h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Кожен рівень системи працює в повній синергії для забезпечення максимальної автономності.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              {...pressEffect}
              className="glass-card p-12 rounded-[3rem] group transition-all duration-500 relative overflow-hidden cursor-pointer border border-white/50"
            >
              <div className="absolute top-0 right-0 p-8 text-4xl font-display font-black text-slate-100 group-hover:text-accent-purple/10 transition-colors">
                {layer.num}
              </div>
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-accent-purple group-hover:text-white transition-all duration-500 shadow-sm">
                <layer.icon className="w-8 h-8" />
              </div>
              <div className="text-[8px] font-black text-accent-purple uppercase tracking-[0.3em] mb-4">{layer.tag}</div>
              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-accent-purple transition-colors">{layer.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{layer.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ModulesSection = () => {
  const modules = [
    { title: "Neuro-Core", desc: "Центральний інтелект системи, що координує всі процеси.", icon: Brain, tag: "Intelligence" },
    { title: "Flow-Engine", desc: "Двигун обробки потокових даних з нульовою затримкою.", icon: Zap, tag: "Speed" },
    { title: "Agent-Swarm", desc: "Розподілена мережа агентів для паралельного виконання завдань.", icon: Network, tag: "Scale" },
    { title: "Causal-Link", desc: "Модуль логічного виводу та каузального моделювання.", icon: Workflow, tag: "Logic" },
    { title: "Vision-Portal", desc: "Інтерфейс візуалізації складних системних станів.", icon: Eye, tag: "UX" }
  ];

  return (
    <section id="модулі" className="py-40 px-6 bg-slate-900 text-white rounded-[5rem] mx-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#7C3AED_0%,transparent_40%)] opacity-20" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-[10px] font-black text-accent-lilac uppercase tracking-[0.4em] mb-6">03 / Модулі</div>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter uppercase">Модульна <br /> <span className="text-accent-lilac">Екосистема</span></h2>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              BrainFlow 3.0 побудована на базі незалежних модулів, що можуть масштабуватися під будь-які потреби підприємства.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {modules.map((module, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              {...pressEffect}
              className="p-10 rounded-[3rem] border border-white/10 transition-all duration-500 group cursor-pointer hover:bg-white/5"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-accent-lilac group-hover:text-slate-900 transition-all duration-500 shadow-lg">
                <module.icon className="w-6 h-6" />
              </div>
              <div className="text-[8px] font-black text-accent-lilac uppercase tracking-[0.3em] mb-4">{module.tag}</div>
              <h3 className="text-xl font-display font-bold mb-4 uppercase tracking-tight group-hover:text-accent-lilac transition-colors">{module.title}</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">{module.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineSection = () => {
  return (
    <section className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-32">
        <div className="text-[10px] font-black text-accent-purple uppercase tracking-[0.4em] mb-6">04 / Процес</div>
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter uppercase">Життєвий Цикл <span className="text-accent-purple">Даних</span></h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Від сирого сигналу до автономної дії за мілісекунди.</p>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 hidden lg:block" />
        <div className="grid lg:grid-cols-4 gap-12 relative z-10">
          {[
            { title: "Сенсорний Вхід", desc: "Збір даних з фізичних джерел.", icon: Fingerprint },
            { title: "Обробка", desc: "Фільтрація та нормалізація потоку.", icon: CpuIcon },
            { title: "Аналіз", desc: "Каузальне моделювання ситуації.", icon: Terminal },
            { title: "Виконання", desc: "Автономна дія в системі.", icon: Zap }
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              {...pressEffect}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center mb-8 shadow-xl group-hover:border-accent-purple transition-all duration-500 z-10">
                <step.icon className="w-8 h-8 text-accent-purple" />
              </div>
              <h3 className="text-xl font-display font-bold mb-4 text-slate-900 uppercase tracking-tight">{step.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RoadmapSection = () => {
  const steps = [
    { date: "Q2 2026", title: "Альфа-тестування", desc: "Запуск ядра Neuro-Core в закритому середовищі.", tag: "Alpha" },
    { date: "Q4 2026", title: "Бета-реліз", desc: "Інтеграція з першими корпоративними партнерами.", tag: "Beta" },
    { date: "Q1 2027", title: "Глобальна Екосистема", desc: "Відкриття API для розробників та масштабування.", tag: "Global" }
  ];

  return (
    <section id="дорожня-карта" className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <div className="text-[10px] font-black text-accent-purple uppercase tracking-[0.4em] mb-6">05 / Дорожня Карта</div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter uppercase">Шлях <span className="text-accent-purple">Розвитку</span></h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Наш шлях до створення повноцінного корпоративного інтелекту.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              {...pressEffect}
              className="glass-card p-12 rounded-[3rem] relative group cursor-pointer border border-white/50"
            >
              <div className="flex justify-between items-start mb-8">
                 <div className="text-accent-purple font-black text-[10px] uppercase tracking-[0.3em]">{step.date}</div>
                 <div className="px-3 py-1 rounded-full bg-slate-50 text-[8px] font-black text-slate-400 uppercase tracking-widest">{step.tag}</div>
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-accent-purple transition-colors uppercase tracking-tight">{step.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
              <div className="absolute top-12 right-12 opacity-5 group-hover:opacity-20 transition-opacity">
                <Compass className="w-12 h-12" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SummarySection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [2000, 5000], [0, -200]);

  return (
    <section className="py-40 px-6 relative overflow-hidden">
      <div className="absolute inset-0 atmosphere -z-10" />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="text-[10px] font-black text-accent-purple uppercase tracking-[0.4em] mb-12">06 / Підсумок</div>
          <h2 className="text-6xl md:text-[10rem] font-display font-bold mb-12 tracking-tighter leading-[0.85] uppercase">
            Майбутнє — це <br /> <span className="text-accent-purple">BrainFlow</span>
          </h2>
          <p className="text-2xl md:text-3xl text-slate-500 mb-16 font-medium leading-relaxed max-w-3xl mx-auto">
            Ми не просто будуємо софт. Ми створюємо нову форму існування інтелекту в цифровому просторі.
          </p>
          <div className="flex justify-center gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-3 h-3 rounded-full bg-accent-purple animate-ping" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
          </div>
        </motion.div>
      </div>
      
      {/* Background Glow */}
      <motion.div 
        style={{ y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent-purple/5 rounded-full blur-[200px] -z-10" 
      />
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <Brain className="text-white w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">BrainFlow 3.0</span>
        </div>
        
        <div className="flex gap-12 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <motion.a {...linkClickEffect} href="#" className="hover:text-accent-purple transition-colors">Концепція</motion.a>
          <motion.a {...linkClickEffect} href="#" className="hover:text-accent-purple transition-colors">Архітектура</motion.a>
          <motion.a {...linkClickEffect} href="#" className="hover:text-accent-purple transition-colors">Етика</motion.a>
        </div>
        
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          © 2026 BrainFlow Concept. Всі права захищені.
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="relative min-h-screen selection:bg-accent-purple/20">
      <BackgroundEffects />
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Storytelling Flow */}
        <ConceptSection />
        <ArchitectureSection />
        <ModulesSection />
        <TimelineSection />
        <RoadmapSection />
        <SummarySection />
      </main>
      
      <Footer />
    </div>
  );
}
