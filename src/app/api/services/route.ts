import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Service } from '@/models/Service';

export async function GET() {
    try {
        await dbConnect();

        const count = await Service.countDocuments();

        if (count === 0) {
            // Seed initial data if empty
            const initialServices = [
                {
                    title: "إحرامات عمرة وحج",
                    image: "/siteimages/5151.webp",
                    order: 1
                },
                {
                    title: "إحرامات صلاة",
                    image: "/siteimages/download (46).webp", // Using existing placeholder
                    order: 2
                },
                {
                    title: "خياطة جلابيات",
                    image: "/siteimages/download (46).webp",
                    order: 3
                },
                {
                    title: "زي موحد(مراييل)",
                    image: "/siteimages/download.webp",
                    order: 4
                },
                {
                    title: "تعديلات",
                    image: "/siteimages/download.webp",
                    order: 5
                },
                {
                    title: "خياطة نسائية شاملة",
                    image: "/siteimages/download (45).webp",
                    order: 6
                }
            ];

            await Service.insertMany(initialServices);
        }

        const services = await Service.find({}).sort({ order: 1 });
        return NextResponse.json(services, {
            headers: {
                'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=59',
            }
        });
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const newItem = await Service.create(body);
        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
    }
}
