import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Service } from '@/models/Service';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    await dbConnect();
    const { slug } = await params;
    try {
        const service = await Service.findOne({ slug: slug });
        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }
        return NextResponse.json(service);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
    }
}
