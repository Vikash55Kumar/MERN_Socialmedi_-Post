import express from 'express'
import cors from "cors"
import path from 'path'
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser';

const app=express();
app.use(cors({
    origin:process.env.CORES_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept"
    ],
    credentials:true
}))

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true, limit:"20kb"}))
app.use(express.static("public"))
app.use(bodyParser.json());
app.use(cookieParser())

const __dirname = path.resolve();

const buildPath = path.join(__dirname, '../../frontend/dist');

app.use(express.static(buildPath)); 

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next(); // Skip static file serving for API routes
  }
  res.sendFile(path.join(buildPath, 'index.html'));
});

//routers import 
import userRouter from "./routes/user.route.js"
import socialMediaRouter from "./routes/socialMedia.router.js"
import commentRouter from "./routes/comment.router.js"
import likeRouter from "./routes/like.router.js"
import { ApiError } from './utils/ApiError.js';

//router declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/socialMedia", socialMediaRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)



app.use((err, req, res, next) => {
    console.error("🔥 Error:", err); // Debugging

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors || []
        });
    }

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});


export {app}