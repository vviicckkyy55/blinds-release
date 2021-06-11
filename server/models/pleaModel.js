import mongoose from 'mongoose';

const pleaSchema = new mongoose.Schema(
  {
  pleaAsks: [
    {
    name: {type: String, required: true },
    slots: { type: Number, required: true },
    image: { type: String, required: true },
    costPerSlot: { type: Number, required: true },
    screen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Screen',
      required: true,
    },
  }],

  completeAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    municipality: { type: String, required: true },
    pincode: { type: String, required: true },
    stateUT: { type: String, required: true },
    country: { type: String, required: true },
    lat: Number,
    lng: Number,
  },

  paymentMethod: { type: String, required: true },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String,
  },
  asksCost: { type: Number, required: true },
  addressCost: { type: Number, required: true },
  taxCost: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  master: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
}, {
  timestamps: true,
});

const Plea = mongoose.model('Plea', pleaSchema);

export default Plea;