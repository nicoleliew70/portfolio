import { useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleHelp,
  MessageCircle,
  MoveRight,
  PenLine,
  Sparkles,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';
import { trackEvent, trackWhatsAppClick } from '../utils/analytics';
import settings from '../data/settings.json';
import './ChinesePage.css';

const copy = {
  en: {
    nav: { programmes: 'Programmes', process: 'How it works', pricing: 'Fees', faq: 'FAQ' },
    hero: {
      eyebrow: 'Mandarin learning with Teacher Nicole',
      title: 'Mandarin Learning Made',
      titleHighlight: 'Clear & Practical',
      lead: 'A calm, practical space to explore words, sounds, reading and writing—with a learning plan shaped around your starting point.',
      primary: 'Ask about Mandarin lessons',
      secondary: 'Explore programmes',
      note: 'For children, teens and adults who want a clearer place to begin.',
    },
    programmes: {
      eyebrow: 'Choose a starting point', title: 'Learning that meets you where you are.',
      lead: 'Start with the part of Mandarin that feels most useful right now. Lesson focus and pacing can be discussed before you begin.',
      cards: [
        ['Foundations', 'For learners beginning with sounds, everyday words and simple sentence patterns.', ['Pinyin and tones', 'Useful vocabulary', 'Short, supported phrases']],
        ['Reading & writing', 'For learners who want a clearer route into recognising and using Chinese characters.', ['Character awareness', 'Reading practice', 'Guided writing practice']],
        ['Everyday communication', 'For learners who want more confidence using Mandarin in familiar situations.', ['Listening and speaking', 'Topic-based language', 'Practical language use']],
      ],
    },
    approach: {
      eyebrow: 'A gentler way in', title: 'Make the pattern visible, then practise it.',
      lead: 'Mandarin can feel like many new pieces at once. Breaking a lesson into sound, meaning, character and use gives each piece a place to land.',
      steps: [['Listen', 'Notice the sound and tone before rushing to memorise.'], ['Connect', 'Pair a word with its meaning, character and a useful context.'], ['Use', 'Try it in a small phrase, then return to it often.']],
    },
    playground: {
      eyebrow: 'Try a tiny practice', title: 'Match the pinyin to the character.',
      lead: 'The pinyin prompt is shown above. Choose its matching character to notice how tones change meaning.',
      prompt: 'Choose the matching character for', instruction: 'Choose one character to make your first match.', correct: 'Nice work — that is a match.', retry: 'Not quite. Try a different character.', meaning: 'Meaning:', next: 'Next word', reset: 'Try again', score: 'Matches', gameLabel: 'Mandarin pinyin and character matching practice', optionsLabel: 'Character choices for', characterLabel: 'Character',
    },
    process: {
      eyebrow: 'Getting started', title: 'A simple route from question to first lesson.',
      steps: [['1', 'Tell me your goal', 'Share who is learning and what you would like Mandarin to help with.'], ['2', 'Talk through a fit', 'Use WhatsApp to discuss a suitable focus, format and next step.'], ['3', 'Begin with a clear focus', 'Start with an agreed lesson focus and build from there.']],
    },
    pricing: {
      eyebrow: 'Fees and format', title: 'Discuss the right lesson arrangement first.',
      lead: 'Mandarin lesson fees are arranged after discussing the learner’s level, goals and preferred format. Send a WhatsApp message for current details.',
      points: ['Discuss a suitable learning focus', 'Ask about format and scheduling', 'Get current fee information directly'], cta: 'Ask about fees', note: 'No Mandarin fee schedule is published on this page.',
    },
    faq: {
      eyebrow: 'Questions, answered', title: 'A few useful things to know.',
      items: [
        ['Who is this for?', 'This page is designed for children, teens and adults who would like to discuss Mandarin learning with Teacher Nicole.'],
        ['Do I need to know Mandarin already?', 'No. Your current starting point can be part of the conversation before lessons begin.'],
        ['Can I ask about a specific goal?', 'Yes. Share the goal—such as getting started, reading, writing or everyday communication—when you get in touch.'],
        ['How do I find out about availability and fees?', 'Send a WhatsApp message. Lesson arrangements, availability and current fees can be discussed directly.'],
      ],
    },
    contact: { eyebrow: 'Ready when you are', title: 'Start with a simple hello.', lead: 'Tell Teacher Nicole who is learning Mandarin and what you would like to work on. A short message is enough to begin the conversation.', cta: 'Message on WhatsApp', email: 'Or email directly' },
  },
  zh: {
    nav: { programmes: '课程方向', process: '学习流程', pricing: '收费咨询', faq: '常见问题' },
    hero: {
      eyebrow: 'Nicole 老师的华语学习空间',
      title: '把华语学习变得',
      titleHighlight: '清楚又踏实',
      lead: '从发音、词语、阅读到书写，用适合你起点的学习方向，慢慢建立更踏实的华语基础。',
      primary: '咨询华语课程', secondary: '查看课程方向', note: '适合想从更清楚的起点开始的儿童、青少年与成人。',
    },
    programmes: {
      eyebrow: '选择你的起点', title: '从你现在最需要的部分开始。',
      lead: '先从当下最实用的华语内容开始。正式学习前，可以先讨论学习重点与节奏。',
      cards: [
        ['基础入门', '适合想从发音、日常词语与简单句型开始的学习者。', ['拼音与声调', '实用词汇', '短句练习']],
        ['阅读与书写', '适合想更有条理地认识与使用汉字的学习者。', ['汉字认识', '阅读练习', '引导式书写练习']],
        ['日常沟通', '适合希望在熟悉情境中更自在使用华语的学习者。', ['听说练习', '主题式语言', '实用表达']],
      ],
    },
    approach: {
      eyebrow: '用更轻松的方法进入华语', title: '先看懂规律，再慢慢练习。',
      lead: '华语里有许多新的声音、意思与字形。把它们分成小部分学习，每一部分都会更容易安放。',
      steps: [['听一听', '先留意声音和声调，不急着一下子全记住。'], ['连起来', '把词语、意思、汉字和使用情境连在一起。'], ['用一用', '先在短句里试用，再经常回顾。']],
    },
    playground: {
      eyebrow: '小小练习时间', title: '把拼音和汉字配一配。',
      lead: '上方会显示拼音提示；请选择相配的汉字，留意声调如何改变意思。',
      prompt: '请选择相配的汉字：', instruction: '请选择一个汉字，完成第一题配对。', correct: '答对了，配得很好！', retry: '还差一点。换一个汉字再试一次。', meaning: '意思：', next: '下一题', reset: '再玩一次', score: '答对', gameLabel: '拼音和汉字配对练习', optionsLabel: '以下拼音的汉字选项：', characterLabel: '汉字',
    },
    process: {
      eyebrow: '开始学习', title: '从咨询到第一堂课，简单三步。',
      steps: [['1', '告诉我你的目标', '分享学习者是谁，以及希望华语能带来什么帮助。'], ['2', '一起看看是否合适', '通过 WhatsApp 讨论适合的方向、形式与下一步。'], ['3', '从清楚的重点开始', '先确定学习重点，再一步一步累积。']],
    },
    pricing: {
      eyebrow: '收费与安排', title: '先了解学习需要，再讨论合适的课程安排。',
      lead: '华语课程收费会根据学习者的程度、目标和偏好的上课形式再作讨论。欢迎通过 WhatsApp 询问最新详情。',
      points: ['讨论合适的学习方向', '询问课程形式与时间安排', '直接了解最新收费资料'], cta: '咨询收费', note: '本页暂未列出华语课程的固定收费表。',
    },
    faq: {
      eyebrow: '常见问题', title: '开始前，你可能想知道这些。',
      items: [
        ['适合哪些学习者？', '这个页面适合想与 Nicole 老师讨论华语学习的儿童、青少年和成人。'],
        ['完全没有华语基础也可以吗？', '可以。上课前可以先聊聊你目前的起点。'],
        ['可以针对特定目标咨询吗？', '可以。欢迎说明你的目标，例如入门、阅读、书写或日常沟通。'],
        ['怎样了解时间与收费？', '通过 WhatsApp 留言即可。课程安排、名额和最新收费都可以直接讨论。'],
      ],
    },
    contact: { eyebrow: '准备好了就开始', title: '先打个招呼吧。', lead: '告诉 Nicole 老师谁想学习华语，以及你希望加强什么。简单的一则讯息，就能开始讨论。', cta: 'WhatsApp 联系 Nicole 老师', email: '或直接发送电邮' },
  },
  ms: {
    nav: { programmes: 'Program', process: 'Cara bermula', pricing: 'Yuran', faq: 'Soalan lazim' },
    hero: { eyebrow: 'Pembelajaran Mandarin bersama Cikgu Nicole', title: 'Pembelajaran Mandarin Jadi', titleHighlight: 'Jelas & Praktikal', lead: 'Ruang yang tenang dan praktikal untuk meneroka bunyi, perkataan, membaca dan menulis—mengikut titik permulaan anda.', primary: 'Tanya tentang kelas Mandarin', secondary: 'Terokai program', note: 'Untuk kanak-kanak, remaja dan dewasa yang mahukan titik mula yang lebih jelas.' },
    programmes: { eyebrow: 'Pilih titik mula', title: 'Pembelajaran yang bermula di tempat anda berada.', lead: 'Mulakan dengan bahagian Mandarin yang paling berguna untuk anda sekarang. Fokus dan rentak pembelajaran boleh dibincangkan dahulu.', cards: [['Asas', 'Untuk pelajar yang mahu bermula dengan bunyi, perkataan harian dan frasa mudah.', ['Pinyin dan nada', 'Kosa kata berguna', 'Frasa pendek']], ['Membaca & menulis', 'Untuk pelajar yang mahu laluan lebih jelas untuk mengenal dan menggunakan aksara Cina.', ['Pengenalan aksara', 'Latihan membaca', 'Latihan menulis berpandu']], ['Komunikasi harian', 'Untuk pelajar yang mahu lebih yakin menggunakan Mandarin dalam situasi biasa.', ['Latihan mendengar dan bercakap', 'Bahasa mengikut topik', 'Penggunaan bahasa praktikal']]] },
    approach: { eyebrow: 'Cara yang lebih tenang', title: 'Nampakkan pola, kemudian berlatih.', lead: 'Mandarin boleh terasa seperti banyak perkara baharu serentak. Memecahkan pelajaran kepada bunyi, makna, aksara dan penggunaan memberi setiap bahagian tempat untuk difahami.', steps: [['Dengar', 'Perhatikan bunyi dan nada sebelum cuba menghafal semuanya.'], ['Hubungkan', 'Padankan perkataan dengan makna, aksara dan konteks yang berguna.'], ['Gunakan', 'Cubanya dalam frasa pendek, kemudian kembali kepadanya dengan kerap.']] },
    playground: { eyebrow: 'Cuba latihan ringkas', title: 'Padankan pinyin dengan aksara.', lead: 'Petunjuk pinyin dipaparkan di atas. Pilih aksara yang sepadan untuk melihat bagaimana nada mengubah makna.', prompt: 'Pilih aksara yang sepadan untuk', instruction: 'Pilih satu aksara untuk padanan pertama anda.', correct: 'Bagus — itu padanan yang betul.', retry: 'Belum tepat. Cuba aksara yang lain.', meaning: 'Maksud:', next: 'Perkataan seterusnya', reset: 'Cuba lagi', score: 'Padanan', gameLabel: 'Latihan padanan pinyin dan aksara Mandarin', optionsLabel: 'Pilihan aksara untuk', characterLabel: 'Aksara' },
    process: { eyebrow: 'Cara bermula', title: 'Laluan mudah daripada soalan ke kelas pertama.', steps: [['1', 'Kongsi matlamat anda', 'Beritahu siapa yang belajar dan apa yang anda mahu Mandarin bantu.'], ['2', 'Bincang kesesuaian', 'Gunakan WhatsApp untuk membincangkan fokus, format dan langkah seterusnya.'], ['3', 'Mulakan dengan fokus jelas', 'Mulakan dengan fokus pelajaran yang dipersetujui dan bina dari situ.']] },
    pricing: { eyebrow: 'Yuran dan format', title: 'Bincangkan susunan pelajaran yang sesuai dahulu.', lead: 'Yuran kelas Mandarin ditentukan selepas membincangkan tahap, matlamat dan format pilihan pelajar. Hantar mesej WhatsApp untuk maklumat semasa.', points: ['Bincang fokus pembelajaran yang sesuai', 'Tanya tentang format dan jadual', 'Dapatkan maklumat yuran semasa secara terus'], cta: 'Tanya tentang yuran', note: 'Jadual yuran Mandarin tidak diterbitkan pada halaman ini.' },
    faq: { eyebrow: 'Soalan dijawab', title: 'Beberapa perkara yang berguna untuk diketahui.', items: [['Untuk siapa?', 'Halaman ini untuk kanak-kanak, remaja dan dewasa yang ingin berbincang tentang pembelajaran Mandarin bersama Cikgu Nicole.'], ['Perlukah saya sudah tahu Mandarin?', 'Tidak. Titik mula anda boleh dibincangkan sebelum kelas bermula.'], ['Bolehkah saya bertanya tentang matlamat khusus?', 'Ya. Kongsi matlamat seperti bermula, membaca, menulis atau komunikasi harian apabila menghubungi kami.'], ['Bagaimana untuk mengetahui kekosongan dan yuran?', 'Hantar mesej WhatsApp. Susunan pelajaran, kekosongan dan yuran semasa boleh dibincangkan terus.']] },
    contact: { eyebrow: 'Apabila anda bersedia', title: 'Mulakan dengan ucapan ringkas.', lead: 'Beritahu Cikgu Nicole siapa yang ingin belajar Mandarin dan apa yang anda mahu usahakan. Mesej ringkas sudah cukup untuk memulakan perbualan.', cta: 'Mesej di WhatsApp', email: 'Atau e-mel terus' },
  },
};

const navigationFor = (t) => [
  { href: '#mandarin-programmes', label: t.nav.programmes },
  { href: '#mandarin-process', label: t.nav.process },
  { href: '#mandarin-pricing', label: t.nav.pricing },
  { href: '#mandarin-faq', label: t.nav.faq },
];

const toneRounds = [
  { pinyin: 'mā', character: '妈', meaning: { en: 'mother', zh: '妈妈', ms: 'ibu' } },
  { pinyin: 'má', character: '麻', meaning: { en: 'hemp / numb', zh: '麻 / 麻木', ms: 'rami / kebas' } },
  { pinyin: 'mǎ', character: '马', meaning: { en: 'horse', zh: '马', ms: 'kuda' } },
  { pinyin: 'mà', character: '骂', meaning: { en: 'to scold', zh: '责骂', ms: 'memarahi' } },
];

const SectionHeading = ({ eyebrow, title, lead, centered = true, id }) => (
  <div className={`mandarin-section-heading ${centered ? 'mandarin-section-heading--centered' : ''}`}>
    <p className="mandarin-eyebrow"><Sparkles size={15} aria-hidden="true" /> {eyebrow}</p>
    <h2 id={id}>{title}</h2>
    {lead && <p className="mandarin-lead">{lead}</p>}
  </div>
);

const Reveal = ({ children, className = '' }) => {
  const { ref, isVisible } = useScrollReveal();
  return <div ref={ref} className={`scroll-reveal ${isVisible ? 'visible' : ''} ${className}`}>{children}</div>;
};

const MandarinPlayground = ({ t, lang }) => {
  const [round, setRound] = useState(0);
  const [correctChoice, setCorrectChoice] = useState(null);
  const [incorrectChoices, setIncorrectChoices] = useState([]);
  const [status, setStatus] = useState('');
  const [matches, setMatches] = useState(0);
  const current = toneRounds[round];
  const options = toneRounds;

  const choose = (character) => {
    if (correctChoice || incorrectChoices.includes(character)) return;
    const isCorrect = character === current.character;
    setStatus(isCorrect ? 'correct' : 'retry');
    if (isCorrect) {
      setCorrectChoice(character);
      setMatches((score) => score + 1);
    } else {
      setIncorrectChoices((choices) => [...choices, character]);
    }
    trackEvent('mandarin_practice_answer', { result: isCorrect ? 'correct' : 'incorrect', round: round + 1 });
  };

  const advance = () => {
    if (round === toneRounds.length - 1) {
      setRound(0);
      setMatches(0);
    } else {
      setRound((value) => value + 1);
    }
    setCorrectChoice(null);
    setIncorrectChoices([]);
    setStatus('');
  };

  return (
    <div className="mandarin-game" aria-label={t.playground.gameLabel}>
      <div className="mandarin-game-topline">
        <span>{t.playground.prompt}</span>
        <span className="mandarin-score">{t.playground.score}: {matches}/{toneRounds.length}</span>
      </div>
      <div className="mandarin-pinyin" aria-live="polite">
        <strong>{current.pinyin}</strong>
        {status === 'correct' && <span className="mandarin-word-meaning">{t.playground.meaning} {current.meaning[lang]}</span>}
      </div>
      <div className="mandarin-character-options" role="group" aria-label={`${t.playground.optionsLabel} ${current.pinyin}`}>
        {options.map((option) => {
          const isCorrect = correctChoice === option.character;
          const isIncorrect = incorrectChoices.includes(option.character);
          return <button key={option.character} type="button" onClick={() => choose(option.character)} disabled={Boolean(correctChoice) || isIncorrect} aria-label={`${t.playground.characterLabel}: ${option.character}`} className={`mandarin-character-button ${isCorrect ? 'is-correct' : ''} ${isIncorrect ? 'is-wrong' : ''}`}><span lang="zh-CN">{option.character}</span></button>;
        })}
      </div>
      <p className={`mandarin-game-feedback ${status ? `is-${status}` : ''}`} role="status">{status === 'correct' ? t.playground.correct : status === 'retry' ? t.playground.retry : t.playground.instruction}</p>
      {status === 'correct' && <button type="button" onClick={advance} className="mandarin-text-button">{round === toneRounds.length - 1 ? t.playground.reset : t.playground.next} <ArrowRight size={17} aria-hidden="true" /></button>}
    </div>
  );
};

const ChinesePage = ({ lang, setLang, currentText, whatsAppLink }) => {
  const [openFaq, setOpenFaq] = useState(0);
  const t = copy[lang] || copy.en;
  const navigationItems = navigationFor(t);
  const whatsapp = (location) => () => trackWhatsAppClick(location);

  return (
    <div className="mandarin-page min-h-screen selection:bg-yellow-200" data-site-language={lang} data-service="chinese">
      <Navbar lang={lang} setLang={setLang} currentText={currentText} whatsAppLink={whatsAppLink} navigationItems={navigationItems} />
      <main>
        <section id="mandarin-hero" className="mandarin-hero" aria-labelledby="mandarin-page-title">
          <div className="mandarin-hero-shape mandarin-hero-shape--one animate-blob" aria-hidden="true" />
          <div className="mandarin-hero-shape mandarin-hero-shape--two animate-blob animation-delay-2000" aria-hidden="true" />
          <Reveal className="mandarin-container mandarin-hero-content">
            <p className="mandarin-hero-badge animate-bounce">{t.hero.eyebrow}</p>
            <h1 id="mandarin-page-title">{t.hero.title} <span>{t.hero.titleHighlight}</span></h1>
            <p className="mandarin-hero-lead">{t.hero.lead}</p>
            <div className="mandarin-hero-actions">
              <a href={whatsAppLink} target="_blank" rel="noreferrer" onClick={whatsapp('mandarin_hero')} className="mandarin-button mandarin-button--primary"><MessageCircle size={19} aria-hidden="true" />{t.hero.primary}</a>
              <a href="#mandarin-programmes" className="mandarin-button mandarin-button--secondary">{t.hero.secondary}<MoveRight size={19} aria-hidden="true" /></a>
            </div>
            <p className="mandarin-hero-note"><Check size={16} aria-hidden="true" /> {t.hero.note}</p>
          </Reveal>
        </section>

        <section id="mandarin-programmes" className="mandarin-section mandarin-section--paper" aria-labelledby="mandarin-programmes-title">
          <Reveal className="mandarin-container">
            <SectionHeading {...t.programmes} id="mandarin-programmes-title" />
            <div className="mandarin-programme-grid">
              {t.programmes.cards.map(([title, description, points], index) => <article className="mandarin-programme-card" key={title}>
                <span className="mandarin-card-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p><ul>{points.map((point) => <li key={point}><Check size={16} aria-hidden="true" />{point}</li>)}</ul>
              </article>)}
            </div>
          </Reveal>
        </section>

        <section id="mandarin-approach" className="mandarin-section mandarin-section--sky" aria-labelledby="mandarin-approach-title">
          <Reveal className="mandarin-container mandarin-approach-layout">
            <SectionHeading {...t.approach} centered={false} id="mandarin-approach-title" />
            <ol className="mandarin-approach-steps">{t.approach.steps.map(([title, description], index) => <li key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
          </Reveal>
        </section>

        <section id="mandarin-playground" className="mandarin-section mandarin-section--yellow" aria-labelledby="mandarin-playground-title">
          <Reveal className="mandarin-container mandarin-playground-layout">
            <SectionHeading {...t.playground} centered={false} id="mandarin-playground-title" />
            <MandarinPlayground t={t} lang={lang} />
          </Reveal>
        </section>

        <section id="mandarin-process" className="mandarin-section mandarin-section--paper" aria-labelledby="mandarin-process-title">
          <Reveal className="mandarin-container">
            <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} id="mandarin-process-title" />
            <div className="mandarin-process-grid">{t.process.steps.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
          </Reveal>
        </section>

        <section id="mandarin-pricing" className="mandarin-section mandarin-section--ink" aria-labelledby="mandarin-pricing-title">
          <Reveal className="mandarin-container mandarin-pricing-layout">
            <SectionHeading {...t.pricing} centered={false} id="mandarin-pricing-title" />
            <div className="mandarin-pricing-card"><PenLine size={25} aria-hidden="true" /><ul>{t.pricing.points.map((point) => <li key={point}><Check size={17} aria-hidden="true" /> {point}</li>)}</ul><a href={whatsAppLink} target="_blank" rel="noreferrer" onClick={whatsapp('mandarin_pricing')} className="mandarin-button mandarin-button--yellow">{t.pricing.cta}<ArrowRight size={18} aria-hidden="true" /></a><p>{t.pricing.note}</p></div>
          </Reveal>
        </section>

        <section id="mandarin-faq" className="mandarin-section mandarin-section--paper" aria-labelledby="mandarin-faq-title">
          <Reveal className="mandarin-container mandarin-faq-container">
            <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} id="mandarin-faq-title" />
            <div className="mandarin-faq-list">{t.faq.items.map(([question, answer], index) => {
              const isOpen = openFaq === index;
              return <article className="mandarin-faq-item" key={question}><h3><button type="button" aria-expanded={isOpen} aria-controls={`mandarin-faq-answer-${index}`} id={`mandarin-faq-question-${index}`} onClick={() => setOpenFaq(isOpen ? -1 : index)}>{question}<ChevronDown size={21} aria-hidden="true" /></button></h3><div id={`mandarin-faq-answer-${index}`} role="region" aria-labelledby={`mandarin-faq-question-${index}`} hidden={!isOpen}><p>{answer}</p></div></article>;
            })}</div>
          </Reveal>
        </section>

        <section id="mandarin-contact" className="mandarin-contact" aria-labelledby="mandarin-contact-title">
          <Reveal className="mandarin-container mandarin-contact-content">
            <p className="mandarin-eyebrow"><CircleHelp size={16} aria-hidden="true" /> {t.contact.eyebrow}</p><h2 id="mandarin-contact-title">{t.contact.title}</h2><p>{t.contact.lead}</p>
            <div className="mandarin-contact-actions"><a href={whatsAppLink} target="_blank" rel="noreferrer" onClick={whatsapp('mandarin_contact')} className="mandarin-button mandarin-button--primary"><MessageCircle size={19} aria-hidden="true" />{t.contact.cta}</a><a href={`mailto:${settings.email}`} className="mandarin-email-link">{t.contact.email} <ArrowRight size={16} aria-hidden="true" /></a></div>
          </Reveal>
        </section>
      </main>
      <Footer currentText={currentText} lang={lang} whatsAppLink={whatsAppLink} navigationItems={navigationItems} />
    </div>
  );
};

export default ChinesePage;
