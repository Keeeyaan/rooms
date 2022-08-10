import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`DB CONNECTED SUCCESSFULLY`))
    .catch((err) => {
      console.log(`DB CONNECTION FAILED`);
      console.log(err);
      process.exit(1);
    });
};

export default connect;
