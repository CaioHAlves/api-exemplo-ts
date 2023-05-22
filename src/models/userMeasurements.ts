import mongoose from "../db/conn";

const { Schema } = mongoose

export const UserMeasurements = mongoose.model(
  "userMeasurements",
  new Schema({
    weight: {
      type: Number,
      required: false
    },
    arm: {
      type: Number,
      required: false
    },
    waist: {
      type: Number,
      required: false
    },
    leg: {
      type: Number,
      required: false
    },
    imc: {
      type: Number,
      required: false
    },
    bodyFat: {
      type: Number,
      required: false
    },
    leanMass: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
    },
    userId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
  )
)