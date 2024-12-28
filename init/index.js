const mongoose = require("mongoose");
const initData = require("./data.js");
const Place = require("../models/place.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/houseonrent";

main()
    .then(() => {
        console.log("DataBase Connected");
     })
     .catch((err) => {
        console.log(err);
     });

     async function main(){
        await mongoose.connect(MONGO_URL);
     }

     const initDB = async () => {
        await Place.deleteMany({});
        await Place.insertMany(initData.data);
        console.log("data was initiaized");
      
      };

    initDB();