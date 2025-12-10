import React, { useState, useEffect } from 'react';

const Magic8BallSalesAdvisor = () => {
  const [isShaking, setIsShaking] = useState(false);
  const [answer, setAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [question, setQuestion] = useState('');
  const [particles, setParticles] = useState([]);
  const [mood, setMood] = useState('mysterious');

  const mysticalAnswers = [
    { text: "The stars align - call them NOW! ⭐", mood: "positive", color: "from-green-400 to-emerald-600" },
    { text: "Mercury is in retrograde... send an email instead 📧", mood: "caution", color: "from-yellow-400 to-orange-500" },
    { text: "The cosmic forces say: Schedule for next Tuesday 🌙", mood: "neutral", color: "from-blue-400 to-indigo-600" },
    { text: "Your LinkedIn connection request will be accepted! 🔮", mood: "positive", color: "from-purple-400 to-pink-600" },
    { text: "The universe demands a follow-up email within 24 hours ⚡", mood: "urgent", color: "from-red-400 to-pink-600" },
    { text: "Signs point to: They're thinking about you too 💭", mood: "positive", color: "from-cyan-400 to-blue-600" },
    { text: "The prophecy reveals: Leave a voicemail at 3:33 PM 📞", mood: "mysterious", color: "from-indigo-400 to-purple-600" },
    { text: "Ancient wisdom says: Wait 3 business days ⏰", mood: "patience", color: "from-gray-400 to-slate-600" },
    { text: "Your coffee break fortune: Visit them in person! ☕", mood: "bold", color: "from-amber-400 to-orange-600" },
    { text: "The sales gods decree: Send a handwritten note 📝", mood: "creative", color: "from-rose-400 to-red-600" },
    { text: "Mystical insight: They're ready to close the deal! 💰", mood: "jackpot", color: "from-yellow-300 to-yellow-600" },
    { text: "The oracle warns: Budget approval needed first 💸", mood: "caution", color: "from-orange-400 to-red-500" },
    { text: "Spiritual guidance: Schedule a Zoom call 🎥", mood: "modern", color: "from-teal-400 to-cyan-600" },
    { text: "The fates whisper: Add them to your email sequence 📨", mood: "strategic", color: "from-violet-400 to-purple-600" },
    { text: "Crystal ball reveals: They need 3 more touchpoints 💎", mood: "patient", color: "from-pink-400 to-fuchsia-600" }
  ];

  const funQuestions = [
    "Should I cold call this prospect?",
    "Is today a good day to close this deal?",
    "Will they respond to my email?",
    "Should I send a follow-up?",
    "Is this prospect worth pursuing?",
    "Will this meeting go well?",
    "Should I offer a discount?",
    "Is now the right time to reach out?"
  ];

  const shake8Ball = () => {
    if (isShaking) return;
    
    setIsShaking(true);
    setShowAnswer(false);
    setAnswer('');
    
    // Create particle explosion
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.5
    }));
    setParticles(newParticles);

    setTimeout(() => {
      const randomAnswer = mysticalAnswers[Math.floor(Math.random() * mysticalAnswers.length)];
      setAnswer(randomAnswer.text);
      setMood(randomAnswer.mood);
      setShowAnswer(true);
      setIsShaking(false);
      setTimeout(() => setParticles([]), 1000);
    }, 2000);
  };

  const suggestQuestion = () => {
    const randomQ = funQuestions[Math.floor(Math.random() * funQuestions.length)];
    setQuestion(randomQ);
  };

  useEffect(() => {
    suggestQuestion();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Mystical background stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          ></div>
        ))}
      </div>

      {/* Floating particles during shake */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-float-away"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`
          }}
        ></div>
      ))}

      <div className="max-w-2xl w-full relative z-10">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-400 mb-2 animate-pulse-slow">
            🔮 Mystical Sales Advisor 🔮
          </h1>
          <p className="text-purple-200 text-lg italic">Ask the cosmic forces to guide your outreach...</p>
        </div>

        {/* Question Input */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border-2 border-purple-400/30 p-6 mb-6 shadow-2xl">
          <label className="text-purple-200 text-sm font-semibold mb-2 block">Your Question to the Universe:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about your next sales move..."
              className="flex-1 bg-white/20 border-2 border-purple-300/50 rounded-2xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-yellow-400 transition-all"
            />
            <button
              onClick={suggestQuestion}
              className="bg-purple-500/50 hover:bg-purple-400/50 border-2 border-purple-300/50 rounded-2xl px-4 text-white transition-all"
              title="Suggest a question"
            >
              🎲
            </button>
          </div>
        </div>

        {/* Magic 8 Ball */}
        <div className="flex flex-col items-center">
          <div 
            className={`relative cursor-pointer transition-all duration-500 ${isShaking ? 'animate-shake-intense scale-110' : 'hover:scale-105'}`}
            onClick={shake8Ball}
          >
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            
            {/* 8 Ball sphere */}
            <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-gray-900 via-black to-gray-900 border-8 border-gray-800 shadow-2xl flex items-center justify-center">
              {/* Highlight effect */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/30 rounded-full blur-2xl"></div>
              
              {/* Number 8 or Answer window */}
              {!showAnswer ? (
                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-inner">
                  <span className="text-8xl font-bold text-black">8</span>
                </div>
              ) : (
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-6 border-4 border-blue-400/50 shadow-2xl animate-float">
                  <div className="text-center">
                    <div className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${mysticalAnswers.find(a => a.text === answer)?.color || 'from-blue-400 to-purple-600'} animate-glow`}>
                      {answer}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instruction text */}
          <div className="mt-8 text-center">
            {!showAnswer ? (
              <p className="text-purple-200 text-xl font-semibold animate-bounce">
                ✨ Click the mystical orb to receive guidance ✨
              </p>
            ) : (
              <p className="text-yellow-300 text-lg italic animate-pulse">
                The cosmos have spoken! 🌟
              </p>
            )}
          </div>

          {/* Shake Again Button */}
          {showAnswer && (
            <button
              onClick={shake8Ball}
              className="mt-6 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all animate-fade-in"
            >
              Ask Another Question 🔄
            </button>
          )}
        </div>

        {/* Fun stats */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-center border border-purple-400/30">
            <div className="text-3xl mb-2">🌙</div>
            <div className="text-purple-200 text-xs">Mystical</div>
            <div className="text-white text-xl font-bold">Power</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-center border border-purple-400/30">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-purple-200 text-xs">Cosmic</div>
            <div className="text-white text-xl font-bold">Accuracy</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-center border border-purple-400/30">
            <div className="text-3xl mb-2">🔮</div>
            <div className="text-purple-200 text-xs">Fortune</div>
            <div className="text-white text-xl font-bold">Reading</div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-purple-300 text-xs italic">
            * For entertainment purposes only. Or is it? The universe works in mysterious ways... 👻
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake-intense {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          10% { transform: rotate(-15deg) translateX(-10px); }
          20% { transform: rotate(15deg) translateX(10px); }
          30% { transform: rotate(-15deg) translateX(-10px); }
          40% { transform: rotate(15deg) translateX(10px); }
          50% { transform: rotate(-10deg) translateX(-5px); }
          60% { transform: rotate(10deg) translateX(5px); }
          70% { transform: rotate(-5deg) translateX(-3px); }
          80% { transform: rotate(5deg) translateX(3px); }
          90% { transform: rotate(-2deg) translateX(-1px); }
        }
        .animate-shake-intense {
          animation: shake-intense 0.5s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float-away {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        .animate-float-away {
          animation: float-away 1s ease-out forwards;
          --tx: calc((Math.random() - 0.5) * 200px);
          --ty: calc((Math.random() - 0.5) * 200px);
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.5); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Magic8BallSalesAdvisor;
