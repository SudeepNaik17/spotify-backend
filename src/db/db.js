const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function connectDB() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database Connected!!");
    })
    .catch((e) => {
      console.log(e);
    });
}

module.exports = connectDB;
