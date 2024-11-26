import { pipeline, PipelineType } from "@huggingface/transformers";

// Use the Singleton pattern to enable lazy construction of the pipeline.
// NOTE: We wrap the class in a function to prevent code duplication (see below).
const P = () => class PipelineSingleton {
    static task: PipelineType = 'text-classification';
    static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
    static instance: PipelineSingleton | null = null;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    static async getInstance(progress_callback: Function | undefined = undefined) {
        if (!this.instance) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

/* 
==========================================================================================
INSPIRED BY: https://github.com/prisma/prisma/discussions/10037#discussioncomment-1569084
==========================================================================================
*/
let PipelineSingleton: ReturnType<typeof P>;
if (process.env.NODE_ENV !== 'production') {
    // When running in development mode, attach the pipeline to the
    // global object so that it's preserved between hot reloads.
    // For more information, see https://vercel.com/guides/nextjs-prisma-postgres
    const globalWithPipeline = global as typeof global & { PipelineSingleton: ReturnType<typeof P> };

    if (!globalWithPipeline.PipelineSingleton) {
        globalWithPipeline.PipelineSingleton = P();
    }

    PipelineSingleton = globalWithPipeline.PipelineSingleton;
} else {
    PipelineSingleton = P();
}
export default PipelineSingleton;