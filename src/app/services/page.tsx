
"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { servicesData } from "@/data/services";
import * as LucideIcons from "lucide-react";
import React from "react";
import Image from "next/image";

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-[#FFFBF2] pt-24 pb-20" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-arabic font-bold text-[#5A4A42] mb-6"
                    >
                        خدماتنا <span className="text-[#C5A038]">المتميزة</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-gray-600 text-lg leading-relaxed"
                    >
                        نقدم لكِ مجموعة شاملة من خدمات الخياطة الراقية، حيث تمتزج خبرة السنوات مع جودة التنفيذ لنضمن لكِ إطلالة تليق بكِ.
                    </motion.p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((service, index) => {
                        const IconComponent = (LucideIcons as any)[service.iconName] || LucideIcons.Sparkles;
                        return (
                            <Link href={`/services/${service.slug}`} key={service.id} className="block group">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="bg-white rounded-[2rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(197,160,56,0.15)] border border-transparent hover:border-[#C5A038]/20 transition-all duration-300 h-full flex flex-col"
                                >
                                    <div className="w-16 h-16 bg-[#FFF8E7] text-[#C5A038] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#C5A038] group-hover:text-white transition-all duration-300">
                                        <IconComponent size={32} />
                                    </div>

                                    <h2 className="text-2xl font-bold text-[#5A4A42] mb-4 group-hover:text-[#C5A038] transition-colors">
                                        {service.title}
                                    </h2>

                                    <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                                        {service.shortDescription}
                                    </p>

                                    <div className="flex items-center text-[#C5A038] font-bold text-sm">
                                        <span>عرض التفاصيل</span>
                                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-2 transition-transform" />
                                    </div>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
