require("dotenv").config();
const port = process.env.PORT || 5000;
const express = require("express");
const app = express();
app.use(express.json());
import { MongoClient } from 'mongodb';
const client = `new MongoClient("mongodb://${process.dotenv.DB_USER}:${process.dotenv.DB_PASS}@ac-sngbs1o-shard-00-00.2t9vxwn.mongodb.net:27017,ac-sngbs1o-shard-00-01.2t9vxwn.mongodb.net:27017,ac-sngbs1o-shard-00-02.2t9vxwn.mongodb.net:27017/?ssl=true&replicaSet=atlas-kdcm1f-shard-0&authSource=admin");`

export async function connectToMongoDB() {
  try {
    await client.connect();
    //Start from here;
    const studentCollection = client.db("universityDB").collection("students");
    const teacherCollection = client.db("universityDB").collection("teacher");

    app.post("/student", async(req,res) => {
      const student = req.body;
      const result = studentCollection.insertOne(student);
      res.send(result);
    });

    app.post("/teacher", async(req,res) => {
      const teacher = req.body;
      const result = teacherCollection.insertOne(teacher);
      res.send(result);
    });

    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  // await client.close();
}

app.get("/",(req, res)=>{
  res.send("Student Management website is running");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});