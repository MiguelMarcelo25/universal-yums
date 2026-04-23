export default function HeroBox() {
  return (
    <div className="relative w-full aspect-square max-w-xl mx-auto">
      {/* Back snack items poking out */}
      <div className="absolute top-2 left-6 w-20 h-28 rounded-lg bg-ketchup-500 rotate-[-10deg] shadow-lg flex items-center justify-center text-white font-black">
        <span className="text-xs">KR</span>
      </div>
      <div className="absolute top-0 right-16 w-24 h-32 rounded-lg bg-navy-700 rotate-[8deg] shadow-lg flex items-center justify-center text-sunny-300 font-black">
        <span className="text-xs">JP</span>
      </div>
      <div className="absolute top-8 right-0 w-16 h-24 rounded-lg bg-green-600 rotate-[14deg] shadow-lg flex items-center justify-center text-white font-black">
        <span className="text-xs">MX</span>
      </div>

      {/* The main box */}
      <div className="absolute inset-x-6 bottom-6 top-20 rounded-2xl bg-navy-600 shadow-pop overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, #fff 0 2px, transparent 2px), radial-gradient(circle at 60% 70%, #fff 0 3px, transparent 3px), radial-gradient(circle at 80% 20%, #fff 0 2px, transparent 2px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white">
            <svg viewBox="0 0 64 64" className="w-20 h-20 mx-auto mb-2">
              <circle cx="32" cy="32" r="28" fill="none" stroke="#fff" strokeWidth="3" />
              <ellipse cx="32" cy="32" rx="10" ry="28" fill="none" stroke="#fff" strokeWidth="3" />
              <line x1="4" y1="32" x2="60" y2="32" stroke="#fff" strokeWidth="3" />
            </svg>
            <div className="font-display font-bold text-2xl leading-tight">universal</div>
            <div className="font-display font-bold text-3xl leading-tight">yums</div>
          </div>
        </div>
      </div>

      {/* Flags sticking out */}
      <div className="absolute top-12 -right-2 w-14 h-10 bg-orange-500 rotate-12 shadow-md text-2xl grid place-items-center">
        🇮🇳
      </div>
      <div className="absolute bottom-24 -left-2 w-14 h-10 bg-green-500 -rotate-12 shadow-md text-2xl grid place-items-center">
        🇧🇷
      </div>

      {/* Front candies */}
      <div className="absolute -bottom-2 left-8 w-16 h-16 rounded-full bg-ketchup-500 shadow-lg text-2xl grid place-items-center">🍬</div>
      <div className="absolute -bottom-3 right-16 w-20 h-20 rounded-full bg-sunny-400 shadow-lg text-3xl grid place-items-center">🍭</div>
      <div className="absolute bottom-4 right-2 w-14 h-14 rounded-full bg-pink-400 shadow-lg text-xl grid place-items-center">🍡</div>
    </div>
  )
}
