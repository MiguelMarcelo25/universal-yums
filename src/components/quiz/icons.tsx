type IconProps = { className?: string }

const base = 'w-14 h-14 text-navy-600'
const props = (p: IconProps) => ({
  viewBox: '0 0 64 64',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: `${base} ${p.className ?? ''}`,
})

export const IconCloche = (p: IconProps) => (
  <svg {...props(p)}>
    <path d="M10 48h44" />
    <path d="M14 48a18 18 0 0 1 36 0" />
    <circle cx="32" cy="18" r="2" fill="currentColor" />
    <path d="M32 16v4" />
  </svg>
)

export const IconRamen = (p: IconProps) => (
  <svg {...props(p)}>
    <path d="M10 32h44l-2 6a10 10 0 0 1-9 7H21a10 10 0 0 1-9-7l-2-6z" />
    <path d="M22 28c-2-2-2-5 0-7M30 26c-2-2-2-5 0-7M38 28c-2-2-2-5 0-7" />
    <path d="M44 18l6-6M50 18l4-4" strokeWidth="3" />
  </svg>
)

export const IconBurger = (p: IconProps) => (
  <svg {...props(p)}>
    <path d="M10 30a22 10 0 0 1 44 0z" />
    <path d="M8 34h48v2a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4z" />
    <path d="M10 44h44" />
    <path d="M10 48a4 4 0 0 0 4 4h36a4 4 0 0 0 4-4" />
  </svg>
)

export const IconCandy = (p: IconProps) => (
  <svg {...props(p)}>
    <rect x="18" y="22" width="28" height="20" rx="4" />
    <path d="M18 28l-10-6v20l10-6M46 28l10-6v20l-10-6" />
    <path d="M26 32h12" />
  </svg>
)

export const IconSalt = (p: IconProps) => (
  <svg {...props(p)}>
    <circle cx="32" cy="32" r="14" />
    <circle cx="20" cy="18" r="2" fill="currentColor" />
    <circle cx="46" cy="14" r="2" fill="currentColor" />
    <circle cx="50" cy="30" r="2" fill="currentColor" />
    <circle cx="14" cy="44" r="2" fill="currentColor" />
    <circle cx="48" cy="48" r="2" fill="currentColor" />
  </svg>
)

export const IconChili = (p: IconProps) => (
  <svg {...props(p)}>
    <path d="M14 46c0-14 12-26 28-26 4 0 8 1 10 3 0 18-14 32-30 32-4 0-8-3-8-9z" />
    <path d="M42 20c2-4 6-6 10-6" />
  </svg>
)

export const IconMushroom = (p: IconProps) => (
  <svg {...props(p)}>
    <path d="M12 30a20 14 0 0 1 40 0z" />
    <path d="M24 30v20a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V30" />
    <circle cx="22" cy="24" r="2" fill="currentColor" />
    <circle cx="34" cy="20" r="2" fill="currentColor" />
    <circle cx="44" cy="26" r="2" fill="currentColor" />
  </svg>
)

export const IconChips = (p: IconProps) => (
  <svg {...props(p)}>
    <path d="M20 10h24l8 18-20 26L12 28z" />
    <path d="M28 28l-2 6M34 26l2 8M40 30l-1 6" />
  </svg>
)

export const IconCupcake = (p: IconProps) => (
  <svg {...props(p)}>
    <path d="M18 32h28l-4 18a4 4 0 0 1-4 3H26a4 4 0 0 1-4-3z" />
    <path d="M16 32a6 6 0 0 1 4-6 8 8 0 0 1 16-2 6 6 0 0 1 12 2 6 6 0 0 1 0 6z" />
    <path d="M32 14v-4M28 12l-2-2M36 12l2-2" />
  </svg>
)

export const IconLollipop = (p: IconProps) => (
  <svg {...props(p)}>
    <circle cx="24" cy="24" r="14" />
    <path d="M24 10a14 14 0 0 1 0 28M14 18a14 14 0 0 1 20 0M12 30a14 14 0 0 1 24 0" />
    <path d="M34 34l16 20" strokeWidth="3" />
  </svg>
)

export const IconChocolate = (p: IconProps) => (
  <svg {...props(p)}>
    <rect x="12" y="12" width="40" height="40" rx="3" />
    <path d="M12 26h40M12 40h40M26 12v40M40 12v40" />
  </svg>
)

export const IconHouse = (p: IconProps) => (
  <svg {...props(p)}>
    <path d="M10 30L32 10l22 20v22a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2z" />
    <path d="M32 44c-4-2-8-6-8-10a4 4 0 0 1 8-2 4 4 0 0 1 8 2c0 4-4 8-8 10z" fill="currentColor" />
  </svg>
)

export const IconRings = (p: IconProps) => (
  <svg {...props(p)}>
    <circle cx="24" cy="36" r="14" />
    <circle cx="40" cy="36" r="14" />
    <path d="M22 18l2-6h4l2 6M34 18l2-6h4l2 6" />
  </svg>
)

export const IconFriends = (p: IconProps) => (
  <svg {...props(p)}>
    <path d="M14 42l6-10a6 6 0 0 1 10 0l2 4 2-4a6 6 0 0 1 10 0l6 10" />
    <path d="M20 28c-2-2-2-4 0-6s4-2 6 0M44 28c2-2 2-4 0-6s-4-2-6 0" />
    <path d="M14 42v6h36v-6" />
  </svg>
)

export const IconGift = (p: IconProps) => (
  <svg {...props(p)}>
    <rect x="10" y="24" width="44" height="28" rx="2" />
    <path d="M8 18h48v8H8zM32 18v34M22 18c-6 0-6-8 0-8 5 0 10 8 10 8M42 18c6 0 6-8 0-8-5 0-10 8-10 8" />
  </svg>
)

export const IconChat = (p: IconProps) => (
  <svg {...props(p)}>
    <path d="M8 18a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H22l-8 8V36h-2a4 4 0 0 1-4-4z" />
    <path d="M44 26h8a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-2v6l-6-6h-8a4 4 0 0 1-4-4" />
  </svg>
)

export const IconGlobeSearch = (p: IconProps) => (
  <svg {...props(p)}>
    <circle cx="28" cy="28" r="16" />
    <ellipse cx="28" cy="28" rx="8" ry="16" />
    <path d="M12 28h32" />
    <path d="M40 40l12 12" strokeWidth="3" />
  </svg>
)

export const IconCompass = (p: IconProps) => (
  <svg {...props(p)}>
    <rect x="12" y="18" width="40" height="32" rx="3" />
    <path d="M8 18l10-8h28l10 8M28 34l4-6 4 6M32 28v8" fill="currentColor" />
  </svg>
)

export const IconPerson = (p: IconProps) => (
  <svg {...props(p)}>
    <circle cx="32" cy="22" r="9" />
    <path d="M14 52a18 18 0 0 1 36 0z" />
  </svg>
)

export const IconCake = (p: IconProps) => (
  <svg {...props(p)}>
    <path d="M14 38h36v12a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2z" />
    <path d="M14 38a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4" />
    <path d="M20 34V22M32 34V20M44 34V22" />
    <path d="M18 18c0-2 2-4 2-4s2 2 2 4-1 3-2 3-2-1-2-3zM30 16c0-2 2-4 2-4s2 2 2 4-1 3-2 3-2-1-2-3zM42 18c0-2 2-4 2-4s2 2 2 4-1 3-2 3-2-1-2-3z" fill="currentColor" />
  </svg>
)

export const IconAnniversary = (p: IconProps) => (
  <svg {...props(p)}>
    <rect x="10" y="14" width="44" height="40" rx="3" />
    <path d="M10 24h44M20 10v8M44 10v8" />
    <path d="M32 46c-6-3-10-7-10-12a4 4 0 0 1 10-2 4 4 0 0 1 10 2c0 5-4 9-10 12z" fill="currentColor" />
  </svg>
)

export const IconThankYou = (p: IconProps) => (
  <svg {...props(p)}>
    <path d="M16 40c-2-4-2-10 2-14l4 2v-6a3 3 0 0 1 6 0v6l4-2c4 4 4 10 2 14-2 6-8 12-18 12z" />
    <path d="M48 40c2-4 2-10-2-14l-4 2v-6a3 3 0 0 0-6 0v6l-4-2c-4 4-4 10-2 14 2 6 8 12 18 12z" />
    <path d="M32 24c-2-2-2-5 0-7s4-2 6 0" fill="none" />
    <path d="M26 18c-1-2 1-4 3-4s3 1 3 3c0-2 1-3 3-3s4 2 3 4-6 5-6 5-5-3-6-5z" fill="currentColor" />
  </svg>
)

export const IconGlasses = (p: IconProps) => (
  <svg {...props(p)}>
    <path d="M18 10l-6 20a10 10 0 0 0 20 0l-6-20z" />
    <path d="M36 16l-4 18a9 9 0 0 0 18 0l-4-18z" />
    <path d="M22 40v12M14 54h16M42 48v4M36 56h14" />
  </svg>
)

export const IconMystery = (p: IconProps) => (
  <svg {...props(p)}>
    <rect x="10" y="24" width="44" height="28" rx="2" />
    <path d="M8 18h48v8H8zM32 18v34" />
    <path d="M28 12c-4 0-6-4-4-6s6 0 8 4c0-4 4-6 8-4s0 6-4 6M22 28v0M32 30s2-4 5-4 5 2 5 5-5 4-5 8M37 44v2" strokeWidth="2.5" />
  </svg>
)

export const icons = {
  cloche: IconCloche,
  ramen: IconRamen,
  burger: IconBurger,
  candy: IconCandy,
  salt: IconSalt,
  chili: IconChili,
  mushroom: IconMushroom,
  chips: IconChips,
  cupcake: IconCupcake,
  lollipop: IconLollipop,
  chocolate: IconChocolate,
  house: IconHouse,
  rings: IconRings,
  friends: IconFriends,
  gift: IconGift,
  chat: IconChat,
  globeSearch: IconGlobeSearch,
  compass: IconCompass,
  person: IconPerson,
  cake: IconCake,
  anniversary: IconAnniversary,
  thankYou: IconThankYou,
  glasses: IconGlasses,
  mystery: IconMystery,
}

export type IconKey = keyof typeof icons
