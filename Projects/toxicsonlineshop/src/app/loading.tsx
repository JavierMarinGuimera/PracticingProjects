export default function Loading() {
  return (
    <div className="container-page py-24">
      <div className="h-3 w-36 animate-pulse rounded-full bg-aura/20" />
      <div className="mt-6 h-10 max-w-xl animate-pulse rounded-xl bg-slate-200" />
      <div className="mt-4 h-4 max-w-2xl animate-pulse rounded-full bg-slate-200" />
    </div>
  );
}
