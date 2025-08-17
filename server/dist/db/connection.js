import { connect, disconnect } from "mongoose";
const connectToDatabase = async () => {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        throw new Error("Cannot connect to MongoDB");
    }
};
// IF THE APPLICATION HAVE PROBLEM THEN THIS FUNCTION WILL
// DISCONNECT THE DATABASE
const disconnectFromDatabase = async () => {
    try {
        await disconnect();
    }
    catch (error) {
        throw new Error("Cannot connect to MongoDB");
    }
};
export { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map