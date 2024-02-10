// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

const reviewSchema = new Schema({
    
    rating:{
        type:Number,
    },
    comment :String,
    createdAt :{
        type:Date,
        default:Date.now(),
    },
});
const Review = mongoose.model("Review" , reviewSchema);

module.exports = Review;

// Review.insertMany({comment:"good",rating:3});


