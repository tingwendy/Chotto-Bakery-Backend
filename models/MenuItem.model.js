const { Schema, model } = require("mongoose");

const menuItemSchema = new Schema(
  {
    name: {
        type: Schema.Types.ObjectId,
        ref: "Menu",
    },

    price: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: false,    
    },

    contains: {
        type: String,
        required: true
    },

    storage: {
        type: String,
    }
  },
  { 
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  },
);

const MenuItem = model("MenuItem", menuItemSchema);

module.exports = MenuItem;