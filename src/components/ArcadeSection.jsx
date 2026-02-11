import { useState, lazy, Suspense } from 'react';
import { Trophy, Sparkles, Shuffle, AlignLeft, Volume2, Shield } from 'lucide-react';

const QuizGame = lazy(() => import('./QuizGame'));
const StoryGenerator = lazy(() => import('./StoryGenerator'));
const WordScramble = lazy(() => import('./WordScramble'));
const SentenceBuilder = lazy(() => import('./SentenceBuilder'));
const SpellingBee = lazy(() => import('./SpellingBee'));
const GrammarPolice = lazy(() => import('./GrammarPolice'));

const games = [
  { key: 'quiz', icon: Trophy, color: 'sky', desc: 'Test your knowledge' },
  { key: 'story', icon: Sparkles, color: 'purple', desc: 'AI-powered tales' },
  { key: 'scramble', icon: Shuffle, color: 'indigo', desc: 'Unscramble words' },
  { key: 'sentence', icon: AlignLeft, color: 'teal', desc: 'Build sentences' },
  { key: 'spelling', icon: Volume2, color: 'amber', desc: 'Listen & spell' },
  { key: 'grammar', icon: Shield, color: 'red', desc: 'Find the error' },
];

const colorMap = {
  sky:    { card: 'border-sky-400 bg-sky-500/20 ring-2 ring-sky-400', icon: 'bg-sky-500 text-white', idle: 'border-indigo-700/50 hover:border-sky-400/60 hover:bg-sky-500/10', idleIcon: 'bg-indigo-800 text-sky-300' },
  purple: { card: 'border-purple-400 bg-purple-500/20 ring-2 ring-purple-400', icon: 'bg-purple-500 text-white', idle: 'border-indigo-700/50 hover:border-purple-400/60 hover:bg-purple-500/10', idleIcon: 'bg-indigo-800 text-purple-300' },
  indigo: { card: 'border-indigo-400 bg-indigo-500/20 ring-2 ring-indigo-400', icon: 'bg-indigo-500 text-white', idle: 'border-indigo-700/50 hover:border-indigo-400/60 hover:bg-indigo-500/10', idleIcon: 'bg-indigo-800 text-indigo-300' },
  teal:   { card: 'border-teal-400 bg-teal-500/20 ring-2 ring-teal-400', icon: 'bg-teal-500 text-white', idle: 'border-indigo-700/50 hover:border-teal-400/60 hover:bg-teal-500/10', idleIcon: 'bg-indigo-800 text-teal-300' },
  amber:  { card: 'border-amber-400 bg-amber-500/20 ring-2 ring-amber-400', icon: 'bg-amber-500 text-white', idle: 'border-indigo-700/50 hover:border-amber-400/60 hover:bg-amber-500/10', idleIcon: 'bg-indigo-800 text-amber-300' },
  red:    { card: 'border-red-400 bg-red-500/20 ring-2 ring-red-400', icon: 'bg-red-500 text-white', idle: 'border-indigo-700/50 hover:border-red-400/60 hover:bg-red-500/10', idleIcon: 'bg-indigo-800 text-red-300' },
};

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
    <p className="text-gray-400 text-sm">Loading game...</p>
  </div>
);

const ArcadeSection = ({ currentText, lang, whatsAppLink }) => {
  const [gameMode, setGameMode] = useState('quiz');

  const labels = {
    quiz: currentText.arcade.modeQuiz,
    story: currentText.arcade.modeStory,
    scramble: currentText.arcade.modeScramble,
    sentence: currentText.arcade.modeSentence,
    spelling: currentText.arcade.modeSpelling,
    grammar: currentText.arcade.modeGrammar,
  };

  return (
    <section id="arcade" className="py-20 bg-indigo-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-800 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-900 rounded-full opacity-50 blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block bg-yellow-400 text-indigo-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">{currentText.arcade.title}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{currentText.arcade.subtitle}</h2>

          {/* Game Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {games.map((game) => {
              const isActive = gameMode === game.key;
              const colors = colorMap[game.color];
              const Icon = game.icon;
              return (
                <button
                  key={game.key}
                  onClick={() => setGameMode(game.key)}
                  className={`relative p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 text-left group ${
                    isActive ? colors.card : colors.idle
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-200 ${
                    isActive ? colors.icon : colors.idleIcon
                  } ${!isActive ? 'group-hover:scale-110' : ''}`}>
                    <Icon size={20} />
                  </div>
                  <p className={`font-bold text-sm md:text-base leading-tight ${isActive ? 'text-white' : 'text-indigo-100'}`}>
                    {labels[game.key]}
                  </p>
                  <p className={`text-xs mt-1 ${isActive ? 'text-white/70' : 'text-indigo-400'}`}>
                    {game.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white text-gray-900 rounded-3xl shadow-2xl p-6 md:p-10 min-h-[400px] flex flex-col justify-center items-center text-center transition-all duration-300">
          <Suspense fallback={<LoadingSpinner />}>
            {gameMode === 'quiz' && <QuizGame lang={lang} whatsAppLink={whatsAppLink} />}
            {gameMode === 'story' && (
              <div className="w-full max-w-lg animate-fadeIn text-left">
                <StoryGenerator currentText={currentText} />
              </div>
            )}
            {gameMode === 'scramble' && <WordScramble lang={lang} whatsAppLink={whatsAppLink} />}
            {gameMode === 'sentence' && <SentenceBuilder lang={lang} whatsAppLink={whatsAppLink} />}
            {gameMode === 'spelling' && <SpellingBee lang={lang} whatsAppLink={whatsAppLink} />}
            {gameMode === 'grammar' && <GrammarPolice lang={lang} whatsAppLink={whatsAppLink} />}
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default ArcadeSection;
