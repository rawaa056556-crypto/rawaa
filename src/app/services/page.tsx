"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface Service {
    _id: string;
    slug: string;
    title: string;
    shortDescription: string;
    iconName: string;
    image: string;
    order: number;
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50, damping: 20 } }
};

export default function ServicesPage() {
    const [servicesData, setServicesData] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('/api/services');
                if (res.ok) {
                    const data = await res.json();
                    setServicesData(data);
                }
            } catch (error) {
                console.error("Failed to fetch services");
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    return (
        <main className="min-h-screen bg-[#FFFBF2] pt-24 pb-20" dir="rtl">
            {/* Background Decor */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A038]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C5A038]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-[#C5A038] font-bold tracking-widest text-sm uppercase mb-4 block"
                    >
                        خدماتنا المميزة
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-7xl font-arabic font-bold text-[#5A4A42] mb-6"
                    >
                        إبداع في <span className="relative inline-block text-[#C5A038]">
                            التفصيل
                            <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#C5A038]/20 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-gray-500 text-lg md:text-xl leading-relaxed"
                    >
                        نقدم لكِ مجموعة شاملة من خدمات الخياطة الراقية، حيث تمتزج خبرة السنوات مع جودة التنفيذ لنضمن لكِ إطلالة تليق بكِ.
                    </motion.p>
                </div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {loading ? (
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden h-[450px]">
                                <Skeleton className="w-full h-64" />
                                <div className="p-8 space-y-4">
                                    <Skeleton className="h-8 w-1/2" />
                                    <Skeleton className="h-20 w-full" />
                                </div>
                            </div>
                        ))
                    ) : (
                        servicesData.map((service) => {
                            const IconComponent = (LucideIcons as any)[service.iconName] || LucideIcons.Sparkles;
                            return (
                                <Link href={`/services/${service.slug}`} key={service._id} className="block group h-full">
                                    <motion.div
                                        variants={itemVariants}
                                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                        className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_20px_50px_-10px_rgba(197,160,56,0.15)] border border-gray-100 hover:border-[#C5A038]/30 transition-all duration-500 h-full flex flex-col relative"
                                    >
                                        {/* Image Section */}
                                        <div className="relative h-64 w-full overflow-hidden">
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl text-[#C5A038] shadow-lg group-hover:bg-[#C5A038] group-hover:text-white transition-colors duration-300">
                                                <IconComponent size={24} strokeWidth={2} />
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-8 flex flex-col flex-grow relative">
                                            {/* Decorative line */}
                                            <div className="absolute top-0 right-8 w-12 h-1 bg-[#C5A038] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            <h2 className="text-2xl font-bold text-[#5A4A42] mb-3 group-hover:text-[#C5A038] transition-colors">
                                                {service.title}
                                            </h2>

                                            <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3 flex-grow text-sm">
                                                {service.shortDescription}
                                            </p>

                                            <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                                                <span className="text-[#C5A038] font-bold text-sm flex items-center gap-2 group/btn">
                                                    عرض التفاصيل
                                                    <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
                                                </span>
                                                <div className="w-8 h-8 rounded-full bg-[#FFF8E7] flex items-center justify-center text-[#C5A038] group-hover:bg-[#C5A038] group-hover:text-white transition-colors">
                                                    <ArrowRight size={14} className="rotate-180" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            );
                        })
                    )}
                </motion.div>
            </div>
        </main>
    );
}
