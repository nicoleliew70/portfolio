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
  HelpCircle
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Quiz State
  const [quizLevel, setQuizLevel] = useState(null); // 'primary', 'secondary', 'adult'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Image Handling State
  const [imageError, setImageError] = useState(false);
  // INSTRUCTION: Put your photo in the 'public/images' folder and name it 'teacher-nicole.jpg'
  // If hosting on GitHub Pages with a subpath, you might need to add the repo name prefix, e.g., '/my-repo/images/...'
  const profileImageSrc = "images/teacher-nicole.jpg";

  // Resume Data
  const experience = [
    {
      role: "Freelance English Tutor",
      company: "Sandakan & Online",
      period: "Dec 2024 - Present",
      desc: "Personalized lessons for all ages, focusing on grammar, vocabulary, and confidence."
    },
    {
      role: "English Teacher",
      company: "Smartway English Academy",
      period: "Jul 2024 - Nov 2024",
      desc: "Simplified complex grammar for adults using 'Math-like' logic formulas."
    },
    {
      role: "English Tutor",
      company: "Edumpire Sdn Bhd",
      period: "Jan 2024 - Jun 2024",
      desc: "Tailored lessons for primary & secondary students and education consultation."
    },
    {
      role: "Online English Tutor",
      company: "Pusat Tuisyen Alpha Intelek",
      period: "Feb 2022 - Dec 2023",
      desc: "Guided 100+ online students in a dynamic virtual environment."
    }
  ];

  const testimonials = [
    {
      text: "Teacher Nicole makes grammar logic so easy to understand! It's like solving a math puzzle.",
      author: "Form 5 Student",
      grade: "SPM Candidate"
    },
    {
      text: "My daughter used to be shy, but now she loves storytelling time. The lessons are so fun!",
      author: "Mrs. Tan",
      grade: "Parent of Primary 3 Student"
    },
    {
      text: "I finally passed my IELTS thanks to the structured speaking practice.",
      author: "University Student",
      grade: "Adult Learner"
    }
  ];

  // Quiz Data
  const quizData = {
    primary: [
      {
        question: "Choose the correct word: 'The cat is sleeping ___ the sofa.'",
        options: ["in", "on", "at"],
        correct: 1 // index of correct answer
      },
      {
        question: "Which represents the past tense of 'Run'?",
        options: ["Runned", "Running", "Ran"],
        correct: 2
      },
      {
        question: "Find the odd one out:",
        options: ["Apple", "Banana", "Car"],
        correct: 2
      }
    ],
    secondary: [
      {
        question: "If I ___ known about the party, I would have attended.",
        options: ["have", "had", "has"],
        correct: 1
      },
      {
        question: "Which sentence is grammatically correct?",
        options: ["She don't like coffee.", "She doesn't likes coffee.", "She doesn't like coffee."],
        correct: 2
      },
      {
        question: "What is the synonym of 'Happy'?",
        options: ["Elated", "Sorrowful", "Fatigued"],
        correct: 0
      }
    ],
    adult: [
      {
        question: "Select the most formal closing for an email:",
        options: ["Cheers,", "Sincerely,", "See ya,"],
        correct: 1
      },
      {
        question: "Complete the idiom: 'To kill two birds with one ___.'",
        options: ["stick", "stone", "arrow"],
        correct: 1
      },
      {
        question: "I look forward to ___ from you.",
        options: ["hear", "hearing", "heard"],
        correct: 1
      }
    ]
  };

  const whatsAppNumber = "601133848412";
  const whatsAppLink = `https://wa.me/${whatsAppNumber}`;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

    if (index === quizData[quizLevel][currentQuestionIndex].correct) {
      setScore(score + 1);
    }

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
              <span className="text-2xl font-bold text-sky-600 tracking-tight">Teacher Nicole</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#about" className="text-gray-600 hover:text-sky-600 font-medium transition">About Me</a>
              <a href="#classes" className="text-gray-600 hover:text-sky-600 font-medium transition">Classes</a>
              <a href="#quiz" className="text-gray-600 hover:text-sky-600 font-medium transition">Try Quiz</a>
              <a href="#pricing" className="text-gray-600 hover:text-sky-600 font-medium transition">Pricing</a>
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noreferrer"
                className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-full font-bold transition shadow-md flex items-center gap-2 transform hover:scale-105"
              >
                <MessageCircle size={18} />
                Book a Trial
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-600 hover:text-sky-600 focus:outline-none">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#about" onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-600">About Me</a>
              <a href="#classes" onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-600">Classes</a>
              <a href="#quiz" onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-600">Quick Quiz</a>
              <a href="#pricing" onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-600">Pricing</a>
              <a href={whatsAppLink} className="block px-3 py-3 rounded-md text-base font-bold text-sky-600 bg-sky-50 mt-4">Book a Trial Now</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-bold mb-6 animate-bounce">
              🎓 CELT Certified & Experienced Tutor
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              English Learning Made <span className="text-sky-500">Fun & Logical</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              From storytelling for kids to "grammar math" for teens. Join Teacher Nicole on a journey to master English for school, exams, and life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={whatsAppLink}
                className="bg-sky-500 hover:bg-sky-600 text-white text-lg px-8 py-4 rounded-full font-bold transition shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle />
                Start Learning Today
              </a>
              <a
                href="#classes"
                className="bg-white hover:bg-gray-50 text-sky-600 border-2 border-sky-100 text-lg px-8 py-4 rounded-full font-bold transition shadow-sm flex items-center justify-center"
              >
                View Courses
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
              <div className="text-sm text-gray-500 font-medium">Teaching Experience</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-sky-600 mb-1">A+</div>
              <div className="text-sm text-gray-500 font-medium">SPM English Record</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-sky-600 mb-1">CELT</div>
              <div className="text-sm text-gray-500 font-medium">Cambridge Certified</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-sky-600 mb-1">100+</div>
              <div className="text-sm text-gray-500 font-medium">Happy Students</div>
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
                {/* Photo Placeholder / Image Loader */}
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
                        <p className="text-xs text-gray-400 mt-2">Add photo to: public/images/teacher-nicole.jpg</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Hello! I'm Nicole Liew.</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                I've been a dedicated English teacher since 2017. My passion is taking the "scary" out of English and making it accessible for everyone. From young kids just starting to read, to adults aiming for career growth.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                <strong className="text-sky-600">Fun Fact:</strong> Before I became a full-time educator, I was a certified Pastry Chef! 🍰 Just like baking requires precise measurements and creativity, I believe language learning needs structure (grammar) mixed with a lot of creative expression (storytelling).
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded text-green-600 mt-1"><Check size={16} /></div>
                  <p className="text-gray-700"><strong>Specialty:</strong> Simplifying grammar using mathematical logic.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-1 rounded text-purple-600 mt-1"><Check size={16} /></div>
                  <p className="text-gray-700"><strong>Focus:</strong> SPM, IGCSE, Cambridge Qualifications, & PTE/IELTS.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quiz Section - NEW */}
      <section id="quiz" className="py-20 bg-indigo-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-800 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-900 rounded-full opacity-50 blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10">
            <span className="inline-block bg-yellow-400 text-indigo-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">Interactive Game</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Test Your English Power! ⚡</h2>
            <p className="text-indigo-200 text-lg">Select your level to take a quick 3-question challenge.</p>
          </div>

          <div className="bg-white text-gray-900 rounded-3xl shadow-2xl p-6 md:p-10 min-h-[400px] flex flex-col justify-center items-center text-center transition-all duration-300">

            {!quizLevel ? (
              <div className="w-full">
                <h3 className="text-2xl font-bold mb-8 text-gray-800">Who are you?</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <button onClick={() => handleLevelSelect('primary')} className="group p-6 rounded-2xl border-2 border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50 transition flex flex-col items-center">
                    <div className="bg-yellow-100 p-4 rounded-full mb-4 group-hover:scale-110 transition">
                      <Smile size={32} className="text-yellow-600" />
                    </div>
                    <span className="font-bold text-lg">Primary Student</span>
                    <span className="text-sm text-gray-500">Junior Explorer</span>
                  </button>

                  <button onClick={() => handleLevelSelect('secondary')} className="group p-6 rounded-2xl border-2 border-sky-200 hover:border-sky-400 hover:bg-sky-50 transition flex flex-col items-center">
                    <div className="bg-sky-100 p-4 rounded-full mb-4 group-hover:scale-110 transition">
                      <PenTool size={32} className="text-sky-600" />
                    </div>
                    <span className="font-bold text-lg">Secondary / SPM</span>
                    <span className="text-sm text-gray-500">Exam Warrior</span>
                  </button>

                  <button onClick={() => handleLevelSelect('adult')} className="group p-6 rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition flex flex-col items-center">
                    <div className="bg-purple-100 p-4 rounded-full mb-4 group-hover:scale-110 transition">
                      <Brain size={32} className="text-purple-600" />
                    </div>
                    <span className="font-bold text-lg">Adult / Uni</span>
                    <span className="text-sm text-gray-500">Global Speaker</span>
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
                <div className="bg-gray-50 p-6 rounded-xl mb-6 text-left">
                  <p className="text-sm text-gray-500 font-bold uppercase mb-2">Teacher Nicole's Feedback:</p>
                  <p className="text-gray-700 italic">
                    {score === 3
                      ? "Wow! You have a strong foundation. You're ready for advanced classes to polish your style!"
                      : "You have potential! Let's work together to fix those tricky grammar rules and boost your confidence."}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href={whatsAppLink} target="_blank" rel="noreferrer" className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                    Book a Free Assessment <ArrowRight size={18} />
                  </a>
                  <button onClick={resetQuiz} className="text-gray-500 hover:text-gray-700 font-medium flex items-center justify-center gap-2">
                    <RefreshCw size={18} /> Try Another Level
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

      {/* Experience Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">My Teaching Journey</h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="flex gap-4 md:gap-8 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-sky-500 mt-2"></div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl flex-1 hover:shadow-md transition">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-sm font-semibold text-sky-600 bg-sky-100 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">{exp.period}</span>
                  </div>
                  <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                  <p className="text-gray-600 text-sm">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tables */}
      <section id="pricing" className="py-20 bg-sky-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-sky-200 text-lg">Invest in your future with affordable rates.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-gray-800">
            {/* Group Class */}
            <div className="bg-white rounded-2xl p-8 hover:bg-gray-50 transition">
              <h3 className="text-xl font-bold text-gray-500 mb-2">Small Group</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">RM 120<span className="text-lg font-normal text-gray-500">/mo</span></div>
              <p className="text-sm text-gray-500 mb-6">Perfect for learning with friends.</p>
              <button onClick={() => window.open(whatsAppLink, '_blank')} className="w-full border-2 border-sky-600 text-sky-600 font-bold py-3 rounded-lg hover:bg-sky-50 transition mb-6">Inquire Availability</button>
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
              <h3 className="text-xl font-bold text-sky-600 mb-2 whitespace-nowrap tracking-tight">Personalized (1-on-1)</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">RM 50<span className="text-lg font-normal text-gray-500">/hr</span></div>
              <p className="text-sm text-gray-500 mb-6">Fully focused on your weak points.</p>
              <button onClick={() => window.open(whatsAppLink, '_blank')} className="w-full bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 transition mb-6">Book Now</button>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> 100% Personal attention</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Flexible scheduling</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Customized materials</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Detailed progress reports</li>
              </ul>
            </div>

            {/* Intensive */}
            <div className="bg-white rounded-2xl p-8 hover:bg-gray-50 transition">
              <h3 className="text-xl font-bold text-purple-500 mb-2">Exam Crash Course</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">RM 600<span className="text-lg font-normal text-gray-500">/pack</span></div>
              <p className="text-sm text-gray-500 mb-6">Intensive prep before major exams.</p>
              <button onClick={() => window.open(whatsAppLink, '_blank')} className="w-full border-2 border-purple-500 text-purple-600 font-bold py-3 rounded-lg hover:bg-purple-50 transition mb-6">Start Prep</button>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> 10 Hours Intensive</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Past Year Paper Drills</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Answering Techniques</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Speaking Mock Tests</li>
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