// app/services/page.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// Sample service descriptions (replace with your actual import)
const serviceDescriptions = [
  {
    catchphrase: "Build & Integrate",
    heading: "Make faster app",
    description:
      "Accelerate your development cycle with our specialized UI/UX design expertise. We build intuitive interfaces and seamlessly integrate them into your existing systems for rapid deployment.",
  },
  {
    catchphrase: "Collaborate & Share",
    heading: "Iterate together",
    description:
      "Experience a truly collaborative design process. We work closely with your team, sharing insights and iterating on feedback to ensure your vision comes to life exactly as you imagined.",
  },
  {
    catchphrase: "Optimize & Scale",
    heading: "Grow efficiently",
    description:
      "Future-proof your digital presence with scalable design solutions. We optimize your app architecture and user flows to handle growing user bases and evolving business needs without compromising performance.",
  },
] as const; // 'as const' makes catchphrase literals readonly

const ServiceSection = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>(
    Array(serviceDescriptions.length).fill(null),
  );

  const headingInView = useInView(headingRef, { amount: 0.3, once: true });
  const servicesInView = useInView(servicesRef, { amount: 0.1, once: true });
  const buttonInView = useInView(buttonRef, { amount: 0.1, once: true });

  const [servicesVisible, setServicesVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [iconsVisible, setIconsVisible] = useState(
    Array(serviceDescriptions.length).fill(false),
  );

  // Delayed visibility effects
  useEffect(() => {
    if (servicesInView) {
      const timer = setTimeout(() => setServicesVisible(true), 400);
      return () => clearTimeout(timer);
    }
  }, [servicesInView]);

  useEffect(() => {
    if (buttonInView) {
      const timer = setTimeout(() => setButtonVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, [buttonInView]);

  useEffect(() => {
    if (servicesInView) {
      iconRefs.current.forEach((_, i) => {
        const timer = setTimeout(
          () => {
            setIconsVisible((prev) => {
              const newIcons = [...prev];
              newIcons[i] = true;
              return newIcons;
            });
          },
          600 + i * 100,
        );
        return () => clearTimeout(timer);
      });
    }
  }, [servicesInView]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  // Map service catchphrases to icons with explicit typing
  const getServiceIcon = (
    catchphrase:
      | "Build & Integrate"
      | "Collaborate & Share"
      | "Optimize & Scale",
  ): string => {
    return (
      {
        "Build & Integrate": "mdi:rocket-launch-outline",
        "Collaborate & Share": "mdi:account-group-outline",
        "Optimize & Scale": "mdi:chart-line",
      }[catchphrase] || "mdi:check-circle-outline"
    );
  };

  return (
    <section
      aria-labelledby="service-heading"
      className="relative min-h-screen py-16 px-4 md:px-16 bg-[rgb(var(--color-primary-800))]"
    >
      <div className="min-h-screen container mx-auto max-w-6xl">
        {/* Heading Section */}
        <motion.div
          ref={headingRef}
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="flex flex-col justify-center items-center text-center mt-8 mb-12 md:mb-16"
        >
          <h1
            id="service-heading"
            className="font-display text-4xl md:text-6xl text-[rgb(var(--color-primary-50))] font-bold"
          >
            design-driven solutions for the
            <br />
            <span className="text-[rgb(var(--color-secondary-600))]">
              digital future
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[rgb(var(--color-primary-100))] mt-8 max-w-2xl font-basic">
            Combine creative design thinking with technical expertise to build
            faster, more intuitive applications that delight your users and grow
            with your business.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div
          ref={servicesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          aria-label="Our services"
        >
          {serviceDescriptions.map((service, i) => (
            <motion.div
              key={service.heading}
              initial="hidden"
              animate={servicesVisible ? "visible" : "hidden"}
              variants={fadeInLeft}
              transition={{ delay: (300 + i * 200) / 1000 }}
              className="p-6 md:p-8 shadow-lg rounded-3xl bg-[rgb(var(--color-primary-700))] border border-[rgb(var(--color-tertiary-600))] h-[480px] flex flex-col"
            >
              <p className="pl-2 bg-[rgb(var(--color-secondary-700))] rounded-full text-sm font-semibold text-[rgb(var(--color-primary-100))] mb-2 md:mb-4 font-basic">
                {service.catchphrase}
              </p>
              <h2 className="pl-1 text-[rgb(var(--color-primary-100))] text-2xl md:text-3xl font-bold mb-2 md:mb-4 font-display">
                {service.heading}
              </h2>
              <p className="pl-1 text-[rgb(var(--color-primary-100))] text-xl md:text-base flex-grow font-basic">
                {service.description}
              </p>
              <div className="w-full h-px bg-[rgb(var(--color-tertiary-600))] my-4 opacity-70" />
              <motion.div
                ref={(el) => {
                  iconRefs.current[i] = el;
                }}
                initial="hidden"
                animate={iconsVisible[i] ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ delay: (600 + i * 100) / 1000 }}
                className="flex justify-center items-center mt-2"
              >
                <Icon
                  icon={getServiceIcon(service.catchphrase)}
                  className="text-[rgb(var(--color-secondary-500))] w-10 h-10"
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          ref={buttonRef}
          initial="hidden"
          animate={buttonVisible ? "visible" : "hidden"}
          variants={fadeInUp}
          className="mt-12 md:mt-16 flex justify-center"
        >
          <Link
            href="/services"
            className="flex items-center gap-2 text-lg font-semibold text-white bg-[rgb(var(--color-secondary-600))] px-6 py-3 border border-[rgb(var(--color-tertiary-600))] rounded-full shadow-md hover:shadow-2xl hover:bg-[rgb(var(--color-secondary-500))] transition-all mx-8 mt-4 font-basic"
            aria-label="Explore all our services"
          >
            <Icon
              icon="mdi:idea"
              className="text-[rgb(var(--color-primary-100))] w-5 h-5"
              aria-hidden="true"
            />
            Explore Our Services
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .motion-div {
            transition: opacity 0.1s ease-out !important;
          }
          a,
          div {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ServiceSection;
