"use client";

import React, { useState } from "react";
import { Phone, MapPin, Clock, Send, CheckCircle2, Loader2, Instagram, Twitter, Facebook, Whatsapp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Constants
const DISPLAY_PHONE = "056 556 0831";
const LOCATION = "الرياض، السعودية";
const WHATSAPP_NUMBER = "966565560831"; // بدون +

export function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [activeField, setActiveField] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setStatus("success");
        setFormState({ name: "", phone: "", email: "", service: "", message: "" });

        setTimeout(() => setStatus("idle"), 5000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const contactInfo = [
        {
            icon: Phone,
            title: "اتصلي بنا",
            value: DISPLAY_PHONE,
            link: `tel:+${WHATSAPP_NUMBER}`,
            delay: 0.1
        },
        {
            icon: MapPin,
            title: "موقعنا",
            value: LOCATION,
            link: "https://www.google.com/maps?q=26.4660679,50.0415029&z=17&hl=en",
            delay: 0.2
        },
        {
            icon: Clock,
            title: "ساعات العمل",
            value: "يوميا: 10 ص - 10 م",
            link: null,
            delay: 0.3
        }
    ];

    return (
        <section className="py-24 px-4 md:px-8 bg-[#FFFBF2] relative overflow-hidden" dir="rtl" id="contact">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-gold-primary font-bold tracking-[0.2em] text-sm uppercase mb-3 block"
                    >
                        تواصل معنا
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-arabic font-bold text-[#5A4A42] mb-6"
                    >
                        نحن هنا <span className="text-gold-primary relative inline-block">لخدمتك</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        لديك استفسار أو ترغبين في حجز موعد؟ لا تترددي في التواصل معنا. فريقنا جاهز للرد على جميع استفساراتك بأسرع وقت.
                    </motion.p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                    {/* Contact Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="w-full lg:w-1/3 space-y-8"
                    >
                        <div className="sticky top-24 bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 shadow-md border border-white/50">
                            <h3 className="text-2xl font-bold text-[#5A4A42] mb-10">معلومات التواصل</h3>

                            <div className="space-y-6">
                                {contactInfo.map((info, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-[#FFF8E7] rounded-2xl flex items-center justify-center text-gold-primary">
                                            <info.icon size={26} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="text-gold-dark font-bold text-sm">{info.title}</p>
                                            {info.link ? (
                                                <a href={info.link} className="text-[#5A4A42] font-medium text-lg hover:text-gold-primary transition">
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="text-[#5A4A42] font-medium text-lg">{info.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* WhatsApp Button */}
                            <div className="mt-6 text-center">
                                <a
                                    href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-green-600 transition"
                                >
                                    <Whatsapp size={20} />
                                    تواصل معنا عبر WhatsApp
                                </a>
                            </div>

                            {/* Social Media */}
                            <div className="mt-12 flex justify-center gap-4">
                                {[{ Icon: Instagram, href: "#" }, { Icon: Twitter, href: "#" }, { Icon: Facebook, href: "#" }].map((social, i) => (
                                    <a key={i} href={social.href} className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#5A4A42] hover:bg-gold-primary hover:text-white transition-shadow">
                                        <social.Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form Side */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="w-full lg:w-2/3"
                    >
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-md border border-gray-50">
                            <h3 className="text-3xl font-bold text-[#5A4A42] mb-10">أرسلي لنا رسالة</h3>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <InputField
                                        label="الاسم الكامل"
                                        id="name"
                                        type="text"
                                        value={formState.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="اكتبي اسمك هنا"
                                        activeField={activeField}
                                        setActiveField={setActiveField}
                                    />
                                    <InputField
                                        label="رقم الجوال"
                                        id="phone"
                                        type="tel"
                                        value={formState.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="+966565560831"
                                        dir="ltr"
                                        className="text-right"
                                        activeField={activeField}
                                        setActiveField={setActiveField}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="message" className={`text-sm font-bold ${activeField === "message" ? "text-gold-primary" : "text-gray-700"}`}>
                                        الرسالة
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={formState.message}
                                        onChange={handleChange}
                                        onFocus={() => setActiveField("message")}
                                        onBlur={() => setActiveField(null)}
                                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-gold-primary/30 outline-none placeholder-gray-400"
                                        placeholder="اكتبي تفاصيل طلبك أو استفسارك هنا..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={status === "submitting" || status === "success"}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full py-5 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-3 ${
                                        status === "success" ? "bg-green-500" : "bg-[#5A4A42] hover:bg-gold-primary"
                                    }`}
                                >
                                    <AnimatePresence mode="wait">
                                        {status === "submitting" ? (
                                            <motion.div key="loading" className="flex items-center gap-3">
                                                <Loader2 className="animate-spin" />
                                                <span>جاري الإرسال...</span>
                                            </motion.div>
                                        ) : status === "success" ? (
                                            <motion.div key="success" className="flex items-center gap-3">
                                                <CheckCircle2 size={24} />
                                                <span>تم الإرسال بنجاح</span>
                                            </motion.div>
                                        ) : (
                                            <motion.div key="idle" className="flex items-center gap-3">
                                                <Send size={22} className="rotate-180" />
                                                <span>إرسال الطلب</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// Input Field Component
function InputField({ label, id, type, value, onChange, required, placeholder, dir, className, activeField, setActiveField }: {
    label: string;
    id: string;
    type: string;
    value: string;
    onChange: any;
    required?: boolean;
    placeholder?: string;
    dir?: string;
    className?: string;
    activeField: string | null;
    setActiveField: any;
}) {
    return (
        <div className="space-y-3">
            <label htmlFor={id} className={`text-sm font-bold ${activeField === id ? "text-gold-primary" : "text-gray-700"}`}>
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                required={required}
                value={value}
                onChange={onChange}
                onFocus={() => setActiveField(id)}
                onBlur={() => setActiveField(null)}
                className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-gold-primary/30 outline-none placeholder-gray-400 ${className || ""}`}
                placeholder={placeholder}
                dir={dir}
            />
        </div>
    )
}
