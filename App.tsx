import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Calendar, 
  Copy, 
  Check, 
  ExternalLink, 
  MessageCircle, 
  Video,
  ChevronDown,
  Loader2,
  AlertTriangle
} from "lucide-react";
import { ALL_MARKETS, SOCIAL_LINKS } from "./constants";

// Helper to get time in UTC+6 (Bangladesh)
const getDhakaTime = (offsetMinutes = 0) => {
  const now = new Date();
  // UTC time + 6 hours
  const dhakaTime = new Date(now.getTime() + (6 * 60 * 60 * 1000) + (offsetMinutes * 60 * 1000));
  const hours = dhakaTime.getUTCHours().toString().padStart(2, "0");
  const minutes = dhakaTime.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default function App() {
  const [activeTab, setActiveTab] = useState<"live" | "future">("live");
  const [selectedMarket, setSelectedMarket] = useState(ALL_MARKETS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [liveSignal, setLiveSignal] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Future Signal State
  const [futureMarkets, setFutureMarkets] = useState<string[]>([ALL_MARKETS[0]]);
  const [numSignals, setNumSignals] = useState(5);
  const [direction, setDirection] = useState<"BUY" | "PUT" | "BOTH">("BOTH");
  const [generatedFutureSignals, setGeneratedFutureSignals] = useState<string[]>([]);
  const [isGeneratingFuture, setIsGeneratingFuture] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateLiveSignal = () => {
    setIsAnalyzing(true);
    setLiveSignal(null);
    
    // Simulate 20-30 seconds analysis
    const delay = Math.floor(Math.random() * 10000) + 20000; // 20-30s
    
    setTimeout(() => {
      const signalTime = getDhakaTime(Math.floor(Math.random() * 3) + 2); // 2-4 mins later
      const signalDirection = Math.random() > 0.5 ? "BUY" : "PUT";
      
      const signalData = {
        market: selectedMarket,
        time: signalTime,
        direction: signalDirection,
        duration: "1 MINUTE"
      };
      
      setLiveSignal(signalData);
      setIsAnalyzing(false);
    }, delay);
  };

  const generateFutureSignals = () => {
    setIsGeneratingFuture(true);
    setGeneratedFutureSignals([]);
    
    setTimeout(() => {
      const signals: string[] = [];
      let lastMinutes = 5;
      
      for (let i = 0; i < numSignals; i++) {
        const market = futureMarkets[Math.floor(Math.random() * futureMarkets.length)];
        const timeOffset = lastMinutes + Math.floor(Math.random() * 10) + 2;
        const time = getDhakaTime(timeOffset);
        lastMinutes = timeOffset;
        
        let sigDir = direction;
        if (direction === "BOTH") {
          sigDir = Math.random() > 0.5 ? "BUY" : "PUT";
        }
        
        signals.push(`M1;${market.split(" ")[0]};${time};${sigDir}`);
      }
      
      setGeneratedFutureSignals(signals);
      setIsGeneratingFuture(false);
    }, 2000);
  };

  const formatFutureCopyText = () => {
    const header = `𝐓𝐈𝐌𝐄𝐙𝐎𝐍𝐄 ⏰ :𝐔𝐓𝐂 +6.00🇧🇩  
            
             𝐃𝐡𝐚𝐤𝐚 𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡  🇧🇩

 𝗧𝗥𝗔𝗗𝗘 1 𝗠𝗜𝗡𝗨𝗧𝗘

             𝗨𝗦𝗘 𝗢𝗡𝗘 𝗦𝗧𝗘𝗣 𝗠𝗧𝗚  \n\n`;
    
    const body = generatedFutureSignals.join("\n");
    const footer = `\n\n🔔 FOLLOW TREND AND DOJI AVOID⚠️`;
    
    return header + body + footer;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="p-6 border-b border-white/5 bg-[#0d0d0f]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white uppercase">ST QUOTEX</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-semibold">Trading Bot</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-wider">Live Server</span>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-6 pb-32">
        {/* Tabs */}
        <div className="flex p-1 bg-white/5 rounded-2xl mb-8 border border-white/5">
          <button
            onClick={() => setActiveTab("live")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "live" 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "text-white/40 hover:text-white/60"
            }`}
          >
            <Zap className="w-4 h-4" />
            Live Signal
          </button>
          <button
            onClick={() => setActiveTab("future")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "future" 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "text-white/40 hover:text-white/60"
            }`}
          >
            <Calendar className="w-4 h-4" />
            Future Signal
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "live" ? (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Select Market</label>
                <div className="relative group">
                  <select
                    value={selectedMarket}
                    onChange={(e) => setSelectedMarket(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium appearance-none focus:outline-none focus:border-blue-500/50 transition-all cursor-pointer group-hover:bg-white/10"
                  >
                    {ALL_MARKETS.map((m) => (
                      <option key={m} value={m} className="bg-[#0d0d0f]">{m}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                </div>
              </div>

              <button
                disabled={isAnalyzing}
                onClick={generateLiveSignal}
                className={`w-full py-5 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-3 ${
                  isAnalyzing 
                    ? "bg-white/5 text-white/20 cursor-not-allowed" 
                    : "bg-gradient-to-r from-blue-600 to-blue-500 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-blue-600/20"
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Market...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Generate Live Signal
                  </>
                )}
              </button>

              {isAnalyzing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 rounded-3xl bg-blue-600/5 border border-blue-500/10 flex flex-col items-center gap-6 text-center"
                >
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-blue-500/20 rounded-full animate-ping absolute inset-0" />
                    <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <Zap className="w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">Scanning Patterns</h3>
                    <p className="text-sm text-white/40 leading-relaxed">Our advanced algorithm is analyzing {selectedMarket} price action for high-probability entries...</p>
                  </div>
                </motion.div>
              )}

              {liveSignal && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-2xl shadow-blue-600/30 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Zap className="w-32 h-32" />
                  </div>
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-white/20 rounded-lg text-[10px] font-bold uppercase tracking-widest">Signal Ready</span>
                      <span className="text-xs font-medium text-white/70">{liveSignal.duration}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <h2 className="text-3xl font-black tracking-tight">{liveSignal.market.split(" ")[0]}</h2>
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-black">{liveSignal.time}</span>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm ${
                          liveSignal.direction === "BUY" ? "bg-green-400 text-green-950" : "bg-red-400 text-red-950"
                        }`}>
                          {liveSignal.direction === "BUY" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          {liveSignal.direction}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(`M1;${liveSignal.market.split(" ")[0]};${liveSignal.time};${liveSignal.direction}`)}
                      className="w-full py-4 bg-white text-blue-700 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copied!" : "Copy Signal"}
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="future"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Select Markets</label>
                  <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto p-2 bg-white/5 rounded-2xl border border-white/10 custom-scrollbar">
                    {ALL_MARKETS.map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          if (futureMarkets.includes(m)) {
                            if (futureMarkets.length > 1) setFutureMarkets(futureMarkets.filter(x => x !== m));
                          } else {
                            setFutureMarkets([...futureMarkets, m]);
                          }
                        }}
                        className={`text-left px-4 py-3 rounded-xl text-xs font-medium transition-all ${
                          futureMarkets.includes(m) ? "bg-blue-600 text-white" : "bg-white/5 text-white/40 hover:bg-white/10"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Quantity</label>
                    <input
                      type="number"
                      value={numSignals}
                      onChange={(e) => setNumSignals(parseInt(e.target.value) || 1)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Direction</label>
                    <select
                      value={direction}
                      onChange={(e) => setDirection(e.target.value as any)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium appearance-none focus:outline-none focus:border-blue-500/50"
                    >
                      <option value="BOTH" className="bg-[#0d0d0f]">BOTH</option>
                      <option value="BUY" className="bg-[#0d0d0f]">BUY ONLY</option>
                      <option value="PUT" className="bg-[#0d0d0f]">PUT ONLY</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                disabled={isGeneratingFuture}
                onClick={generateFutureSignals}
                className={`w-full py-5 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-3 ${
                  isGeneratingFuture 
                    ? "bg-white/5 text-white/20 cursor-not-allowed" 
                    : "bg-gradient-to-r from-blue-600 to-blue-500 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-blue-600/20"
                }`}
              >
                {isGeneratingFuture ? <Loader2 className="w-5 h-5 animate-spin" /> : <Calendar className="w-5 h-5" />}
                {isGeneratingFuture ? "Generating..." : "Generate Future Signals"}
              </button>

              {generatedFutureSignals.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Generated Signals</h3>
                      <button
                        onClick={() => handleCopy(formatFutureCopyText())}
                        className="flex items-center gap-2 text-blue-500 font-bold text-xs hover:text-blue-400 transition-colors"
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied ? "Copied All!" : "Copy All"}
                      </button>
                    </div>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                      {generatedFutureSignals.map((sig, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                          <code className="text-xs font-mono text-white/80">{sig}</code>
                          <div className={`w-2 h-2 rounded-full ${sig.includes("BUY") ? "bg-green-500" : "bg-red-500"}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Section */}
        <div className="mt-12 space-y-6">
          <div className="flex items-center gap-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
            <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0" />
            <p className="text-[11px] text-yellow-500/80 font-medium leading-relaxed uppercase tracking-wider">
              Follow trend and avoid trading during high volatility or Doji candles.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <a
              href={SOCIAL_LINKS.TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 bg-[#229ED9]/10 border border-[#229ED9]/20 rounded-2xl text-[#229ED9] text-xs font-bold hover:bg-[#229ED9]/20 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Telegram
            </a>
            <a
              href={SOCIAL_LINKS.TIKTOK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-xs font-bold hover:bg-white/10 transition-all"
            >
              <Video className="w-4 h-4" />
              TikTok
            </a>
          </div>

          <a
            href={SOCIAL_LINKS.OWNER_TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-5 bg-white text-black rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-white/90 transition-all"
          >
            Contact Owner @stOwnR
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a0c] to-transparent pointer-events-none">
        <div className="max-w-md mx-auto text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
            Developed by ST QUOTEX Team
          </p>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
