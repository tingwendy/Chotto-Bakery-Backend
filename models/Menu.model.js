const { Schema, model } = require("mongoose");

const menuSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
        type: String,
        required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  { 
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  },
);

const Menu = model("Menu", menuSchema);

module.exports = Menu;
