import mongoose from '../db/conn'

const { Schema } = mongoose

export const User = mongoose.model(
  "Users",
  new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    tell: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: true
    },
    isAStudent: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: false }
  )
)