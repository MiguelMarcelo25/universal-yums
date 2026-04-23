import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import QuizOption from '../components/quiz/QuizOption'
import ProgressDots from '../components/quiz/ProgressDots'
import type { IconKey } from '../components/quiz/icons'
import { getPlans } from '../lib/api'
import type { Plan } from '../types'
import { formatPrice } from '../lib/format'

function GlobeLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" aria-hidden>
      <circle cx="32" cy="32" r="30" fill="#1f3a9e" />
      <ellipse cx="32" cy="32" rx="20" ry="20" fill="none" stroke="#fff" strokeWidth="2.5" />
      <ellipse cx="32" cy="32" rx="8" ry="20" fill="none" stroke="#fff" strokeWidth="2.5" />
      <line x1="12" y1="32" x2="52" y2="32" stroke="#fff" strokeWidth="2.5" />
    </svg>
  )
}

type OptionDef = { value: string; icon: IconKey; title: string; subtitle?: string }

const recipientOptions: OptionDef[] = [
  { value: 'family', icon: 'house', title: 'Family member', subtitle: "We're making family night extra tasty." },
  { value: 'partner', icon: 'rings', title: 'Spouse or significant other', subtitle: 'Couples that snack together stay together!' },
  { value: 'friend', icon: 'friends', title: 'A friend', subtitle: 'Nothing better than taste-testing with your bestie!' },
  { value: 'coworker', icon: 'person', title: 'A coworker or colleague', subtitle: 'The best desk neighbor gets the best snacks.' },
  { value: 'other', icon: 'chat', title: 'Someone else' },
]

const occasionOptions: OptionDef[] = [
  { value: 'birthday', icon: 'cake', title: 'A birthday', subtitle: 'Birthday cake is better with a side of yummy snacks.' },
  { value: 'anniversary', icon: 'anniversary', title: 'An anniversary', subtitle: 'Nothing says "I love our love" like sharing snacks.' },
  { value: 'thanks', icon: 'thankYou', title: 'Saying thank you', subtitle: '"You\'re awesome, here\'s some snacks" is something everyone wants to hear.' },
  { value: 'congrats', icon: 'glasses', title: 'Congratulations', subtitle: 'Graduations, weddings, or new jobs should be celebrated. Preferably with snacks.' },
  { value: 'other', icon: 'gift', title: 'Just because' },
]

const lengths = [
  { months: 12, label: '12 Months', badge: 'BEST VALUE', perBoxMultiplier: 1.0 },
  { months: 6, label: '6 Months', badge: null, perBoxMultiplier: 1.1 },
  { months: 3, label: '3 Months', badge: null, perBoxMultiplier: 1.2 },
] as const

export default function Gift() {
  const [stepIdx, setStepIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [plans, setPlans] = useState<Plan[]>([])
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [selectedLength, setSelectedLength] = useState<number>(6)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getPlans().then((p) => {
      setPlans(p)
      const popular = p.find((x) => x.badge === 'Most Popular') ?? p[1] ?? p[0]
      if (popular) setSelectedPlan(popular.slug)
    })
  }, [])

  const totalSteps = 4

  const back = () => {
    if (stepIdx === 0) navigate('/')
    else setStepIdx((i) => i - 1)
  }

  const pick = (key: string, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }))
    setStepIdx((i) => i + 1)
  }

  const handleClaim = (e: FormEvent) => {
    e.preventDefault()
    setStepIdx(3)
  }

  const handleContinue = () => {
    if (!selectedPlan) return
    navigate(`/checkout?plan=${selectedPlan}&length=${selectedLength}&gift=1`)
  }

  const pageBg = stepIdx === 2 ? 'bg-pink-200' : 'bg-navy-50/60'

  return (
    <div className={`min-h-screen flex flex-col ${pageBg} transition-colors`}>
      {/* Top banner */}
      <div className="bg-navy-600 text-white text-center py-2 text-sm font-bold">
        Free Mystery Gift + Free Shipping in Continental US
      </div>

      {/* Header */}
      <header className="bg-white border-b border-navy-100 relative h-20 flex items-center">
        <button
          onClick={back}
          className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 flex items-center gap-1 text-navy-800 font-display font-bold hover:text-navy-600"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
        <Link to="/" className="mx-auto flex items-center gap-2 font-display font-bold">
          <GlobeLogo />
          <div className="leading-none">
            <div className="text-xl text-navy-700 -mb-0.5">universal</div>
            <div className="text-2xl text-navy-700">yums</div>
          </div>
        </Link>
      </header>

      <div className="flex-1 flex flex-col">
        {stepIdx !== 2 && (
          <div className="container-page pt-8 pb-2">
            <div className="max-w-2xl mx-auto bg-ketchup-500 text-white text-center py-3 rounded-xl font-display font-bold shadow-ketchup">
              Get a free mystery gift with your first box!
            </div>
          </div>
        )}

        <main className="flex-1 container-page py-10 md:py-14">
          {stepIdx === 0 && (
            <QuizStepView
              question="Who are you giving the yummiest gift ever?"
              options={recipientOptions}
              selected={answers.recipient}
              onSelect={(v) => pick('recipient', v)}
            />
          )}

          {stepIdx === 1 && (
            <QuizStepView
              question="What's the occasion for the gift?"
              options={occasionOptions}
              selected={answers.occasion}
              onSelect={(v) => pick('occasion', v)}
            />
          )}

          {stepIdx === 2 && (
            <EmailCapture
              email={email}
              setEmail={setEmail}
              onSubmit={handleClaim}
              onSkip={() => setStepIdx(3)}
            />
          )}

          {stepIdx === 3 && (
            <ResultsStep
              plans={plans}
              selectedPlan={selectedPlan}
              onSelectPlan={setSelectedPlan}
              selectedLength={selectedLength}
              onSelectLength={setSelectedLength}
              onContinue={handleContinue}
            />
          )}
        </main>

        <div className="pb-10">
          <ProgressDots total={totalSteps} current={stepIdx} />
        </div>
      </div>
    </div>
  )
}

function QuizStepView({
  question,
  options,
  selected,
  onSelect,
}: {
  question: string
  options: OptionDef[]
  selected?: string
  onSelect: (v: string) => void
}) {
  return (
    <div>
      <h1 className="font-display font-bold text-4xl md:text-5xl text-navy-700 text-center max-w-2xl mx-auto">
        {question}
      </h1>
      <div className="mt-12 space-y-4">
        {options.map((o) => (
          <div key={o.value} className={selected === o.value ? 'ring-2 ring-navy-600 rounded-3xl' : ''}>
            <QuizOption
              icon={o.icon}
              title={o.title}
              subtitle={o.subtitle}
              onClick={() => onSelect(o.value)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function EmailCapture({
  email,
  setEmail,
  onSubmit,
  onSkip,
}: {
  email: string
  setEmail: (v: string) => void
  onSubmit: (e: FormEvent) => void
  onSkip: () => void
}) {
  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="font-display font-bold text-4xl md:text-5xl text-navy-700">
        Get A FREE Mystery Gift<br />With Your First Box!
      </h1>
      <p className="mt-5 font-display font-bold text-lg text-navy-700">
        Buy a subscription or gift and get a FREE<br />Mystery Gift with Sweet Goodies.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full rounded-xl px-5 py-4 bg-white border border-navy-200 focus:border-navy-500 focus:outline-none font-semibold text-navy-800"
        />
        <button type="submit" className="btn-primary text-base px-10 mx-auto">
          Claim Freebie
        </button>
      </form>

      <button onClick={onSkip} className="mt-5 text-navy-700 font-display font-bold underline hover:text-navy-800">
        Skip & View Results
      </button>

      {/* Mystery gift box illustration */}
      <div className="mt-10 mx-auto w-56 h-56 relative">
        <div className="absolute inset-x-4 bottom-0 h-32 bg-navy-600 rounded-md shadow-xl">
          <div className="absolute inset-0 opacity-25" style={{
            backgroundImage: 'radial-gradient(circle at 25% 30%, #fff 0 2px, transparent 2px), radial-gradient(circle at 70% 60%, #fff 0 2px, transparent 2px)',
            backgroundSize: '18px 18px',
          }} />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 bg-ketchup-500" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-10 w-16 h-20 bg-sunny-400 rounded-md shadow-xl grid place-items-center">
          <span className="text-3xl text-navy-700 font-black font-display">?</span>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-2 w-28 h-12 grid grid-cols-2">
          <div className="bg-ketchup-500 rounded-l-full transform -rotate-12 origin-right" />
          <div className="bg-ketchup-500 rounded-r-full transform rotate-12 origin-left" />
        </div>
      </div>
    </div>
  )
}

function ResultsStep({
  plans,
  selectedPlan,
  onSelectPlan,
  selectedLength,
  onSelectLength,
  onContinue,
}: {
  plans: Plan[]
  selectedPlan: string | null
  onSelectPlan: (slug: string) => void
  selectedLength: number
  onSelectLength: (months: number) => void
  onContinue: () => void
}) {
  const currentPlan = plans.find((p) => p.slug === selectedPlan) ?? plans[0]

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-center font-display font-bold text-2xl text-navy-700 mb-6">
        Select a gift size
      </h2>

      <div className="space-y-5">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.slug
          return (
            <button
              key={plan.id}
              onClick={() => onSelectPlan(plan.slug)}
              className={`w-full relative text-left bg-navy-50 rounded-2xl overflow-hidden transition-all border-2 ${
                isSelected ? 'border-navy-600 shadow-pop' : 'border-transparent hover:border-navy-300'
              }`}
            >
              {plan.badge === 'Most Popular' && (
                <div className="absolute top-0 right-0 bg-sunny-400 text-navy-800 text-xs font-display font-bold px-5 py-1.5 rounded-bl-xl">
                  MOST POPULAR
                </div>
              )}
              <div className="flex items-center gap-4 p-5">
                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 grid place-items-center ${
                  isSelected ? 'border-navy-600 bg-navy-600' : 'border-navy-400 bg-white'
                }`}>
                  {isSelected && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>

                {/* Box illustration with bow */}
                <div className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0 relative">
                  <div className="absolute inset-x-0 bottom-0 h-5/6 bg-navy-600 rounded-lg shadow-lg" />
                  <div className="absolute left-6 top-0 w-8 h-14 bg-sunny-400 rotate-[8deg] rounded-sm shadow-md" />
                  <div className="absolute right-3 top-4 w-6 h-10 bg-green-500 rotate-[-10deg] rounded-sm shadow-md" />
                  <div className="absolute inset-x-0 top-1/3 h-2 bg-ketchup-500" />
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-10 h-5 grid grid-cols-2">
                    <div className="bg-ketchup-500 rounded-l-full transform -rotate-12 origin-right" />
                    <div className="bg-ketchup-500 rounded-r-full transform rotate-12 origin-left" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-2xl md:text-3xl text-navy-700">{plan.name}</div>
                  <ul className="mt-1 text-sm text-navy-700 font-semibold list-disc list-inside">
                    <li>Give your loved one <strong>{plan.snack_count}+ snacks</strong> per box</li>
                    <li>{plan.snack_count >= 20 ? '20 page booklet' : '16 page booklet'} with trivia & games</li>
                    {plan.slug === 'super-yum' && <li>Bonus content: recipes, activities, and much more!</li>}
                  </ul>
                  <div className="mt-3 inline-flex items-center gap-2 bg-navy-600 text-white font-display font-bold text-xs md:text-sm rounded-full px-4 py-1.5">
                    STARTING AT {formatPrice(plan.price_cents).replace('.00', '')}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <h2 className="text-center font-display font-bold text-2xl text-navy-700 mt-12 mb-6">
        Select a gift length
      </h2>

      <div className="space-y-4">
        {lengths.map((len) => {
          const isSelected = selectedLength === len.months
          const perBox = Math.round(((currentPlan?.price_cents ?? 0) * len.perBoxMultiplier) / 100)
          const total = perBox * len.months
          return (
            <button
              key={len.months}
              onClick={() => onSelectLength(len.months)}
              className={`w-full relative text-left bg-navy-50 rounded-2xl transition-all border-2 ${
                isSelected ? 'border-navy-600 shadow-pop' : 'border-transparent hover:border-navy-300'
              }`}
            >
              {len.badge && (
                <div className="absolute -top-3 right-5 bg-sunny-400 text-navy-800 text-xs font-display font-bold px-4 py-1 rounded-full">
                  {len.badge}
                </div>
              )}
              <div className="flex items-center gap-4 p-5">
                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 grid place-items-center ${
                  isSelected ? 'border-navy-600 bg-navy-600' : 'border-navy-400 bg-white'
                }`}>
                  {isSelected && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-display font-bold text-xl text-navy-700">{len.label}</div>
                  <div className="text-sm text-navy-600 font-semibold">${perBox} / Box</div>
                </div>
                <div className="text-right">
                  <div className="inline-block bg-ketchup-500 text-white text-[10px] font-display font-bold px-3 py-1 rounded-full mb-1">
                    + FREE MYSTERY GIFT
                  </div>
                  <div className="font-display font-bold text-navy-800">Total: ${total}</div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-10 text-center">
        <button onClick={onContinue} disabled={!selectedPlan} className="btn-primary text-base px-10">
          Continue →
        </button>
      </div>
    </div>
  )
}
