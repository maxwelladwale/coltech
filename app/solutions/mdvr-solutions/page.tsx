// app/mdvr-solutions/page.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MDVR Solutions for the Kenyan Transport Sector - COLTECH',
  description: 'Addressing critical challenges in the Kenyan transport industry with state-of-the-art Mobile Digital Video Recorder technology.',
};

const XIcon = () => (
  <svg 
    className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2"
    />
  </svg>
);

const CheckIcon = () => (
  <svg 
    className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" 
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

const challenges = [
  {
    title: "Road Accidents",
    description: "High rates of road accidents due to reckless driving, driver fatigue, and poor monitoring."
  },
  {
    title: "Cargo & Asset Theft",
    description: "Loss of goods and vehicle assets through theft, hijacking, and pilferage."
  },
  {
    title: "Fuel Siphoning",
    description: "Unauthorized fuel drainage leading to significant operational losses."
  },
  {
    title: "False Claims",
    description: "Difficulty in verifying accident claims and passenger complaints without concrete evidence."
  }
];

const solutions = [
  {
    title: "Live Video & Audio Monitoring",
    description: "Real-time surveillance of driver, passengers, and cargo, enabling immediate intervention."
  },
  {
    title: "GPS Tracking & Route Playback",
    description: "Monitor vehicle location, speed, and history to ensure adherence to approved routes."
  },
  {
    title: "AI-Powered Driver Behavior Analysis",
    description: "Detect and alert for fatigue, phone use, smoking, and other risky behaviors with DMS and ADAS."
  },
  {
    title: "Event-Triggered Recording & Alerts",
    description: "Automatically capture and upload evidence for events like harsh braking, collisions, or geofence breaches."
  }
];

export default function MDVRSolutionsPage() {
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mx-auto">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            COLTECH MDVRs: Driving Safety and Efficiency in Kenya&apos;s Transport Industry
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Addressing critical challenges in the Kenyan transport industry with state-of-the-art 
            Mobile Digital Video Recorder technology.
          </p>
        </div>

        {/* Problem/Solution Section */}
        <div className="bg-card-light dark:bg-card-dark p-8 rounded-xl border border-border-light dark:border-border-dark mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">
            What are we solving?
          </h2>
          <p className="text-base leading-relaxed text-center mb-8">
            The Kenyan transport sector faces numerous challenges that impact safety, security, 
            and operational efficiency. COLTECH&apos;s MDVR systems are specifically designed to address 
            these issues head-on.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Challenges */}
            <div>
              <h3 className="text-xl font-bold mb-3">The Challenges</h3>
              <ul className="space-y-4">
                {challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <XIcon />
                    <div>
                      <h4 className="font-semibold">{challenge.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {challenge.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-xl font-bold mb-3">COLTECH&apos;s MDVR Solutions</h3>
              <ul className="space-y-4">
                {solutions.map((solution, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon />
                    <div>
                      <h4 className="font-semibold">{solution.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {solution.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Applicability Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight border-b border-border-light dark:border-border-dark pb-4">
            Applicability in the Kenyan Market
          </h2>
          <p className="text-base leading-relaxed">
            Our MDVR solutions are perfectly suited for the diverse needs of Kenya&apos;s transport sector, 
            including Public Service Vehicles (PSVs), long-haul trucks, school buses, and corporate fleets. 
            By providing robust, reliable, and intelligent monitoring, we help transport operators comply 
            with NTSA regulations, enhance passenger safety, protect valuable assets, and optimize overall 
            fleet operations. COLTECH is committed to providing technology that creates safer roads and 
            more profitable businesses across Kenya.
          </p>
        </section>
      </div>
    </main>
  );
}