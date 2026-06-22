export default function SkeletonCard({ lines = 3, className = '' }) {
  return (
    <div className={`p-5 border rounded-xl dark:border-gray-700 overflow-hidden ${className}`}>
      <div className="h-5 skeleton rounded w-2/3 mb-3" />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-3.5 skeleton rounded mb-2 ${i === lines - 1 ? 'w-1/2' : 'w-full'}`}
        />
      ))}
    </div>
  )
}
