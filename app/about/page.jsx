import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us - Nikamanda",
  description:
    "Nikamanda boutique — style, quality and trusted delivery to every state.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen mt-12 bg-gray-300 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white/95 rounded-2xl shadow-md p-8 md:p-12 text-center">
          <div className="flex justify-center">
            <Image
              width={30}
              height={30}
              src="https://images.unsplash.com/photo-1603988089669-c041ac2fe196?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
              alt="CEO - Nikamanda"
              className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-white shadow-sm"
            />
          </div>

          <h1 className="mt-6 text-2xl md:text-3xl font-semibold text-gray-900">
            Rejoice Okolo
          </h1>
          <p className="mt-1 text-sm text-gray-500">Chief Executive Officer</p>

          <section className="mt-6 text-left md:text-left prose prose-sm md:prose lg:prose-lg max-w-none mx-auto text-gray-700">
            <p>
              Welcome to <strong>Nikamanda</strong> — a boutique born from a
              passion for beautiful craftsmanship and an uncompromising standard
              for quality. Since day one, we have handcrafted and sourced pieces
              with care so every customer receives not just a product, but a
              statement of style.
            </p>

            <p>
              <strong>Quality</strong> is the heart of everything we do. From
              material selection to finishing touches, our team inspects every
              item to ensure it meets our high standards. We partner with
              trusted suppliers and use tried-and-tested production methods to
              guarantee long-lasting pieces you’ll love for years.
            </p>

            <p>
              <strong>Customer service</strong> is our promise — friendly,
              responsive, and always here to help. Whether you need styling
              advice, sizing information, or post-purchase support, our team is
              committed to making your shopping experience smooth and
              delightful. We believe excellent service builds trust and keeps
              customers coming back.
            </p>

            <p>
              <strong>Nationwide delivery:</strong> no matter where you are in
              the country, Nikamanda delivers. We’ve built reliable logistics
              partnerships to ensure timely delivery to every state. Fast
              dispatch, secure packaging and clear tracking — we take care of
              your order from our door to yours.
            </p>

            <p>
              Thank you for supporting Nikamanda. We’re honored to be part of
              your style journey and look forward to bringing you more timeless
              pieces, exceptional service, and seamless delivery — always.
            </p>
          </section>

          {/* Optional CTA */}
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/products"
              className="inline-block px-6 py-2 rounded-md bg-black text-white font-medium hover:bg-gray-900 transition"
            >
              Shop now
            </Link>
            <Link
              href="/contact"
              className="inline-block px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Contact us
            </Link>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            Nikamanda — style with integrity. Delivery available to all states.
          </p>
        </div>
      </div>
    </main>
  );
}
