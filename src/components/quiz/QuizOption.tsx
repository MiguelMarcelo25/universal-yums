import { icons, IconKey } from './icons'

export default function QuizOption({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: IconKey
  title: string
  subtitle?: string
  onClick: () => void
}) {
  const IconComp = icons[icon]
  return (
    <button
      onClick={onClick}
      className="w-full max-w-xl mx-auto flex items-center gap-6 group focus:outline-none"
    >
      <div className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-3xl shadow-md border border-navy-100 grid place-items-center flex-shrink-0 transition-all group-hover:shadow-pop group-hover:scale-[1.03] group-hover:border-navy-300">
        <IconComp />
      </div>
      <div className="text-left flex-1">
        <div className="font-display font-bold text-lg md:text-xl text-navy-700 group-hover:text-navy-800">
          {title}
        </div>
        {subtitle && <div className="text-sm text-navy-600 mt-1 font-semibold">{subtitle}</div>}
      </div>
    </button>
  )
}
