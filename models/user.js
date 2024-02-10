const mongoose = require("mongoose");
const Schema = mongoose.Schema ;
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


const userSchema = new Schema({
    username : String,
    addresses :[
        {
            _id:false,
            location:String,
            city:String
        },
    ],
});

const User = mongoose.model("User" , userSchema);

const addUsers = async()=>{
    let user1 = new User({
        username:"rahul",
        addresses:[{ location:"Laxmi chawk" , city:"Muzaffarpue"}]

    });
  user1.addresses.push({location:"Bhaganpur",city:"Muzaffarpur"});
  let result = await user1.save();
  console.log(result);
}
addUsers();