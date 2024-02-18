import express from "express";
import { connectDB } from "./connectDB.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import "dotenv/config";
const app = express();

app.use(express.json());
app.use(express.static("./public"));
// allow all origin with Default of cors(*)
app.use(cors());
const PORT = process.env.PORT || 5555;
// allow custom origin
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.get("/", (req, res) => {
  return res.status(234).send("Welcome to MERN Stack");
});

// route to save book
app.use("/books", booksRoute);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log(`App is listening on port : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
