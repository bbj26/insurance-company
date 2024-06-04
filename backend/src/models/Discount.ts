import { Schema, model, Document } from 'mongoose';

interface IDiscount extends Document {
    name: string;
    percentage: number;
}

const discountSchema = new Schema<IDiscount>({
    name: { type: String, required: true },
    percentage: { type: Number, required: true }
});

const Discount = model<IDiscount>('Discount', discountSchema);

export default Discount;
export { IDiscount };
