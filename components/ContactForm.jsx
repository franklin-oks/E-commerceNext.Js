"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Contact from ${name || "Website Visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:franklinokeke2016@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    // For production: POST to your API route that sends email or saves inquiry.
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-4 space-y-3">
      <label className="block">
        <span className="text-sm text-gray-700">Full name</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2"
          placeholder="Your name"
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-700">Email</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2"
          placeholder="you@mail.com"
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-700">Message</span>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2"
          placeholder="How can we help?"
        />
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Send message
        </button>
        {sent && (
          <span className="text-sm text-green-600">Opening mail client…</span>
        )}
      </div>
    </form>
  );
}
