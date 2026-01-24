
"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { servicesData } from "@/data/services";
import * as LucideIcons from "lucide-react";
import React from "react";
import Image from "next/image";
import { getInquiryWhatsAppUrl } from "@/lib/constants";

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
    const service = servicesData.find((s) => s.slug === params.slug);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFFBF2]">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[#5A4A42] mb-4">الخدمة غير موجودة</h1>
                    <Link href="/" className="text-[#C5A038] hover:underline">
                        العودة للرئيسية
                    </Link>
                </div>
            </div>
        );
    }

    // Dynamically get the icon component
    const IconComponent = (LucideIcons as any)[service.iconName] || LucideIcons.Sparkles;


    return (
        <main className="min-h-screen bg-[#FFFBF2] pt-28 pb-20" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Breakcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-[#C5A038] transition-colors">الرئيسية</Link>
                    <span>/</span>
                    <Link href="/services" className="hover:text-[#C5A038] transition-colors">الخدمات</Link>
                    <span>/</span>
                    <span className="text-[#5A4A42] font-semibold">{service.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gold-primary/20 flex items-center justify-center text-[#C5A038]">
                            <IconComponent size={40} strokeWidth={1.5} />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-arabic font-bold text-[#5A4A42]">
                            {service.title}
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed">
                            {service.fullDescription}
                        </p>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold text-[#5A4A42] mb-6 flex items-center gap-2">
                                <span className="w-1 h-8 bg-[#C5A038] rounded-full"></span>
                                مميزات الخدمة
                            </h3>
                            <ul className="grid grid-cols-1 gap-4">
                                {service.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-4 group">
                                        <span className="w-10 h-10 rounded-full bg-[#E5F6E5] text-green-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <CheckCircle2 size={20} />
                                        </span>
                                        <span className="text-gray-700 font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex gap-4 pt-6">
                            <a
                                href={getInquiryWhatsAppUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-[#25D366] hover:bg-[#1da851] text-white py-4 px-8 rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-1"
                            >
                                اطلبي الخدمة الآن
                            </a>
                            <Link
                                href="/services"
                                className="px-8 py-4 rounded-xl border-2 border-[#5A4A42]/10 hover:border-[#C5A038] text-[#5A4A42] hover:text-[#C5A038] font-bold transition-all"
                            >
                                تصفح باقي الخدمات
                            </Link>
                        </div>
                    </motion.div>

                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative h-[600px] bg-white rounded-[3rem] p-4 shadow-2xl border border-gray-100"
                    >
                        <div className="absolute top-1/2 left-1/2 w-full h-full bg-[#C5A038]/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 -z-10" />

                        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-gray-100">
                            {/* Since real images might not exist, we use a placeholder or the service image if valid */}
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#5A4A42]/80 to-transparent flex items-end p-10">
                                <div className="text-white">
                                    <p className="font-bold text-lg mb-2">جودة وإتقان</p>
                                    <p className="text-white/80 text-sm">نضمن لك أفضل تجربة خياطة مع اهتمام بأدق التفاصيل.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
