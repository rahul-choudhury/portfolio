import { NotFound } from "@rahul-choudhury/ui/components";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center">
      <NotFound
        action={
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-text underline decoration-border underline-offset-4 hover:decoration-text"
          >
            Go home
          </Link>
        }
      />
    </div>
  );
}
