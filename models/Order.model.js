const { Schema, model } = require("mongoose");


const orderSchema = new Schema(
  {
    orderItems: [
        {
            quantity: {type: Number, required: true},
            product: {type: Schema.Types.ObjectId,
                ref: "Menu",
                required: true},
            }
        ],
    
    // paymentMethod: {type: String, required: true},
    // paymentResult: {
    //     id: String,
    //     status: String,
    //     email_address: String
    // },
    // itemsPrice: {type: String, required: true},
    totalPrice: {type: String, required: true},
    user: {type: Schema.Types.ObjectId,
            ref: "User",
            required: true},
    // isPaid: {type: Boolean, default: false},
    // paidAt: {type: Date},

  },
  { 
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  },
);

const Order = model("Order", orderSchema);

module.exports = Order;
