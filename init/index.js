const mongoose = require("mongoose");
const initData = require("./data");
const  Listing = require("../models/listing");

const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() =>{
    console.log("connected to DB");
})
.catch((err )=> {
    console.log("DB connection(init/index) Fail",err)
});

async function main() {
  await mongoose.connect(Mongo_URL);

}

const initDB = async()=>{
    await Listing.deleteMany({}) ;
    await Listing.insertMany(initData.data);

    console.log("data was initialized")
}

initDB();