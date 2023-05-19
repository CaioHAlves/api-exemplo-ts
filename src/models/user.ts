import mongoose from '../db/conn'

const { Schema } = mongoose

const User = mongoose.model(
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
    }
  },
  { timestamps: false }
  )
)

export default User