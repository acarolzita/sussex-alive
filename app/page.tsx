// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 text-gray-900">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
        <Image
          src="/sussex-logo.png"
          alt="Sussex-Alive Logo"
          width={110}
          height={110}
          priority
          className="mb-6 rounded-full shadow-md"
        />

        <p className="mb-3 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          Built for University of Sussex students
        </p>

        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-gray-900 md:text-7xl">
          Connect with Sussex students on{" "}
          <span className="text-blue-600">Sussex-Alive</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
          A student-only social platform where Sussex students can share posts,
          discover classmates, join conversations, and build a stronger campus
          community.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/register"
            className="rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
          >
            Join Sussex-Alive
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-gray-300 bg-white px-8 py-4 text-base font-bold text-gray-800 shadow-sm transition hover:bg-gray-100"
          >
            Log In
          </Link>
        </div>

        <div className="mt-16 grid w-full max-w-4xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-bold">Share Updates</h2>
            <p className="mt-3 text-gray-600">
              Post thoughts, events, questions, and student life moments.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-bold">Find Students</h2>
            <p className="mt-3 text-gray-600">
              Discover people across courses, interests, and societies.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-bold">Build Community</h2>
            <p className="mt-3 text-gray-600">
              Create a more connected Sussex experience online.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}



