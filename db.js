import { connect, model, mongoose } from "mongoose";
import moment from "moment/moment.js";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";

mongoose.set("strictQuery", false);
export const uri =
  "mongodb+srv://Abdulboriy:MongoDB@cluster0.mpywc.mongodb.net/?retryWrites=true&w=majority/task6";

connect(uri);

export const Users = new Schema({
  id: {
    type: String,
    required: true,
    default: function genUUID() {
      return uuidv4();
    },
  },
  Name: {
    type: String,
    required: true,
  }, // String is shorthand for {type: String}
  recieved: {
    type: Array,
  },
  sent: {
    type: Array,
  },
});

export const User = mongoose.model("User", Users);

export const Messages = new Schema({
  id: {
    type: String,
    required: true,
    default: function genUUID() {
      return uuidv4();
    },
  },
  text: {
    type: String,
    required: true,
  }, // String is shorthand for {type: String}
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: String(new Date().toJSON().slice(0, 10)),
  },
  custom_id: {
    type: String,
    required: true,
  },
});

export const Message = mongoose.model("Message", Messages);
