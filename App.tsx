/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BrainFlow 3.0 - Premium AI Landing Page
 * Radical reconstruction: Liquid Glass + Bento Grid + Falling Depth + Motion
 */

import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  AnimatePresence
} from 'motion/react';
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
  CpuIcon,
  ChevronDown
} from 'lucide-react';

// ============================================================================
// ANIMATED BACKGROUND SYSTEM (Ambient Blurred Shapes)
// ============================================================================

const FloatingOrb = ({ delay, duration, x, y, size, opacity }) => {
  return (
    <motion.div
      initial={{ x, y, opacity: 0 }}
      animate={{
        x: [x, x + 100, x - 100, x],
        y: [y, y - 150, y + 100, y],
        opacity: [opacity, opacity * 0.6, opacity * 0.3, opacity]
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className="absolute rounded-full blur-[120px] mix-blend-multiply pointer-events-none"
      style={{
        width: size,
        height: size,
        filter: 'blur(100px)'
      }}
    />
  );
};

const BackgroundEffects = () => {
  const orbs = [
    { delay: 0, duration: 20, x: -100, y: 100, size: 400, opacity: 0.15, color: 'bg-purple-500' },
    { delay: 5, duration: 25, x: 300, y: -200, size: 500, opacity: 0.12, color: 'bg-blue-400' },
    { delay: 10, duration: 22, x: 600, y: 400, size: 350, opacity: 0.1, color: 'bg-purple-400' },
    { delay: 2, duration: 28, x: -300, y: 600, size: 600, opacity: 0.08, color: 'bg-indigo-500' }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F7F5F2] via-[#FAFAF9] to-[#F3F1ED]" />
      {orbs.map((orb, i) => (
        <FloatingOrb key={i} {...orb} />
      ))}
      {/* Atmosphere glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.03) 0%, transparent 50%), ' +
            'radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.02) 0%, transparent 50%)',
          filter: 'blur(80px)',
          opacity: 0.8
        }}
      />
    </div>
  );
};

// ============================================================================
// LIQUID GLASS CARD (Premium Materiality)
// ============================================================================

const LiquidGlassCard = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`relative group rounded-2xl overflow-hidden ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.2), 0 8px 32px rgba(31, 38, 135, 0.05)'
      }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// TRANSLATIONS (UA/RU/EN)
// ============================================================================

const translations = {
  uk: {
    nav: { concept: 'Ідея', arch: 'Будова', modules: 'Складові', roadmap: 'Плани' },
    hero: {
      tag: 'Майбутнє розуму',
      title: 'BrainFlow',
      subtitle: 'Система 3.0',
      desc: 'Ми поєднуємо людські думки та можливості машин. Це більше не просто програма, а частина вашої свідомості.'
    },
    concept: {
      tag: '01 / Про ідею',
      title: 'Автономне',
      highlight: 'мислення',
      desc: 'BrainFlow 3.0 — це система, яка розуміє суть речей. Ми вчимо машини не просто бачити цифри, а розуміти причини подій.',
      reasonTitle: 'Розуміння причин',
      reasonDesc: 'Аналіз того, чому щось сталося, замість простого пошуку шаблонів.',
      networkTitle: 'Спільна робота асистентів',
      networkDesc: 'Група розумних програм, що працюють разом для вашої мети.',
      analytics: 'Системний аналіз',
      sync: 'Синхронізовано',
      precision: 'Точність мислення'
    },
    arch: {
      tag: '02 / Будова',
      title: '6 Рівнів',
      highlight: 'Системи',
      desc: 'Кожен рівень системи працює злагоджено для повної самостійності.',
      layers: ['Залізо та датчики', 'Збір інформації', 'Пошук причин', 'Керування діями', 'Зручний інтерфейс', 'Автономна робота'],
      layersTags: ['Hardware', 'Context', 'Logic', 'Swarm', 'UX', 'Action']
    },
    modules: {
      tag: '03 / Модулі',
      title: 'Модульна',
      highlight: 'Екосистема',
      desc: 'BrainFlow 3.0 побудована з окремих частин, які легко масштабуються.',
      items: ['Ядро розуму', 'Швидкий потік', 'Мережа помічників', 'Логіка зв\'язків', 'Вікно візуалізації'],
      itemsTags: ['Intelligence', 'Speed', 'Scale', 'Logic', 'UX']
    },
    timeline: {
      tag: '04 / Процес',
      title: 'Життя',
      highlight: 'даних',
      desc: 'Від отримання сигналу до дії за мить.',
      steps: ['Сенсорний Вхід', 'Обробка', 'Аналіз', 'Дія']
    },
    roadmap: {
      tag: '05 / Розвиток',
      title: 'Шлях',
      highlight: 'Розвитку',
      desc: 'Наші кроки до створення справжнього корпоративного інтелекту.',
      items: ['Перші тести', 'Робота з партнерами', 'Світовий запуск'],
      itemsTags: ['Alpha', 'Beta', 'Global']
    },
    summary: {
      tag: '06 / Разом',
      title: 'Майбутнє — це',
      highlight: 'BrainFlow',
      desc: 'Ми створюємо новий формат життя інформації в цифровому світі.'
    },
    footer: { copy: '© 2026 BrainFlow Concept. Всі права захищені.', links: ['Ідея', 'Будова', 'Етика'] }
  },
  ru: {
    nav: { concept: 'Идея', arch: 'Устройство', modules: 'Компоненты', roadmap: 'Планы' },
    hero: {
      tag: 'Будущее разума',
      title: 'BrainFlow',
      subtitle: 'Система 3.0',
      desc: 'Мы объединяем мысли человека и возможности машин. Это не просто программа, а часть вашего сознания.'
    },
    concept: {
      tag: '01 / Об идее',
      title: 'Автономное',
      highlight: 'мышление',
      desc: 'BrainFlow 3.0 — это система, которая понимает суть вещей. Мы учим машины не просто видеть цифры, а понимать причины событий.',
      reasonTitle: 'Понимание причин',
      reasonDesc: 'Анализ того, почему что-то произошло, вместо простого поиска шаблонов.',
      networkTitle: 'Общая работа ассистентов',
      networkDesc: 'Группа умных программ, работающих вместе для вашей цели.',
      analytics: 'Системный анализ',
      sync: 'Синхронизировано',
      precision: 'Точность мышления'
    },
    arch: {
      tag: '02 / Устройство',
      title: '6 Уровней',
      highlight: 'Системы',
      desc: 'Каждый уровень системы работает слаженно для полной самостоятельности.',
      layers: ['Железо и датчики', 'Сбор информации', 'Поиск причин', 'Управление действиями', 'Удобный интерфейс', 'Автономная работа'],
      layersTags: ['Hardware', 'Context', 'Logic', 'Swarm', 'UX', 'Action']
    },
    modules: {
      tag: '03 / Модули',
      title: 'Модульная',
      highlight: 'Экосистема',
      desc: 'BrainFlow 3.0 построена из отдельных частей, которые легко масштабируются.',
      items: ['Ядро разума', 'Быстрый поток', 'Сеть помощников', 'Логика связей', 'Окно визуализации'],
      itemsTags: ['Intelligence', 'Speed', 'Scale', 'Logic', 'UX']
    },
    timeline: {
      tag: '04 / Процесс',
      title: 'Жизнь',
      highlight: 'данных',
      desc: 'От получения сигнала до действия за мгновение.',
      steps: ['Сенсорный Ввод', 'Обработка', 'Анализ', 'Действие']
    },
    roadmap: {
      tag: '05 / Развитие',
      title: 'Путь',
      highlight: 'Развития',
      desc: 'Наши шаги к созданию настоящего корпоративного интеллекта.',
      items: ['Первые тесты', 'Работа с партнерами', 'Мировой запуск'],
      itemsTags: ['Alpha', 'Beta', 'Global']
    },
    summary: {
      tag: '06 / Итог',
      title: 'Будущее — это',
      highlight: 'BrainFlow',
      desc: 'Мы создаем новый формат жизни информации в цифровом мире.'
    },
    footer: { copy: '© 2026 BrainFlow Concept. Все права защищены.', links: ['Идея', 'Устройство', 'Этика'] }
  },
  en: {
    nav: { concept: 'Concept', arch: 'Structure', modules: 'Components', roadmap: 'Roadmap' },
    hero: {
      tag: 'Future of Mind',
      title: 'BrainFlow',
      subtitle: 'System 3.0',
      desc: 'We combine human thought and machine power. It is no longer just a tool, but an extension of your mind.'
    },
    concept: {
      tag: '01 / Concept',
      title: 'Autonomous',
      highlight: 'Thinking',
      desc: 'BrainFlow 3.0 is a system that understands the essence of things. We teach machines not just to see numbers, but to understand the reasons behind events.',
      reasonTitle: 'Understanding Reasons',
      reasonDesc: 'Analyzing why something happened, instead of just searching for patterns.',
      networkTitle: 'Collaborative Assistants',
      networkDesc: 'A group of smart programs working together for your goal.',
      analytics: 'System Analytics',
      sync: 'Synchronized',
      precision: 'Thinking Accuracy'
    },
    arch: {
      tag: '02 / Structure',
      title: '6 Layers of',
      highlight: 'the System',
      desc: 'Every layer of the system works in harmony for total autonomy.',
      layers: ['Hardware & Sensors', 'Data Integration', 'Finding Reasons', 'Action Control', 'Simple Interface', 'Autonomous Work'],
      layersTags: ['Hardware', 'Context', 'Logic', 'Swarm', 'UX', 'Action']
    },
    modules: {
      tag: '03 / Components',
      title: 'Modular',
      highlight: 'Ecosystem',
      desc: 'BrainFlow 3.0 is built from separate parts that scale easily.',
      items: ['Neural Core', 'Flow Engine', 'Assistant Swarm', 'Logic Links', 'Visual Portal'],
      itemsTags: ['Intelligence', 'Speed', 'Scale', 'Logic', 'UX']
    },
    timeline: {
      tag: '04 / Process',
      title: 'Data',
      highlight: 'Life',
      desc: 'From signal input to autonomous action in milliseconds.',
      steps: ['Sensor Input', 'Processing', 'Analysis', 'Action']
    },
    roadmap: {
      tag: '05 / Roadmap',
      title: 'Journey of',
      highlight: 'Growth',
      desc: 'Our steps toward creating true corporate intelligence.',
      items: ['First Tests', 'Partner Work', 'Global Launch'],
      itemsTags: ['Alpha', 'Beta', 'Global']
    },
    summary: {
      tag: '06 / Summary',
      title: 'The Future is',
      highlight: 'BrainFlow',
      desc: 'We are creating a new format of information life in the digital world.'
    },
    footer: { copy: '© 2026 BrainFlow Concept. All rights reserved.', links: ['Concept', 'Structure', 'Ethics'] }
  }
};

// ============================================================================
// NAVBAR (Scroll-aware, Glass morphism)
// ============================================================================

const Navbar = ({ lang, setLang, t }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 py-6`}
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-8 py-4 rounded-2xl transition-all duration-700 ${
          scrolled ? 'backdrop-blur-xl shadow-lg border border-white/20' : 'bg-transparent'
        }`}
        style={scrolled ? {
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(31, 38, 135, 0.05)'
        } : {}}
      >
        <motion.div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <Brain className="text-white w-5 h-5" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight uppercase hidden sm:inline">BrainFlow</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item, i) => (
            <motion.a
              key={i}
              href={`#${item.id}`}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="px-3 py-2 rounded-lg text-sm font-medium bg-white/30 border border-white/30 backdrop-blur-sm cursor-pointer hover:bg-white/50 transition-all"
          >
            <option value="uk">UA</option>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>
    </motion.nav>
  );
};

// ============================================================================
// HERO SECTION (Mouse-reactive + Floating Elements + Blur-Focus)
// ============================================================================

const Hero = ({ t }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [0, 800], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1200], [-10, 10]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const titleChars = t.hero.title.split('');

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden pt-32"
      onMouseMove={handleMouseMove}
    >
      {/* Floating accent orbs */}
      <FloatingOrb delay={0} duration={15} x={-200} y={-200} size={500} opacity={0.08} />
      <FloatingOrb delay={3} duration={20} x={800} y={100} size={600} opacity={0.06} />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Tag with Blur-Focus effect */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(20px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mb-8"
        >
          {t.hero.tag}
        </motion.div>

        {/* Title with staggered letter animation + Blur-Focus */}
        <div className="mb-8">
          {titleChars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: 'blur(20px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="inline-block text-[5rem] md:text-[8rem] font-display font-bold tracking-tighter uppercase"
              style={{ letterSpacing: '0.02em' }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(20px)', y: 20 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-2xl md:text-3xl font-display font-semibold text-slate-700 mb-8 tracking-tight"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Description with Blur-Focus */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(20px)', y: 20 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-16 leading-relaxed font-medium"
        >
          {t.hero.desc}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mt-20"
        >
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </motion.div>
      </div>

      {/* 3D perspective context (subtle) */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .hero-perspective {
            perspective: 1000px;
          }
        }
      `}</style>
    </section>
  );
};

// ============================================================================
// CONCEPT SECTION (Blur-Focus + Scroll Reveal)
// ============================================================================

const ConceptSection = ({ t }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const titleBlur = useTransform(scrollYProgress, [0, 0.3], [20, 0]);

  return (
    <section id="концепція" ref={ref} className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mb-6">
            {t.concept.tag}
          </div>
          <motion.h2
            style={{ opacity: titleOpacity, filter: titleBlur }}
            className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter uppercase"
          >
            {t.concept.title} <br />
            <span className="text-purple-600">{t.concept.highlight}</span>
          </motion.h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl">{t.concept.desc}</p>
        </motion.div>

        {/* Concept cards grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: t.concept.reasonTitle, desc: t.concept.reasonDesc, icon: Brain, delay: 0 },
            { title: t.concept.networkTitle, desc: t.concept.networkDesc, icon: Network, delay: 0.2 },
            { title: t.concept.analytics, desc: t.concept.precision, icon: Cpu, delay: 0.4 }
          ].map((card, i) => (
            <LiquidGlassCard key={i} delay={card.delay} className="p-8 md:p-12">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center mb-6">
                  <card.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-display font-bold mb-4 text-slate-900 uppercase tracking-tight">
                  {card.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">{card.desc}</p>
              </motion.div>
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// ARCHITECTURE SECTION (Bento Grid Asymmetric + Falling Depth)
// ============================================================================

const ArchitectureSection = ({ t }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const layers = t.arch.layers.map((layer, i) => ({
    title: layer,
    tag: t.arch.layersTags[i],
    icon: [Fingerprint, Database, Brain, Zap, Eye, Activity][i],
    scale: useTransform(scrollYProgress, [0.2, 0.8], [0.8, 1]),
    y: useTransform(scrollYProgress, [0.2, 0.8], [100, 0])
  }));

  // Bento Grid asymmetric layout
  const bentoLayout = [
    { gridCol: 'md:col-span-2 md:row-span-2', delay: 0 },
    { gridCol: 'md:col-span-1 md:row-span-2', delay: 0.1 },
    { gridCol: 'md:col-span-1', delay: 0.2 },
    { gridCol: 'md:col-span-1', delay: 0.3 },
    { gridCol: 'md:col-span-2', delay: 0.4 },
    { gridCol: 'md:col-span-1', delay: 0.5 }
  ];

  return (
    <section id="архітектура" ref={ref} className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mb-6">
            {t.arch.tag}
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter uppercase">
            {t.arch.title} <br />
            <span className="text-purple-600">{t.arch.highlight}</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium">{t.arch.desc}</p>
        </motion.div>

        {/* Bento Grid with falling depth */}
        <div className="grid md:grid-cols-3 gap-6 auto-rows-[300px]">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              style={{
                scale: layer.scale,
                y: layer.y
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.8,
                delay: bentoLayout[i]?.delay || 0
              }}
              className={`${bentoLayout[i]?.gridCol} col-span-1`}
            >
              <LiquidGlassCard className={`p-8 h-full flex flex-col justify-between`}>
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center mb-6">
                    <layer.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-bold mb-2 text-slate-900 uppercase tracking-tight">
                    {layer.title}
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-purple-600/10 text-purple-600 text-[8px] font-black uppercase w-fit">
                  {layer.tag}
                </div>
              </LiquidGlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// MODULES SECTION (Bento Grid + Typewriter Effect)
// ============================================================================

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <span>{displayText}</span>;
};

const ModulesSection = ({ t }) => {
  const modules = t.modules.items.map((title, i) => ({
    title,
    tag: t.modules.itemsTags[i],
    icon: [Brain, Zap, Network, Compass, Eye][i]
  }));

  // Bento Grid layout for modules
  const bentoLayout = [
    { gridCol: 'md:col-span-2 md:row-span-2' },
    { gridCol: 'md:col-span-1' },
    { gridCol: 'md:col-span-1' },
    { gridCol: 'md:col-span-2' },
    { gridCol: 'md:col-span-1' }
  ];

  return (
    <section id="модулі" className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mb-6">
            {t.modules.tag}
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter uppercase">
            {t.modules.title} <br />
            <span className="text-purple-600">{t.modules.highlight}</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium">{t.modules.desc}</p>
        </motion.div>

        {/* Bento Grid for modules */}
        <div className="grid md:grid-cols-3 gap-6 auto-rows-[280px]">
          {modules.map((module, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.1
              }}
              className={`${bentoLayout[i]?.gridCol} col-span-1`}
              whileHover={{ scale: 1.02 }}
            >
              <LiquidGlassCard className="p-8 h-full flex flex-col justify-between group hover:bg-white/35 transition-colors duration-300">
                <div>
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center mb-6 group-hover:bg-purple-600/40 transition-colors duration-300"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <module.icon className="w-6 h-6 text-purple-600" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-display font-bold mb-2 text-slate-900 uppercase tracking-tight group-hover:text-purple-600 transition-colors duration-300">
                    <TypewriterText text={module.title} delay={i * 100} />
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-purple-600/10 text-purple-600 text-[8px] font-black uppercase w-fit">
                  {module.tag}
                </div>
              </LiquidGlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// TIMELINE SECTION (Scroll-driven Animation)
// ============================================================================

const TimelineSection = ({ t }) => {
  const icons = [Fingerprint, Database, Terminal, Zap];
  const steps = t.timeline.steps.map((title, i) => ({
    title,
    icon: icons[i]
  }));

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="процес" ref={ref} className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <div className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mb-6">
            {t.timeline.tag}
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter uppercase">
            {t.timeline.title} <span className="text-purple-600">{t.timeline.highlight}</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">{t.timeline.desc}</p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative flex flex-col lg:flex-row justify-between items-stretch gap-8 lg:gap-0">
            {/* Animated line (desktop only) */}
            <motion.div
              className="hidden lg:absolute top-10 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-400"
              style={{ width: lineWidth, right: 0, zIndex: 0 }}
            />

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15
                }}
                className="flex flex-col items-center text-center relative z-10 flex-1"
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-white border-4 border-purple-600 flex items-center justify-center mb-8 shadow-xl"
                  whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)' }}
                >
                  <step.icon className="w-8 h-8 text-purple-600" />
                </motion.div>
                <h3 className="text-lg font-display font-bold text-slate-900 uppercase tracking-tight">
                  {step.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// ROADMAP SECTION (Staggered Reveal)
// ============================================================================

const RoadmapSection = ({ t }) => {
  const dates = ['Q2 2026', 'Q4 2026', 'Q1 2027'];
  const steps = t.roadmap.items.map((title, i) => ({
    date: dates[i],
    title,
    tag: t.roadmap.itemsTags[i]
  }));

  return (
    <section id="дорожня-карта" className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <div className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mb-6">
            {t.roadmap.tag}
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter uppercase">
            {t.roadmap.title} <span className="text-purple-600">{t.roadmap.highlight}</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">{t.roadmap.desc}</p>
        </motion.div>

        {/* Roadmap cards with stagger */}
        <div className="grid lg:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <LiquidGlassCard className="p-12 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-purple-600 font-black text-[10px] uppercase tracking-[0.3em]">
                      {step.date}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-purple-600/10 text-purple-600 text-[8px] font-black uppercase">
                      {step.tag}
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4 text-slate-900 uppercase tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 font-medium leading-relaxed">{t.roadmap.desc}</p>
                </div>
              </LiquidGlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SUMMARY SECTION (Grand Finale)
// ============================================================================

const SummarySection = ({ t }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const titleScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="py-40 px-6 relative overflow-hidden text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mb-12">
          {t.summary.tag}
        </div>

        <motion.h2
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="text-6xl md:text-[10rem] font-display font-bold mb-12 tracking-tighter leading-[0.85] uppercase"
        >
          {t.summary.title} <br />
          <span className="text-purple-600">{t.summary.highlight}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-3xl text-slate-600 mb-16 max-w-3xl mx-auto font-medium"
        >
          {t.summary.desc}
        </motion.p>

        {/* Animated pulse dots */}
        <div className="flex justify-center gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-purple-600"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// ============================================================================
// FOOTER
// ============================================================================

const Footer = ({ t }) => {
  return (
    <footer className="py-20 px-6 border-t border-white/30 text-center md:text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <Brain className="text-white w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight uppercase">BrainFlow 3.0</span>
        </div>
        <div className="flex gap-12 text-xs font-bold text-slate-400 uppercase tracking-widest">
          {t.footer.links.map((link, i) => (
            <motion.a
              key={i}
              href="#"
              className="hover:text-slate-900 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {link}
            </motion.a>
          ))}
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.footer.copy}</div>
      </div>
    </footer>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

export default function App() {
  const [lang, setLang] = useState('uk');
  const t = translations[lang];

  return (
    <div className="relative min-h-screen selection:bg-purple-600/20 overflow-x-hidden" style={{ backgroundColor: '#F7F5F2' }}>
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
