var mongoose = require("mongoose");
const { ObjectId } = mongoose.schema;

var transactionSchema = mongoose.Schema(
  {
    ammount: {
      type: Number,
      required: true,
      trim: true,
    },

    division: {
      type: ObjectId,
      ref: "Division",
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
      trim: true,
    },
    customer: {
      type: ObjectId,
      ref: "Customer",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transactions", transactionSchema);
