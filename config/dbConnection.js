const mongoose = require("mongoose");

const encodedPassword = encodeURIComponent('Mampy@sept5');
const CONNECTION_STRING= `mongodb+srv://admin:${encodedPassword}@apoorvacluster.ge9jrb1.mongodb.net/mycontacts-backend?retryWrites=true&w=majority`
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(CONNECTION_STRING);
    console.log(
      "Connection established -->  " + connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
