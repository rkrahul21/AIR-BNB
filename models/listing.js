const mongoose = require("mongoose");
const Schema = mongoose.Schema ;
const review = require("./review");

const listingSchema = new Schema({
    title : {
        type:String,
        required :true
     },
     description:String,
     image:{
         type:String,
         default:  "https://unsplash.com/photos/a-wooden-walkway-leading-to-the-ocean-at-sunset-X3wB90rDwuI",
         Set:(v) => {v=== "" ? "https://unsplash.com/photos/a-wooden-walkway-leading-to-the-ocean-at-sunset-X3wB90rDwuI":v}, 
        },

   
    price:Number,
    location:{
        type:String,
        required:true
    },
    countary:String,
    reviews:[ {
        type:Schema.Types.ObjectId,
        ref:"Review ",
    },]
});

const Listing = mongoose.model("Listing" , listingSchema);

module.exports = Listing;