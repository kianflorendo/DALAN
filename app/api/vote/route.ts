import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { voteId, optionId, userId } = body;

        if (!voteId || !optionId) {
            return NextResponse.json(
                { error: 'Missing voteId or optionId' },
                { status: 400 }
            );
        }

        // Mock: In production, this would write to Supabase
        // await supabase.from('user_votes').insert({ user_id: userId, vote_id: voteId, option_id: optionId });
        // await supabase.rpc('increment_vote', { vote_id: voteId, option_id: optionId });

        return NextResponse.json({
            success: true,
            message: 'Vote recorded successfully',
            voteId,
            optionId,
        });
    } catch {
        return NextResponse.json(
            { error: 'Failed to process vote' },
            { status: 500 }
        );
    }
}

export async function GET() {
    // Mock: return available votes
    return NextResponse.json({
        votes: [
            {
                id: '1',
                question: 'Which subject area should we expand next?',
                status: 'active',
            },
        ],
    });
}
