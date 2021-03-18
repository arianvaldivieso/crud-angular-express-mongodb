import mongoose from 'mongoose';

const userShema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  last_login: Date,
  ip: String
});

const User = mongoose.model('User', userShema);

export { User }