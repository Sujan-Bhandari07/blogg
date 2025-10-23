// Import all dependencies

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userrouter from './routes/Userroute.js';
import blogrouter from './routes/Blogroute.js';
import commentrouter from './routes/Commentroyte.js';

dotenv.config();
connectDB()

// Create express app
const app = express();
const port = process.env.PORT || 4000

// Basic middleware
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// app.use(cookieParser());
app.use(cookieParser())





// app.use(express.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/user",userrouter)
app.use("/api/blog",blogrouter)
app.use("/api/comment",commentrouter)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
