import { useEffect, useState } from 'react'
import { getPlans } from '../lib/api'
import type { Plan } from '../types'
import PlanCard from '../components/PlanCard'

export default function Subscribe() {
  const [plans, setPlans] = useState<Plan[]>([])

  useEffect(() => {
    getPlans().then(setPlans)
  }, [])

  return (
    <div className="container-page py-16">
      <div className="text-center max-w-2xl mx-auto">
        <span className="chip">Subscription</span>
        <h1 className="mt-4 font-display font-black text-5xl md:text-6xl">Choose your box</h1>
        <p className="mt-4 text-gray-600 text-lg">
          Every month, taste snacks from a new country. Cancel anytime, free US shipping.
        </p>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-6 md:gap-8">
        {plans.map((plan, i) => (
          <PlanCard key={plan.id} plan={plan} highlighted={i === 1} />
        ))}
      </div>

      <div className="mt-20 grid md:grid-cols-3 gap-6 text-center">
        {[
          { icon: '🚚', title: 'Free US shipping', desc: 'Every box ships to you free within the continental US.' },
          { icon: '⏸️', title: 'Skip or pause', desc: 'Going on vacation? Pause or skip a month anytime.' },
          { icon: '💝', title: 'Perfect as gifts', desc: 'Send a box to a curious friend — single-box gifting available.' },
        ].map((f, i) => (
          <div key={i} className="p-6">
            <div className="text-4xl">{f.icon}</div>
            <h3 className="mt-3 font-display font-bold text-xl">{f.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-white rounded-3xl p-10 border border-navy-100">
        <h2 className="font-display font-black text-3xl text-center">Frequently asked</h2>
        <div className="mt-8 max-w-3xl mx-auto space-y-4">
          {[
            { q: 'When does my box ship?', a: 'Boxes ship on the 15th of each month, so you can look forward to snacks every month.' },
            { q: 'Can I cancel anytime?', a: 'Yes — cancel or skip a month from your account page. No commitments.' },
            { q: 'Do you ship internationally?', a: 'We currently ship within the US and Canada. International expansion is coming soon.' },
            { q: 'Are the snacks in-date?', a: 'Every snack is hand-selected and checked to be fresh and in-date when shipped.' },
          ].map((faq, i) => (
            <details key={i} className="group border-b border-navy-100 pb-4">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                {faq.q}
                <span className="text-ketchup-500 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-gray-600 text-sm">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
