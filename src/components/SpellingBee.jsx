import { useState, useCallback } from 'react';
import { Smile, PenTool, Brain, Trophy, RefreshCw, ArrowRight, X, Volume2 } from 'lucide-react';
import spellingBeeData from '../data/spellingBeeData';
import { trackGameStart, trackGameComplete } from '../utils/analytics';

const ROUNDS = 5;

const SpellingBee = ({ lang, whatsAppLink }) => {
  const [level, setLevel] = useState(null);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [words, setWords] = useState([]);
  const [speechSupported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window);

  const pickWords = useCallback((lvl) => {
    const pool = [...spellingBeeData[lvl]];
    const picked = [];
    for (let i = 0; i < ROUNDS; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(idx, 1)[0]);
    }
    return picked;
  }, []);

  const handleLevelSelect = (lvl) => {
    const picked = pickWords(lvl);
    setLevel(lvl);
    setWords(picked);
    setRound(0);
    setScore(0);
    setShowScore(false);
    setGuess('');
    setFeedback(null);
    trackGameStart('spelling_bee', lvl);
  };

  const speak = (text) => {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guess.trim() || feedback) return;
    const correct = guess.trim().toLowerCase() === words[round].word.toLowerCase();
    if (correct) setScore((s) => s + 1);
    setFeedback(correct ? 'correct' : 'wrong');
    setTimeout(() => nextRound(), 2000);
  };

  const nextRound = () => {
    const next = round + 1;
    if (next >= ROUNDS) {
      setShowScore(true);
      trackGameComplete('spelling_bee', score, ROUNDS);
    } else {
      setRound(next);
      setGuess('');
      setFeedback(null);
    }
  };

  const reset = () => {
    setLevel(null);
    setScore(0);
    setShowScore(false);
  };

  if (!level) {
    return (
      <div className="w-full animate-fadeIn">
        <h3 className="text-2xl font-bold mb-8 text-gray-800">
          {lang === 'zh' ? '选择你的级别' : lang === 'ms' ? 'Pilih Tahap Anda' : 'Select Your Level'}
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <button onClick={() => handleLevelSelect('primary')} className="group p-6 rounded-2xl border-2 border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50 transition flex flex-col items-center">
            <div className="bg-yellow-100 p-4 rounded-full mb-4 group-hover:scale-110 transition"><Smile size={32} className="text-yellow-600" /></div>
            <span className="font-bold text-lg">Primary</span>
          </button>
          <button onClick={() => handleLevelSelect('secondary')} className="group p-6 rounded-2xl border-2 border-sky-200 hover:border-sky-400 hover:bg-sky-50 transition flex flex-col items-center">
            <div className="bg-sky-100 p-4 rounded-full mb-4 group-hover:scale-110 transition"><PenTool size={32} className="text-sky-600" /></div>
            <span className="font-bold text-lg">Secondary</span>
          </button>
          <button onClick={() => handleLevelSelect('adult')} className="group p-6 rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition flex flex-col items-center">
            <div className="bg-purple-100 p-4 rounded-full mb-4 group-hover:scale-110 transition"><Brain size={32} className="text-purple-600" /></div>
            <span className="font-bold text-lg">Adult</span>
          </button>
        </div>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="animate-fadeIn w-full max-w-lg">
        <Trophy size={64} className="text-yellow-500 mx-auto mb-4 animate-bounce" />
        <h3 className="text-3xl font-bold mb-2">
          {score >= 4 ? "Spelling Star!" : score >= 3 ? "Great Job!" : "Keep Practicing!"}
        </h3>
        <p className="text-gray-600 mb-6">You scored <span className="font-bold text-indigo-600 text-xl">{score}/{ROUNDS}</span></p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={whatsAppLink} target="_blank" rel="noreferrer" className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2">
            Join a Class <ArrowRight size={18} />
          </a>
          <button onClick={reset} className="text-gray-500 hover:text-gray-700 font-medium flex items-center justify-center gap-2">
            <RefreshCw size={18} /> Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">Round {round + 1}/{ROUNDS}</span>
        <button onClick={reset} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
      </div>

      <div className="bg-amber-50 rounded-2xl p-6 mb-6 text-center">
        <button
          onClick={() => speak(words[round].word)}
          disabled={!speechSupported}
          className="bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full mx-auto mb-4 transition transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Volume2 size={32} />
        </button>
        <p className="text-sm text-amber-700 font-medium mb-2">
          {speechSupported ? 'Tap to hear the word' : 'Audio not supported in your browser'}
        </p>
        <p className="text-gray-600 italic">&ldquo;{words[round].hint}&rdquo;</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Spell the word..."
          className={`w-full border-2 rounded-lg p-3 text-lg text-center font-semibold focus:outline-none transition ${
            feedback === 'correct' ? 'border-green-500 bg-green-50 text-green-700' :
            feedback === 'wrong' ? 'border-red-500 bg-red-50 text-red-700' :
            'border-gray-200 focus:border-amber-500'
          }`}
          disabled={!!feedback}
          autoFocus
        />
        {feedback === 'correct' && (
          <p className="text-green-600 text-sm mt-2 font-medium text-center">Correct!</p>
        )}
        {feedback === 'wrong' && (
          <p className="text-red-500 text-sm mt-2 font-medium text-center">The correct spelling is: <strong>{words[round].word}</strong></p>
        )}
        {!feedback && (
          <button type="submit" disabled={!guess.trim()} className="w-full bg-amber-500 text-white font-bold py-3 rounded-lg hover:bg-amber-600 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4">
            Check Spelling
          </button>
        )}
      </form>
    </div>
  );
};

export default SpellingBee;
