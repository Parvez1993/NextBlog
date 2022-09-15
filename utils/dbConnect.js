import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose
    .connect(process.env.DATABASE_LOCAL, () => {
      ("connected");
    })
    .catch((err) => err);

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
