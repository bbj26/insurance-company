import { Document, Schema, model } from 'mongoose';

interface ICoverage extends Document {
    name: string;
    fixedPrice?: { old: number; young: number };
    percentage?: number;
}

const coverageSchema = new Schema<ICoverage>({
    name: { type: String, required: true },
    fixedPrice: {
        old: { type: Number },
        young: { type: Number }
    },
    percentage: { type: Number }
});

const Coverage = model<ICoverage>('Coverage', coverageSchema);

export default Coverage;
export { ICoverage };
