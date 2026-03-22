import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { orgName, type, contact, email, description } = body;

        if (!orgName || !type || !contact || !email) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Mock: In production, this would write to Supabase + send email via Resend
        // await supabase.from('partnerships').insert({ org_name: orgName, type, contact, email, description });
        // await resend.emails.send({ to: email, subject: 'Partnership Application Received', ... });

        return NextResponse.json({
            success: true,
            message: 'Partnership application received. We will be in touch within 5 business days.',
        });
    } catch {
        return NextResponse.json(
            { error: 'Failed to process application' },
            { status: 500 }
        );
    }
}
