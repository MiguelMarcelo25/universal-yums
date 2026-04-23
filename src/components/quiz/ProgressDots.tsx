export default function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex justify-center items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`rounded-full transition-all ${
            i === current ? 'w-3 h-3 bg-navy-600' : 'w-2.5 h-2.5 bg-navy-200'
          }`}
        />
      ))}
    </div>
  )
}
