/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
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
  Compass,
  Database,
  Eye,
  Box,
  Share2,
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

// --- Translations ---

const translations = {
  uk: {
    nav: { concept: 'Ідея', arch: 'Будова', modules: 'Складові', roadmap: 'Плани' },
    hero: { tag: 'Майбутнє розуму', title: 'BrainFlow', subtitle: 'Система 3.0', desc: 'Ми поєднуємо людські думки та можливості машин. Це більше не просто програма, а частина вашої свідомості.' },
    concept: { tag: '01 / Про ідею', title: 'Автономне', highlight: 'мислення', desc: 'BrainFlow 3.0 — це система, яка розуміє суть речей. Ми вчимо машини не просто бачити цифри, а розуміти причини подій.', reasonTitle: 'Розуміння причин', reasonDesc: 'Аналіз того, чому щось сталося, замість простого пошуку шаблонів.', networkTitle: 'Спільна робота асистентів', networkDesc: 'Група розумних програм, що працюють разом для вашої мети.', analytics: 'Системний аналіз', sync: 'Синхронізовано', precision: 'Точність мислення' },
    arch: { tag: '02 / Будова', title: '6 Рівнів', highlight: 'Системи', desc: 'Кожен рівень системи працює злагоджено для повної самостійності.', layers: ['Залізо та датчики', 'Збір інформації', 'Пошук причин', 'Керування діями', 'Зручний інтерфейс', 'Автономна робота'], layersTags: ['Hardware', 'Context', 'Logic', 'Swarm', 'UX', 'Action'] },
    modules: { tag: '03 / Модулі', title: 'Модульна', highlight: 'Екосистема', desc: 'BrainFlow 3.0 побудована з окремих частин, які легко масштабуються.', items: ['Ядро розуму', 'Швидкий потік', 'Мережа помічників', 'Логіка зв’язків', 'Вікно візуалізації'], itemsTags: ['Intelligence', 'Speed', 'Scale', 'Logic', 'UX'] },
    timeline: { tag: '04 / Процес', title: 'Життя', highlight: 'даних', desc: 'Від отримання сигналу до дії за мить.', steps: ['Сенсорний Вхід', 'Обробка', 'Аналіз', 'Дія'] },
    roadmap: { tag: '05 / Розвиток', title: 'Шлях', highlight: 'Розвитку', desc: 'Наші кроки до створення справжнього корпоративного інтелекту.', items: ['Перші тести', 'Робота з партнерами', 'Світовий запуск'], itemsTags: ['Alpha', 'Beta', 'Global'] },
    summary: { tag: '06 / Разом', title: 'Майбутнє — це', highlight: 'BrainFlow', desc: 'Ми створюємо новий формат життя інформації в цифровому світі.' },
    footer: { copy: '© 2026 BrainFlow Concept. Всі права захищені.', links: ['Ідея', 'Будова', 'Етика'] }
  },
  ru: {
    nav: { concept: 'Идея', arch: 'Устройство', modules: 'Компоненты', roadmap: 'Планы' },
    hero: { tag: 'Будущее разума', title: 'BrainFlow', subtitle: 'Система 3.0', desc: 'Мы объединяем мысли человека и возможности машин. Это не просто программа, а часть вашего сознания.' },
    concept: { tag: '01 / Об идее', title: 'Автономное', highlight: 'мышление', desc: 'BrainFlow 3.0 — это система, которая понимает суть вещей. Мы учим машины не просто видеть цифры, а понимать причины событий.', reasonTitle: 'Понимание причин', reasonDesc: 'Анализ того, почему что-то произошло, вместо простого поиска шаблонов.', networkTitle: 'Общая работа ассистентов', networkDesc: 'Группа умных программ, работающих вместе для вашей цели.', analytics: 'Системный анализ', sync: 'Синхронизировано', precision: 'Точность мышления' },
    arch: { tag: '02 / Устройство', title: '6 Уровней', highlight: 'Системы', desc: 'Каждый уровень системы работает слаженно для полной самостоятельности.', layers: ['Железо и датчики', 'Сбор информации', 'Поиск причин', 'Управление действиями', 'Удобный интерфейс', 'Автономная работа'], layersTags: ['Hardware', 'Context', 'Logic', 'Swarm', 'UX', 'Action'] },
    modules: { tag: '03 / Модули', title: 'Модульная', highlight: 'Экосистема', desc: 'BrainFlow 3.0 построена из отдельных частей, которые легко масштабируются.', items: ['Ядро разума', 'Быстрый поток', 'Сеть помощников', 'Логика связей', 'Окно визуализации'], itemsTags: ['Intelligence', 'Speed', 'Scale', 'Logic', 'UX'] },
    timeline: { tag: '04 / Процесс', title: 'Жизнь', highlight: 'данных', desc: 'От получения сигнала до действия за мгновение.', steps: ['Сенсорный Ввод', 'Обработка', 'Анализ', 'Действие'] },
    roadmap: { tag: '05 / Развитие', title: 'Путь', highlight: 'Развития', desc: 'Наши шаги к созданию настоящего корпоративного интеллекта.', items: ['Первые тесты', 'Работа с партнерами', 'Мировой запуск'], itemsTags: ['Alpha', 'Beta', 'Global'] },
    summary: { tag: '06 / Итог', title: 'Будущее — это', highlight: 'BrainFlow', desc: 'Мы создаем новый формат жизни информации в цифровом мире.' },
    footer: { copy: '© 2026 BrainFlow Concept. Все права защищены.', links: ['Идея', 'Устройство', 'Этика'] }
  },
  en: {
    nav: { concept: 'Concept', arch: 'Structure', modules: 'Components', roadmap: 'Roadmap' },
    hero: { tag: 'Future of Mind', title: 'BrainFlow', subtitle: 'System 3.0', desc: 'We combine human thought and machine power. It is no longer just a tool, but an extension of your mind.' },
    concept: { tag: '01 / Concept', title: 'Autonomous', highlight: 'Thinking', desc: 'BrainFlow 3.0 is a system that understands the essence of things. We teach machines not just to see numbers, but to understand the reasons behind events.', reasonTitle: 'Understanding Reasons', reasonDesc: 'Analyzing why something happened, instead of just searching for patterns.', networkTitle: 'Collaborative Assistants', networkDesc: 'A group of smart programs working together for your goal.', analytics: 'System Analytics', sync: 'Synchronized', precision: 'Thinking Accuracy' },
    arch: { tag: '02 / Structure', title: '6 Layers of', highlight: 'the System', desc: 'Every layer of the system works in harmony for total autonomy.', layers: ['Hardware & Sensors', 'Data Integration', 'Finding Reasons', 'Action Control', 'Simple Interface', 'Autonomous Work'], layersTags: ['Hardware', 'Context', 'Logic', 'Swarm', 'UX', 'Action'] },
    modules: { tag: '03 / Components', title: 'Modular', highlight: 'Ecosystem', desc: 'BrainFlow 3.0 is built from separate parts that scale easily.', items: ['Neural Core', 'Flow Engine', 'Assistant Swarm', 'Logic Links', 'Visual Portal'], itemsTags: ['Intelligence', 'Speed', 'Scale', 'Logic', 'UX'] },
    timeline: { tag: '04 / Process', title: 'Data', highlight: 'Life', desc: 'From signal input to autonomous action in milliseconds.', steps: ['Sensor Input', 'Processing', 'Analysis', 'Action'] },
    roadmap: { tag: '05 / Roadmap', title: 'Journey of', highlight: 'Growth', desc: 'Our steps toward creating true corporate intelligence.', items: ['First Tests', 'Partner Work', 'Global Launch'], itemsTags: ['Alpha', 'Beta', 'Global'] },
    summary: { tag: '06 / Summary', title: 'The Future is', highlight: 'BrainFlow', desc: 'We are creating a new format of information life in the digital world.' },
    footer: { copy: '© 2026 BrainFlow Concept. All rights reserved.', links: ['Concept', 'Structure', 'Ethics'] }
  }
};

// --- Components ---

const Navbar = ({ lang, setLang, t }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t.nav.concept, id: 'концепція' },
    { name: t.nav.arch, id: 'архітектура' },
    { name: t.nav.modules, id: 'модулі' },
    { name: t.nav.roadmap, id: 'дорожня-карта' }
  ];

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
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-2xl group-hover:bg-accent-purple transition-all duration-500">
            <Brain className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-900">BrainFlow <span className="text-accent-purple">3.0</span></span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-12 text-sm font-semibold text-slate-600 tracking-wide">
          {navItems.map((item) => (
            <motion.a 
              key={item.id} 
              href={`#${item.id}`} 
              className="relative group hover:text-accent-purple transition-colors"
              {...linkClickEffect}
            >
              {item.name}
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-accent-purple transition-all duration-500 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
          {['uk', 'ru', 'en'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                lang === l 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'text-slate-400 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

const BackgroundEffects = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 5000], [0, -400]);
  const y2 = useTransform(scrollY, [0, 5000], [0, 300]);
  const rotate = useTransform(scrollY, [0, 5000], [0, 45]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none grid-bg">
      <motion.div 
        style={{ y: y1, rotate }}
        animate={{ x: [0, 80, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-accent-lilac/15 rounded-full blur-[140px]"
      />
      <motion.div 
        style={{ y: y2 }}
        animate={{ x: [0, -60, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-5%] w-[70%] h-[70%] bg-purple-200/20 rounded-full blur-[160px]"
      />
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

const Hero = ({ t }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center w-full relative z-10">
        <motion.div variants={staggerContainer} initial="initial" animate="animate" style={{ y, opacity, scale }}>
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-sm">
            <Sparkles className="w-4 h-4" />
            {t.hero.tag} / v3.0.42
          </motion.div>
          
          <motion.div initial={{ scale: 2, y: -100, skewX: -10, opacity: 0 }} animate={{ scale: 1, y: 0, skewX: 0, opacity: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="mb-10">
            <h1 className="text-6xl md:text-[7.5rem] font-display font-bold leading-[0.88] text-gradient tracking-tighter uppercase">
              {t.hero.title} <br />
              <span className="text-slate-300">{t.hero.subtitle}</span>
            </h1>
          </motion.div>
          
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-500 mb-16 max-w-xl leading-relaxed font-medium">
            {t.hero.desc}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-8">
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

const ConceptSection = ({ t }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, 200]);
  const items = [
    { title: t.concept.reasonTitle, desc: t.concept.reasonDesc, icon: Workflow },
    { title: t.concept.networkTitle, desc: t.concept.networkDesc, icon: Network }
  ];

  return (
    <section id="концепція" className="py-40 px-6 relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 atmosphere -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <div className="text-[10px] font-black text-accent-purple uppercase tracking-[0.4em] mb-6">{t.concept.tag}</div>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-12 tracking-tighter leading-tight uppercase">{t.concept.title} <br /> <span className="text-accent-purple">{t.concept.highlight}</span></h2>
            <p className="text-2xl text-slate-500 mb-12 leading-relaxed font-medium">{t.concept.desc}</p>
            <div className="space-y-8">
              {items.map((item, i) => (
                <div key={i} className="flex gap-6 cursor-pointer group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-slate-100 group-hover:border-accent-purple transition-colors"><item.icon className="text-accent-purple w-6 h-6" /></div>
                  <div><h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4><p className="text-slate-500 font-medium">{item.desc}</p></div>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="glass-card p-12 rounded-[4rem] relative overflow-hidden border border-white/50">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-8"><div className="text-[10px] font-black uppercase text-slate-400">{t.concept.analytics}</div><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{t.concept.sync}</span></div></div>
              <div className="space-y-6">
                {[{ label: "Neural Sync", val: 99.9 }, { label: "Logic Core", val: 94.2 }, { label: "Flow Rate", val: 98.7 }].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest"><span>{stat.label}</span><span>{stat.val}%</span></div>
                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden relative">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${stat.val}%` }} transition={{ duration: 2, delay: i * 0.2 }} className="absolute inset-0 bg-accent-purple" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-8 flex items-center justify-between">
                <div><div className="text-4xl font-display font-bold text-slate-900 mb-1">99.9%</div><div className="text-[10px] font-bold text-slate-400 uppercase">{t.concept.precision}</div></div>
                <div className="w-16 h-16 rounded-full border border-slate-100 flex items-center justify-center"><Activity className="text-accent-purple w-6 h-6" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ArchitectureSection = ({ t }) => {
  const icons = [Box, Database, Workflow, Share2, Eye, Zap];
  const layers = t.arch.layers.map((title, i) => ({
    num: `0${i + 1}`,
    title,
    icon: icons[i],
    tag: t.arch.layersTags[i]
  }));

  return (
    <section id="архітектура" className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-32">
          <div className="text-[10px] font-black text-accent-purple uppercase tracking-[0.4em] mb-6">{t.arch.tag}</div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter uppercase">{t.arch.title} <span className="text-accent-purple">{t.arch.highlight}</span></h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">{t.arch.desc}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {layers.map((layer, i) => (
            <motion.div key={i} {...pressEffect} className="glass-card p-12 rounded-[3rem] relative overflow-hidden cursor-pointer border border-white/50 group">
              <div className="absolute top-0 right-0 p-8 text-4xl font-display font-black text-slate-100 group-hover:text-accent-purple/10 transition-colors">{layer.num}</div>
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-accent-purple group-hover:text-white transition-all shadow-sm"><layer.icon className="w-8 h-8" /></div>
              <div className="text-[8px] font-black text-accent-purple uppercase tracking-[0.3em] mb-4">{layer.tag}</div>
              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-accent-purple transition-colors uppercase tracking-tight">{layer.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ModulesSection = ({ t }) => {
  const icons = [Brain, Zap, Network, Workflow, Eye];
  const modules = t.modules.items.map((title, i) => ({
    title,
    icon: icons[i],
    tag: t.modules.itemsTags[i]
  }));

  return (
    <section id="модулі" className="py-40 px-6 bg-slate-900 text-white rounded-[5rem] mx-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-32 text-left">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="text-[10px] font-black text-accent-lilac uppercase tracking-[0.4em] mb-6">{t.modules.tag}</div>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter uppercase">{t.modules.title} <br /> <span className="text-accent-lilac">{t.modules.highlight}</span></h2>
            <p className="text-xl text-slate-400 font-medium">{t.modules.desc}</p>
          </motion.div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {modules.map((module, i) => (
            <motion.div key={i} {...pressEffect} className="p-10 rounded-[3rem] border border-white/10 group cursor-pointer hover:bg-white/5 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-accent-lilac group-hover:text-slate-900 transition-all shadow-lg"><module.icon className="w-6 h-6" /></div>
              <div className="text-[8px] font-black text-accent-lilac uppercase tracking-[0.3em] mb-4">{module.tag}</div>
              <h3 className="text-xl font-display font-bold mb-4 uppercase tracking-tight group-hover:text-accent-lilac transition-colors">{module.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineSection = ({ t }) => {
  const icons = [Fingerprint, CpuIcon, Terminal, Zap];
  const steps = t.timeline.steps.map((title, i) => ({ title, icon: icons[i] }));

  return (
    <section className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-32">
        <div className="text-[10px] font-black text-accent-purple uppercase tracking-[0.4em] mb-6">{t.timeline.tag}</div>
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter uppercase">{t.timeline.title} <span className="text-accent-purple">{t.timeline.highlight}</span></h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">{t.timeline.desc}</p>
      </div>
      <div className="max-w-5xl mx-auto relative flex justify-between items-center lg:flex-row flex-col gap-12">
        <div className="absolute top-10 left-0 right-0 h-0.5 bg-slate-100 hidden lg:block" />
        {steps.map((step, i) => (
          <motion.div key={i} {...pressEffect} className="flex flex-col items-center text-center group cursor-pointer z-10">
            <div className="w-20 h-20 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center mb-8 shadow-xl group-hover:border-accent-purple transition-all"><step.icon className="w-8 h-8 text-accent-purple" /></div>
            <h3 className="text-xl font-display font-bold text-slate-900 uppercase tracking-tight">{step.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const RoadmapSection = ({ t }) => {
  const dates = ["Q2 2026", "Q4 2026", "Q1 2027"];
  const steps = t.roadmap.items.map((title, i) => ({
    date: dates[i],
    title,
    tag: t.roadmap.itemsTags[i]
  }));

  return (
    <section id="дорожня-карта" className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <div className="text-[10px] font-black text-accent-purple uppercase tracking-[0.4em] mb-6">{t.roadmap.tag}</div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter uppercase">{t.roadmap.title} <span className="text-accent-purple">{t.roadmap.highlight}</span></h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">{t.roadmap.desc}</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div key={i} {...pressEffect} className="glass-card p-12 rounded-[3rem] relative group cursor-pointer border border-white/50">
              <div className="flex justify-between items-start mb-8"><div className="text-accent-purple font-black text-[10px] uppercase tracking-[0.3em]">{step.date}</div><div className="px-3 py-1 rounded-full bg-slate-50 text-[8px] font-black text-slate-400 uppercase">{step.tag}</div></div>
              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-accent-purple transition-colors uppercase tracking-tight">{step.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{t.roadmap.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SummarySection = ({ t }) => {
  return (
    <section className="py-40 px-6 relative overflow-hidden text-center">
      <div className="absolute inset-0 atmosphere -z-10" />
      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
        <div className="text-[10px] font-black text-accent-purple uppercase tracking-[0.4em] mb-12">{t.summary.tag}</div>
        <h2 className="text-6xl md:text-[10rem] font-display font-bold mb-12 tracking-tighter leading-[0.85] uppercase">{t.summary.title} <br /> <span className="text-accent-purple">{t.summary.highlight}</span></h2>
        <p className="text-2xl md:text-3xl text-slate-500 mb-16 max-w-3xl mx-auto font-medium">{t.summary.desc}</p>
        <div className="flex justify-center gap-4">{[1, 2, 3].map(i => <div key={i} className="w-3 h-3 rounded-full bg-accent-purple animate-ping" style={{ animationDelay: `${i * 0.2}s` }} />)}</div>
      </motion.div>
    </section>
  );
};

const Footer = ({ t }) => {
  return (
    <footer className="py-20 px-6 border-t border-slate-100 text-center md:text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center gap-3"><div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center"><Brain className="text-white w-5 h-5" /></div><span className="font-display font-bold text-xl tracking-tight uppercase">BrainFlow 3.0</span></div>
        <div className="flex gap-12 text-xs font-bold text-slate-400 uppercase tracking-widest">{t.footer.links.map((link, i) => <a key={i} href="#" className="hover:text-accent-purple transition-colors">{link}</a>)}</div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.footer.copy}</div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState('uk');
  const t = translations[lang];

  return (
    <div className="relative min-h-screen selection:bg-accent-purple/20 bg-white">
      <BackgroundEffects />
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <ConceptSection t={t} />
        <ArchitectureSection t={t} />
        <ModulesSection t={t} />
        <TimelineSection t={t} />
        <RoadmapSection t={t} />
        <SummarySection t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}
