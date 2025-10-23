// app/contact/page.tsx

import ContactForm from '@/components/contact/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - COLTECH',
  description: "Get in touch with COLTECH for inquiries about our security solutions, MDVRs, and telemetrics systems.",
};

const contactMethods = [
  {
    icon: "mail",
    title: "Email (Orders)",
    value: "orders@coltech.co.ke",
    href: "mailto:orders@coltech.co.ke"
  },
  {
    icon: "support_agent",
    title: "Email (Support)",
    value: "support@coltech.co.ke",
    href: "mailto:support@coltech.co.ke"
  },
  {
    icon: "phone",
    title: "Phone",
    value: "+254 743 615 3088",
    href: "tel:+254743615308"
  }
];

const IconSVG = ({ type }: { type: string }) => {
  return (
    <svg className="w-6 h-6 text-primary dark:text-white" fill="currentColor" viewBox="0 0 24 24">
      {type === "mail" && (
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      )}
      {type === "support_agent" && (
        <path d="M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2h1v-6.1c0-3.87 3.13-7 7-7s7 3.13 7 7V19h-8v2h8c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62z" />
      )}
      {type === "phone" && (
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      )}
    </svg>
  );
};

export default function ContactPage() {
  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Form */}
          <div className="flex flex-col">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary dark:text-white">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              We are here to help. Reach out to us through any of the methods below, and we will get 
              back to you as soon as possible.
            </p>

            {/* Client Component for Form */}
            <ContactForm />
          </div>

          {/* Right Column - Contact Info */}
          <div className="flex flex-col pt-0 lg:pt-16">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">
              Other Ways to Reach Us
            </h2>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 bg-primary/10 dark:bg-gray-700 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <IconSVG type={method.icon} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-primary dark:text-white">
                      {method.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-white transition-colors">
                      {method.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Map/Image */}
            <div className="mt-8 rounded-xl overflow-hidden">
              <div 
                className="w-full h-80 bg-center bg-no-repeat bg-cover"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD0F4RRQhhaLexqMI8jIuQFzaZNEMLIC2xe8vJp8XuAfTVj9uOWs0yayfc-MfWoTvTRqqA1RTrJAFqrQ4iJ5N-gH-oFS5oEEc--M6c1u_gVVzn20gkhbHFDr-LGvzTgRl4qr2Nb7Vrf1n28LJkK0WotG55IqfkiUWt3lhbOaF4THuQuzD8aGOd0j388nt1fBauzrhAEa1eLzSa4Nh0B2fLAoR3TFzj6Y4It7nFSuAdr0iVCkMHnz0tGhiC9mDxYUDZkkeU9sXZHKJY")'
                }}
                role="img"
                aria-label="Office location map"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}