import React, { useState } from "react";

// HSG RBK Web-App
// Teamfarben: schwarz, weiß, pink (#ff2d8f)
// Motto: "Nie ohne mein Team!"

export default function App() {
  const PINK = "text-pink-500";

  // Sample-Daten
  const samplePlayers = [
    { id: 1, firstName: "Lena", lastName: "Kugies", position: "RM", available: true },
    { id: 2, firstName: "Anna", lastName: "Müller", position: "LA", available: true },
    { id: 3, firstName: "Maya", lastName: "Schmidt", position: "TW", available: false }
  ];

  const sampleGames = [
    { id: 1, date: "2025-11-23", time: "18:30", opponent: "TSV Zwingenberg", place: "Melibokushalle", home: false },
    { id: 2, date: "2025-11-30", time: "19:00", opponent: "HSV Bensheim", place: "Weststadthalle", home: true }
  ];

  const samplePlays = [
    { id: 1, title: "Angriff 1", category: "Angriff", steps: ["Aufbau mit 1-6", "Pass auf Kreis", "Wurf"] },
    { id: 2, title: "Abwehr 3-2-1", category: "Abwehr", steps: ["Pressing Linien", "Rückzug bei Ballverlust"] }
  ];

  // State
  const [view, setView] = useState("dashboard");
  const [players, setPlayers] = useState(samplePlayers);
  const [games, setGames] = useState(sampleGames);
  const [plays, setPlays] = useState(samplePlays);
  const [isAdmin, setIsAdmin] = useState(false);
  const [motto] = useState("Nie ohne mein Team!");

  // Toggle Spieler-Verfügbarkeit
  function toggleAvailability(id) {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, available: !p.available } : p));
  }

  // Header
  function Header() {
    return (
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold">H</div>
          <div>
            <h1 className="text-lg font-semibold">HSG RBK</h1>
            <div className="text-sm text-gray-600">{motto}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`px-3 py-1 rounded-lg border ${isAdmin ? 'border-pink-500 text-pink-500' : 'border-gray-300 text-gray-800'}`}
          >
            {isAdmin ? "Admin" : "Spielerin"}
          </button>
        </div>
      </header>
    );
  }

  // Dashboard
  function Dashboard() {
    const nextGame = games.slice().sort((a,b) => new Date(a.date) - new Date(b.date))[0];
    return (
      <div className="p-4 space-y-6">
        <section className="bg-white rounded-2xl shadow-sm p-4">
          <h2 className="text-md font-semibold">Nächstes Spiel</h2>
          {nextGame ? (
            <div className="mt-2">
              <div className="font-medium">{nextGame.opponent} <span className="text-xs text-gray-500">{nextGame.home ? 'Heim' : 'Auswärts'}</span></div>
              <div className="text-sm text-gray-600">{nextGame.date} • {nextGame.time} • {nextGame.place}</div>
            </div>
          ) : <div className="text-sm text-gray-500">Keine Spiele eingetragen.</div>}
        </section>
      </div>
    );
  }

  // Spielplan
  function Spielplan() {
    return (
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-semibold mb-3">Spielplan</h2>
        {games.map(g => (
          <div key={g.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
            <div>
              <div className="font-medium">{g.opponent} <span className="text-xs text-gray-500">{g.home ? 'Heim' : 'Auswärts'}</span></div>
              <div className="text-sm text-gray-600">{g.date} • {g.time} • {g.place}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Spielzüge
  function Spielzuege() {
    return (
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-semibold mb-3">Spielzüge & Training</h2>
        {plays.map(p => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-gray-500">{p.category}</div>
              </div>
              <div className="text-sm text-gray-500">{p.steps.length} Schritte</div>
            </div>
            <ol className="mt-3 list-decimal list-inside text-sm text-gray-600">
              {p.steps.map((s,i) => <li key={i}>{s}</li>)}
            </ol>
          </div>
        ))}
      </div>
    );
  }

  // Nachrichten
  function Nachrichten() {
    return (
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-semibold mb-3">Nachrichten & Teaminfos</h2>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="font-medium">Training heute 18:00</div>
          <div className="text-sm text-gray-600">Bitte Hallenschuhe mitbringen. Treffpunkt: 17:15</div>
        </div>
      </div>
    );
  }

  // Team
  function Team() {
    return (
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-semibold mb-3">Team & Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {players.map(p => (
            <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">{p.firstName[0]}{p.lastName[0]}</div>
                <div>
                  <div className="font-medium">{p.firstName} {p.lastName}</div>
                  <div className="text-sm text-gray-500">{p.position}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleAvailability(p.id)} className={`px-3 py-1 rounded-md text-sm ${p.available ? 'border border-pink-500 text-pink-500' : 'bg-gray-100 text-gray-500'}`}>
                  {p.available ? 'Verfügbar' : 'Nicht verfügbar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-5xl mx-auto">
        <Header />
        <main className="pb-24">
          {view === 'dashboard' && <Dashboard />}
          {view === 'spielplan' && <Spielplan />}
          {view === 'spielzuege' && <Spielzuege />}
          {view === 'nachrichten' && <Nachrichten />}
          {view === 'team' && <Team />}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed left-0 right-0 bottom-0 bg-white border-t p-3 md:hidden">
          <div className="max-w-5xl mx-auto flex justify-around">
            <button onClick={() => setView('dashboard')} className={`flex flex-col items-center text-xs ${view==='dashboard' ? 'text-pink-500' : ''}`}>
              <span className="text-xl">🏠</span> Dashboard
            </button>
            <button onClick={() => setView('spielplan')} className={`flex flex-col items-center text-xs ${view==='spielplan' ? 'text-pink-500' : ''}`}>
              <span className="text-xl">📅</span> Spielplan
            </button>
            <button onClick={() => setView('spielzuege')} className={`flex flex-col items-center text-xs ${view==='spielzuege' ? 'text-pink-500' : ''}`}>
              <span className="text-xl">🧭</span> Spielzüge
            </button>
            <button onClick={() => setView('nachrichten')} className={`flex flex-col items-center text-xs ${view==='nachrichten' ? 'text-pink-500' : ''}`}>
              <span className="text-xl">✉️</span> Nachrichten
            </button>
            <button onClick={() => setView('team')} className={`flex flex-col items-center text-xs ${view==='team' ? 'text-pink-500' : ''}`}>
              <span className="text-xl">👥</span> Team
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
