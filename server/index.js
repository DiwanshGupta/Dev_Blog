import express from 'express';
import cors from "cors"
import env from "dotenv"
import { connectDB } from './utils/db_connect.js';
import authRouter from './routes/user/auth_route.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from './utils/config.js';


env.config();
const app = express();
app.use(cors({ origin: config.frontend_url, credentials: true }));
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.get("/api/", (req,res,next)=>{
    res.send("Hello from server..")
});

app.use('/api/v1/auth',authRouter)

const port = 5000;
const start = async () => {
  try {
    connectDB()
      app.listen(port, () =>
        console.log(
          `⚡️[server]: Server iS running at http://localhost:${port} as well as connected with database`
        )
      );
  } catch (error) {
    console.log(error);
  }
};
start()