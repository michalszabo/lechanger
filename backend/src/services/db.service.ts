import { connect, connection } from "mongoose";

export default async () => {
  const connectDb = async (): Promise<void> => {
    try {
      await connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URI}/?retryWrites=true&w=majority`
      );

      return console.log("DB Connected 🥳");
    } catch (error) {
      console.log("Error connecting to database: ", error);
      return process.exit(1);
    }
  };

  try {
    await connectDb();
  } catch (error) {
    console.log(error);
  }

  connection.on("disconnected", connectDb);
};
