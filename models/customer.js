var mongoose = require("mongoose");
const { ObjectId } = mongoose.schema;

var customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    phone: {
      type: Number,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    transaction: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
