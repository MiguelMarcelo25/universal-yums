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
}

export type IconKey = keyof typeof icons
