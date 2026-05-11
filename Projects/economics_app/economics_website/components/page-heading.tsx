type PageHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeading({ eyebrow, title, description }: PageHeadingProps) {
  return (
    <div className="mb-8">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-signal">{eyebrow}</p>
      ) : null}
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-normal text-ink sm:text-4xl">
        {title}
      </h1>
      {description ? <p className="mt-3 max-w-2xl text-zinc-600">{description}</p> : null}
    </div>
  );
}
