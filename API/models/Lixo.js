const mongoose = require("mongoose");

const LixoSchema = new mongoose.Schema(
{
    userId: { type: String, required: true },
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
}, 

    { timetamps: true }
);

module.exports = mongoose.model("Lixo", LixoSchema);