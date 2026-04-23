import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBoxes, getCountries, getPlans, getProducts } from '../lib/api'
import type { Box, Country, Plan, Product } from '../types'
import BoxCard from '../components/BoxCard'
import CountryCard from '../components/CountryCard'
import PlanCard from '../components/PlanCard'
import ProductCard from '../components/ProductCard'
import HeroBox from '../components/HeroBox'

export default function Home() {
  const [boxes, setBoxes] = useState<Box[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [plans, setPlans] = useState<Plan[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])

  useEffect(() => {
    getBoxes().then((b) => setBoxes(b.filter((x) => x.featured).slice(0, 3)))
    getCountries().then((c) => setCountries(c.filter((x) => x.featured)))
    getPlans().then(setPlans)
    getProducts().then((p) => setFeaturedProducts(p.filter((x) => x.featured).slice(0, 4)))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="hero-yellow relative overflow-hidden">
        <div className="container-page py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-navy-800 leading-[1.05]">
              Take Your Tastebuds<br />
              On A Global Journey
            </h1>
            <p className="mt-6 text-lg md:text-xl text-navy-800 max-w-xl font-semibold">
              Try new snacks from a different country every month<br className="hidden md:inline" />
              —shipped right to your door.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/join" className="btn-navy text-base">Start Your Adventure</Link>
              <Link to="/subscribe" className="btn-outline-navy text-base">Give A Gift</Link>
            </div>
            <div className="mt-6 flex items-center gap-2 text-navy-800 font-bold">
              <span className="text-navy-700 tracking-tight">★★★★★</span>
              <span>Over 12 million boxes sold</span>
            </div>
          </div>
          <div>
            <HeroBox />
          </div>
        </div>
      </section>

      {/* This month's box — blue band */}
      <section className="bg-navy-600 text-white">
        <div className="container-page py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="inline-block bg-white text-navy-700 rounded-2xl rotate-[-6deg] px-6 py-3 font-display font-bold text-lg shadow-lg mb-6">
              ⭐ THIS MONTH'S BOX
            </div>
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-sunny-300 to-sunny-500 flag-bg grid place-items-center shadow-2xl relative overflow-hidden">
              <span className="text-[12rem] drop-shadow-xl">{boxes[0]?.country?.flag_emoji ?? '🇯🇵'}</span>
              <span className="absolute bottom-4 left-4 bg-white/95 text-navy-700 font-display font-bold text-sm px-3 py-1.5 rounded-full">
                {boxes[0]?.month ?? 'October'} {boxes[0]?.year ?? 2025}
              </span>
            </div>
          </div>
          <div>
            <h2 className="font-display font-bold text-5xl md:text-6xl">
              {boxes[0]?.name ?? 'Japan Box'}
            </h2>
            <p className="mt-4 text-lg text-white/90 max-w-lg">
              {boxes[0]?.description ??
                'A curated journey through one of the world\'s most exciting snack cultures.'}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                <div className="text-3xl font-display font-bold">12+</div>
                <div className="text-xs text-white/80 font-bold uppercase">Snacks</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                <div className="text-3xl font-display font-bold">1</div>
                <div className="text-xs text-white/80 font-bold uppercase">Country</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                <div className="text-3xl font-display font-bold">∞</div>
                <div className="text-xs text-white/80 font-bold uppercase">Smiles</div>
              </div>
            </div>
            <Link to={`/boxes/${boxes[0]?.slug ?? 'japan-box'}`} className="btn-primary mt-8">
              See what's inside →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="chip">How it works</span>
          <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-navy-800">
            Three stops to a world of flavor
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { n: '1', icon: '🌍', title: 'Pick a country', desc: 'We surprise you with a new country every month.' },
            { n: '2', icon: '📦', title: 'Get your box', desc: '12–30 snacks curated and shipped free to your door.' },
            { n: '3', icon: '🍬', title: 'Taste the world', desc: 'Munch through sweet, spicy, savory — all new to you.' },
          ].map((step) => (
            <div key={step.n} className="bg-cream rounded-3xl p-8 text-center border-2 border-navy-100 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-ketchup-500 text-white font-display font-bold grid place-items-center shadow-ketchup">
                {step.n}
              </div>
              <div className="text-5xl">{step.icon}</div>
              <h3 className="mt-4 font-display font-bold text-2xl text-navy-800">{step.title}</h3>
              <p className="mt-2 text-navy-700 text-sm font-semibold">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent boxes */}
      <section className="bg-cream">
        <div className="container-page py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="chip">Recent Boxes</span>
              <h2 className="mt-3 font-display font-bold text-4xl text-navy-800">Past adventures</h2>
            </div>
            <Link to="/subscribe" className="hidden md:inline text-navy-700 font-bold hover:underline">
              See all plans →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {boxes.map((box) => (
              <BoxCard key={box.id} box={box} />
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="container-page py-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="chip">Subscribe</span>
          <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-navy-800">Pick your box</h2>
          <p className="mt-3 text-navy-700 font-semibold">Cancel anytime. Free shipping in the US.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} highlighted={i === 1} />
          ))}
        </div>
      </section>

      {/* Countries */}
      <section className="bg-cream">
        <div className="container-page py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="chip">Explore</span>
              <h2 className="mt-3 font-display font-bold text-4xl text-navy-800">Shop by country</h2>
            </div>
            <Link to="/shop" className="hidden md:inline text-navy-700 font-bold hover:underline">
              All countries →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {countries.map((c) => (
              <CountryCard key={c.id} country={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Best-sellers */}
      <section className="container-page py-20">
        <span className="chip">Best-sellers</span>
        <h2 className="mt-3 font-display font-bold text-4xl text-navy-800 mb-8">Fan favorites</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="bg-navy-600 rounded-3xl p-10 md:p-16 text-white text-center shadow-pop relative overflow-hidden">
          <div className="absolute top-0 right-0 text-[12rem] opacity-10 -translate-y-8">🌏</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl relative">Ready to travel by tastebud?</h2>
          <p className="mt-4 text-white/90 max-w-xl mx-auto relative font-semibold">
            Over 12 million boxes delivered. Your turn.
          </p>
          <Link to="/subscribe" className="btn-primary mt-8 text-base relative">
            Get my first box →
          </Link>
        </div>
      </section>
    </div>
  )
}
