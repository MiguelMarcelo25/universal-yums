import type { Plan } from '../types'
import { formatPrice } from '../lib/format'
import { Link } from 'react-router-dom'

export default function PlanCard({ plan, highlighted }: { plan: Plan; highlighted?: boolean }) {
  return (
    <div
      className={`relative rounded-3xl p-8 flex flex-col ${
        highlighted
          ? 'bg-navy-600 text-white shadow-pop scale-[1.02]'
          : 'bg-white border-2 border-navy-100'
      }`}
    >
      {plan.badge && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold rounded-full ${
            highlighted ? 'bg-sunny-400 text-navy-800' : 'bg-ketchup-500 text-white'
          }`}
        >
          {plan.badge}
        </span>
      )}
      <h3 className="font-display font-bold text-3xl">{plan.name}</h3>
      <p className={`mt-2 text-sm font-semibold ${highlighted ? 'text-white/90' : 'text-navy-700'}`}>
        {plan.description}
      </p>
      <div className="my-6">
        <span className="text-5xl font-black font-display">{formatPrice(plan.price_cents)}</span>
        <span className={`ml-1 font-semibold ${highlighted ? 'text-white/80' : 'text-navy-500'}`}>/month</span>
      </div>
      <ul className={`space-y-2 text-sm mb-6 font-semibold ${highlighted ? 'text-white/95' : 'text-navy-800'}`}>
        <li className="flex gap-2"><span>✔</span> {plan.snack_count}+ unique snacks per box</li>
        <li className="flex gap-2"><span>✔</span> New country every month</li>
        <li className="flex gap-2"><span>✔</span> Free shipping in the US</li>
        <li className="flex gap-2"><span>✔</span> Cancel anytime</li>
      </ul>
      <Link
        to={`/checkout?plan=${plan.slug}`}
        className={`mt-auto text-center ${highlighted ? 'btn bg-white text-navy-700 hover:bg-navy-50' : 'btn-primary'}`}
      >
        Subscribe
      </Link>
    </div>
  )
}
