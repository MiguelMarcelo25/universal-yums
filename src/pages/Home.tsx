import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { getBoxes, getCountries, getPlans, getProducts } from '../lib/api'
import type { Box, Country, Plan, Product } from '../types'
import BoxCard from '../components/BoxCard'
import CountryCard from '../components/CountryCard'
import PlanCard from '../components/PlanCard'
import ProductCard from '../components/ProductCard'
import HeroBox from '../components/HeroBox'
import Reveal from '../components/motion/Reveal'
import Marquee from '../components/motion/Marquee'

export default function Home() {
  const [boxes, setBoxes] = useState<Box[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [plans, setPlans] = useState<Plan[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [allCountries, setAllCountries] = useState<Country[]>([])

  const reduce = useReducedMotion()

  useEffect(() => {
    getBoxes().then((b) => setBoxes(b.filter((x) => x.featured).slice(0, 3)))
    getCountries().then((c) => {
      setCountries(c.filter((x) => x.featured))
      setAllCountries(c)
    })
    getPlans().then(setPlans)
    getProducts().then((p) => setFeaturedProducts(p.filter((x) => x.featured).slice(0, 4)))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="hero-yellow relative overflow-hidden">
        <div className="container-page py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-navy-800 leading-[1.05]"
              initial={reduce ? false : 'hidden'}
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
              }}
            >
              {['Take', 'Your', 'Tastebuds'].map((w, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-3"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 14, stiffness: 200 } },
                  }}
                >
                  {w}
                </motion.span>
              ))}
              <br />
              {['On', 'A', 'Global', 'Journey'].map((w, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-3"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 14, stiffness: 200 } },
                  }}
                >
                  {w}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="mt-6 text-lg md:text-xl text-navy-800 max-w-xl font-semibold"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Try new snacks from a different country every month
              <br className="hidden md:inline" />
              —shipped right to your door.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link to="/join" className="btn-navy text-base">Start Your Adventure</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link to="/gift" className="btn-outline-navy text-base">Give A Gift</Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-6 flex items-center gap-2 text-navy-800 font-bold"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <span className="text-navy-700 tracking-tight">★★★★★</span>
              <span>Over 12 million boxes sold</span>
            </motion.div>
          </div>
          <div>
            <HeroBox />
          </div>
        </div>
      </section>

      {/* Country flag marquee — first taste of motion */}
      <section className="bg-navy-600 text-white py-6 text-current">
        <Marquee speed="normal" className="text-navy-600">
          {allCountries.concat(allCountries).map((c, i) => (
            <div
              key={`flag-${i}`}
              className="flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur rounded-full whitespace-nowrap"
            >
              <span className="text-3xl">{c.flag_emoji}</span>
              <span className="font-display font-bold text-lg">{c.name}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* This month's box — blue band */}
      <section className="bg-navy-700 text-white">
        <div className="container-page py-20 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative">
              <div className="inline-block bg-white text-navy-700 rounded-2xl rotate-[-6deg] px-6 py-3 font-display font-bold text-lg shadow-lg mb-6 animate-wiggle">
                ⭐ THIS MONTH'S BOX
              </div>
              <motion.div
                whileHover={{ scale: 1.02, rotate: -1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-sunny-300 to-sunny-500 flag-bg grid place-items-center shadow-2xl relative overflow-hidden"
              >
                <span className="text-[12rem] drop-shadow-xl">{boxes[0]?.country?.flag_emoji ?? '🇯🇵'}</span>
                <span className="absolute bottom-4 left-4 bg-white/95 text-navy-700 font-display font-bold text-sm px-3 py-1.5 rounded-full">
                  {boxes[0]?.month ?? 'October'} {boxes[0]?.year ?? 2025}
                </span>
              </motion.div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <h2 className="font-display font-bold text-5xl md:text-6xl">
                {boxes[0]?.name ?? 'Japan Box'}
              </h2>
              <p className="mt-4 text-lg text-white/90 max-w-lg">
                {boxes[0]?.description ??
                  "A curated journey through one of the world's most exciting snack cultures."}
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
                {[
                  { val: '12+', label: 'Snacks' },
                  { val: '1', label: 'Country' },
                  { val: '∞', label: 'Smiles' },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center"
                  >
                    <div className="text-3xl font-display font-bold">{s.val}</div>
                    <div className="text-xs text-white/80 font-bold uppercase">{s.label}</div>
                  </motion.div>
                ))}
              </div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block mt-8">
                <Link to={`/boxes/${boxes[0]?.slug ?? 'japan-box'}`} className="btn-primary animate-pulse-glow">
                  See what's inside →
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-20">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="chip">How it works</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-navy-800">
              Three stops to a world of flavor
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { n: '1', icon: '🌍', title: 'Pick a country', desc: 'We surprise you with a new country every month.' },
            { n: '2', icon: '📦', title: 'Get your box', desc: '12–30 snacks curated and shipped free to your door.' },
            { n: '3', icon: '🍬', title: 'Taste the world', desc: 'Munch through sweet, spicy, savory — all new to you.' },
          ].map((step, i) => (
            <Reveal key={step.n} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -8, rotate: -1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 15 }}
                className="bg-cream rounded-3xl p-8 text-center border-2 border-navy-100 relative"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-ketchup-500 text-white font-display font-bold grid place-items-center shadow-ketchup">
                  {step.n}
                </div>
                <div className="text-5xl animate-bounce-soft" style={{ animationDelay: `${i * 0.3}s` }}>{step.icon}</div>
                <h3 className="mt-4 font-display font-bold text-2xl text-navy-800">{step.title}</h3>
                <p className="mt-2 text-navy-700 text-sm font-semibold">{step.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Recent boxes */}
      <section className="bg-cream">
        <div className="container-page py-20">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="chip">Recent Boxes</span>
                <h2 className="mt-3 font-display font-bold text-4xl text-navy-800">Past adventures</h2>
              </div>
              <Link to="/subscribe" className="hidden md:inline text-navy-700 font-bold hover:underline">
                See all plans →
              </Link>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {boxes.map((box, i) => (
              <Reveal key={box.id} delay={i * 0.1}>
                <BoxCard box={box} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="container-page py-20">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="chip">Subscribe</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-navy-800">Pick your box</h2>
            <p className="mt-3 text-navy-700 font-semibold">Cancel anytime. Free shipping in the US.</p>
          </div>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.12}>
              <PlanCard plan={plan} highlighted={i === 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Best-sellers MARQUEE — moving products */}
      <section className="bg-cream py-12">
        <div className="container-page mb-6">
          <span className="chip">Fan favorites</span>
          <h2 className="mt-3 font-display font-bold text-4xl text-navy-800">Best-sellers in motion</h2>
        </div>
        <Marquee className="text-cream py-4">
          {featuredProducts.concat(featuredProducts).concat(featuredProducts).map((p, i) => (
            <div key={`fav-${i}`} className="w-56 flex-shrink-0">
              <ProductCard product={p} />
            </div>
          ))}
        </Marquee>
        <Marquee direction="reverse" className="text-cream py-4 mt-2">
          {featuredProducts.slice().reverse().concat(featuredProducts).concat(featuredProducts).map((p, i) => (
            <div key={`fav2-${i}`} className="w-56 flex-shrink-0">
              <ProductCard product={p} />
            </div>
          ))}
        </Marquee>
      </section>

      {/* Countries */}
      <section className="bg-white">
        <div className="container-page py-20">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="chip">Explore</span>
                <h2 className="mt-3 font-display font-bold text-4xl text-navy-800">Shop by country</h2>
              </div>
              <Link to="/shop" className="hidden md:inline text-navy-700 font-bold hover:underline">
                All countries →
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {countries.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.07}>
                <CountryCard country={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products grid (static) */}
      <section className="container-page py-20">
        <Reveal>
          <span className="chip">Best-sellers</span>
          <h2 className="mt-3 font-display font-bold text-4xl text-navy-800 mb-8">Pick a snack, any snack</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <Reveal>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="bg-navy-600 rounded-3xl p-10 md:p-16 text-white text-center shadow-pop relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 text-[12rem] opacity-10 -translate-y-8 animate-spin-slow">🌏</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl relative">Ready to travel by tastebud?</h2>
            <p className="mt-4 text-white/90 max-w-xl mx-auto relative font-semibold">
              Over 12 million boxes delivered. Your turn.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="inline-block mt-8 relative">
              <Link to="/join" className="btn-primary animate-pulse-glow text-base">
                Get my first box →
              </Link>
            </motion.div>
          </motion.div>
        </Reveal>
      </section>
    </div>
  )
}
