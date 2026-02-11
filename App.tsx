
import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { calculateKin } from './services/mayaService';
import { getOracleRevelation } from './services/localOracleService';
import { ReadingResult } from './types';
import { LOADING_MESSAGES } from './constants';

const App: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [result, setResult] = useState<ReadingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: number;
    if (loading) {
      interval = window.setInterval(() => {
        setLoadingMsg(prev => {
          const currentIndex = LOADING_MESSAGES.indexOf(prev);
          return LOADING_MESSAGES[(currentIndex + 1) % LOADING_MESSAGES.length];
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleReveal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdate || !userName) return;

    setLoading(true);
    setError(null);
    try {
      const kin = calculateKin(birthdate);
      const revelation = await getOracleRevelation(kin, userName);
      setResult({ kin, revelation, userName });
    } catch (err) {
      console.error(err);
      setError("No se pudo sintonizar la frecuencia. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main container locked to viewport height to prevent full page scrolling
    <div className="h-screen supports-[height:100dvh]:h-[100dvh] w-full flex flex-col items-center justify-center p-4 selection:bg-[#D4AF37]/30 font-['Poppins'] text-white overflow-hidden relative">
      
      {!result ? (
        <div className="w-full max-w-[420px] fade-in flex flex-col items-center h-full justify-center relative z-10">
          {/* Header Texts */}
          <div className="text-center mb-8 flex-shrink-0">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-3 tracking-tight text-glow">
              El Primer Reflejo
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-semibold opacity-80">
              Prueba quién eres
            </p>
          </div>

          {/* Form Card */}
          <div className="w-full relative glass-soft p-8 py-12 rounded-3xl min-h-[500px] max-h-[65vh] flex flex-col justify-center shadow-2xl flex-shrink-0 z-20">
            <form onSubmit={handleReveal} className="space-y-10">
              <div className="space-y-8">
                <div className="relative group text-center">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Tu Nombre"
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] transition-all duration-500 text-2xl font-light tracking-wide text-center"
                    required
                  />
                </div>

                <div className="relative group text-center">
                  <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all duration-500 text-2xl font-light tracking-wide text-center"
                    required
                  />
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#D4AF37]/60 mt-3 font-medium">
                    Fecha de Aparición
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !birthdate || !userName}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] hover:to-[#D4AF37] hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed text-[#24211E] font-bold py-4 px-6 rounded-2xl transition-all duration-500 flex items-center justify-center gap-4 mt-12 tracking-[0.2em] text-[10px] uppercase shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    <span>{loadingMsg}</span>
                  </>
                ) : (
                  <>
                    <span>Ver mi lectura</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
              
              {error && (
                <p className="text-red-300/70 text-center text-xs mt-6 font-light tracking-wide">{error}</p>
              )}
            </form>
          </div>

          <p className="text-center mt-10 text-[9px] uppercase tracking-[0.3em] text-white/30 flex-shrink-0">
            Yo Soy otro Tú
          </p>
        </div>
      ) : (
        <div className="w-full max-w-[420px] fade-in flex flex-col items-center h-full pt-8 pb-4 relative">
          
          {/* Header Texts */}
          <div className="text-center mb-6 flex-shrink-0 relative z-30">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-3 tracking-tight text-glow">
              El Primer Reflejo
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-semibold opacity-80">
              Prueba quién eres
            </p>
          </div>

          {/* Result Card - Uses flex-1 to take available space but respects boundaries */}
          <div className="glass-soft rounded-3xl p-6 py-8 w-full relative text-center flex-1 min-h-0 flex flex-col items-center justify-between z-20 shadow-2xl mb-2">
             {/* Decorative top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#D4AF37]/50 blur-[20px]"></div>
            
            {/* Identity Header */}
            <div className="w-full flex-shrink-0 mb-4">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] block mb-2 font-semibold opacity-90">
                Tu Identidad
              </span>
              <h2 className="text-3xl font-light text-white tracking-tight leading-tight text-glow drop-shadow-lg mb-2">
                {result.kin.sealName} {result.kin.toneName}
              </h2>
              <div className="inline-block border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-3 py-1 rounded-full backdrop-blur-sm">
                 <span className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                  Kin {result.kin.kinNumber}
                </span>
              </div>
            </div>

            {/* Content Hook - Scrollable container for text */}
            <div className="flex flex-col gap-5 relative z-10 w-full overflow-y-auto no-scrollbar flex-grow justify-center">
              {/* Validation Phrase */}
              <p className="text-xl text-white font-light leading-snug italic text-glow opacity-95 px-2">
                "{result.revelation.identityPhrase}"
              </p>
              
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mx-auto flex-shrink-0 my-2"></div>

              {/* Mystery/Shadow Hook - Added Label */}
              <div className="bg-[#1A1816]/60 p-5 pt-7 rounded-xl border border-white/5 shadow-inner relative mt-2">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#24211E] px-3 py-0.5 border border-white/5 rounded-full text-[8px] uppercase tracking-[0.25em] text-[#D4AF37]/70 shadow-lg">
                  Tu Sombra
                </span>
                <p className="text-base text-white/80 font-light leading-relaxed tracking-wide">
                  {result.revelation.mysteryHook}
                </p>
              </div>
            </div>

            {/* Teaser CTA text */}
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 relative z-30 pt-4 flex-shrink-0">
              Descubre tu mapa completo
            </p>
          </div>

          {/* Conversion Arrow - Positioned BELOW the card with slight negative margin for connection */}
          {/* h-20 defines the visible window. img h-[400%] scales it up so we only see the middle slice. */}
          <div className="w-full h-20 relative z-10 flex justify-center flex-shrink-0 overflow-hidden -mt-2 opacity-90 hover:opacity-100 transition-opacity duration-500 cursor-pointer">
             <div className="w-full h-full flex items-center justify-center relative">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0970/0029/2630/files/A.png?v=1770651402" 
                  alt="Continuar" 
                  className="absolute w-[300px] max-w-none h-[400%] object-cover object-center animate-float-dynamic mix-blend-screen drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] pointer-events-auto"
                />
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
