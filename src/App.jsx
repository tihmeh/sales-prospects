import React, { useState, useEffect } from "react";

export default function App() {
  // --------------------------
  // LINKEDIN TRACKER STATE
  // --------------------------
  const [linkedInConnections, setLinkedInConnections] = useState(() => {
    const saved = localStorage.getItem("linkedInConnections");
    return saved ? Number(saved) : 687;
  });

  const [monthlyAdds, setMonthlyAdds] = useState(() => {
    const saved = localStorage.getItem("monthlyLinkedInAdds");
    return saved ? Number(saved) : 0;
  });

  const linkedInMax = 700;
  const monthlyGoal = 20;

  const addConnection = () => {
    if (linkedInConnections < linkedInMax) {
      const newCount = linkedInConnections + 1;
      const newAdds = monthlyAdds + 1;
      setLinkedInConnections(newCount);
      setMonthlyAdds(newAdds);
      localStorage.setItem("linkedInConnections", newCount);
      localStorage.setItem("monthlyLinkedInAdds", newAdds);
    }
  };

  const removeConnection = () => {
    if (linkedInConnections > 0 && monthlyAdds > 0) {
      const newCount = linkedInConnections - 1;
      const newAdds = monthlyAdds - 1;
      setLinkedInConnections(newCount);
      setMonthlyAdds(newAdds);
      localStorage.setItem("linkedInConnections", newCount);
      localStorage.setItem("monthlyLinkedInAdds", newAdds);
    }
  };

  const resetMonth = () => {
    setMonthlyAdds(0);
    localStorage.setItem("monthlyLinkedInAdds", 0);
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-3xl mx-auto">

        {/* =============================== */}
        {/*           PAGE TITLE            */}
        {/* =============================== */}
        <h1 className="text-3xl font-bold mb-6 text-center">
          Tim's Prospecting Dashboard
        </h1>

        {/* =============================== */}
        {/*     CENTERED SALES GOAL         */}
        {/* =============================== */}
        <div className="w-full flex flex-col items-center text-center mt-6 mb-10">
          <h2 className="text-amber-300 text-sm font-medium uppercase tracking-wide">
            2026 Sales Goal
          </h2>

          <div className="text-amber-400 text-4xl font-extrabold mt-1">
            $3,000,000
          </div>
        </div>

        {/* ========================================= */}
        {/*    LINKEDIN CONNECTION TRACKER SECTION    */}
        {/* ========================================= */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 mb-10 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-1">LinkedIn Connections</h3>

          <p className="text-slate-300 text-sm">
            <span className="font-semibold text-white">{linkedInConnections}</span> / {linkedInMax} total connections
          </p>

          <p className="text-slate-400 text-xs mb-3">
            Monthly goal: <span className="text-green-400 font-semibold">+{monthlyGoal}</span>
          </p>

          {/* PROGRESS BAR */}
          <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"
              style={{ width: `${(linkedInConnections / linkedInMax) * 100}%` }}
            ></div>
          </div>

          <p className="text-slate-400 text-xs mt-2 text-right">
            {Math.round((linkedInConnections / linkedInMax) * 100)}% complete
          </p>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={removeConnection}
              className="px-3 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-semibold"
            >
              -1
            </button>

            <button
              onClick={addConnection}
              className="px-3 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-semibold"
            >
              +1
            </button>

            <button
              onClick={resetMonth}
              className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-semibold"
            >
              Reset Month
            </button>
          </div>
        </div>

        {/* =============================== */}
        {/*         PLACEHOLDER APP         */}
        {/* =============================== */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-300 text-center text-sm">
            (Your full prospecting model UI continues here…)
          </p>
        </div>

      </div>
    </div>
  );
}
