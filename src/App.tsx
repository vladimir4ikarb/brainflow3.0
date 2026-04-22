/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
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
  Database,
  Eye,
  Box,
  Share2,
  Compass,
  Terminal,
  CpuIcon
} from 'lucide-react';

// --- Translations ---

const translations = {
  ua: {
    nav: ['Концепція', 'Архітектура', 'Модулі', 'Дорожня карта'],
    hero: {
      badge: "Майбутнє Інтелекту / v3.0.42",
      title: "BrainFlow",
      subtitle: "AI, що розуміє вас з півслова. Ми створюємо системи, де технології працюють автономно, звільняючи ваш час для справді важливих ідей.",
      status: "Активний потік"
    },
    concept: {
      badge: "01 / Візія",
      title1: "Повний контроль",
      title2: "над бізнесом",
      desc: "BrainFlow — це розумна операційна система для ваших процесів. Вона не просто виконує команди, а розуміє суть завдань і знаходить найкращі рішення самостійно.",
      item1: { title: "Розумний Інтелект", desc: "Система розуміє причини та наслідки, а не просто аналізує дані." },
      item2: { title: "Мережа помічників", desc: "Група агентів, що працюють разом для досягнення вашої мети." },
      stats: {
        accuracy: "Когнітивна точність",
        sync: "Синхронізовано"
      }
    },
    architecture: {
      badge: "02 / Архітектура",
      title1: "6 Рівнів",
      title2: "Системи",
      desc: "Кожен рівень працює злагоджено для повної автономності вашого бізнесу.",
      layers: [
        { title: "Збір даних", desc: "Датчики та пристрої для збору інформації в реальному часі." },
        { title: "Об'єднання інформації", desc: "Зведення всіх потоків даних у єдину зрозумілу картину." },
        { title: "Пошук рішень", desc: "Визначення логіки та зв'язків у потоках інформації." },
        { title: "Координація дій", desc: "Управління агентами для виконання складних сценаріїв." },
        { title: "Зручне управління", desc: "Простий та адаптивний інтерфейс для оператора." },
        { title: "Результат без затримок", desc: "Миттєве прийняття рішень та виконання дій." }
      ]
    },
    modules: {
      badge: "03 / Модулі",
      title1: "Модульна",
      title2: "Екосистема",
      desc: "BrainFlow 3.0 побудована з незалежних блоків, які легко масштабуються під ваші потреби.",
      list: [
        { title: "Ядро системи", desc: "Головний інтелект, що координує всі процеси." },
        { title: "Швидка обробка", desc: "Миттєва робота з потоками даних без затримок." },
        { title: "Розумні помічники", desc: "Мережа агентів для паралельного виконання завдань." },
        { title: "Логічний зв'язок", desc: "Модуль для моделювання та прийняття рішень." },
        { title: "Візуалізація", desc: "Інтерфейс для перегляду стану складних систем." }
      ]
    },
    timeline: {
      badge: "04 / Процес",
      title1: "Життєвий Цикл",
      title2: "Даних",
      desc: "Від отримання сигналу до результату за мілісекунди.",
      steps: [
        { title: "Вхідні дані", desc: "Збір з джерел." },
        { title: "Обробка", desc: "Фільтрація потоку." },
        { title: "Аналіз", desc: "Пошук рішення." },
        { title: "Результат", desc: "Автономна дія." }
      ]
    },
    roadmap: {
      badge: "05 / Дорожня Карта",
      title1: "Шлях",
      title2: "Розвитку",
      desc: "Наш план створення повноцінного корпоративного інтелекту.",
      steps: [
        { date: "Q2 2026", title: "Тестування", desc: "Запуск основного ядра в закритому середовищі." },
        { date: "Q4 2026", title: "Бета-реліз", desc: "Перші впровадження у великих компаніях." },
        { date: "Q1 2027", title: "Глобальний запуск", desc: "Відкриття системи для всіх розробників." }
      ]
    },
    ethics: {
      badge: "06 / Етика",
      title1: "Безпека та",
      title2: "Етика",
      desc: "Ми будуємо системи, які поважають приватність та працюють на користь людства.",
      items: [
        { title: "Прозорість", desc: "Кожне рішення системи можна відстежити та зрозуміти." },
        { title: "Контроль", desc: "Людина завжди залишається головним арбітром у критичних ситуаціях." }
      ]
    },
    summary: {
      badge: "07 / Підсумок",
      title1: "Майбутнє — це",
      title2: "BrainFlow",
      desc: "Ми створюємо нову форму взаємодії з цифровим світом."
    },
    footer: {
      links: [
        { label: 'Концепція', id: 'concept' },
        { label: 'Архітектура', id: 'architecture' },
        { label: 'Етика', id: 'ethics' }
      ],
      rights: "© 2026 BrainFlow. Всі права захищені."
    }
  },
  ru: {
    nav: ['Концепция', 'Архитектура', 'Модули', 'Дорожная карта'],
    hero: {
      badge: "Будущее Интеллекта / v3.0.42",
      title: "BrainFlow",
      subtitle: "ИИ, который понимает вас с полуслова. Мы создаем системы, где технологии работают автономно, освобождая ваше время для действительно важных идей.",
      status: "Активный поток"
    },
    concept: {
      badge: "01 / Видение",
      title1: "Полный контроль",
      title2: "над бизнесом",
      desc: "BrainFlow — это умная операционная система для ваших процессов. Она не просто исполняет команды, а понимает суть задач и находит лучшие решения самостоятельно.",
      item1: { title: "Умный Интеллект", desc: "Система понимает причины и следствия, а не просто анализирует данные." },
      item2: { title: "Сеть помощников", desc: "Группа агентов, работающих вместе для достижения вашей цели." },
      stats: {
        accuracy: "Когнитивная точность",
        sync: "Синхронизировано"
      }
    },
    architecture: {
      badge: "02 / Архитектура",
      title1: "6 Уровней",
      title2: "Системы",
      desc: "Каждый уровень работает слаженно для полной автономности вашего бизнеса.",
      layers: [
        { title: "Сбор данных", desc: "Датчики и устройства для сбора информации в реальном времени." },
        { title: "Объединение информации", desc: "Сведение всех потоков данных в единую понятную картину." },
        { title: "Поиск решений", desc: "Определение логики и связей в потоках информации." },
        { title: "Координация действий", desc: "Управление агентами для выполнения сложных сценариев." },
        { title: "Удобное управление", desc: "Простой и адаптивный интерфейс для оператора." },
        { title: "Результат без задержек", desc: "Мгновенное принятие решений и выполнение действий." }
      ]
    },
    modules: {
      badge: "03 / Модули",
      title1: "Модульная",
      title2: "Экосистема",
      desc: "BrainFlow 3.0 построена из независимых блоков, которые легко масштабируются под ваши задачи.",
      list: [
        { title: "Ядро системы", desc: "Главный интеллект, координирующий все процессы." },
        { title: "Быстрая обработка", desc: "Мгновенная работа с потоками данных без задержек." },
        { title: "Умные помощники", desc: "Сеть агентов для параллельного выполнения задач." },
        { title: "Логическая связь", desc: "Модуль для моделирования и принятия решений." },
        { title: "Визуализация", desc: "Интерфейс для просмотра состояния сложных систем." }
      ]
    },
    timeline: {
      badge: "04 / Процесс",
      title1: "Жизненный Цикл",
      title2: "Данных",
      desc: "От получения сигнала до результата за миллисекунды.",
      steps: [
        { title: "Входные данные", desc: "Сбор из источников." },
        { title: "Обработка", desc: "Фильтрация потока." },
        { title: "Анализ", desc: "Поиск решения." },
        { title: "Результат", desc: "Автономное действие." }
      ]
    },
    roadmap: {
      badge: "05 / Дорожная Карта",
      title1: "Путь",
      title2: "Развития",
      desc: "Наш план создания полноценного корпоративного интеллекта.",
      steps: [
        { date: "Q2 2026", title: "Тестирование", desc: "Запуск основного ядра в закрытой среде." },
        { date: "Q4 2026", title: "Бета-релиз", desc: "Первые внедрения в крупных компаниях." },
        { date: "Q1 2027", title: "Глобальный запуск", desc: "Открытие системы для всех разработчиков." }
      ]
    },
    ethics: {
      badge: "06 / Этика",
      title1: "Безопасность и",
      title2: "Этика",
      desc: "Мы строим системы, которые уважают приватность и работают на благо человечества.",
      items: [
        { title: "Прозрачность", desc: "Каждое решение системы можно отследить и понять." },
        { title: "Контроль", desc: "Человек всегда остается главным арбитром в критических ситуациях." }
      ]
    },
    summary: {
      badge: "07 / Итог",
      title1: "Будущее — это",
      title2: "BrainFlow",
      desc: "Мы создаем новую форму взаимодействия с цифровым миром."
    },
    footer: {
      links: [
        { label: 'Концепция', id: 'concept' },
        { label: 'Архитектура', id: 'architecture' },
        { label: 'Этика', id: 'ethics' }
      ],
      rights: "© 2026 BrainFlow. Все права защищены."
    }
  },
  en: {
    nav: ['Concept', 'Architecture', 'Modules', 'Roadmap'],
    hero: {
      badge: "Future of Intelligence / v3.0.42",
      title: "BrainFlow",
      subtitle: "AI that understands you instantly. We create systems where technology works autonomously, freeing your time for truly important ideas.",
      status: "Active Flow"
    },
    concept: {
      badge: "01 / Vision",
      title1: "Complete",
      title2: "business control",
      desc: "BrainFlow is a smart operating system for your processes. It doesn't just follow commands but understands the essence of tasks and finds the best solutions autonomously.",
      item1: { title: "Smart Intelligence", desc: "The system understands causes and effects, not just data analysis." },
      item2: { title: "Agent Network", desc: "A group of agents working together to achieve your goals." },
      stats: {
        accuracy: "Cognitive Accuracy",
        sync: "Synchronized"
      }
    },
    architecture: {
      badge: "02 / Architecture",
      title1: "6 System",
      title2: "Layers",
      desc: "Each layer works in harmony to ensure full autonomy for your business.",
      layers: [
        { title: "Data Collection", desc: "Sensors and devices for real-time information gathering." },
        { title: "Information Sync", desc: "Merging all data streams into a single clear picture." },
        { title: "Decision Search", desc: "Defining logic and connections in information flows." },
        { title: "Action Coordination", desc: "Managing agents to execute complex scenarios." },
        { title: "Easy Control", desc: "Simple and adaptive interface for the operator." },
        { title: "Instant Result", desc: "Immediate decision-making and action execution." }
      ]
    },
    modules: {
      badge: "03 / Modules",
      title1: "Modular",
      title2: "Ecosystem",
      desc: "BrainFlow 3.0 is built with independent blocks that easily scale to your needs.",
      list: [
        { title: "System Core", desc: "The main intelligence coordinating all processes." },
        { title: "Fast Processing", desc: "Instant work with data streams with zero delay." },
        { title: "Smart Helpers", desc: "A network of agents for parallel task execution." },
        { title: "Logical Link", desc: "Module for modeling and decision making." },
        { title: "Visualization", desc: "Interface for viewing the state of complex systems." }
      ]
    },
    timeline: {
      badge: "04 / Process",
      title1: "Data",
      title2: "Life Cycle",
      desc: "From signal acquisition to result in milliseconds.",
      steps: [
        { title: "Input", desc: "Collection from sources." },
        { title: "Processing", desc: "Stream filtering." },
        { title: "Analysis", desc: "Finding solution." },
        { title: "Execution", desc: "Autonomous action." }
      ]
    },
    roadmap: {
      badge: "05 / Roadmap",
      title1: "Growth",
      title2: "Path",
      desc: "Our plan to create a full-scale corporate intelligence.",
      steps: [
        { date: "Q2 2026", title: "Testing", desc: "Launching the core engine in a closed environment." },
        { date: "Q4 2026", title: "Beta Release", desc: "First implementations in large companies." },
        { date: "Q1 2027", title: "Global Launch", desc: "Opening the system for all developers." }
      ]
    },
    ethics: {
      badge: "06 / Ethics",
      title1: "Safety and",
      title2: "Ethics",
      desc: "We build systems that respect privacy and work for the benefit of humanity.",
      items: [
        { title: "Transparency", desc: "Every system decision can be tracked and understood." },
        { title: "Control", desc: "Humans always remain the primary arbiter in critical situations." }
      ]
    },
    summary: {
      badge: "07 / Summary",
      title1: "The Future is",
      title2: "BrainFlow",
      desc: "We are creating a new way to interact with the digital world."
    },
    footer: {
      links: [
        { label: 'Concept', id: 'concept' },
        { label: 'Architecture', id: 'architecture' },
        { label: 'Ethics', id: 'ethics' }
      ],
      rights: "© 2026 BrainFlow. All rights reserved."
    }
  }
};

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

const linkClickEffect = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 500, damping: 15 }
};

const pressEffect = {
  whileHover: { scale: 1.02, y: -2 },
  whileTap: { scale: 0.98, y: 0 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

// --- Components ---

const Navbar = ({ lang, setLang, t }) => {
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
        
        <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-600 tracking-wide">
          {[
            { id: 'concept', label: t.nav[0] },
            { id: 'architecture', label: t.nav[1] },
            { id: 'modules', label: t.nav[2] },
            { id: 'roadmap', label: t.nav[3] }
          ].map((item) => (
            <motion.a 
              key={item.id} 
              href={`#${item.id}`} 
              className="relative group hover:text-accent-purple transition-colors"
              {...linkClickEffect}
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-accent-purple transition-all duration-500 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
          {['ua', 'ru', 'en'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`hover:text-accent-purple transition-colors ${lang === l ? 'text-accent-purple border-b-2 border-accent-purple' : ''}`}
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

const Hero = ({ t }) => {
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
            {t.hero.badge}
          </motion.div>
          
          <motion.div 
            initial={{ scale: 1.5, y: -50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <h1 className="text-6xl md:text-[7.5rem] font-display font-bold leading-[0.88] text-gradient tracking-tighter uppercase">
              {t.hero.title} <br />
              <span className="text-slate-300">System 3.0</span>
            </h1>
          </motion.div>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-slate-500 mb-16 max-w-xl leading-relaxed font-medium"
          >
            {t.hero.subtitle}
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
                  {t.hero.status} <span className="text-accent-purple">98%</span>
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
            <div className="relative w-[500px] h-[500px]">
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
                </motion.div>
              </div>

              {[
                { Icon: Cpu, pos: "top-0 left-0" },
                { Icon: Network, pos: "top-0 right-0" },
                { Icon: ShieldCheck, pos: "bottom-0 left-0" },
                { Icon: Zap, pos: "bottom-0 right-0" }
              ].map((Node, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                  className={`absolute ${Node.pos} w-16 h-16 bg-white rounded-2xl shadow-2xl flex items-center justify-center border border-slate-100`}
                >
                  <Node.Icon className="w-8 h-8 text-slate-400" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ConceptSection = ({ t }) => {
  return (
    <section id="concept" className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="text-[10px] font-black text-accent-purple uppercase tracking-[0.4em] mb-6">{t.concept.badge}</div>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-12 tracking-tighter leading-tight uppercase">
              {t.concept.title1} <br /> <span className="text-accent-purple">{t.concept.title2}</span>
            </h2>
            <p className="text-2xl text-slate-500 mb-12 leading-relaxed font-medium">
              {t.concept.desc}
            </p>
            <div className="space-y-8">
              {[
                { ...t.concept.item1, icon: Workflow },
                { ...t.concept.item2, icon: Network }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-slate-100">
                    <item.icon className="text-accent-purple w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </div>
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
                <div className="relative z-10 space-y-8">
                   <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Analytics</div>
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                         <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{t.concept.stats.sync}</span>
                      </div>
                   </div>
                   <div className="space-y-6">
                      {[
                        { label: "Neural Sync", val: 99.9 },
                        { label: "Agent Flow", val: 98.7 }
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
                                transition={{ duration: 2 }}
                                className="absolute inset-0 bg-accent-purple"
                              />
                           </div>
                        </div>
                      ))}
                   </div>
                   <div className="pt-8 flex items-center justify-between">
                      <div>
                        <div className="text-4xl font-display font-bold text-slate-900 mb-1 tracking-tighter">99.9%</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.concept.stats.accuracy}</div>
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

const ArchitectureSection = ({ t }) => {
  const icons = [Box, Database, Workflow, Share2, Eye, Zap];
  return (
    <section id="architecture" className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <div className="text-[10px] font-black text-accent-purple uppercase tracking-[0.4em] mb-6">{t.architecture.badge}</div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter uppercase">{t.architecture.title1} <span className="text-accent-purple">{t.architecture.title2}</span></h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">{t.architecture.desc}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {t.architecture.layers.map((layer, i) => (
            <div
              key={i}
              className="glass-card p-12 rounded-[3rem] group transition-all duration-500 relative overflow-hidden border border-white/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-accent-purple group-hover:text-white transition-all duration-500 shadow-sm">
                {icons[i] && <div className="w-8 h-8">{icons[i]({})}</div>}
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-accent-purple transition-colors">{layer.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{layer.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ModulesSection = ({ t }) => {
  const icons = [Brain, Zap, Network, Workflow, Eye];
  return (
    <section id="modules" className="py-40 px-6 bg-slate-900 text-white rounded-[5rem] mx-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-[10px] font-black text-accent-lilac uppercase tracking-[0.4em] mb-6">{t.modules.badge}</div>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter uppercase">{t.modules.title1} <br /> <span className="text-accent-lilac">{t.modules.title2}</span></h2>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              {t.modules.desc}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {t.modules.list.map((module, i) => (
            <div
              key={i}
              className="p-10 rounded-[3rem] border border-white/10 transition-all duration-500 group hover:bg-white/5"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-accent-lilac group-hover:text-slate-900 transition-all duration-500 shadow-lg">
                {icons[i] && <div className="w-6 h-6">{icons[i]({})}</div>}
              </div>
              <h3 className="text-xl font-display font-bold mb-4 uppercase tracking-tight group-hover:text-accent-lilac transition-colors">{module.title}</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">{module.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineSection = ({ t }) => {
  const icons = [Fingerprint, CpuIcon, Terminal, Zap];
  return (
    <section className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-32">
        <div className="text-[10px] font-black text-accent-purple uppercase tracking-[0.4em] mb-6">{t.timeline.badge}</div>
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter uppercase">{t.timeline.title1} <span className="text-accent-purple">{t.timeline.title2}</span></h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">{t.timeline.desc}</p>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 hidden lg:block" />
        <div className="grid lg:grid-cols-4 gap-12 relative z-10">
          {t.timeline.steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center mb-8 shadow-xl">
                {icons[i] && <div className="w-8 h-8 text-accent-purple">{icons[i]({})}</div>}
              </div>
              <h3 className="text-xl font-display font-bold mb-4 text-slate-900 uppercase tracking-tight">{step.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RoadmapSection = ({ t }) => {
  return (
    <section id="roadmap" className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <div className="text-[10px] font-black text-accent-purple uppercase tracking-[0.4em] mb-6">{t.roadmap.badge}</div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter uppercase">{t.roadmap.title1} <span className="text-accent-purple">{t.roadmap.title2}</span></h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">{t.roadmap.desc}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {t.roadmap.steps.map((step, i) => (
            <div key={i} className="glass-card p-12 rounded-[3rem] relative group border border-white/50">
              <div className="flex justify-between items-start mb-8">
                 <div className="text-accent-purple font-black text-[10px] uppercase tracking-[0.3em]">{step.date}</div>
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-accent-purple transition-colors uppercase tracking-tight">{step.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
              <div className="absolute top-12 right-12 opacity-5">
                <Compass className="w-12 h-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EthicsSection = ({ t }) => {
  return (
    <section id="ethics" className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <div className="order-2 lg:order-1">
             <div className="glass-card p-12 rounded-[4rem] relative overflow-hidden border border-white/50">
                <div className="space-y-8">
                   {t.ethics.items.map((item, i) => (
                     <div key={i} className="flex gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-slate-100">
                           <ShieldCheck className="text-accent-purple w-6 h-6" />
                        </div>
                        <div>
                           <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                           <p className="text-slate-500 font-medium">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="text-[10px] font-black text-accent-purple uppercase tracking-[0.4em] mb-6">{t.ethics.badge}</div>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-12 tracking-tighter leading-tight uppercase">
              {t.ethics.title1} <br /> <span className="text-accent-purple">{t.ethics.title2}</span>
            </h2>
            <p className="text-2xl text-slate-500 leading-relaxed font-medium">
              {t.ethics.desc}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SummarySection = ({ t }) => {
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
          <div className="text-[10px] font-black text-accent-purple uppercase tracking-[0.4em] mb-12">{t.summary.badge}</div>
          <h2 className="text-6xl md:text-[10rem] font-display font-bold mb-12 tracking-tighter leading-[0.85] uppercase">
            {t.summary.title1} <br /> <span className="text-accent-purple">{t.summary.title2}</span>
          </h2>
          <p className="text-2xl md:text-3xl text-slate-500 mb-16 font-medium leading-relaxed max-w-3xl mx-auto">
            {t.summary.desc}
          </p>
          <div className="flex justify-center gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-3 h-3 rounded-full bg-accent-purple animate-ping" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
          </div>
        </motion.div>
      </div>

      <motion.div 
        style={{ y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent-purple/5 rounded-full blur-[200px] -z-10" 
      />
    </section>
  );
};

const Footer = ({ t }) => {
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
          {t.footer.links.map(link => (
            <a key={link.id} href={`#${link.id}`} className="hover:text-accent-purple transition-colors">{link.label}</a>
          ))}
        </div>
        
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState('ua');
  const t = translations[lang];

  return (
    <div className="relative min-h-screen selection:bg-accent-purple/20">
      <BackgroundEffects />
      <Navbar lang={lang} setLang={setLang} t={t} />
      
      <main>
        <Hero t={t} />
        <ConceptSection t={t} />
        <ArchitectureSection t={t} />
        <ModulesSection t={t} />
        <TimelineSection t={t} />
        <RoadmapSection t={t} />
        <EthicsSection t={t} />
        <SummarySection t={t} />
      </main>
      
      <Footer t={t} />
    </div>
  );
}
