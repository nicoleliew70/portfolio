import { useState, useEffect, useCallback } from 'react';
import { Smile, PenTool, Brain, Trophy, RefreshCw, ArrowRight, X, Clock } from 'lucide-react';
import wordScrambleData from '../data/wordScrambleData';

const ROUNDS = 5;
const TIME_LIMIT = 30;

const scrambleWord = (word) => {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const scrambled = arr.join('');
  return scrambled === word ? scrambleWord(word) : scrambled;
};

const WordScramble = ({ lang, whatsAppLink }) => {
  const [level, setLevel] = useState(null);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [words, setWords] = useState([]);
  const [scrambled, setScrambled] = useState('');

  const pickWords = useCallback((lvl) => {
    const pool = [...wordScrambleData[lvl]];
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
    setTimeLeft(TIME_LIMIT);
    setScrambled(scrambleWord(picked[0].word));
  };

  const advanceRound = useCallback((currentRound, currentWords) => {
    const next = currentRound + 1;
    if (next >= ROUNDS) {
      setShowScore(true);
    } else {
      setRound(next);
      setGuess('');
      setFeedback(null);
      setTimeLeft(TIME_LIMIT);
      setScrambled(scrambleWord(currentWords[next].word));
    }
  }, []);

  useEffect(() => {
    if (!level || showScore || feedback || timeLeft <= 0) return;
    const timer = setTimeout(() => {
      if (timeLeft <= 1) {
        setFeedback('timeout');
      } else {
        setTimeLeft((t) => t - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, level, showScore, feedback]);

  useEffect(() => {
    if (!feedback || feedback === null) return;
    const timer = setTimeout(() => advanceRound(round, words), 1500);
    return () => clearTimeout(timer);
  }, [feedback, round, words, advanceRound]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guess.trim() || feedback) return;
    const correct = guess.trim().toLowerCase() === words[round].word.toLowerCase();
    if (correct) setScore((s) => s + 1);
    setFeedback(correct ? 'correct' : 'wrong');
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
          {score >= 4 ? "Amazing!" : score >= 3 ? "Great Job!" : "Good Try!"}
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
        <div className="flex items-center gap-4">
          <span className={`flex items-center gap-1 text-sm font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-400'}`}>
            <Clock size={16} /> {timeLeft}s
          </span>
          <button onClick={reset} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-2 italic">{words[round].hint}</p>

      <div className="bg-indigo-50 rounded-2xl p-6 mb-6 text-center">
        <p className="text-3xl md:text-4xl font-bold tracking-widest text-indigo-700 uppercase">{scrambled}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Type your answer..."
          className={`w-full border-2 rounded-lg p-3 text-lg text-center font-semibold focus:outline-none transition ${
            feedback === 'correct' ? 'border-green-500 bg-green-50 text-green-700' :
            feedback === 'wrong' ? 'border-red-500 bg-red-50 text-red-700' :
            feedback === 'timeout' ? 'border-orange-500 bg-orange-50 text-orange-700' :
            'border-gray-200 focus:border-indigo-500'
          }`}
          disabled={!!feedback}
          autoFocus
        />
        {feedback === 'wrong' && (
          <p className="text-red-500 text-sm mt-2 font-medium text-center">The answer was: <strong>{words[round].word}</strong></p>
        )}
        {feedback === 'timeout' && (
          <p className="text-orange-500 text-sm mt-2 font-medium text-center">Time's up! The answer was: <strong>{words[round].word}</strong></p>
        )}
        {!feedback && (
          <button type="submit" disabled={!guess.trim()} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4">
            Check Answer
          </button>
        )}
      </form>
    </div>
  );
};

export default WordScramble;
