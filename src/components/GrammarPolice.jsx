import { useState, useCallback } from 'react';
import { Smile, PenTool, Brain, Trophy, RefreshCw, ArrowRight, X, Shield } from 'lucide-react';
import grammarPoliceData from '../data/grammarPoliceData';

const ROUNDS = 5;
const MAX_ATTEMPTS = 2;

const GrammarPolice = ({ lang, whatsAppLink }) => {
  const [level, setLevel] = useState(null);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [sentences, setSentences] = useState([]);

  const pickSentences = useCallback((lvl) => {
    const pool = [...grammarPoliceData[lvl]];
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
    setAttempts(0);
    setFeedback(null);
    setSelectedIndex(null);
  };

  const nextRound = () => {
    const next = round + 1;
    if (next >= ROUNDS) {
      setShowScore(true);
    } else {
      setRound(next);
      setAttempts(0);
      setFeedback(null);
      setSelectedIndex(null);
    }
  };

  const handleWordClick = (index) => {
    if (feedback === 'correct' || feedback === 'revealed') return;

    setSelectedIndex(index);
    const isCorrect = index === sentences[round].errorIndex;

    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedback('correct');
      setTimeout(() => nextRound(), 2000);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= MAX_ATTEMPTS) {
        setFeedback('revealed');
        setTimeout(() => nextRound(), 2500);
      } else {
        setFeedback('wrong');
        setTimeout(() => {
          setFeedback(null);
          setSelectedIndex(null);
        }, 800);
      }
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
          {score >= 4 ? "Grammar Expert!" : score >= 3 ? "Great Job!" : "Keep Learning!"}
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

  const currentSentence = sentences[round];

  return (
    <div className="w-full max-w-lg animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">Round {round + 1}/{ROUNDS}</span>
        <button onClick={reset} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
      </div>

      <div className="flex items-center gap-2 justify-center mb-4">
        <Shield size={20} className="text-red-500" />
        <p className="text-sm text-gray-500 font-medium">Tap the word with the grammar error!</p>
      </div>

      {attempts > 0 && feedback === 'wrong' && (
        <p className="text-orange-500 text-sm mb-3 text-center font-medium">Not that one! Try again ({MAX_ATTEMPTS - attempts} attempt left)</p>
      )}

      <div className="bg-gray-50 rounded-2xl p-6 mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {currentSentence.sentence.map((word, index) => {
            const isError = index === currentSentence.errorIndex;
            const isSelected = selectedIndex === index;
            const isRevealed = feedback === 'correct' || feedback === 'revealed';

            let classes = "px-4 py-2.5 rounded-lg font-semibold text-base transition cursor-pointer ";

            if (isRevealed && isError) {
              classes += feedback === 'correct'
                ? "bg-green-200 text-green-800 border-2 border-green-500"
                : "bg-red-200 text-red-800 border-2 border-red-500";
            } else if (isSelected && feedback === 'wrong') {
              classes += "bg-red-100 text-red-600 border-2 border-red-300 animate-pulse";
            } else {
              classes += "bg-white border-2 border-gray-200 text-gray-800 hover:border-red-400 hover:bg-red-50";
            }

            return (
              <button
                key={index}
                onClick={() => handleWordClick(index)}
                className={classes}
                disabled={isRevealed}
              >
                {isRevealed && isError ? (
                  <span className="line-through">{word}</span>
                ) : (
                  word
                )}
              </button>
            );
          })}
        </div>
      </div>

      {(feedback === 'correct' || feedback === 'revealed') && (
        <div className={`text-center p-3 rounded-xl ${feedback === 'correct' ? 'bg-green-50' : 'bg-red-50'}`}>
          <p className={`text-sm font-medium ${feedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
            {feedback === 'correct' ? 'Correct! ' : 'The error was: '}
            <strong>&ldquo;{currentSentence.sentence[currentSentence.errorIndex]}&rdquo;</strong> should be <strong>&ldquo;{currentSentence.correction}&rdquo;</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default GrammarPolice;
