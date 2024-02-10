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

const orderSchema = new Schema({
    item : String,
    price:Number,
});


const customerSchema = new Schema({
    name:String,
    orders:[
        {
            type:Schema.Types.ObjectId,
            ref: "Order"
        },
    ]
});


const Order = mongoose.model("Order",orderSchema);

const Customer = mongoose.model("Customer",customerSchema);


// const addCustomer = async ()=>{
//     let c1 = new Customer({
//         name:"Rahul kumar",
//     })

//     let order1 = await Order.findOne({item:"chips"});
//     let order2 = await Order.findOne({item:"Samosa"});

//     c1.orders.push(order1);
//     c1.orders.push(order2);

//     let res = await c1.save();
//     console.log(res);
// }

// addCustomer();


// const addOrders = async ()=>{
//     let res = await Order.insertMany(
//        [ 
//         {item:"Samosa", price:12},
//         {item:"chips",price:10},
//         {item:"Chola",price:30}
//       ]
//     )

//     console.log(res);
// }

// addOrders();