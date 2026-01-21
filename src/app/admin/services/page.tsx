"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trash2, Plus, Loader2, Upload, Edit, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface IServiceItem {
    _id: string;
    title: string;
    image: string;
}

export default function ServicesAdmin() {
    const [items, setItems] = useState<IServiceItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<IServiceItem | null>(null);
    const [editForm, setEditForm] = useState({ title: "", image: "" });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch("/api/services");
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Failed to fetch");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("هل أنت متأكد من حذف هذه الخدمة؟")) return;
        try {
            await fetch(`/api/services/${id}`, { method: "DELETE" });
            setItems(items.filter((item) => item._id !== id));
        } catch (error) {
            alert("Error deleting item");
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        const title = prompt("أدخل عنوان الخدمة:");
        if (!title) return;

        setUploading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            // 1. Upload
            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            if (!uploadRes.ok) throw new Error("Upload failed");
            const { url } = await uploadRes.json();

            // 2. Create Service Item
            const createRes = await fetch("/api/services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    image: url,
                    title: title
                }),
            });

            if (createRes.ok) {
                const newItem = await createRes.json();
                setItems([...items, newItem]);
            }
        } catch (error) {
            alert("فشل رفع الصورة");
        } finally {
            setUploading(false);
        }
    };

    /* ================= EDIT LOGIC ================= */
    const openEditModal = (item: IServiceItem) => {
        setEditingItem(item);
        setEditForm({ title: item.title, image: item.image });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingItem(null);
        setEditForm({ title: "", image: "" });
    };

    const handleEditImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setUploading(true);

        try {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            if (!uploadRes.ok) throw new Error("Upload failed");
            const { url } = await uploadRes.json();

            setEditForm(prev => ({ ...prev, image: url }));
        } catch (error) {
            alert("فشل تحديث الصورة");
        } finally {
            setUploading(false);
        }
    };

    const handleSaveEdit = async () => {
        if (!editingItem) return;

        try {
            const res = await fetch(`/api/services/${editingItem._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm)
            });

            if (res.ok) {
                const updatedItem = await res.json();
                setItems(items.map(item => item._id === updatedItem._id ? updatedItem : item));
                closeEditModal();
            } else {
                throw new Error("Failed to update");
            }
        } catch (error) {
            alert("فشل تحديث الخدمة");
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#C5A038]" size={40} /></div>;

    return (
        <div className="min-h-screen bg-[#FFFBF2] p-8" dir="rtl">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <Link href="/admin/dashboard" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm transition-all hover:scale-110">
                        <ArrowRight />
                    </Link>
                    <h1 className="text-4xl font-bold text-[#5A4A42] font-arabic">إدارة الخدمات</h1>
                </div>

                <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-[#5A4A42] mb-1">إضافة خدمة جديدة</h2>
                        <p className="text-gray-500 text-sm">ارفع صورة وأدخل العنوان</p>
                    </div>

                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            disabled={uploading}
                        />
                        <Button className="flex items-center gap-2" disabled={uploading}>
                            {uploading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                            <span>{uploading ? "جاري الرفع..." : "إضافة خدمة"}</span>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div key={item._id} className="group relative bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 flex flex-col items-center text-center">
                            <div className="w-full aspect-[4/5] relative rounded-2xl overflow-hidden mb-4 border border-gray-100">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="font-bold text-[#5A4A42] mb-2">{item.title}</h3>

                            <div className="absolute top-4 left-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="w-10 h-10 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-full flex items-center justify-center transition-all shadow-sm"
                                    title="حذف"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <button
                                    onClick={() => openEditModal(item)}
                                    className="w-10 h-10 bg-blue-50 hover:bg-blue-500 text-blue-500 hover:text-white rounded-full flex items-center justify-center transition-all shadow-sm"
                                    title="تعديل"
                                >
                                    <Edit size={18} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {items.length === 0 && (
                        <div className="col-span-full py-20 text-center text-gray-400">
                            لا توجد خدمات مضافة حالياً.
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={closeEditModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-[#5A4A42] mb-6 font-arabic text-center">تعديل الخدمة</h2>

                        <div className="space-y-6">
                            {/* Image Preview / Upload */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative w-32 h-40 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 hover:border-[#C5A038] transition-colors group">
                                    {editForm.image ? (
                                        <Image
                                            src={editForm.image}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">بلا صورة</div>
                                    )}

                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Upload className="text-white" />
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleEditImageUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                                <span className="text-xs text-gray-500">اضغط على الصورة للتغيير</span>
                            </div>

                            {/* Title Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الخدمة</label>
                                <input
                                    type="text"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] focus:ring-2 focus:ring-[#C5A038]/20 outline-none transition-all"
                                    placeholder="أدخل العنوان الجديد..."
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                <Button
                                    onClick={handleSaveEdit}
                                    className="flex-1 bg-[#5A4A42] hover:bg-[#4A3A32]"
                                    disabled={uploading}
                                >
                                    {uploading ? "جاري الحفظ..." : "حفظ التغييرات"}
                                </Button>
                                <button
                                    onClick={closeEditModal}
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
