import { Schema, model, Document } from 'mongoose';

interface ICustomer extends Document {
    name: string;
    birthdate: Date;
    city: string;
    vehiclePower: number;
    voucher?: string;
}

const customerSchema = new Schema<ICustomer>({
    name: { type: String, required: true },
    birthdate: { type: Date, required: true },
    city: { type: String, required: true },
    vehiclePower: { type: Number, required: true },
    voucher: { type: String }
});

const Customer = model<ICustomer>('Customer', customerSchema);

export default Customer;
export { ICustomer };
