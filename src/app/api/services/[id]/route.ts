import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Service } from '@/models/Service';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        const updatedService = await Service.findByIdAndUpdate(id, body, { new: true });

        if (!updatedService) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json(updatedService);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        await Service.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
    }
}
