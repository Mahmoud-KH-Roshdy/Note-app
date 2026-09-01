export default function Loading() {
  return (
    <div className="p-4 flex flex-col justify-center h-full gap-4 animate-pulse">
      <div className="h-6 bg-[#eee] rounded w-1/3" />
      <div className="flex-1 flex flex-col gap-3">
        <div className="h-4 bg-[#eee] rounded w-full" />
        <div className="h-4 bg-[#eee] rounded w-5/6" />
        <div className="h-4 bg-[#eee] rounded w-4/6" />
      </div>
    </div>
  )
}