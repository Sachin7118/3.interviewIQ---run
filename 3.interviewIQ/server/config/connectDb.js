import mongoose from "mongoose";

const connectDb = async () => {
    const primaryUrl = process.env.MONGODB_URL;
    const fallbackUrl = "mongodb://127.0.0.1:27017/interviewAI";

    if (primaryUrl) {
        try {
            await mongoose.connect(primaryUrl, {
                serverSelectionTimeoutMS: 5000,
            });
            console.log("DataBase Connected (Primary MongoDB URL)");
            return;
        } catch (error) {
            console.warn(`Primary DataBase connection failed: ${error.message || error}`);
            console.log("Attempting fallback to local MongoDB instance...");
        }
    }

    try {
        await mongoose.connect(fallbackUrl, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("DataBase Connected (Local MongoDB Fallback: mongodb://127.0.0.1:27017/interviewAI)");
    } catch (fallbackError) {
        console.error(`Local MongoDB Fallback also failed: ${fallbackError.message || fallbackError}`);
        console.error("Please ensure MongoDB is running locally on port 27017 or provide valid MONGODB_URL credentials in .env");
    }
};

export default connectDb