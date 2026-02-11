import { useState } from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import QuizGame from './QuizGame';
import StoryGenerator from './StoryGenerator';

const ArcadeSection = ({ currentText, lang, whatsAppLink }) => {
  const [gameMode, setGameMode] = useState('quiz');

  return (
    <section id="arcade" className="py-20 bg-indigo-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-800 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-900 rounded-full opacity-50 blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block bg-yellow-400 text-indigo-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">{currentText.arcade.title}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{currentText.arcade.subtitle}</h2>

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
          {gameMode === 'quiz' && (
            <QuizGame lang={lang} whatsAppLink={whatsAppLink} />
          )}
          {gameMode === 'story' && (
            <div className="w-full max-w-lg animate-fadeIn text-left">
              <StoryGenerator currentText={currentText} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArcadeSection;
