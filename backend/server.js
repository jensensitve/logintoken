import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./database/connectDB.js";
import userRouter from "./routes/userRouter.js"
import cookieParser from "cookie-parser";

const app = express();

const port = process.env.PORT || 5050;
const connectionString = process.env.MONGO_URL;

app.use(cors({ credentials: true, origin: "https://logintoken.onrender.com:10000" }))
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRouter);

(async () => {
   try {
      await connectDB(connectionString);
      console.log("Mit MONGODB verbunden!");
      //
      app.listen(port, () => {
         console.log(`Server läuft auf Port: ${port}`);
      });
   } catch (error) {
      console.log(error);
   }
})();
