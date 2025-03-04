"use client"; // Required for client-side interactivity

// import Image from 'next/image'
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
// import Navbar from "./Navbar"; // Assuming you have a Navbar component
import Link from "next/link";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  // Animation configuration
  const flyAnimation = { y: 20, transition: { duration: 1 } };

  // Intersection Observer setup
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <section
        aria-labelledby="hero-title"
        className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center px-6 text-center"
        ref={sectionRef}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/image/background_hero_4x.png')] bg-cover bg-center" />

        {visible && (
          <motion.div
            className="relative text-white max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              id="hero-title"
              className="text-4xl sm:text-7xl font-bold font-display"
            >
              <span className="text-[rgb(var(--color-primary-50))]">
                build a better web
              </span>
              <br />
              <span className="text-[rgb(var(--color-secondary-500))] font-display">
                build a better future
              </span>
            </h1>
            <motion.p
              className="font-basic mt-4 text-lg sm:text-3xl leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...flyAnimation, delay: 0.2 }}
            >
              We help people to create a more responsive, adaptive, and
              accessible web experience.
            </motion.p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...flyAnimation, delay: 0.4 }}
              >
                <Link
                  href="/about"
                  className="text-2xl bg-[rgb(var(--color-primary-800))] flex border-[rgb(var(--color-tertiary-900))] border items-center gap-2 px-6 py-3 text-white rounded-3xl transition-all transform hover:-translate-y-1 hover:bg-[rgb(var(--color-primary-700))] shadow-md hover:shadow-lg"
                  aria-label="Learn more about our company"
                >
                  <Icon
                    icon="mdi-light:home"
                    className="text-[rgb(var(--color-primary-100))] w-5 h-5"
                  />
                  About Us
                </Link>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...flyAnimation, delay: 0.8 }}
              >
                <Link
                  href="/services"
                  className="text-2xl font-semibold bg-[rgb(var(--color-secondary-700))] flex border-[rgb(var(--color-tertiary-500))] border items-center gap-2 px-6 py-3 text-white rounded-3xl transition-all transform hover:-translate-y-1 hover:bg-[rgb(var(--color-secondary-600))] shadow-md hover:shadow-lg"
                  aria-label="Explore our services"
                >
                  <Icon
                    icon="mdi-light:home"
                    className="text-[rgb(var(--color-primary-100))] w-5 h-5"
                  />
                  Our Services
                </Link>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...flyAnimation, delay: 0.6 }}
              >
                <Link
                  href="/team"
                  className="text-2xl bg-[rgb(var(--color-primary-800))] flex border-[rgb(var(--color-tertiary-900))] border items-center gap-2 px-6 py-3 text-white rounded-3xl transition-all transform hover:-translate-y-1 hover:bg-[rgb(var(--color-tertiary-600))] shadow-md hover:shadow-lg"
                  aria-label="Meet our team"
                >
                  <Icon
                    icon="mdi-light:home"
                    className="text-[rgb(var(--color-primary-100))] w-5 h-5"
                  />
                  Our Team
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </section>
    </>
  );
}
