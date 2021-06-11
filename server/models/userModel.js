import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false, required: true },
  isMaster: { type: Boolean, default: false, required: true },
  master: {
    name: String,
    logo: String,
    image: String,
    description: String,
    rating: { type: Number, default: 0, required: true },
    numRevies: { type: Number, default: 0, required: true }, 
  },

}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;