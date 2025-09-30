import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // No two users can have the same email
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // Default new users to not be admins
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// We'll add password hashing logic here later

const User = mongoose.model('User', userSchema);

export default User;