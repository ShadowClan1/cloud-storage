const { default: mongoose, Schema } = require("mongoose");


const invoiceSchema = new Schema({
    inv_id: {
      type: String,
      required: true,
    },
    amount_paid: {
      type: Number,
      required: true,
    },
    attempted_count: {
      type: Number,
      required: true,
    },
    
    price_id: {
      type: Schema.Types.ObjectId,
      // required: true,
      ref: "Price",
    },
    prod_id: {
      type: Schema.Types.ObjectId,
      // required: true,
      ref: "Plan",
    },
    amount_due: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    amount_due: {
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
    cancelAt: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
    },
  });
  
  const Invoice = mongoose.model("Invoice", invoiceSchema);

  module.exports = Invoice