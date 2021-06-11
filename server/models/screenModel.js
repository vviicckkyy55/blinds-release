import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  }, {
    timestamps: true,
  }
);

const screenSchema = new mongoose.Schema(
  {
  name: { type: String, required: true, unique: true},
  master: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  image: { type: String, required: true}, //playlist thumbnail folder
  category: { type: String, required: true },
  slotsAvailable: { type: Number, required: true},
  costPerSlot: { type: Number, required: true},
  rating: { type: Number, required: true},
  numReviews: { type: Number, required: true},
  description: { type: String, required: true},
  reviews: [reviewSchema],
}, {
  timestamps: true,
});

const Screen = mongoose.model('Screen', screenSchema);

export default Screen;