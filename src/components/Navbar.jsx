import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants/index";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const resumeLink =
    "https://drive.google.com/file/d/1KjdswRn8vmr9KDs3oTgNaF_0Wr6W6NBm/view?usp=sharing";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => ({
        ...link,
        element: document.getElementById(link.id),
      }))
      .filter((section) => section.element);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find(
              (item) => item.element === entry.target,
            );

            if (section) {
              setActive(section.title);
            }
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section.element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setToggle(false);
      }
    };

    document.body.style.overflow = toggle ? "hidden" : "";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [toggle]);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-4 fixed top-0 z-20 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md shadow-lg border-b border-white/20"
          : "bg-black/70 backdrop-blur-sm border-b border-white/10"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-3 transition-all hover:scale-105 group"
          onClick={() => {
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="relative">
            <img
              src={logo}
              alt="Divyanshu Mishra Logo"
              className="relative w-10 h-10 object-contain brightness-110"
            />
          </div>
          <p className="text-white text-[20px] font-bold cursor-pointer flex font-mono group-hover:text-gray-300 transition-colors">
            <span className="text-white">{"<"}</span>
            dev
            <span className="text-white">{"/"}</span>
            <span className="text-gray-400">{">"}</span>
          </p>
        </Link>

        <ul className="list-none hidden md:flex flex-row gap-8 lg:gap-10 items-center">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-gray-300"
              } hover:text-white text-[17px] font-mono font-semibold cursor-pointer transition-all duration-300 relative group`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`} className="flex items-center gap-1">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white">
                  {">"}
                </span>
                {link.title}
              </a>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </li>
          ))}

          <li>
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-gray-200 font-mono font-bold text-[15px] rounded-lg border border-white transition-all duration-300 hover:-translate-y-0.5 shadow-xl backdrop-blur-sm group/resume"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover/resume:scale-110 group-hover/resume:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Resume
            </a>
          </li>
        </ul>

        <div className="md:hidden flex flex-1 justify-end items-center">
          <button
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            className="relative z-50 focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-1 text-white hover:text-gray-300 transition-colors"
            onClick={() => setToggle(!toggle)}
          >
            <img
              src={toggle ? close : menu}
              alt={toggle ? "Close menu" : "Open menu"}
              className="w-[32px] h-[32px] object-contain cursor-pointer transition-transform hover:scale-110 invert brightness-150"
            />
          </button>
        </div>

        {toggle && (
          <div
            className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-30 transition-opacity duration-300"
            onClick={() => setToggle(false)}
            aria-hidden="true"
          />
        )}

        {toggle && (
          <div className="md:hidden p-6 fixed top-20 inset-x-4 z-40 rounded-lg shadow-xl bg-black/95 border border-white/25 backdrop-blur-md animate-slideIn">
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white" : "text-gray-300"
                  } font-mono font-semibold text-[17px] cursor-pointer transition-all duration-200 hover:text-white hover:translate-x-2 w-full`}
                  onClick={() => {
                    setToggle(false);
                    setActive(link.title);
                  }}
                >
                  <a
                    href={`#${link.id}`}
                    className="flex items-center gap-2 py-2"
                  >
                    <span className="text-white">{">"}</span>
                    {link.title}
                  </a>
                </li>
              ))}

              <li className="w-full pt-2 border-t border-white border-opacity-30">
                <a
                  href={resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setToggle(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white hover:bg-gray-200 text-black font-mono font-bold text-[15px] rounded-lg border border-white transition-all duration-300 shadow-xl backdrop-blur-sm"
                >
                  <svg
                    className="w-5 h-5 transition-transform hover:rotate-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Resume
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
