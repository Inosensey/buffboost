"use client";

import { useEffect, useState } from "react";
import { useAnimation, motion } from "motion/react";

import StreamlineLogosFacebookGamingLogoBlock from "@/icons/StreamlineLogosFacebookGamingLogoBlock";
import MakiFireStation11 from "@/icons/MakiFireStation11";
import LucideBicepsFlexed from "@/icons/LucideBicepsFlexed";
import SolarLogoutOutline from "@/icons/SolarLogoutOutline";

import Overlay from "./Overlay";
import Link from "next/link";

const SideBar = () => {
  // States
  const [currentViewPoint, setCurrentViewPoint] = useState<number>(0);
  const [lastViewPoint, setLastViewPoint] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<string>("Steady");
  const [showNavBar, setShowNavBar] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // useEffect
  useEffect(() => {
    if (window.innerWidth < 760) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    window.addEventListener("scroll", saveViewPoint);

    return () => {
      window.removeEventListener("scroll", saveViewPoint);
    };
  }, []);

  useEffect(() => {
    checkIfUserIsScrolling();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentViewPoint]);

  // Save view point
  const saveViewPoint = () => {
    setCurrentViewPoint(window.scrollY);
  };

  // Check if user is scrolling
  const checkIfUserIsScrolling = () => {
    // Get view point
    setLastViewPoint(currentViewPoint);

    // Check scrolling
    currentViewPoint === 0 && setScrollDirection("Steady");
    currentViewPoint > lastViewPoint && setScrollDirection("Down");
    currentViewPoint < lastViewPoint && setScrollDirection("Up");
  };

  // Framer motion logics

  // useAnimation
  const sidebarAnimation = useAnimation();
  const ulAnimation = useAnimation();
  const liAnimation = useAnimation();

  // Variants
  const sidebarVariant = {
    open: {
      x: "0%",
    },
    closed: {
      x: "-100%",
    },
  };
  const ulVariant = {
    closed: {
      opacity: isMobile ? 0 : 1,
    },
    open: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };
  const liVariant = {
    closed: {
      x: "-100%",
    },
    open: {
      x: "0%",
    },
  };

  const animateSidebar = () => {
    if (!showNavBar) {
      sidebarAnimation.start("show");
      ulAnimation.start("show");
      liAnimation.start("show");
      document.body.style.overflow = "hidden";
    } else {
      sidebarAnimation.set("hidden");
      ulAnimation.start("hidden");
      liAnimation.start("hidden");
      document.body.style.overflow = "auto";
    }
    setShowNavBar((current) => !current);
  };
  return (
    <>
      {showNavBar && (
        <Overlay clickEvent={() => animateSidebar()}>
          <motion.nav
            variants={sidebarVariant}
            animate={sidebarAnimation}
            className={`fixed bg-black phone:flex mdphone:hidden z-20 phone:-translate-x-[0%] phone:flex-col phone:h-screen phone:w-72 ${
              scrollDirection === "Steady"
                ? "desktop:top-0"
                : scrollDirection === "Down"
                  ? "desktop:-top-28"
                  : "desktop:top-0"
            }`}
          >
            <div className="flex items-center gap-2 p-4 bg-Background">
              <Link className="flex items-center gap-1 text-Text" href="/">
                <p className="font-oxanium cursor-pointer font-bold text-2xl">
                  Buff Boost
                </p>
                <StreamlineLogosFacebookGamingLogoBlock
                  color="#5A189A"
                  width="1.7em"
                  height="1.7em"
                />
              </Link>
            </div>
            <motion.div
              variants={ulVariant}
              animate={ulAnimation}
              className="flex flex-col gap-2 px-4 mt-8 text-lg"
            >
              <motion.div
                variants={liVariant}
                animate={liAnimation}
              >
                <Link href="/boosting-station" className="flex items-center gap-1 text-Text hover:underline">
                  <p className="font-oxanium cursor-pointer font-bold">
                    Boosting Station
                  </p>
                  <MakiFireStation11
                    color="#5A189A"
                    width="1.4em"
                    height="1.4em"
                  />
                </Link>
              </motion.div>
              <motion.div
                variants={liVariant}
                animate={liAnimation}
              >
                <Link
                  className="flex items-center gap-1 text-Text hover:underline"
                  href="/my-buffs"
                >
                  <p className="font-oxanium cursor-pointer font-bold">
                    My Buffs
                  </p>
                  <LucideBicepsFlexed
                    color="#5A189A"
                    width="1.4em"
                    height="1.4em"
                  />
                </Link>
              </motion.div>
            </motion.div>
            <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center text-Text hover:underline text-lg gap-2 mt-6">
              <Link className="flex items-center gap-1" href="/">
                <p className="font-oxanium cursor-pointer font-bold">
                  Sign Out
                </p>
                <SolarLogoutOutline
                  color="#5A189A"
                  width="1.4em"
                  height="1.4em"
                />
              </Link>
            </div>
          </motion.nav>
        </Overlay>
      )}

      {/* Burger Icon */}
      <div
        onClick={() =>
          animateSidebar()
        }
        className={`rounded-3xl items-center py-2 right-2 top-[91%] w-12 phone:flex mdphone:hidden flex-col gap-2 z-30 cursor-pointer ease-in-out duration-300 fixed ${
          scrollDirection === "Steady"
            ? "top-0"
            : scrollDirection === "Down"
              ? "-top-28"
              : "top-0"
        }`}
      >
        <div
          className={`${
            showNavBar &&
            "rotate-45 origin-top-left translate-y-[50%] translate-x-[16%]"
          } ease-in-out duration-100 w-[75%] border-2 border-Secondary`}
        ></div>
        <div
          className={`${
            showNavBar && "origin-center opacity-0"
          } ease-in-out duration-100 w-[75%] border-2 border-Secondary`}
        ></div>
        <div
          className={`${
            showNavBar &&
            "-rotate-45 origin-bottom-left -translate-y-[20%] translate-x-[10%]"
          } ease-in-out duration-100 w-[75%] border-2 border-Secondary`}
        ></div>
      </div>
    </>
  );
};

export default SideBar;
