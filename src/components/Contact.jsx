import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import ContactTerminal from "./canvas/ContactTerminal";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!form.name?.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name?.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!form.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.message?.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message?.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccess(false);

    emailjs
      .send(
        "service_j14d0fv",
        "template_30fnly8",
        {
          from_name: form.name,
          to_name: "Divyanshu Mishra",
          from_email: form.email,
          to_email: "dvbeast465@gmail.com",
          message: form.message,
        },
        "4DsVrmRmczHS3ChaA"
      )
      .then(
        () => {
          setLoading(false);
          setSuccess(true);

          setForm({
            name: "",
            email: "",
            message: "",
          });

          setTimeout(() => setSuccess(false), 5000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setErrors({ submit: "Something went wrong. Please try again." });
        }
      );
  };

  const handleTerminalSubmit = (terminalFormData) => {
    return new Promise((resolve, reject) => {
      emailjs
        .send(
          "service_j14d0fv",
          "template_30fnly8",
          {
            from_name: terminalFormData.name,
            to_name: "Divyanshu Mishra",
            from_email: terminalFormData.email,
            to_email: "dvbeast465@gmail.com",
            message: terminalFormData.message,
          },
          "4DsVrmRmczHS3ChaA"
        )
        .then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  };

  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-6 lg:gap-8">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        initial="show"
        animate="show"
        className="w-full h-full bg-black/80 border border-white/20 p-5 sm:p-8 rounded-lg backdrop-blur-sm"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={`${styles.sectionHeadText} mb-8`}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2 font-mono">
              Your Name <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className={`bg-black py-4 px-6 placeholder:text-gray-500 text-white rounded-lg outline-none border ${
                errors.name
                  ? "border-red-500"
                  : "border-white border-opacity-30 focus:border-white"
              } font-medium transition-colors`}
            />
            {errors.name && (
              <span className="text-red-400 text-sm mt-1">{errors.name}</span>
            )}
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-2 font-mono">
              Your Email <span className="text-red-500">*</span>
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className={`bg-black py-4 px-6 placeholder:text-gray-500 text-white rounded-lg outline-none border ${
                errors.email
                  ? "border-red-500"
                  : "border-white border-opacity-30 focus:border-white"
              } font-medium transition-colors`}
            />
            {errors.email && (
              <span className="text-red-400 text-sm mt-1">{errors.email}</span>
            )}
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-2 font-mono">
              Your Message <span className="text-red-500">*</span>
            </span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className={`bg-black py-4 px-6 placeholder:text-gray-500 text-white rounded-lg outline-none border ${
                errors.message
                  ? "border-red-500"
                  : "border-white border-opacity-30 focus:border-white"
              } font-medium transition-colors resize-none`}
            />
            {errors.message && (
              <span className="text-red-400 text-sm mt-1">
                {errors.message}
              </span>
            )}
          </label>

          {errors.submit && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-3 text-red-400 text-sm">
              {errors.submit}
            </div>
          )}

          {success && (
            <div className="bg-green-500 bg-opacity-10 border border-green-500 rounded-lg p-3 text-green-400 text-sm">
              Message sent. I will get back to you as soon as possible.
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-white hover:bg-gray-200 disabled:bg-gray-800 disabled:cursor-not-allowed py-3 px-8 rounded-xl outline-none w-full text-black font-bold shadow-md transition-all duration-300"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <div className="w-full">
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          initial="show"
          animate="show"
          className="hidden"
        >
          <div className="w-full h-full relative group rounded-lg overflow-hidden border border-white border-opacity-30 group-hover:border-opacity-100 bg-black backdrop-blur-sm transition-all duration-300">
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500 -z-10" />

            <div className="w-full h-full flex items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                className="w-4/5 h-4/5 filter drop-shadow-lg"
              >
                <defs>
                  <radialGradient id="earthGradient">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#9ca3af" />
                    <stop offset="100%" stopColor="#1a1a1a" />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <motion.circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="url(#earthGradient)"
                  filter="url(#glow)"
                  animate={{
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />

                <motion.circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  opacity="0.5"
                  animate={{
                    r: [85, 95, 85],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                <motion.circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#d1d5db"
                  strokeWidth="1"
                  opacity="0.3"
                  animate={{
                    r: [90, 100, 90],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />

                <circle cx="130" cy="70" r="3" fill="#ffffff" opacity="0.7" />
                <circle cx="60" cy="120" r="2" fill="#d1d5db" opacity="0.7" />
                <circle cx="100" cy="50" r="2.5" fill="#ffffff" opacity="0.6" />
              </svg>
            </div>

            <div className="absolute top-4 left-4 text-white font-mono text-xs opacity-70">
              &gt; earth.ping()
            </div>
            <div className="absolute bottom-4 right-4 text-gray-300 font-mono text-xs opacity-70">
              Status: [<span className="text-green-400 animate-pulse">on</span>]
              Connected
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={slideIn("up", "tween", 0.3, 1)}
          initial="show"
          animate="show"
          className="w-full h-[420px] sm:h-[520px] lg:h-full lg:min-h-[640px]"
        >
          <ContactTerminal onSubmit={handleTerminalSubmit} isMobile={false} />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
