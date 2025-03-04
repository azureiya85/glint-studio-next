// app/company/page.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const coreValues = [
  {
    title: "Creativity First",
    description:
      "We embrace unconventional thinking and the most interesting solutions.",
    icon: "mdi:lightbulb-on",
  },
  {
    title: "Human-Centered",
    description:
      "We design for humans first, algorithms second, prioritizing real experiences.",
    icon: "mdi:human-greeting",
  },
  {
    title: "Purposeful Fun",
    description:
      "Good design should delight with moments of joy that turn users into fans.",
    icon: "mdi:hand-heart",
  },
];

const CompanyPage = () => {
  const headerRef = useRef(null);
  const aboutTextRef = useRef(null);
  const valuesRef = useRef(null);

  const headerInView = useInView(headerRef, { amount: 0.3, once: true });
  const valuesInView = useInView(valuesRef, { amount: 0.3, once: true });

  const [aboutTextDelayed, setAboutTextDelayed] = useState(false);

  useEffect(() => {
    if (headerInView) {
      const timer = setTimeout(() => {
        setAboutTextDelayed(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [headerInView]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const barAnimation = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 1 } },
  };

  return (
    <section
      aria-labelledby="company-heading"
      className="relative min-h-screen flex items-center py-8 px-4 md:px-16 bg-[linear-gradient(to_bottom,rgb(var(--color-primary-700)),rgb(var(--color-primary-900)))]"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="flex flex-col justify-center items-center text-center mb-10"
        >
          <h1
            id="company-heading"
            className="font-display text-4xl md:text-6xl text-[rgb(var(--color-primary-50))] font-bold"
          >
            not your typical <br />{" "}
            <span className="text-[rgb(var(--color-secondary-600))]">
              design studio
            </span>
          </h1>
          <div className="relative w-24 h-1 bg-[rgb(var(--color-tertiary-500))] mt-6 mb-8 overflow-hidden">
            <motion.div
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              variants={barAnimation}
              className="absolute left-0 top-0 w-full h-full bg-[rgb(var(--color-secondary-600))]"
            />
          </div>
        </motion.div>

        <motion.div
          ref={aboutTextRef}
          initial="hidden"
          animate={aboutTextDelayed ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <p className="text-xl md:text-2xl text-[rgb(var(--color-primary-100))] font-basic">
            Founded in 2018, we&apos;ve grown from a tiny apartment to an
            award-winning team of 30+ creatives. We believe digital experiences
            should feel as intuitive as a conversation with a friend—where
            creativity meets functionality to create spaces that feel alive,
            responsive, and distinctly human.
          </p>
        </motion.div>

        <motion.div
          ref={valuesRef}
          initial="hidden"
          animate={valuesInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-secondary-600))] mb-6 text-center font-display">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreValues.map((value) => (
              <motion.div
                key={value.title}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5 }}
                className="p-5 bg-[rgb(var(--color-primary-800))] rounded-3xl border border-[rgb(var(--color-tertiary-600))] shadow-lg"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgb(var(--color-secondary-600))] mb-3">
                  <Icon
                    icon={value.icon}
                    className="text-[rgb(var(--color-primary-100))] w-5 h-5"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-bold text-[rgb(var(--color-primary-100))] mb-2 font-display">
                  {value.title}
                </h3>
                <p className="text-[rgb(var(--color-primary-100))] text-md font-basic">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="text-center mt-12">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-lg font-semibold text-white bg-[rgb(var(--color-secondary-600))] px-6 py-3 border border-[rgb(var(--color-tertiary-600))] rounded-full shadow-md hover:shadow-2xl hover:bg-[rgb(var(--color-secondary-500))] transition-all font-basic"
          >
            <Icon
              icon="mdi:account-group"
              className="text-[rgb(var(--color-primary-100))] w-5 h-5"
              aria-hidden="true"
            />
            Learn More About Us!
          </Link>
        </div>
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

export default CompanyPage;
