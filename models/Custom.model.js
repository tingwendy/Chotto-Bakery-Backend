const { Schema, model } = require("mongoose");

const customSchema = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    phone: {
        type: String,
        required: true,    
    },

    pickUpTime: {
        type: String,
        required: true,
        
    },

    productNeededBy: {
        type: String, 
    },

    typeOfProduct: {
        type: String,
    },

    quantityNeeded: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    foodAllergies: {
        type: String
    },

    picUrl: {
        type: String,
    }

  },
  { 
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  },
);

const Custom = model("Custom", customSchema);

module.exports = Custom;