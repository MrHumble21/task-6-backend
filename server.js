import express from "express";
import bodyParser from "body-parser";
// import dotenv from 'do'
const app = express();
const port = 1111;
import cors from "cors";
import { Message, User } from "./db.js";
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/create_user", async function (req, res) {
  const users = await User.find({ Name: req.body.name });
  try {
    if (users.length !== 0) {
      res.json({ response: "user already exists" });
    } else {
      let newUser = new User({ Name: req.body.name });
      newUser.save((e) => console.log(e));
      console.log("user created");
      res.json({ response: "user has been created successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/sender", async function (req, res) {
  try {
    const users = await User.find({ Name: req.body.senderName });
    res.json(users);
  } catch (error) {}
});

app.get("/all_users", async function (req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

app.post("/get_user", async function (req, res) {
  try {
    const user = await User.find({ Name: req.body.username });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

app.post("/get_sender_data", async function (req, res) {
  try {
    res.json({ sender });
  } catch (error) {}
});
// update user
app.post("/reciever-patch", async function (req, res) {
  try {
    // const reciver = await User.find({ _id: req.body.rec });
    User.findOneAndUpdate(
      { Name: req.body.rec },
      { $push: { recieved: req.body.message } },
      () => {
        console.log("message saved to recipient");
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.patch("/sender-patch", async function (req, res) {
  try {
    // const sender = await User.find({ _id: req.body.s });
    User.findOneAndUpdate(
      { _id: req.body.s },
      { $push: { sent: req.body.message } },
      () => {
        console.log("message saved to sender");
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// update user ends

app.post("/save_message", async function (req, res) {
  try {
    let newEmail = new Message(req.body.email_details);
    newEmail.save((e) => console.log(e));
    // console.log(req.body);
    res.json(req.body);
  } catch (error) {}
});
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
