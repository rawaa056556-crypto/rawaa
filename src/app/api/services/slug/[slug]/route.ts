import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Service } from '@/models/Service';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    await dbConnect();
    const { slug } = await params;
    console.log(`[API] Fetching service with slug: '${slug}'`);
    try {
        const service = await Service.findOne({ slug: slug });
        console.log(`[API] Service found: ${service ? service.title : 'NULL'}`);
        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }
        return NextResponse.json(service);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
    }
}
