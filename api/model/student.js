const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-paginate-v2");
const mongoosePaginate = require("mongoose-aggregate-paginate-v2");

const StudentSchema = mongoose.Schema(
  {
    name: {
      type: "String",
      default: "",
    },
    standard: {
      type: Number,
      default: 0,
    },
    subject: {
      type: String,
      default: "",
    },
    uniform: {
      type: String,
      enum: ["Red", "White", "Blue"],
      required: false,
    },
    join_date: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);
StudentSchema.plugin(aggregatePaginate);
StudentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Students", StudentSchema);
