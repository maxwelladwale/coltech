// app/about/page.tsx or pages/about.tsx (depending on your Next.js version)

import Image from 'next/image';

const testimonials = [
  {
    name: "Sophia Clark",
    date: "2023-08-15",
    rating: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB91SrYtY1QkJBZj0g-dsQ418L-Q2yoYrfzYCTslkP26HZAoxcJe_wbFl7cPzpiUSiUaWS7UJr9_pJjvWg5-pCTcMMRvPn9s45pvgDl18ko-AKzRcQMpS3JF-lF8c0v9W3nSehnICVehmSqOSpQzx1d9Ds8ng-YzvPsRlcRNVPUP_grbrRPCyALOh-yrakNFWKxXwJ9t7leVmGqlLxGHRHY8-56ibVXgOSU0zpXiVBOU2_8AfFvNuvRWfTqMFMXiTFG1gaN1bMcYQ",
    text: "COLTECH's Telematrix system has significantly enhanced our security. The installation was seamless, and the support team is always responsive and helpful."
  },
  {
    name: "Ethan Bennett",
    date: "2023-09-22",
    rating: 4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3GhIwK9Y0c3uFHYgTh-wLDYFXZGZMxmJeLViXcakW5X3Yu-wc5-CghrxTrByewWFusD0jUadi-gf5Tpz9mSU4PwaUUpJS2OG1iclQZSVtD37CXmk5MI6X0b6X2xva7gMO7anVkYKO1ywObeYdKcgsWoEVPhJ9Lj4wSh7kJjDQraeasY8zjk6lCUN2VE_3GRwF1nI23l2CLMNeSoKB0-OJ6vBBvOEuFk0YTam4g55QEFHIzGVkrpaE7lSmwUVsAjb6SZz7tccrLdA",
    text: "We've been using COLTECH's security products for years, and they've never let us down. Their solutions are reliable and effective, providing us with the security we need."
  },
  {
    name: "Olivia Carter",
    date: "2023-10-10",
    rating: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDa7T6VYDXehpvVtRb7Qj5hAoKAby57KkBvu6OuNd5KfvLa9HmePs5snrCpWytmQjOU-7dRQjRq_ZzpqnR7Hc7WAmL12SuMWogqiLqpKgnfVy3bxz3jPhI6FcxcsMkTIizQdbwIdvn-oS9qnUH_CwmUbO5nqKdHdU9VZlgvSUrI36ufBzqj-4bffc0uZz3CGtah6glor4SqB6rCy08u2uiLeb_OElVZ-rK9HyfJXFyikw8LuJ3fIHR3-YMcyTZIAMZmdTUFzqyy4-0",
    text: "The consulting services provided by COLTECH were invaluable in helping us design a security system tailored to our specific needs. Their expertise and professionalism are unmatched."
  }
];

const services = [
  "Telematrix System Design and Installation",
  "Security Product Sales and Support",
  "Customized Security Solutions",
  "Professional Security Consulting",
  "Ongoing Maintenance and Upgrades"
];

const CheckIcon = () => (
  <svg 
    className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2"
    />
  </svg>
);

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg 
    className={`w-5 h-5 ${filled ? 'text-primary' : 'text-gray-300 dark:text-gray-600'}`} 
    fill="currentColor" 
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function AboutPage() {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-5xl py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            About COLTECH
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Leading the charge in advanced security solutions, we are dedicated to delivering innovative, 
            reliable, and cost-effective systems that meet the evolving needs of our customers.
          </p>
        </div>

        {/* Mission, Vision & Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To empower businesses and individuals with cutting-edge security technologies that protect 
                their assets, ensure safety, and provide peace of mind. We are committed to excellence in 
                product quality, customer service, and continuous innovation.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To be the trusted global leader in security solutions, recognized for our technological 
                advancements, customer-centric approach, and unwavering commitment to security. We aim to 
                set industry standards and drive the future of security through innovation and collaboration.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/30 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Our Services
            </h2>
            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              {services.map((service, index) => (
                <li key={index} className="flex items-start">
                  <CheckIcon />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Real stories from satisfied clients who trust COLTECH for their security needs.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800/30 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.date}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} filled={i < testimonial.rating} />
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}