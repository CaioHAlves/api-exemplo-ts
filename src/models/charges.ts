import mongoose from '../db/conn'

const { Schema } = mongoose

export const Charge = mongoose.model(
  "Charge",
  new Schema({
    clean: {
      type: Number,
      required: false
    },
    cleanJerk: {
      type: Number,
      required: false
    },
    powerClean: {
      type: Number,
      required: false
    },
    squatClean: {
      type: Number,
      required: false
    },
    frontSquat: {
      type: Number,
      required: false
    },
    backSquat: {
      type: Number,
      required: false
    },
    snatch: {
      type: Number,
      required: false
    },
    powerSnatch: {
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