const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios  = require("axios")
const amqplib = require("amqplib")


const {APP_SECRET,EXCHANGE_NAME, MSG_QUEUE_URL} = require("../config");

//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    // Check if Authorization header is present
    const authHeader = req.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Authorization header missing or incorrect format");
    }

    // Extract the token
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token missing in Authorization header");
    }

    // Verify the token
    const payload = await jwt.verify(token, APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.error("Token validation error:", error.message);
    return false;
  }
};


module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};




// message broker implementaoin here !!!
// create a channel 

module.exports.CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(MSG_QUEUE_URL);
    const channel = await connection.createChannel();

    // Directly assert the queue; it won’t throw an error if it doesn’t exist.
    await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });

    console.log(`Queue "${EXCHANGE_NAME}" is available.`);
    return channel;
  } catch (err) {
    console.error("Failed to create channel or assert queue:", err);
    throw err;
  }
};






//publish a mesage 
module.exports.PublishMessage = (channel, service, msg) => {
  try {

    // exchange name is the name of the queue 
    channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
    console.log("Sent: ", msg);
  } catch (error) {
    throw err;
  }
};









