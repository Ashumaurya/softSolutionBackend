var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var transactionSchema = mongoose.Schema(
  {
    customer: {
      type: ObjectId,
      ref: "Customer",
      required: true,
    },
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
      type: String, //paid or recieved
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transactions", transactionSchema);
