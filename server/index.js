import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import client from "./config/connectToRedis.js";
import postRoutes from "./routes/posts.js";
import { errorHandler, notFound } from "./middleware/error.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

//Body Parser
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello to Memories API" });
});
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("##########################################################");
  console.log("#####               STARTING SERVER                  #####");
  console.log("##########################################################\n");
  console.log(`server running on → PORT ${server.address().port}`.yellow.bold);
});

process.on("uncaughtException", (error) => {
  console.log(`uncaught exception: ${error.message}`.red.bold);
  process.exit(1);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`.red.bold);
  server.close(() => process.exit(1));
});

app.use(notFound);

app.use(errorHandler);
