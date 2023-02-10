import mongoose, { SchemaTypes, mongo } from "mongoose";
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    foodType: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    meals: {
        type: Object,
        required: false,
    },
    tables: {
        type: Object,
        required: false,
    },
});

const ReceiptSchema = new Schema({
    tableNumber: {
        type: Number,
        required: true,
    },
    meals: {
        type: Object,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
});
export const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
export const Receipt = mongoose.model("Receipt", ReceiptSchema);
module.exports = { Restaurant, Receipt };
