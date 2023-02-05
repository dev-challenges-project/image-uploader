import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import postRoute from "./routes/postRoute.js";

dotenv.config();

const port = process.env.PORT;
const app = express();

// middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded());

app.use("/api/v1/upload", postRoute);

app.get("/", (req, res) => {
  res.send("Hi there client");
});

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`server started at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
