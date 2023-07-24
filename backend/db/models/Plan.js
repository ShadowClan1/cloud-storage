const { default: mongoose, Schema } = require("mongoose");
const planSchema = new Schema({
    sub_name: {
      type: String,
      required: true,
    },
    default_price_id: {
      type: Schema.Types.ObjectId,
      // required: true,
      ref: "Price",
    },
    price_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: "Price",
      },
    ],
    prod_id: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    activatedAt: {
      type: Date,
    },
    retiredAt: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
    },
  });
  const Plan = mongoose.model("Plan", planSchema);
  module.exports = Plan