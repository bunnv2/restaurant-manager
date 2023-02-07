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


export const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = { Restaurant };
