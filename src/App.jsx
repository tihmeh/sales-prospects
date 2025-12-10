import React, { useState, useEffect } from 'react';

const SalesBubbles = () => {
  const prospects = [
    { 
      id: 1, 
      name: "Pinellas County School District", 
      contact: "John Smith",
      email: "jsmith@pcsb.org",
      contacted: true,
      notes: "Attending Utilities Unite Event.",
      color: "from-blue-400 to-blue-600" 
    },
    { 
      id: 2, 
      name: "City of St. Petersburg", 
      contact: "Sarah Johnson",
      email: "sjohnson@stpete.org",
      contacted: false,
      notes: "Left voicemail on 12/5. Awaiting callback.",
      color: "from-purple-400 to-purple-600" 
    },
    { 
      id: 3, 
      name: "City of Dunedin", 
      contact: "Mike Williams",
      email: "mwilliams@dunedinfl.gov",
      contacted: true,
      notes: "Meeting scheduled for 12/15 at 2pm.",
      color: "from-teal-400 to-teal-600" 
    }
  ];

  const [bubbles, setBubbles] = useState([]);
  const [hoveredBubble, setHoveredBubble] = useState(null);

  useEffect(() => {
    const initialBubbles = prospects.map((prospect, index) => {
      const col = index % 3;
      const row = Math.floor(index / 3);
      
      return {
        ...prospect,
        x: 20 + (col * 30),
        y: 30 + (row * 35),
        size: 180
      };
    });
    setBubbles(initialBubbles);
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-4xl font-bold text-white mb-2">Sales Prospects</h1>
        <p className="text-slate-300">Active Pipeline</p>
      </div>

      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className={`absolute rounded-full bg-gradient-to-br ${bubble.color} shadow-2xl flex items-center justify-center transition-all duration-300 ease-out cursor-pointer hover:scale-110 hover:shadow-3xl backdrop-blur-sm bg-opacity-90`}
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            transform: 'translate(-50%, -50%)'
          }}
          onMouseEnter={() => setHoveredBubble(bubble.id)}
          onMouseLeave={() => setHoveredBubble(null)}
        >
          {hoveredBubble === bubble.id ? (
            <div className="text-white text-center px-6 py-2">
              <div className="font-bold text-base mb-2">{bubble.name}</div>
              <div className="text-sm opacity-90 mb-1">{bubble.contact}</div>
              <div className="text-sm opacity-90 mb-3">{bubble.email}</div>
              <div className={`text-sm font-semibold mb-3 ${bubble.contacted ? 'text-green-300' : 'text-yellow-300'}`}>
                {bubble.contacted ? '✓ Contacted' : '⚠ Not Contacted'}
              </div>
              <div className="text-xs opacity-80 italic border-t border-white/20 pt-2">
                {bubble.notes}
              </div>
            </div>
          ) : (
            <span className="text-white font-semibold text-center px-6 text-base">
              {bubble.name}
            </span>
          )}
        </div>
      ))}

      <div className="absolute bottom-8 right-8 text-slate-400 text-sm">
        {bubbles.length} Active Prospects
      </div>
    </div>
  );
};

export default SalesBubbles;
