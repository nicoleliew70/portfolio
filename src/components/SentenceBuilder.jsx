import { useState, useCallback } from 'react';
import { Smile, PenTool, Brain, Trophy, RefreshCw, ArrowRight, X, Check, RotateCcw } from 'lucide-react';
import sentenceBuilderData from '../data/sentenceBuilderData';
import { trackGameStart, trackGameComplete } from '../utils/analytics';

const ROUNDS = 5;

const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const SentenceBuilder = ({ lang, whatsAppLink }) => {
  const [level, setLevel] = useState(null);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selected, setSelected] = useState([]);
  const [available, setAvailable] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [sentences, setSentences] = useState([]);

  const pickSentences = useCallback((lvl) => {
    const pool = [...sentenceBuilderData[lvl]];
    const picked = [];
    for (let i = 0; i < ROUNDS; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(idx, 1)[0]);
    }
    return picked;
  }, []);

  const handleLevelSelect = (lvl) => {
    const picked = pickSentences(lvl);
    setLevel(lvl);
    setSentences(picked);
    setRound(0);
    setScore(0);
    setShowScore(false);
    setSelected([]);
    setFeedback(null);
    setAvailable(shuffleArray(picked[0].words.map((w, i) => ({ word: w, id: i }))));
    trackGameStart('sentence_builder', lvl);
  };

  const handleWordClick = (item) => {
    if (feedback) return;
    setSelected([...selected, item]);
    setAvailable(available.filter((a) => a.id !== item.id));
  };

  const handleRemoveWord = (item) => {
    if (feedback) return;
    setAvailable([...available, item]);
    setSelected(selected.filter((s) => s.id !== item.id));
  };

  const handleClear = () => {
    if (feedback) return;
    setAvailable(shuffleArray(sentences[round].words.map((w, i) => ({ word: w, id: i }))));
    setSelected([]);
  };

  const handleCheck = () => {
    const userSentence = selected.map((s) => s.word).join(' ');
    const correctSentence = sentences[round].correct.replace(/\.$/, '');
    const isCorrect = userSentence === correctSentence || userSentence === sentences[round].correct;
    if (isCorrect) setScore((s) => s + 1);
    setFeedback(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => nextRound(), 2000);
  };

  const nextRound = () => {
    const next = round + 1;
    if (next >= ROUNDS) {
      setShowScore(true);
      trackGameComplete('sentence_builder', score, ROUNDS);
    } else {
      setRound(next);
      setSelected([]);
      setFeedback(null);
      setAvailable(shuffleArray(sentences[next].words.map((w, i) => ({ word: w, id: i }))));
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
          {score >= 4 ? "Brilliant!" : score >= 3 ? "Great Job!" : "Keep Practicing!"}
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

      <p className="text-sm text-gray-500 mb-4 text-center">Tap words in the correct order to build the sentence.</p>

      {/* Selected words area */}
      <div className={`min-h-[60px] border-2 border-dashed rounded-xl p-3 mb-6 flex flex-wrap gap-2 transition ${
        feedback === 'correct' ? 'border-green-500 bg-green-50' :
        feedback === 'wrong' ? 'border-red-500 bg-red-50' :
        'border-gray-300 bg-gray-50'
      }`}>
        {selected.length === 0 && <span className="text-gray-400 text-sm italic">Tap words below...</span>}
        {selected.map((item) => (
          <button
            key={item.id}
            onClick={() => handleRemoveWord(item)}
            className={`px-3 py-1.5 rounded-lg font-semibold text-sm transition ${
              feedback === 'correct' ? 'bg-green-200 text-green-800' :
              feedback === 'wrong' ? 'bg-red-200 text-red-800' :
              'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
            }`}
            disabled={!!feedback}
          >
            {item.word}
          </button>
        ))}
        {feedback === 'correct' && <Check size={20} className="text-green-600 ml-auto self-center" />}
        {feedback === 'wrong' && <X size={20} className="text-red-600 ml-auto self-center" />}
      </div>

      {feedback === 'wrong' && (
        <p className="text-red-500 text-sm mb-4 font-medium text-center">Correct: <strong>{sentences[round].correct}</strong></p>
      )}

      {/* Available words */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {available.map((item) => (
          <button
            key={item.id}
            onClick={() => handleWordClick(item)}
            className="px-4 py-2 rounded-lg border-2 border-gray-200 bg-white font-semibold text-sm hover:border-indigo-400 hover:bg-indigo-50 transition"
            disabled={!!feedback}
          >
            {item.word}
          </button>
        ))}
      </div>

      {!feedback && (
        <div className="flex gap-3">
          <button onClick={handleClear} className="flex-1 border-2 border-gray-200 text-gray-500 font-bold py-2.5 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <RotateCcw size={16} /> Clear
          </button>
          <button
            onClick={handleCheck}
            disabled={available.length > 0}
            className="flex-1 bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Check size={16} /> Check
          </button>
        </div>
      )}
    </div>
  );
};

export default SentenceBuilder;
