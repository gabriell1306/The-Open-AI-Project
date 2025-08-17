import app from "../src/app.js";
import { connectToDatabase } from "../src/db/connection.js";
import serverless from "serverless-http";

let isConnected = false;

async function setup() {
  if (!isConnected) {
    await connectToDatabase();
    isConnected = true;
  }
}

export default async function handler(req, res) {
  await setup();
  const serverlessHandler = serverless(app);
  return serverlessHandler(req, res);
}
