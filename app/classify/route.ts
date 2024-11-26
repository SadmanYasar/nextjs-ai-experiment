import { NextResponse } from 'next/server'
import PipelineSingleton from './pipeline';
import { Pipeline } from '@huggingface/transformers';

export async function GET(request: Request) {
    // Extract the text parameter from the query string
    const url = new URL(request.url);
    const text = url.searchParams.get('text');
    if (!text) {
        return NextResponse.json({
            error: 'Missing text parameter',
        }, { status: 400 });
    }
    // Get the classification pipeline. When called for the first time,
    // this will load the pipeline and cache it for future use.
    const classifier = await PipelineSingleton.getInstance() as Pipeline;

    // Actually perform the classification
    const result = await classifier?.(text);

    return NextResponse.json(result);
}