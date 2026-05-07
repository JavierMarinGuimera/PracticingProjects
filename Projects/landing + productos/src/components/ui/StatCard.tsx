export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l border-white/25 pl-4">
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm leading-6 text-white/70">{label}</p>
    </div>
  );
}
