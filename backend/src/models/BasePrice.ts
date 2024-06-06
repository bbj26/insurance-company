import mongoose, { Schema, Document } from 'mongoose';

interface IBasePrice extends Document {
    city: string;
    minAge: number;
    basePrice: number;
}

const BasePriceSchema: Schema = new Schema({
    city: { type: String, required: true },
    minAge: { type: Number, required: true },
    basePrice: { type: Number, required: true }
});

const BasePrice = mongoose.model<IBasePrice>('BasePrice', BasePriceSchema);

export default BasePrice;
export { IBasePrice };
