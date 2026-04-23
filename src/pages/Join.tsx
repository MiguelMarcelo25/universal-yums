import { useEffect, useState } from 'react'
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
type QuizStep = { key: string; question: string; options: OptionDef[] }

const quizSteps: QuizStep[] = [
  {
    key: 'palate',
    question: 'How adventurous is your palate?',
    options: [
      { value: 'epic', icon: 'cloche', title: 'Take my taste buds on an epic journey, please!' },
      { value: 'open', icon: 'ramen', title: "I have my faves, but I'm open to new flavors." },
      { value: 'classic', icon: 'burger', title: 'I am all about the tried and true classics.' },
    ],
  },
  {
    key: 'flavors',
    question: 'What kinds of flavors tickle your taste buds?',
    options: [
      { value: 'sweet', icon: 'candy', title: 'I have a demanding sweet tooth.' },
      { value: 'salty', icon: 'salt', title: "I'm salty if I don't get enough salty!" },
      { value: 'spicy', icon: 'chili', title: 'I love spicy—bring on the heat!' },
      { value: 'umami', icon: 'mushroom', title: 'Rich umami flavors really hit the spot.' },
    ],
  },
  {
    key: 'snackType',
    question: 'What kind of snacks hit the spot?',
    options: [
      { value: 'chips', icon: 'chips', title: 'Crispy chips & crunchy crackers.' },
      { value: 'baked', icon: 'cupcake', title: "A baker's dozen cookies & cakes." },
      { value: 'candy', icon: 'lollipop', title: "Hard, chewy, or gummy, I'm a sucker for candy." },
      { value: 'chocolate', icon: 'chocolate', title: "I'm a chocoholic and I'm not ashamed!" },
    ],
  },
  {
    key: 'audience',
    question: 'Who are you munching with?',
    options: [
      { value: 'family', icon: 'house', title: 'My family & kids', subtitle: 'Adding a new flavor to family night.' },
      { value: 'partner', icon: 'rings', title: 'My spouse or significant other', subtitle: 'Making date night extra yummy!' },
      { value: 'friends', icon: 'friends', title: 'My friends or roommates', subtitle: 'A new "staying in" activity is on the menu.' },
      { value: 'me', icon: 'gift', title: 'Share? These are for me!' },
      { value: 'other', icon: 'chat', title: 'Other' },
    ],
  },
  {
    key: 'itinerary',
    question: 'How would you like to travel with us?',
    options: [
      { value: 'plan', icon: 'globeSearch', title: 'Plan My Own Itinerary', subtitle: 'I want to pick the countries.' },
      { value: 'surprise', icon: 'compass', title: 'Take Me Anywhere', subtitle: 'Curate the countries for me.' },
    ],
  },
]

const totalSteps = quizSteps.length + 1

export default function Join() {
  const [stepIdx, setStepIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [plans, setPlans] = useState<Plan[]>([])
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getPlans().then((p) => {
      setPlans(p)
      const mostPopular = p.find((x) => x.badge === 'Most Popular') ?? p[1] ?? p[0]
      if (mostPopular) setSelectedPlan(mostPopular.slug)
    })
  }, [])

  const handleAnswer = (key: string, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }))
    setStepIdx((i) => i + 1)
  }

  const back = () => {
    if (stepIdx === 0) navigate('/')
    else setStepIdx((i) => i - 1)
  }

  const isSizeStep = stepIdx === quizSteps.length
  const currentQuiz = quizSteps[stepIdx]

  const handleContinueSize = () => {
    if (!selectedPlan) return
    navigate(`/checkout?plan=${selectedPlan}`)
  }

  return (
    <div className="min-h-screen bg-navy-50/60 flex flex-col">
      {/* Top banner */}
      <div className="bg-navy-600 text-white text-center py-2 text-sm font-bold">
        Free Mystery Gift + Free Shipping in Continental US
      </div>

      {/* Header: back + centered logo */}
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
        {/* Orange mystery gift CTA */}
        <div className="container-page pt-8 pb-2">
          <div className="max-w-2xl mx-auto bg-ketchup-500 text-white text-center py-3 rounded-xl font-display font-bold shadow-ketchup">
            Get a free mystery gift with your first box!
          </div>
        </div>

        {/* Step content */}
        <main className="flex-1 container-page py-10 md:py-14">
          {!isSizeStep && currentQuiz && (
            <QuizStepView
              question={currentQuiz.question}
              options={currentQuiz.options}
              selected={answers[currentQuiz.key]}
              onSelect={(v) => handleAnswer(currentQuiz.key, v)}
            />
          )}
          {isSizeStep && (
            <SizeStep
              plans={plans}
              selected={selectedPlan}
              onSelect={setSelectedPlan}
              onContinue={handleContinueSize}
            />
          )}
        </main>

        {/* Progress dots */}
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

function SizeStep({
  plans,
  selected,
  onSelect,
  onContinue,
}: {
  plans: Plan[]
  selected: string | null
  onSelect: (slug: string) => void
  onContinue: () => void
}) {
  return (
    <div>
      <div className="max-w-2xl mx-auto border-2 border-navy-600 rounded-xl py-3 text-center font-display font-bold text-navy-700 text-2xl mb-10">
        Select a size
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {plans.map((plan) => {
          const isSelected = selected === plan.slug
          return (
            <button
              key={plan.id}
              onClick={() => onSelect(plan.slug)}
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
                {/* Radio */}
                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 grid place-items-center ${
                  isSelected ? 'border-navy-600 bg-navy-600' : 'border-navy-400 bg-white'
                }`}>
                  {isSelected && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>

                {/* Box illustration */}
                <div className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0 relative">
                  <div className="absolute inset-x-0 bottom-0 h-5/6 bg-navy-600 rounded-lg shadow-lg" />
                  <div className="absolute inset-x-2 top-2 h-10 bg-ketchup-400 rounded rotate-[-6deg] shadow-md" />
                  <div className="absolute left-6 top-0 w-8 h-14 bg-sunny-400 rotate-[8deg] rounded-sm shadow-md" />
                  <div className="absolute right-3 top-4 w-6 h-10 bg-green-500 rotate-[-10deg] rounded-sm shadow-md" />
                  <div className="absolute inset-x-3 bottom-2 h-2 bg-white/30 rounded" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-2xl md:text-3xl text-navy-700">{plan.name}</div>
                  <ul className="mt-1 text-sm text-navy-700 font-semibold list-disc list-inside">
                    <li>{plan.snack_count}+ snacks per box</li>
                    <li>{plan.snack_count >= 20 ? '20 page booklet' : '16 page booklet'} with trivia & games</li>
                  </ul>
                  <div className="mt-3 inline-flex items-center gap-2 bg-navy-600 text-white font-display font-bold text-xs md:text-sm rounded-full px-4 py-1.5">
                    STARTING AT {formatPrice(plan.price_cents).replace('.00', '')}
                  </div>
                </div>
              </div>
              <div className="pb-5 pl-5 text-xs font-display font-bold text-navy-700">
                {plan.snack_count} Snacks
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-10 text-center">
        <button onClick={onContinue} disabled={!selected} className="btn-primary text-base px-10">
          Continue →
        </button>
      </div>
    </div>
  )
}
