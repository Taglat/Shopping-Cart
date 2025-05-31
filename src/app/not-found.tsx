import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">
          Page Not Found
        </h2>
        <p className="mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-lg transition-colors bg-[var(--foreground)] text-[var(--background)]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
