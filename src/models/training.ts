import mongoose from '../db/conn'

const { Schema } = mongoose

export const Training = mongoose.model(
  "Training",
  new Schema({
    heating: {
      type: String,
      required: false
    },
    practice: {
      type: String,
      required: false
    },
    fortification: {
      type: String,
      required: false
    },
    wod: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
  )
)