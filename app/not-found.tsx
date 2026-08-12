import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl pt-10 md:pt-20">
      <p className="text-sm text-text-muted">404</p>
      <h1 className="mt-3 font-serif text-2xl font-medium tracking-tight text-text md:text-3xl">
        Nothing here.
      </h1>
      <p className="mt-3 text-base leading-7 text-text-secondary">
        This page may have moved or never existed.
      </p>
      <Link
        href="/"
        className="mt-7 w-fit text-sm font-medium text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-text"
      >
        Go home
      </Link>
    </div>
  );
}
