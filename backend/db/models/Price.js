const { default: mongoose, Schema } = require("mongoose");

const priceSchema = new Schema({
    price_id: {
      type: String,
      required: true,
    },
    prod_id: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
    },
    price: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  const Price = mongoose.model("Price", priceSchema);

  module.exports = Price