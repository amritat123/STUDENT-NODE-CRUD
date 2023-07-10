const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URL, {
    // useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then((res) => {
    console.log("mongoDB connected successfully ");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
exports.mongoose;
