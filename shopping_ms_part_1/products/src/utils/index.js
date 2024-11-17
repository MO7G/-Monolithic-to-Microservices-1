const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios  = require("axios")

const { APP_SECRET } = require("../config");

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


module.exports.PublishCustomerEvent = async (payload) => {
  console.log("Sending event to customer");
  
  try {
    const response = await axios.post("http://localhost:8000/customer/app-events", {
      payload,
    });
    console.log("Response received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending customer event:", error.message);
    throw error;
  }
};

module.exports.PublishShoppingEvent = async (payload) => {
  try {
    const response = await axios.post("http://localhost:8000/shopping/app-events", {
      payload,
    }).then(()=>{
      console.log("Response received:", response.data); // Log the response data
      return response.data; // Return the response data (optional)
    });
  } catch (error) {
    console.error("Error sending shopping event:", error.message); // Handle errors
    throw error; // Re-throw the error for further handling (optional)
  }
};




// event = add to whishlist
// product talk to cutomer 

// cusotmer is down for one minute 


// 5 user add to whichlist 
// 5 evetns of whichlist happend add to whichlist (id_user , product id):


// message broker 
// channel for costomer_channel
// channel for product_channel


// customer sub to messagebroker 
// product sub to messagebroker 


// 5 user add to whichlist 
// 5 evetns of whichlist happend add to whichlist (id_user , product id):


// product talk to cutomer directly instead
// publish message to costomer_channel


//message broker knows if customer is leinitng or not 
// customer one minute down 


// publish message to costomer_channel event of add_whishlist

// add_whishlist1,add_whishlist2,add_whishlist3,add_whishlist4 inside a queue in message broker

//message broker once is connceted to the customer service sub to costomer_channel










