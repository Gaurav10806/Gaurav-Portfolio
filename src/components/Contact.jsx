import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn, textVariant } from "../utils/motion";
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
        "service_kedtpk9",
        "template_q72srpa",
        {
          from_name: form.name,
          to_name: "Gaurav Soni",
          from_email: form.email,
          to_email: "gaurav10806@gmail.com",
          message: form.message,
        },
        "nHcavcb-9xx9Pf9Ne"
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
          "service_kedtpk9",
          "template_q72srpa",
          {
            from_name: terminalFormData.name,
            to_name: "Gaurav Soni",
            from_email: terminalFormData.email,
            to_email: "gaurav10806@gmail.com",
            message: terminalFormData.message,
          },
          "nHcavcb-9xx9Pf9Ne"
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
    <div className="w-full flex flex-col">
      {/* Contact Section Header */}
      <motion.div variants={textVariant()} className="mb-10 text-left">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600" />
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest select-none">
            05 / CONTACT
          </p>
        </div>
        <h2 className={`${styles.sectionHeadText} font-black gradient-heading-text`}>
          {"<"} Contact / {">"}
        </h2>
      </motion.div>

      <div className="grid w-full grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-6 lg:gap-8">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          initial="show"
          animate="show"
          className="w-full h-full bg-black/80 border border-white/20 p-5 sm:p-8 rounded-lg backdrop-blur-sm"
        >
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

      {/* Right Column: Contact Terminal (Beside Contact Form on Desktop) */}
      <motion.div
        variants={slideIn("right", "tween", 0.3, 1)}
        initial="show"
        animate="show"
        className="w-full h-[420px] sm:h-[520px] lg:h-full lg:min-h-[580px]"
      >
        <ContactTerminal onSubmit={handleTerminalSubmit} isMobile={false} />
      </motion.div>
    </div>
  </div>
  );
};

export default SectionWrapper(Contact, "contact");
