import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import interviewRouter from "./routes/interview.route.js"
import paymentRouter from "./routes/payment.route.js"

const app = express()
app.set("trust proxy", 1)

const configuredClientUrls = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(",").map(url => url.trim().replace(/\/+$/, "")).filter(Boolean)
    : []

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://localhost:3000",
    "https://three-interviewiq-run-2.onrender.com",
    ...configuredClientUrls,
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true)
        const cleanOrigin = origin.replace(/\/+$/, "")
        if (
            allowedOrigins.includes(cleanOrigin) ||
            allowedOrigins.includes(origin) ||
            /^http:\/\/localhost:\d+$/.test(origin) ||
            /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)
        ) {
            return callback(null, true)
        }
        return callback(new Error("Not allowed by CORS"))
    },
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth" , authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview" , interviewRouter)
app.use("/api/payment" , paymentRouter)

const PORT = process.env.PORT || 6000
app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`)
    connectDb()
})
