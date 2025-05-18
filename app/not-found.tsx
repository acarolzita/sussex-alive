// app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-700 mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link href="/" className="text-blue-500 hover:underline text-lg">
        Go back home
      </Link>
    </div>
  );
}

  