export const metadata = {
  title: "Contact - Nikamanda Boutique",
  description: "Contact Nikamanda — address, email, phone, socials and map.",
  icons: { icon: "/logo.png" },
};

import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const addressLines = [
    "Nikamanda Boutique",
    "No 5, Opic Road",
    "Mowe Ogun, Ogun State",
    "Nigeria",
  ];

  const email = "franklinokeke2016@gmail.com";
  const phone = "+234 810 391 9717";

  const mapQuery = encodeURIComponent("Agbani Road, Enugu, Nigeria");
  const googleEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <main className="min-h-screen mt-12 w-full bg-gray-300/70 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full">
          <div className="md:flex">
            {/* LEFT: Contact info */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col items-start justify-center gap-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Contact Us
              </h1>
              <p className="text-gray-700 max-w-xl">
                Have a question, need help with customer service, or want to
                check delivery to your state? We’re here to help — get in touch
                and we’ll respond quickly.
              </p>

              <div className="w-full mt-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  Shop address
                </h2>
                <address className="not-italic mt-2 text-gray-600 leading-relaxed">
                  {addressLines.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </address>
              </div>

              <div className="w-full grid grid-cols-1 gap-2 mt-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Email</h3>
                  <a
                    href={`mailto:${email}`}
                    className="text-indigo-600 hover:underline"
                  >
                    {email}
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-800">Phone</h3>
                  <a
                    href={`tel:${phone}`}
                    className="text-indigo-600 hover:underline"
                  >
                    {phone}
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-800">
                    Shipping
                  </h3>
                  <p className="text-gray-600">
                    Nationwide delivery — we deliver to all states.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-800">
                    Follow us
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-700 hover:text-indigo-600"
                      aria-label="Facebook"
                    >
                      {/* simple svg icon */}
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.3c0-2.2 1.3-3.4 3.2-3.4.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.62-1.3 1.25v1.5h2.3l-.36 2.9h-1.9v7A10 10 0 0022 12z" />
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-700 hover:text-indigo-600"
                      aria-label="Instagram"
                    >
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5.5A4.5 4.5 0 107.5 12 4.5 4.5 0 0012 7.5zm4.8-.9a1.08 1.08 0 11-1.08-1.08A1.08 1.08 0 0116.8 6.6z" />
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-700 hover:text-indigo-600"
                      aria-label="Twitter"
                    >
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M22 5.92c-.7.31-1.45.52-2.24.62a3.92 3.92 0 001.72-2.16c-.77.46-1.62.8-2.53.98a3.92 3.92 0 00-6.68 3.57A11.12 11.12 0 013 4.9a3.92 3.92 0 001.21 5.23c-.6 0-1.16-.18-1.65-.45v.05a3.92 3.92 0 003.14 3.84c-.28.07-.57.11-.87.11-.21 0-.42-.02-.62-.06a3.92 3.92 0 003.65 2.72 7.86 7.86 0 01-4.86 1.68c-.32 0-.63-.02-.93-.06A11.1 11.1 0 0012 21c7.15 0 11.06-5.93 11.06-11.07 0-.17 0-.34-.01-.51A7.9 7.9 0 0022 5.92z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact form (simple demo) */}
              <div className="w-full mt-6">
                <ContactForm />
              </div>
            </div>

            <div className="md:w-1/2 order-first md:order-last">
              <div className="w-full h-80 md:h-full">
                <iframe
                  title="Nikamanda location"
                  src={googleEmbedSrc}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
