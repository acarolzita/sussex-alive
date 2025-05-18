// components/Footer.tsx
"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 border-t py-4 text-center text-sm text-gray-600 mt-10">
      <p>
        © {new Date().getFullYear()} Sussex-Alive. Built with ❤️ by Sussex students.
      </p>
    </footer>
  );
}
