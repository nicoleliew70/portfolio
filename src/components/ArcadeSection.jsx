import { useState } from 'react';
import { Trophy, Sparkles, Shuffle, AlignLeft, Volume2, Shield } from 'lucide-react';
import QuizGame from './QuizGame';
import StoryGenerator from './StoryGenerator';
import WordScramble from './WordScramble';
import SentenceBuilder from './SentenceBuilder';
import SpellingBee from './SpellingBee';
import GrammarPolice from './GrammarPolice';

const ArcadeSection = ({ currentText, lang, whatsAppLink }) => {
  const [gameMode, setGameMode] = useState('quiz');

  const games = [
    { key: 'quiz', label: currentText.arcade.modeQuiz, icon: Trophy, activeColor: 'bg-sky-500 text-white' },
    { key: 'story', label: currentText.arcade.modeStory, icon: Sparkles, activeColor: 'bg-purple-500 text-white' },
    { key: 'scramble', label: currentText.arcade.modeScramble, icon: Shuffle, activeColor: 'bg-indigo-500 text-white' },
    { key: 'sentence', label: currentText.arcade.modeSentence, icon: AlignLeft, activeColor: 'bg-teal-500 text-white' },
    { key: 'spelling', label: currentText.arcade.modeSpelling, icon: Volume2, activeColor: 'bg-amber-500 text-white' },
    { key: 'grammar', label: currentText.arcade.modeGrammar, icon: Shield, activeColor: 'bg-red-500 text-white' },
  ];

  return (
    <section id="arcade" className="py-20 bg-indigo-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-800 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-900 rounded-full opacity-50 blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block bg-yellow-400 text-indigo-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">{currentText.arcade.title}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{currentText.arcade.subtitle}</h2>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {games.map((game) => (
              <button
                key={game.key}
                onClick={() => setGameMode(game.key)}
                className={`px-4 py-2 rounded-full font-bold text-sm transition flex items-center gap-2 ${gameMode === game.key ? game.activeColor : 'bg-indigo-800 text-indigo-300 hover:bg-indigo-700'}`}
              >
                <game.icon size={16} /> {game.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white text-gray-900 rounded-3xl shadow-2xl p-6 md:p-10 min-h-[400px] flex flex-col justify-center items-center text-center transition-all duration-300">
          {gameMode === 'quiz' && (
            <QuizGame lang={lang} whatsAppLink={whatsAppLink} />
          )}
          {gameMode === 'story' && (
            <div className="w-full max-w-lg animate-fadeIn text-left">
              <StoryGenerator currentText={currentText} />
            </div>
          )}
          {gameMode === 'scramble' && (
            <WordScramble lang={lang} whatsAppLink={whatsAppLink} />
          )}
          {gameMode === 'sentence' && (
            <SentenceBuilder lang={lang} whatsAppLink={whatsAppLink} />
          )}
          {gameMode === 'spelling' && (
            <SpellingBee lang={lang} whatsAppLink={whatsAppLink} />
          )}
          {gameMode === 'grammar' && (
            <GrammarPolice lang={lang} whatsAppLink={whatsAppLink} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ArcadeSection;
