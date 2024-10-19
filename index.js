const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { default: axios } = require("axios");
const { status } = require("express/lib/response");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// travel-management
// qT0vDfIUOcRzksKH

// mongodb cluster added

const uri =
  "mongodb+srv://travel-management:qT0vDfIUOcRzksKH@atlascluster.ynftepn.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
     const usersCollection = client.db("travel-management").collection("users");
      const guidesCollection = client
      .db("travel-management")
      .collection("guides");
    const hotelsCollection = client
      .db("travel-management")
      .collection("hotels");
    const packagesCollection = client
      .db("travel-management")
      .collection("packages");
    const blogsCollection = client.db("travel-management").collection("blogs");
    const bookingsCollection = client
      .db("travel-management")
      .collection("bookings");

    
      //  ssl commerce

      const paymentPackagesCollection = client.db("travel-management").collection("paymentPackages");



      const paymentHotelsCollection = client.db("travel-management").collection("paymentHotels");



    // <-----------   Users Management ------------------->

    // <------------------  User read from database database  ------------------------->
    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // <------------------ Single User read from database database  ------------------------->
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    // <------------------  User create and post database  ------------------------->
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // <------------------  User update from client site to database  ------------------------->

    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const updateUser = {
        $set: {
          role: user.role,
        },
      };
      const result = await usersCollection.updateOne(
        filter,
        updateUser,
        option
      );
      res.send(result);
    });

    // <------------------  User delete from database  ------------------------->
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      console.log(id);
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    // <-----------------------   Users Database End   -------------------------->

    // <----------------------- Place Database Start -------------------------->

    // <---------------------- Places : GET Method ---------------------->
    app.get("/guides", async (req, res) => {
      const cursor = guidesCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    //  <--------------------  Single Places:get method  -------------------->

    app.get("/guides/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await guidesCollection.findOne(query);
      res.send(result);
    });

    //  <---------- places : POST Method ----------->
    app.post("/guides", async (req, res) => {
      const place = req.body;
      console.log(place);
      const result = await guidesCollection.insertOne(place);
      res.send(result);
    });

    // <------------------- Places : UPDATE method ------------>
    app.put("/guides/:id", async (req, res) => {
      const id = req.params.id;
      const place = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const updateGuide = {
        $set: {
          name: place.name,
          image: place.image,
          experiences: place.experiences,
          description: place.description,
          cost: place.cost,
        },
      };
      // name image experiences description cost
      const result = await guidesCollection.updateOne(
        filter,
        updateGuide,
        option
      );
      res.send(result);
    });

    //  <----------- Places : DElETE method>
    app.delete("/guides/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await guidesCollection.deleteOne(query);
      res.send(result);
    });

    // <---------------  Places  Database end ----------- >

    // <----------------------- Hotel Database Start -------------------------->

    // <---------------------- Hotel : GET Method ---------------------->
    app.get("/hotels", async (req, res) => {
      const cursor = hotelsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    //  <--------------------  Single Hotel : get method  -------------------->

    app.get("/hotels/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await hotelsCollection.findOne(query);
      res.send(result);
    });

    //  <---------- Hotels : POST Method ----------->
    app.post("/hotels", async (req, res) => {
      const hotel = req.body;
      console.log(hotel);
      const result = await hotelsCollection.insertOne(hotel);
      res.send(result);
    });

    // <------------------- Hotels : UPDATE method ------------>
    app.put("/hotels/:id", async (req, res) => {
      const id = req.params.id;
      const hotel = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const updateHotel = {
        $set: {
          name: hotel.name,
          image: hotel.image,
          location: hotel.location,
          description: hotel.description,
          date: hotel.date,
        },
      };
      const result = await hotelsCollection.updateOne(
        filter,
        updateHotel,
        option
      );
      res.send(result);
    });

    //  <----------- Hotels : DElETE method>
    app.delete("/hotels/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await hotelsCollection.deleteOne(query);
      res.send(result);
    });

    // <----------------- Hotels Database end -------------------- >

    // <----------------------- Packages Database Start -------------------------->

    // <---------------------- Packages : GET Method ---------------------->
    app.get("/packages", async (req, res) => {
      const cursor = packagesCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    //  <--------------------  Single Packages : get method  -------------------->

    app.get("/packages/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await packagesCollection.findOne(query);
      res.send(result);
    });

    //  <---------- Packages : POST Method ----------->
    app.post("/packages", async (req, res) => {
      const package = req.body;
      console.log(package);
      const result = await packagesCollection.insertOne(package);
      res.send(result);
    });

    // <------------------- Packages : UPDATE method ------------>
    app.put("/packages/:id", async (req, res) => {
      const id = req.params.id;
      const package = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const updatePackages = {
        $set: {
          placeName: package.placeName,
          placeImage: package.placeImage,
          placeLocation: package.placeLocation,
          placeDescription: package.placeDescription,
          hotelName: package.hotelName,
          hotelImage: package.hotelImage,
          hotelLocation: package.hotelLocation,
          hotelDescription: package.hotelDescription,
          postedDate: package.postedDate,
        },
      };
      const result = await packagesCollection.updateOne(
        filter,
        updatePackages,
        option
      );
      res.send(result);
    });

    //  <----------- Packages : DElETE method>
    app.delete("/packages/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await packagesCollection.deleteOne(query);
      res.send(result);
    });

    // <----------------- Packages Database end -------------------- >

    // <----------------------- Blog Database Start -------------------------->

    // <---------------------- Blog : GET Method ---------------------->
    app.get("/blogs", async (req, res) => {
      const cursor = blogsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    //  <--------------------  Single Blog : get method  -------------------->

    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogsCollection.findOne(query);
      res.send(result);
    });

    //  <---------- Blogs : POST Method ----------->
    app.post("/blogs", async (req, res) => {
      const blog = req.body;
      console.log(blog);
      const result = await blogsCollection.insertOne(blog);
      res.send(result);
    });

    // <------------------- Blogs : UPDATE method ------------>
    app.put("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const blog = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const updateBlog = {
        $set: {
          name: blog.name,
          image: blog.image,
          writer: blog.writer,
          description: blog.description,
          date: blog.date,
        },
      };
      const result = await blogsCollection.updateOne(
        filter,
        updateBlog,
        option
      );
      res.send(result);
    });

    //  <----------- Blogs : DElETE method>
    app.delete("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogsCollection.deleteOne(query);
      res.send(result);
    });

    // <----------------- Blogs Database end -------------------- >

    // <---------------------  Bookings Database Start --------------- >

    // <-------------------  Bookings : Get Method ------------------- >
    app.get("/bookings", async (req, res) => {
      const cursor = bookingsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // <----------  ---------- Single Bookings : Get Method ------------>
    app.get("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookingsCollection.findOne(query);
      res.send(result);
    });


    // app.get('/bookings/:email/:id',async(req,res)=>{
      
    //      const email =req.params.email;
    //      const id = req.params.id;
    //      const query = {_id : new ObjectId(id),email:email};
    //      const result = await bookingsCollection.find(query).toArray();
    //      res.send(result);

    // })


    //  <--------------  Bookings : POST Method -------------->
    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      console.log(booking);
      const result = await bookingsCollection.insertOne(booking);
      res.send(result);
    });

    // <--------------------- Booking Update Method Create ---------- >
    app.put("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const booking = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };

      const updateBooking = {
        $set: {
          placeName: booking.placeName,
          placeImage: booking.placeImage,
          price: booking.price,
          hotelName: booking.hotelName,
          hotelImage: booking.hotelImage,
          hotelLocation: booking.hotelLocation,
          date: booking.date,
          condition: booking.condition,
        },
      };

      const result = await bookingsCollection.updateOne(
        filter,
        updateBooking,
        option
      );
      res.send(result);
    });

    // <------------  Bookings : DELETE method -------------->
    app.delete("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookingsCollection.deleteOne(query);
      res.send(result);
    });



    //  <------------------- Create SSL Commerce packages  ---------------------->



    // packages start 

    // all data get
    app.get("/bookings-packages", async (req, res) => {
      const cursor = paymentPackagesCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    }); 


     // <----------  ---------- Single packges Bookings : Get Method ------------>
     app.get("/bookings-packages/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await paymentPackagesCollection.findOne(query);
      res.send(result);
    });


    // <------------  Bookings : DELETE method -------------->
    app.delete("/bookings-packages/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await paymentPackagesCollection.deleteOne(query);
      res.send(result);
    });


    // post method
    app.post("/create-paymet",async(req,res)=>{
         
         const info=req.body.info;
         console.log(info);

         const trxId= new ObjectId().toString();

         const initiateData = {

          store_id:"adnan67082091a8475",
          store_passwd:"adnan67082091a8475@ssl",
          total_amount:1000,
          currency:"EUR",
          tran_id:trxId,
          success_url:"http://localhost:3000/success-payment",
          fail_url:"http://localhost:3000/fail",
          cancel_url:"http://localhost:3000/cancel",
          cus_name:"Customer Name",
          cus_email:"cust@yahoo.com",
          cus_add1:"Dhaka",
          cus_add2:"Dhaka",
          cus_city:"Dhaka",
          cus_state:"Dhaka",
          cus_postcode:1000,
          cus_country:"Bangladesh",
          cus_phone:"01711111111",
          cus_fax:"01711111111",
          shipping_method : "NO",
          product_name:"laptop",
          product_category:"laptop",
          product_profile:"general",
          multi_card_name:"mastercard,visacard,amexcard",
          value_a:"ref001_A",
          value_b:"ref002_B",
          value_c:"ref003_C",
          value_d:"ref004_D"
            
         };

        
         const response= await axios({
          
             
             method:"POST",
             url:"https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
             data:initiateData,
             headers:{
                 "Content-Type":"application/x-www-form-urlencoded"
             }
             
         })

         console.log(response);


         const saveData = {
            
            paymentId : trxId,
            placeName: info.placeName,
            placeImage: info.placeImage,
            price: info.price,
            hotelName: info.hotelName,
            hotelImage: info.hotelImage,
            hotelLocation: info.hotelLocation,
            date: info.date,
            email:info.email,
            condition: info.condition,

         }

         const save = await paymentPackagesCollection.insertOne(saveData);

         if(save){
          
          res.send({
           
            paymentUrl : response.data.GatewayPageURL,
            

          });

         }
         
    })

    //  <----------  Success Payment URL ------>
    app.post("/success-payment",async(req,res)=>{

       const successData=req.body;

       if(successData.status !== 'VALID'){
          throw new Error('Unauthorized  payment , Invalid Payment')
       }

      //  update the database 
      const query = {
         paymentId:successData.tran_id,
      };

      const  update = {

         $set:{
          condition : "Success"
         },
         
      };

      const updateData =  await paymentPackagesCollection.updateOne(query,update);

       console.log("successData : ",successData);
       console.log("updateData : ",updateData);

       res.redirect("http://localhost:5173/success");
     
        
    })














    // Hotel booking  start 

    // all data get
    app.get("/bookings-hotels", async (req, res) => {
      const cursor = paymentHotelsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    }); 


     // <----------  ---------- Single Hotel Bookings : Get Method ------------>
     app.get("/bookings-hotels/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await paymentHotelsCollection.findOne(query);
      res.send(result);
    });


    // <------------ Hotel Bookings : DELETE method -------------->
    app.delete("/bookings-hotels/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await paymentHotelsCollection.deleteOne(query);
      res.send(result);
    });


    // post method
    app.post("/create-payment-hotels",async(req,res)=>{
         
         const info=req.body.info;
         console.log(info);

         const trxId= new ObjectId().toString();

         const initiateData = {

          store_id:"adnan67082091a8475",
          store_passwd:"adnan67082091a8475@ssl",
          total_amount:1000,
          currency:"EUR",
          tran_id:trxId,
          success_url:"http://localhost:3000/success-payment-hotels",
          fail_url:"http://localhost:3000/fail",
          cancel_url:"http://localhost:3000/cancel",
          cus_name:"Customer Name",
          cus_email:"cust@yahoo.com",
          cus_add1:"Dhaka",
          cus_add2:"Dhaka",
          cus_city:"Dhaka",
          cus_state:"Dhaka",
          cus_postcode:1000,
          cus_country:"Bangladesh",
          cus_phone:"01711111111",
          cus_fax:"01711111111",
          shipping_method : "NO",
          product_name:"laptop",
          product_category:"laptop",
          product_profile:"general",
          multi_card_name:"mastercard,visacard,amexcard",
          value_a:"ref001_A",
          value_b:"ref002_B",
          value_c:"ref003_C",
          value_d:"ref004_D"
            
         };

        
         const response= await axios({
          
             
             method:"POST",
             url:"https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
             data:initiateData,
             headers:{
                 "Content-Type":"application/x-www-form-urlencoded"
             }
             
         })

         console.log(response);


         const saveData = {
            
            paymentId : trxId,
            hotelName: info.hotelName,
            hotelImage: info.hotelImage,
            hotelLocation: info.hotelLocation,
            livingCost: info.livingCost,
            date: info.date,
            email:info.email,
            condition: info.condition,

         }

         const save = await paymentHotelsCollection.insertOne(saveData);

         if(save){
          
          res.send({
           
            paymentUrl : response.data.GatewayPageURL,
            

          });

         }
         
    })

    //  <----------  Success Payment URL ------>
    app.post("/success-payment-hotels",async(req,res)=>{

       const successData=req.body;

       if(successData.status !== 'VALID'){
          throw new Error('Unauthorized  payment , Invalid Payment')
       }

      //  update the database 
      const query = {
         paymentId:successData.tran_id,
      };

      const  update = {

         $set:{
          condition : "Success"
         },
         
      };

      const updateData =  await paymentHotelsCollection.updateOne(query,update);

       console.log("successData : ",successData);
       console.log("updateData : ",updateData);

       res.redirect("http://localhost:5173/success");
     
        
    })

   
  

   
    // faill url 
    app.post("/fail",async(req,res)=>{
        res.redirect("http://localhost:5173/fail")
    })

    // cancel url
    app.post("/cancel",async(req,res)=>{
      res.redirect("http://localhost:5173/cancel")
  })

    // <---------------------  Bookings Database end --------------- >

    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(`server is running port in ${port}`);
});

// users management routes start

// ----> user read
// app.get('/users',(req,res)=>{
//     // res.send(users)
// })

// // ---> user create
// app.post('/users',(req,res)=>{
//     console.log('data posted');
//     console.log(req.body);
// })
// users management routes end

app.listen(port, () => {
  console.log(`PORT is running ${port}`);
});
