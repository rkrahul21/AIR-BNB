const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js")
const {listingSchema ,reviewSchema} = require("./schema.js");
const { log } = require("console");
const Review = require("./models/review.js")
const port = 8080;

// Connecting mongoDb thrrough moongoose

main()
.then(() =>{
    console.log("connected to DB");
})
.catch((err )=> {
    console.log("DB connection Fail",err)
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}

// setting ejs file path

app.set("view engine" , "ejs") ;
app.set('views' , './views');
// app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true})) ;
app.use(methodOverride("_method"));
app.engine("ejs" ,ejsMate); 
app.use(express.static(path.join(__dirname,"/public")));

// middleware for schema validation
const validateListing = (req,res,next) =>{
  let {error} = listingSchema.validate(req.body);

  if(error){
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
   }
   else{
    next();
   }
}

const validateReview = (req,res,next) =>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
    let errmsg = error.details.map((el) => el.message).join(",") ;
    throw new ExpressError(400,errmsg);
  }
  else{
    next();
  }
}

app.listen(port,()=>{
     console.log("Server is listening to port",port);
});

app.get("/" , wrapAsync (async(req , res)=>{
  res.send("Get request is working ")
  // const allListings = await Listing.find({});

  // res.render("listings/index.ejs" , {allListings});
})
);

app.get("/listings", wrapAsync (async(req,res)=>{
  const allListings = await Listing.find({});

  res.render("listings/index.ejs" , {allListings});
})
);

// // NEW Route
app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs") ;
  
  });


// // show route

app.get("/listings/:id",  wrapAsync ( async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  res.render("listings/show.ejs", { listing });
})
);

// //create Route

app.post("/listings",   wrapAsync (async (req,res,next)=>{

  //  let {title,description,price,location,countary} = req.body ;

  const newlisting = new Listing(req.body.listing);
  await newlisting.save();
 res.redirect("/listings");
 })
 );

// //Edit route

app.get("/listings/:id/edit",  wrapAsync (async(req,res)=>{
  let {id} = req.params ;
  const listing = await Listing.findById(id);
  res.render('listings/edit.ejs' , {listing});
})
);

// Update Route
app.put('/listings/:id',  wrapAsync ( async(req,res)=>{
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id , {...req.body.listing});
  res.redirect(`/listings`);
})
);


// Delete Route
app.delete('/listings/:id' , wrapAsync ( async(req,res)=>{
  let {id} = req.params;
  let deletelist = await Listing.findByIdAndDelete(id);
  console.log(deletelist);
  res.redirect("/listings");
})
);

//review form submit route
app.post("/listings/:id/reviews" ,  wrapAsync (async(req,res)=>{
  let listing = await Listing.findById(req.params.id);
   let newreview = new Review(req.body.review);
// console.log(newreview page);
   listing.reviews.push(newreview);
   await newreview.save();
   await listing.save();

   res.redirect(`/listings/${listing._id}`);
 
 } )
 );



app.all("*",(req,res,next)=>{
  next(new ExpressError(404, "page not found"));
})


app.use((err,req,res,next)=>{
  let {statusCode=500,message ="something went Wrong"} = err;

res.status(statusCode).render("Error.ejs" , {err});
  // res.status(statusCode).send(message);
  // res.send("Something went wrong")
});

















// app.get("/test",async(req,res)=>{
//     let sample =new Listing({
//         title:"villa",
//         description:"Goa beach",
//         prize:1200,
//         location:"Calangute ,Goa",
//         countary:"India",
//     });
//     await sample.save();
//     console.log(sample);
// res.send("it's working");
// });