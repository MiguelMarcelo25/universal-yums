import Floaty from './motion/Floaty'

export default function HeroBox() {
  return (
    <div className="relative w-full aspect-square max-w-xl mx-auto">
      {/* Back snack items poking out */}
      <Floaty variant="float-slow" delay={0} className="absolute top-2 left-6 z-10">
        <div className="w-20 h-28 rounded-lg bg-ketchup-500 rotate-[-10deg] shadow-lg flex items-center justify-center text-white font-black">
          <span className="text-xs">KR</span>
        </div>
      </Floaty>
      <Floaty variant="float" delay={0.4} className="absolute top-0 right-16 z-10">
        <div className="w-24 h-32 rounded-lg bg-navy-700 rotate-[8deg] shadow-lg flex items-center justify-center text-sunny-300 font-black">
          <span className="text-xs">JP</span>
        </div>
      </Floaty>
      <Floaty variant="float-slow" delay={1.2} className="absolute top-8 right-0 z-10">
        <div className="w-16 h-24 rounded-lg bg-green-600 rotate-[14deg] shadow-lg flex items-center justify-center text-white font-black">
          <span className="text-xs">MX</span>
        </div>
      </Floaty>

      {/* The main box (subtly drifts) */}
      <Floaty variant="float-slow" delay={0.6} className="absolute inset-x-6 bottom-6 top-20">
        <div className="relative h-full rounded-2xl bg-navy-600 shadow-pop overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 30%, #fff 0 2px, transparent 2px), radial-gradient(circle at 60% 70%, #fff 0 3px, transparent 3px), radial-gradient(circle at 80% 20%, #fff 0 2px, transparent 2px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white">
              <svg viewBox="0 0 64 64" className="w-20 h-20 mx-auto mb-2 animate-spin-slow">
                <circle cx="32" cy="32" r="28" fill="none" stroke="#fff" strokeWidth="3" />
                <ellipse cx="32" cy="32" rx="10" ry="28" fill="none" stroke="#fff" strokeWidth="3" />
                <line x1="4" y1="32" x2="60" y2="32" stroke="#fff" strokeWidth="3" />
              </svg>
              <div className="font-display font-bold text-2xl leading-tight">universal</div>
              <div className="font-display font-bold text-3xl leading-tight">yums</div>
            </div>
          </div>
        </div>
      </Floaty>

      {/* Flags peeking out */}
      <Floaty variant="wiggle" className="absolute top-12 -right-2 z-20">
        <div className="w-14 h-10 bg-orange-500 shadow-md text-2xl grid place-items-center">🇮🇳</div>
      </Floaty>
      <Floaty variant="wiggle" delay={0.5} className="absolute bottom-24 -left-2 z-20">
        <div className="w-14 h-10 bg-green-500 shadow-md text-2xl grid place-items-center">🇧🇷</div>
      </Floaty>

      {/* Front candies — different bounce/float rates */}
      <Floaty variant="bounce-soft" delay={0} className="absolute -bottom-2 left-8 z-30">
        <div className="w-16 h-16 rounded-full bg-ketchup-500 shadow-lg text-2xl grid place-items-center">🍬</div>
      </Floaty>
      <Floaty variant="bounce-soft" delay={0.3} className="absolute -bottom-3 right-16 z-30">
        <div className="w-20 h-20 rounded-full bg-sunny-400 shadow-lg text-3xl grid place-items-center">🍭</div>
      </Floaty>
      <Floaty variant="bounce-soft" delay={0.7} className="absolute bottom-4 right-2 z-30">
        <div className="w-14 h-14 rounded-full bg-pink-400 shadow-lg text-xl grid place-items-center">🍡</div>
      </Floaty>

      {/* Sparkles */}
      <span className="absolute top-6 left-2 text-2xl animate-sparkle" style={{ animationDelay: '0.2s' }}>✨</span>
      <span className="absolute top-32 right-4 text-xl animate-sparkle" style={{ animationDelay: '0.9s' }}>✨</span>
      <span className="absolute bottom-32 left-12 text-lg animate-sparkle" style={{ animationDelay: '1.5s' }}>✨</span>
    </div>
  )
}
