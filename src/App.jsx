import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  GraduationCap,
  Star,
  MessageCircle,
  Smile,
  Check,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  PenTool,
  Brain,
  Coffee,
  ArrowRight,
  Trophy,
  RefreshCw,
  Globe,
  Sparkles,
  Gamepad2
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [lang, setLang] = useState('en'); // 'en', 'zh', 'ms'
  const [gameMode, setGameMode] = useState('quiz'); // 'quiz' or 'story'

  // Image Handling
  const [imageError, setImageError] = useState(false);
  const profileImageSrc = "images/teacher-nicole.jpg";

  // --- LOCALIZATION DATA ---
  const t = {
    en: {
      nav: { about: "About Me", classes: "Classes", arcade: "Arcade", pricing: "Pricing", book: "Book a Trial" },
      hero: {
        badge: "🎓 CELT Certified & Experienced Tutor",
        title: "English Learning Made",
        titleHighlight: "Fun & Logical",
        desc: "From storytelling for kids to 'grammar math' for teens. Join Teacher Nicole on a journey to master English for school, exams, and life.",
        cta: "Start Learning",
        view: "View Courses"
      },
      stats: { exp: "Teaching Exp", spm: "SPM Record", cert: "Certified", students: "Students" },
      about: {
        title: "Hello! I'm Nicole Liew.",
        p1: "I've been a dedicated English teacher since 2017. My passion is taking the 'scary' out of English and making it accessible for everyone.",
        funFact: "Fun Fact:",
        funFactText: "Before I became a full-time educator, I was a certified Pastry Chef! 🍰 Just like baking, language needs structure (grammar) mixed with creativity.",
        specialty: "Simplifying grammar using mathematical logic.",
        focus: "SPM, IGCSE, Cambridge & Adults."
      },
      arcade: {
        title: "English Arcade",
        subtitle: "Play, Learn & Create!",
        modeQuiz: "Quiz Challenge",
        modeStory: "Story Generator"
      },
      story: {
        title: "The Magic Story Maker ✨",
        desc: "Give me 3 words (in English), and I'll write a funny story for you!",
        label1: "A Name (e.g., Ali)",
        label2: "A Place (e.g., School)",
        label3: "An Object (e.g., Banana)",
        btn: "Generate Story",
        result: "Your Masterpiece:",
        tip: "Teacher's Tip: Notice how we used the nouns and proper nouns? In class, we learn how to build entire worlds with words!"
      },
      pricing: {
        title: "Simple, Transparent Pricing",
        group: "Small Group",
        groupDesc: "Perfect for learning with friends.",
        personal: "Personalized (1-on-1)",
        personalDesc: "Fully focused on your weak points.",
        crash: "Exam Crash Course",
        crashDesc: "Intensive prep before major exams.",
        inquire: "Inquire Now",
        book: "Book Now"
      }
    },
    zh: {
      nav: { about: "关于我", classes: "课程", arcade: "游戏区", pricing: "价格", book: "预约试课" },
      hero: {
        badge: "🎓 CELT 认证 · 经验丰富的英语导师",
        title: "让学英语变得",
        titleHighlight: "好玩又有逻辑",
        desc: "从小朋友的故事教学，到中学生的\"语法数学\"。跟着 Nicole 老师一起，轻松掌握学校、考试和日常生活中的英语！",
        cta: "开始学习",
        view: "查看课程"
      },
      stats: { exp: "教学经验", spm: "SPM 最佳成绩", cert: "专业认证", students: "位学生" },
      about: {
        title: "你好！我是 Nicole Liew。",
        p1: `我自2017年以来一直是一名敬业的英语老师。我的使命在于把英语中“让人害怕”的部分拿掉，让每个人都能轻松掌握。`,
        funFact: "趣味小知识：",
        funFactText: "在成为全职教育者之前，我是一名持证的糕点师！🍰 就像烘焙一样，语言也需要结构（语法）与创意的结合。",
        specialty: "用数学逻辑来简化语法，让你一看就懂。",
        focus: "SPM、IGCSE、剑桥英语和成人英语。"
      },
      arcade: {
        title: "英语游戏区",
        subtitle: "边玩、边学、边创造！",
        modeQuiz: "快速测验",
        modeStory: "故事生成器"
      },
      story: {
        title: "魔法故事机 ✨",
        desc: "给我3个英文单词，我帮你编一个有趣的故事！",
        label1: "一个名字（例如：Ali）",
        label2: "一个地方（例如：School）",
        label3: "一样东西（例如：Banana）",
        btn: "生成故事",
        result: "你的作品：",
        tip: "老师提示：注意看我们怎么用这些名词的哦！在课堂上，我们会学习如何用文字构建一个完整的世界！"
      },
      pricing: {
        title: "收费简单透明",
        group: "小组班",
        groupDesc: "和朋友一起学，更有动力。",
        personal: "一对一补习",
        personalDesc: "完全针对你的弱点来加强。",
        crash: "考试冲刺班",
        crashDesc: "大考前的集中强化训练。",
        inquire: "咨询详情",
        book: "立即预约"
      }
    },
    ms: {
      nav: { about: "Tentang Saya", classes: "Kelas", arcade: "Arked", pricing: "Harga", book: "Tempah Sesi" },
      hero: {
        badge: "🎓 Tutor Berpengalaman & Diiktiraf CELT",
        title: "Belajar Bahasa Inggeris",
        titleHighlight: "Seronok & Logik",
        desc: "Dari bercerita untuk kanak-kanak hingga 'logik tatabahasa' untuk remaja. Sertai Cikgu Nicole untuk menguasai Bahasa Inggeris.",
        cta: "Mula Belajar",
        view: "Lihat Kursus"
      },
      stats: { exp: "Pengalaman", spm: "Rekod SPM", cert: "Sijil", students: "Pelajar" },
      about: {
        title: "Hai! Saya Nicole Liew.",
        p1: "Saya telah menjadi guru Bahasa Inggeris yang berdedikasi sejak 2017. Misi saya adalah memudahkan Bahasa Inggeris untuk semua peringkat umur.",
        funFact: "Fakta Menarik:",
        funFactText: "Sebelum menjadi pendidik, saya adalah Chef Pastri bertauliah! 🍰 Seperti membuat kek, bahasa memerlukan struktur (tatabahasa) dan kreativiti.",
        specialty: "Memudahkan tatabahasa menggunakan logik matematik.",
        focus: "SPM, IGCSE, Cambridge & Dewasa."
      },
      arcade: {
        title: "Arked Bahasa Inggeris",
        subtitle: "Main, Belajar & Cipta!",
        modeQuiz: "Kuiz Pantas",
        modeStory: "Pencipta Cerita"
      },
      story: {
        title: "Pencipta Cerita Ajaib ✨",
        desc: "Beri saya 3 perkataan (Inggeris), saya akan tulis cerita pendek!",
        label1: "Nama (Name)",
        label2: "Tempat (Place)",
        label3: "Objek (Object)",
        btn: "Jana Cerita",
        result: "Karya Anda:",
        tip: "Tips Cikgu: Nampak tak bagaimana kita menggunakan kata nama? Dalam kelas, kita akan belajar membina ayat yang lebih menarik!"
      },
      pricing: {
        title: "Harga Telus & Berpatutan",
        group: "Kelas Kumpulan",
        groupDesc: "Sesuai belajar bersama kawan.",
        personal: "Personal (1-on-1)",
        personalDesc: "Fokus sepenuhnya pada kelemahan anda.",
        crash: "Pecutan Peperiksaan",
        crashDesc: "Persediaan intensif sebelum peperiksaan besar.",
        inquire: "Tanya Sekarang",
        book: "Tempah Sekarang"
      }
    }
  };

  const currentText = t[lang];

  // Story Generator State
  const [storyInputs, setStoryInputs] = useState({ name: '', place: '', object: '' });
  const [generatedStory, setGeneratedStory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [storySource, setStorySource] = useState(''); // 'ai' or 'template'

  // UPDATE THIS after deploying your Cloudflare Worker
  const STORY_API_URL = 'https://nicole-story-api.nicole-story-api.workers.dev/';

  // Fallback templates (used if API is unavailable)
  const fallbackTemplates = [
    (n, p, o) => `One day, ${n} went to the ${p} to find a mysterious ${o}. Suddenly, the ${o} started dancing! Everyone at the ${p} was shocked.`,
    (n, p, o) => `${n} was the bravest hero in the ${p}. But ${n}'s only weakness was a giant ${o}.`,
    (n, p, o) => `"Don't touch the ${o}!" shouted ${n}. But it was too late. The ${p} was already filled with glitter.`,
    (n, p, o) => `Chef ${n} decided to bake a cake shaped like a ${o}. It tasted like ${p}!`,
    (n, p, o) => `It was a dark and stormy night at the ${p}. ${n} tripped over a ${o} and found a secret door.`,
    (n, p, o) => `Teacher Nicole asked ${n} to bring a ${o} to class. ${n} brought it to the ${p} instead!`,
    (n, p, o) => `The ${o} at the ${p} is magical. If ${n} touches it, it turns into gold.`,
    (n, p, o) => `Every time ${n} visits the ${p}, a wild ${o} appears and sings a song.`,
  ];

  const generateStory = async () => {
    const { name, place, object } = storyInputs;
    if (!name || !place || !object) return;

    setIsGenerating(true);
    setGeneratedStory('');
    setStorySource('');

    try {
      const response = await fetch(STORY_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, place, object }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      setGeneratedStory(data.story);
      setStorySource(data.source || 'ai');
    } catch (err) {
      // Fallback to local templates
      console.warn('Story API unavailable, using fallback:', err.message);
      const template = fallbackTemplates[Math.floor(Math.random() * fallbackTemplates.length)];
      setGeneratedStory(template(name, place, object));
      setStorySource('template');
    } finally {
      setIsGenerating(false);
    }
  };

  // Quiz State
  const [quizLevel, setQuizLevel] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const whatsAppNumber = "601133848412";
  const whatsAppLink = `https://wa.me/${whatsAppNumber}`;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Resume Data (Static for now, but could be translated if needed)
  const experience = [
    { role: "Freelance English Tutor", company: "Sandakan & Online", period: "Dec 2024 - Present", desc: "Personalized lessons for all ages." },
    { role: "English Teacher", company: "Smartway English Academy", period: "Jul 2024 - Nov 2024", desc: "Simplified grammar for adults." },
    { role: "English Tutor", company: "Edumpire Sdn Bhd", period: "Jan 2024 - Jun 2024", desc: "Primary & secondary students." },
  ];

  const testimonials = [
    { text: "Teacher Nicole makes grammar logic so easy to understand!", author: "Form 5 Student", grade: "SPM Candidate" },
    { text: "My daughter used to be shy, but now she loves storytelling time.", author: "Mrs. Tan", grade: "Parent" },
    { text: "I finally passed my IELTS thanks to the structured speaking practice.", author: "University Student", grade: "Adult Learner" }
  ];

  // Quiz Data (Keep in English as it tests English)
  const quizData = {
    primary: [
      { question: "Choose the correct word: 'The cat is sleeping ___ the sofa.'", options: ["in", "on", "at"], correct: 1 },
      { question: "Which is the past tense of 'Run'?", options: ["Runned", "Running", "Ran"], correct: 2 },
      { question: "Find the odd one out:", options: ["Apple", "Banana", "Car"], correct: 2 }
    ],
    secondary: [
      { question: "If I ___ known about the party, I would have attended.", options: ["have", "had", "has"], correct: 1 },
      { question: "Which sentence is grammatically correct?", options: ["She don't like coffee.", "She doesn't likes coffee.", "She doesn't like coffee."], correct: 2 },
      { question: "Synonym of 'Happy'?", options: ["Elated", "Sorrowful", "Fatigued"], correct: 0 }
    ],
    adult: [
      { question: "Most formal email closing:", options: ["Cheers,", "Sincerely,", "See ya,"], correct: 1 },
      { question: "Idiom: 'Kill two birds with one ___.'", options: ["stick", "stone", "arrow"], correct: 1 },
      { question: "I look forward to ___ from you.", options: ["hear", "hearing", "heard"], correct: 1 }
    ]
  };

  // Quiz Functions
  const handleLevelSelect = (level) => {
    setQuizLevel(level);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  };

  const handleAnswerClick = (index) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(index);
    setIsAnswerChecked(true);
    if (index === quizData[quizLevel][currentQuestionIndex].correct) setScore(score + 1);

    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < quizData[quizLevel].length) {
        setCurrentQuestionIndex(nextQuestion);
        setSelectedAnswer(null);
        setIsAnswerChecked(false);
      } else {
        setShowScore(true);
      }
    }, 1200);
  };

  const resetQuiz = () => {
    setQuizLevel(null);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="font-sans text-gray-800 bg-sky-50 min-h-screen selection:bg-yellow-200">

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-400 p-2 rounded-full text-white">
                <BookOpen size={24} />
              </div>
              <span className="text-xl md:text-2xl font-bold text-sky-600 tracking-tight whitespace-nowrap">Teacher Nicole</span>
            </div>

            {/* Desktop Menu */}
            {/* CHANGED: Switched from 'md:flex' to 'lg:flex' to hide this menu on tablet screens so it doesn't look squashed */}
            <div className="hidden lg:flex space-x-6 items-center">
              {/* CHANGED: Added 'whitespace-nowrap' to all links to prevent text breaking */}
              <a href="#about" className="text-gray-600 hover:text-sky-600 font-medium transition whitespace-nowrap">{currentText.nav.about}</a>
              <a href="#classes" className="text-gray-600 hover:text-sky-600 font-medium transition whitespace-nowrap">{currentText.nav.classes}</a>
              <a href="#arcade" className="text-gray-600 hover:text-sky-600 font-medium transition flex items-center gap-1 whitespace-nowrap"><Gamepad2 size={16} /> {currentText.nav.arcade}</a>
              <a href="#pricing" className="text-gray-600 hover:text-sky-600 font-medium transition whitespace-nowrap">{currentText.nav.pricing}</a>

              {/* Lang Switcher */}
              <div className="flex bg-gray-100 rounded-full p-1 shrink-0">
                {[{ code: 'en', label: 'EN' }, { code: 'zh', label: '中' }, { code: 'ms', label: 'BM' }].map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition ${lang === code ? 'bg-white shadow text-sky-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <a
                href={whatsAppLink}
                target="_blank"
                rel="noreferrer"
                className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-full font-bold transition shadow-md flex items-center gap-2 transform hover:scale-105 whitespace-nowrap"
              >
                <MessageCircle size={18} />
                {currentText.nav.book}
              </a>
            </div>

            {/* Mobile Menu Button */}
            {/* CHANGED: Switched from 'md:hidden' to 'lg:hidden' so the hamburger button appears on tablets now */}
            <div className="lg:hidden flex items-center gap-4">
              {/* Mobile Lang Switcher */}
              <button onClick={() => setLang(lang === 'en' ? 'zh' : lang === 'zh' ? 'ms' : 'en')} className="font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded text-sm">
                {{ en: 'EN', zh: '中', ms: 'BM' }[lang]} <Globe size={14} className="inline ml-1" />
              </button>
              <button onClick={toggleMenu} className="text-gray-600 hover:text-sky-600 focus:outline-none">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          /* CHANGED: Switched 'md:hidden' to 'lg:hidden' to match the button */
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#about" onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-600">{currentText.nav.about}</a>
              <a href="#classes" onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-600">{currentText.nav.classes}</a>
              <a href="#arcade" onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-600">{currentText.nav.arcade}</a>
              <a href="#pricing" onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-600">{currentText.nav.pricing}</a>
              <a href={whatsAppLink} className="block px-3 py-3 rounded-md text-base font-bold text-sky-600 bg-sky-50 mt-4">{currentText.nav.book}</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-bold mb-6 animate-bounce">
              {currentText.hero.badge}
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              {currentText.hero.title} <span className="text-sky-500">{currentText.hero.titleHighlight}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              {currentText.hero.desc}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={whatsAppLink}
                className="bg-sky-500 hover:bg-sky-600 text-white text-lg px-8 py-4 rounded-full font-bold transition shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle />
                {currentText.hero.cta}
              </a>
              <a
                href="#classes"
                className="bg-white hover:bg-gray-50 text-sky-600 border-2 border-sky-100 text-lg px-8 py-4 rounded-full font-bold transition shadow-sm flex items-center justify-center"
              >
                {currentText.hero.view}
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Blobs */}
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </section>

      {/* Stats / Credentials Bar */}
      <div className="bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-sky-600 mb-1">7+ Years</div>
              <div className="text-sm text-gray-500 font-medium">{currentText.stats.exp}</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-sky-600 mb-1">A+</div>
              <div className="text-sm text-gray-500 font-medium">{currentText.stats.spm}</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-sky-600 mb-1">CELT</div>
              <div className="text-sm text-gray-500 font-medium">{currentText.stats.cert}</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-sky-600 mb-1">100+</div>
              <div className="text-sm text-gray-500 font-medium">{currentText.stats.students}</div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-yellow-200 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-sky-100 rounded-3xl p-8 overflow-hidden">
                {/* Photo Placeholder */}
                <div className="aspect-[4/3] bg-white rounded-2xl mb-6 border-4 border-white shadow-inner overflow-hidden relative">
                  {!imageError ? (
                    <img
                      src={profileImageSrc}
                      alt="Teacher Nicole"
                      className="w-full h-full object-cover object-top"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-sky-50">
                      <div className="text-center p-4">
                        <Smile size={64} className="text-sky-400 mx-auto mb-2" />
                        <p className="text-gray-500 font-bold">Teacher Nicole</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 justify-center">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-center transform hover:scale-105 transition">
                    <Coffee size={24} className="text-yellow-500 mx-auto mb-1" />
                    <span className="text-xs font-bold text-gray-600">Pastry Chef</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm text-center transform hover:scale-105 transition">
                    <GraduationCap size={24} className="text-sky-500 mx-auto mb-1" />
                    <span className="text-xs font-bold text-gray-600">Educator</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{currentText.about.title}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {currentText.about.p1}
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                <strong className="text-sky-600">{currentText.about.funFact}</strong> {currentText.about.funFactText}
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded text-green-600 mt-1"><Check size={16} /></div>
                  <p className="text-gray-700"><strong>Specialty:</strong> {currentText.about.specialty}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-1 rounded text-purple-600 mt-1"><Check size={16} /></div>
                  <p className="text-gray-700"><strong>Focus:</strong> {currentText.about.focus}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GAME ARCADE SECTION (NEW) */}
      <section id="arcade" className="py-20 bg-indigo-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-800 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-900 rounded-full opacity-50 blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10">
            <span className="inline-block bg-yellow-400 text-indigo-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">{currentText.arcade.title}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{currentText.arcade.subtitle}</h2>

            {/* Toggle Game Mode */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setGameMode('quiz')}
                className={`px-6 py-2 rounded-full font-bold transition flex items-center gap-2 ${gameMode === 'quiz' ? 'bg-sky-500 text-white' : 'bg-indigo-800 text-indigo-300 hover:bg-indigo-700'}`}
              >
                <Trophy size={18} /> {currentText.arcade.modeQuiz}
              </button>
              <button
                onClick={() => setGameMode('story')}
                className={`px-6 py-2 rounded-full font-bold transition flex items-center gap-2 ${gameMode === 'story' ? 'bg-purple-500 text-white' : 'bg-indigo-800 text-indigo-300 hover:bg-indigo-700'}`}
              >
                <Sparkles size={18} /> {currentText.arcade.modeStory}
              </button>
            </div>
          </div>

          <div className="bg-white text-gray-900 rounded-3xl shadow-2xl p-6 md:p-10 min-h-[400px] flex flex-col justify-center items-center text-center transition-all duration-300">

            {/* === QUIZ MODE === */}
            {gameMode === 'quiz' && (
              <>
                {!quizLevel ? (
                  <div className="w-full animate-fadeIn">
                    {/* CHANGED: Removed hardcoded Chinese. Now uses dynamic translation based on selected language. */}
                    <h3 className="text-2xl font-bold mb-8 text-gray-800">
                      {lang === 'zh' ? '选择你的级别' : lang === 'ms' ? 'Pilih Tahap Anda' : 'Select Your Level'}
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <button onClick={() => handleLevelSelect('primary')} className="group p-6 rounded-2xl border-2 border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50 transition flex flex-col items-center">
                        <div className="bg-yellow-100 p-4 rounded-full mb-4 group-hover:scale-110 transition">
                          <Smile size={32} className="text-yellow-600" />
                        </div>
                        <span className="font-bold text-lg">Primary</span>
                      </button>

                      <button onClick={() => handleLevelSelect('secondary')} className="group p-6 rounded-2xl border-2 border-sky-200 hover:border-sky-400 hover:bg-sky-50 transition flex flex-col items-center">
                        <div className="bg-sky-100 p-4 rounded-full mb-4 group-hover:scale-110 transition">
                          <PenTool size={32} className="text-sky-600" />
                        </div>
                        <span className="font-bold text-lg">Secondary / SPM</span>
                      </button>

                      <button onClick={() => handleLevelSelect('adult')} className="group p-6 rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition flex flex-col items-center">
                        <div className="bg-purple-100 p-4 rounded-full mb-4 group-hover:scale-110 transition">
                          <Brain size={32} className="text-purple-600" />
                        </div>
                        <span className="font-bold text-lg">Adult</span>
                      </button>
                    </div>
                  </div>
                ) : showScore ? (
                  <div className="animate-fadeIn w-full max-w-lg">
                    <Trophy size={64} className="text-yellow-500 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-3xl font-bold mb-2">
                      {score === 3 ? "Excellent!" : score === 2 ? "Great Job!" : "Good Try!"}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      You scored <span className="font-bold text-indigo-600 text-xl">{score}/3</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a href={whatsAppLink} target="_blank" rel="noreferrer" className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                        Get Full Evaluation <ArrowRight size={18} />
                      </a>
                      <button onClick={resetQuiz} className="text-gray-500 hover:text-gray-700 font-medium flex items-center justify-center gap-2">
                        <RefreshCw size={18} /> Play Again
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-lg animate-fadeIn">
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">Question {currentQuestionIndex + 1}/3</span>
                      <button onClick={resetQuiz} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-8 leading-snug">
                      {quizData[quizLevel][currentQuestionIndex].question}
                    </h3>

                    <div className="space-y-3">
                      {quizData[quizLevel][currentQuestionIndex].options.map((option, index) => {
                        let btnClass = "w-full p-4 rounded-xl border-2 text-left font-semibold transition flex justify-between items-center ";
                        const isSelected = selectedAnswer === index;
                        const isCorrect = index === quizData[quizLevel][currentQuestionIndex].correct;

                        if (isAnswerChecked) {
                          if (isCorrect) btnClass += "bg-green-100 border-green-500 text-green-700";
                          else if (isSelected) btnClass += "bg-red-100 border-red-500 text-red-700";
                          else btnClass += "bg-white border-gray-200 opacity-50";
                        } else {
                          btnClass += "bg-white border-gray-200 hover:border-indigo-500 hover:bg-indigo-50";
                        }

                        return (
                          <button
                            key={index}
                            onClick={() => handleAnswerClick(index)}
                            className={btnClass}
                            disabled={isAnswerChecked}
                          >
                            {option}
                            {isAnswerChecked && isCorrect && <Check size={20} />}
                            {isAnswerChecked && isSelected && !isCorrect && <X size={20} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* === STORY MODE === */}
            {gameMode === 'story' && (
              <div className="w-full max-w-lg animate-fadeIn text-left">
                {isGenerating ? (
                  <div className="text-center py-12">
                    <div className="inline-block w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-6"></div>
                    <p className="text-gray-600 font-medium text-lg">AI is writing your story...</p>
                    <p className="text-gray-400 text-sm mt-2">Powered by Google Gemini ✨</p>
                  </div>
                ) : !generatedStory ? (
                  <>
                    <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">{currentText.story.title}</h3>
                    <p className="text-gray-500 text-center mb-8">{currentText.story.desc}</p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">{currentText.story.label1}</label>
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
                          value={storyInputs.name}
                          onChange={(e) => setStoryInputs({ ...storyInputs, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">{currentText.story.label2}</label>
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
                          value={storyInputs.place}
                          onChange={(e) => setStoryInputs({ ...storyInputs, place: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">{currentText.story.label3}</label>
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
                          value={storyInputs.object}
                          onChange={(e) => setStoryInputs({ ...storyInputs, object: e.target.value })}
                        />
                      </div>
                      <button
                        onClick={generateStory}
                        disabled={!storyInputs.name || !storyInputs.place || !storyInputs.object}
                        className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                      >
                        {currentText.story.btn}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-500 mb-4 uppercase">{currentText.story.result}</h3>
                    <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-2xl mb-6 shadow-sm">
                      <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed">
                        "{generatedStory}"
                      </p>
                    </div>
                    <div className="bg-sky-50 p-4 rounded-xl mb-6">
                      <p className="text-sm text-sky-800 italic">{currentText.story.tip}</p>
                    </div>
                    <button
                      onClick={() => { setGeneratedStory(''); setStoryInputs({ name: '', place: '', object: '' }); setStorySource(''); }}
                      className="text-purple-600 font-bold hover:text-purple-800"
                    >
                      Create Another Story
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Learning Paths / Services */}
      <section id="classes" className="py-20 bg-sky-50 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Learning Path</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Whether you are preparing for a big exam or just want to speak confidently, I have a class for you.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Primary */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-b-8 border-yellow-400 hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 mb-6 mx-auto">
                <Smile size={32} />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Junior Explorers</h3>
              <p className="text-gray-500 text-center text-sm mb-6 uppercase tracking-wider font-bold">Primary School (Std 1-6)</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div>Interactive Storytelling</li>
                <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div>Vocabulary Building</li>
                <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div>Basic Grammar Fun</li>
                <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div>Reading Comprehension</li>
              </ul>
            </div>

            {/* Secondary */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-b-8 border-sky-500 transform md:scale-110 z-10">
              <div className="absolute top-0 right-0 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 mb-6 mx-auto">
                <PenTool size={32} />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Exam Warriors</h3>
              <p className="text-gray-500 text-center text-sm mb-6 uppercase tracking-wider font-bold">Secondary (Form 1-5 / IGCSE)</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-sky-500 rounded-full"></div>SPM & IGCSE Prep</li>
                <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-sky-500 rounded-full"></div>Essay Writing Structures</li>
                <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-sky-500 rounded-full"></div>Literature Components</li>
                <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-sky-500 rounded-full"></div>Advanced Grammar Logic</li>
              </ul>
            </div>

            {/* Adults */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-b-8 border-purple-400 hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 mx-auto">
                <Brain size={32} />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Global Speakers</h3>
              <p className="text-gray-500 text-center text-sm mb-6 uppercase tracking-wider font-bold">Adults & University</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-purple-400 rounded-full"></div>IELTS / PTE / MUET</li>
                <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-purple-400 rounded-full"></div>Business Communication</li>
                <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-purple-400 rounded-full"></div>Conversation Skills</li>
                <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-purple-400 rounded-full"></div>Resume & Interview Prep</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tables */}
      <section id="pricing" className="py-20 bg-sky-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{currentText.pricing.title}</h2>
            <p className="text-sky-200 text-lg">Invest in your future with affordable rates.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-gray-800">
            {/* Group Class */}
            <div className="bg-white rounded-2xl p-8 hover:bg-gray-50 transition">
              <h3 className="text-xl font-bold text-gray-500 mb-2">{currentText.pricing.group}</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">RM 120<span className="text-lg font-normal text-gray-500">/mo</span></div>
              <p className="text-sm text-gray-500 mb-6">{currentText.pricing.groupDesc}</p>
              <button onClick={() => window.open(whatsAppLink, '_blank')} className="w-full border-2 border-sky-600 text-sky-600 font-bold py-3 rounded-lg hover:bg-sky-50 transition mb-6">{currentText.pricing.inquire}</button>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Max 5 students</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> 4 Classes per month</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> 1.5 Hours per class</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Group activities</li>
              </ul>
            </div>

            {/* 1-on-1 Standard */}
            <div className="bg-white rounded-2xl p-8 transform md:scale-105 shadow-2xl relative border-4 border-yellow-400">
              <div className="absolute top-0 inset-x-0 -mt-3 flex justify-center">
                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Most Recommended</span>
              </div>
              <h3 className="text-xl font-bold text-sky-600 mb-2 whitespace-nowrap tracking-tight">{currentText.pricing.personal}</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">RM 50<span className="text-lg font-normal text-gray-500">/hr</span></div>
              <p className="text-sm text-gray-500 mb-6">{currentText.pricing.personalDesc}</p>
              <button onClick={() => window.open(whatsAppLink, '_blank')} className="w-full bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 transition mb-6">{currentText.pricing.book}</button>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> 100% Personal attention</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Flexible scheduling</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Customized materials</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Detailed progress reports</li>
              </ul>
            </div>

            {/* Intensive */}
            <div className="bg-white rounded-2xl p-8 hover:bg-gray-50 transition">
              <h3 className="text-xl font-bold text-purple-500 mb-2">{currentText.pricing.crash}</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">RM 600<span className="text-lg font-normal text-gray-500">/pack</span></div>
              <p className="text-sm text-gray-500 mb-6">{currentText.pricing.crashDesc}</p>
              <button onClick={() => window.open(whatsAppLink, '_blank')} className="w-full border-2 border-purple-500 text-purple-600 font-bold py-3 rounded-lg hover:bg-purple-50 transition mb-6">{currentText.pricing.inquire}</button>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> 100% Personal attention</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> 10 Hours Intensive</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Past Year Paper Drills</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Answering Techniques</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-sky-300 text-sm mt-8 opacity-75">* Prices are estimates and subject to discussion based on level and location.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-yellow-50 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Star size={40} className="text-yellow-400 mx-auto mb-6 fill-current" />
          <h2 className="text-3xl font-bold mb-12">Student Success Stories</h2>

          <div className="relative h-48">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 flex flex-col items-center justify-center ${i === activeTestimonial ? 'opacity-100' : 'opacity-0'}`}
              >
                <p className="text-xl md:text-2xl font-light italic text-gray-700 mb-6">"{t.text}"</p>
                <div>
                  <div className="font-bold text-gray-900">{t.author}</div>
                  <div className="text-sm text-gray-500">{t.grade}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-3 h-3 rounded-full transition ${i === activeTestimonial ? 'bg-yellow-400' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
                <BookOpen className="text-sky-500" /> Teacher Nicole
              </div>
              <p className="text-sm">Empowering students in Sandakan and Online to achieve their language goals with confidence and creativity.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Phone size={16} /> +60-1133-8484-12</li>
                <li className="flex items-center gap-2"><Mail size={16} /> nicoleliew70@gmail.com</li>
                <li className="flex items-center gap-2"><MapPin size={16} /> Sandakan, Sabah (and Online)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-sky-400">About</a></li>
                <li><a href="#classes" className="hover:text-sky-400">Classes</a></li>
                <li><a href="#pricing" className="hover:text-sky-400">Pricing</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs">
            © {new Date().getFullYear()} Nicole Liew Sing Vei. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsAppLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 transition transform hover:scale-110 flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
};

export default App;