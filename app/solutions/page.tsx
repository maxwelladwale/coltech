// app/solutions/page.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions - COLTECH',
  description: 'Discover our cutting-edge telemetrics, MDVR, and AI-powered safety solutions.',
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Our Solutions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover our cutting-edge telemetrics, MDVR, and AI-powered safety solutions.
          </p>
        </div>

        <div className="space-y-12">
          {/* Telemetrics Solutions */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight border-b border-border-light dark:border-border-dark pb-4">
              Telemetrics Solutions
            </h2>
            <p className="text-base leading-relaxed">
              Telemetrics solutions are at the forefront of vehicle monitoring and safety, integrating 
              advanced technologies to provide comprehensive insights into fleet operations. Our systems 
              are designed to enhance driver safety, improve operational efficiency, and reduce costs 
              through real-time data analysis and proactive alerts.
            </p>
          </section>

          {/* MDVRs */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight border-b border-border-light dark:border-border-dark pb-4">
              Mobile Digital Video Recorders (MDVRs)
            </h2>
            <p className="text-base leading-relaxed">
              Our Mobile Digital Video Recorders (MDVRs) are the core of our telemetrics solutions, 
              capturing high-definition video and critical vehicle data. These robust devices are built 
              to withstand the harsh conditions of mobile environments, ensuring reliable performance and 
              data integrity. Features include multi-channel recording, GPS tracking, and wireless 
              connectivity for seamless data transmission and remote access.
            </p>
          </section>

          {/* AI Integration */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight border-b border-border-light dark:border-border-dark pb-4">
              Artificial Intelligence Integration
            </h2>
            <p className="text-base leading-relaxed mb-8">
              Integrating Artificial Intelligence (AI) into our telemetrics products allows for 
              sophisticated analysis of driver behavior and vehicle surroundings. Our AI-powered systems 
              include Driver Monitoring Systems (DMS) and Advanced Driver Assistance Systems (ADAS), 
              which work together to prevent accidents and improve overall safety.
            </p>

            {/* DMS and ADAS Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl border border-border-light dark:border-border-dark">
                <h3 className="text-xl font-bold mb-3">
                  Driver Monitoring Systems (DMS)
                </h3>
                <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                  DMS uses in-cab cameras and AI algorithms to monitor driver alertness and behavior. 
                  It detects signs of fatigue, distraction, or unsafe practices such as mobile phone use, 
                  providing real-time alerts to the driver and fleet managers. This proactive approach 
                  helps prevent accidents caused by human error.
                </p>
              </div>

              <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl border border-border-light dark:border-border-dark">
                <h3 className="text-xl font-bold mb-3">
                  Advanced Driver Assistance Systems (ADAS)
                </h3>
                <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                  ADAS employs external cameras and sensors to monitor the vehicle&apos;s environment, 
                  providing alerts for potential hazards such as lane departures, forward collisions, 
                  and pedestrian detection. These systems enhance situational awareness and assist 
                  drivers in maintaining safe driving practices.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="bg-primary/10 dark:bg-primary/20 p-8 rounded-xl">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-primary">
              Benefits of Telemetrics with AI
            </h2>
            <p className="text-base leading-relaxed">
              By combining telemetrics with AI, our solutions offer unparalleled benefits, including 
              reduced accident rates, improved driver accountability, optimized fleet performance, and 
              lower operational costs. The data-driven insights provided by our systems enable informed 
              decision-making and continuous improvement in fleet management.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}