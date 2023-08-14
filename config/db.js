// import mongoose from "mongoose";
// import colors from "colors";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log(`Mongoose Connected Successfully `.bgMagenta);
//   } catch (error) {
//     console.log(`Mongo Connection Error `.bgYellow);
//   }
// };
// export default connectDB;

import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected To Mongodb Database ${conn.connection.host}`.bgMagenta.gray
    );
  } catch (err) {
    console.log(`Error in MongoDb ${err}`.bgRed.white);
  }
};
export default connectDB;
