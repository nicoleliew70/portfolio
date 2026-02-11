import { useState } from 'react';
import { Smile, PenTool, Brain, Trophy, RefreshCw, ArrowRight, Check, X } from 'lucide-react';
import quizData from '../data/quizData';
import { trackGameStart, trackGameComplete } from '../utils/analytics';

const ANSWER_DELAY_MS = 1200;

const QuizGame = ({ lang, whatsAppLink }) => {
  const [quizLevel, setQuizLevel] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const handleLevelSelect = (level) => {
    setQuizLevel(level);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    trackGameStart('quiz', level);
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
        trackGameComplete('quiz', index === quizData[quizLevel][currentQuestionIndex].correct ? score + 1 : score, 3);
      }
    }, ANSWER_DELAY_MS);
  };

  const resetQuiz = () => {
    setQuizLevel(null);
    setScore(0);
    setShowScore(false);
  };

  if (!quizLevel) {
    return (
      <div className="w-full animate-fadeIn">
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
    );
  }

  if (showScore) {
    return (
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
    );
  }

  return (
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
  );
};

export default QuizGame;
