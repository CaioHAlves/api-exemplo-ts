import mongoose from '../db/conn'

const { Schema } = mongoose

export const Charge = mongoose.model(
  "Charge",
  new Schema({
    clean: {
      type: Number,
      required: false
    },
    deadlift: {
      type: Number,
      required: false
    },
    userId: {
      type: String,
      required: true
    }
  },
  { timestamps: false }
  )
)