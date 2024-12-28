const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Place = require("./models/place.js");
const path =  require("path");
const methodOverride = require("method-override");


const MONGO_URL = "mongodb://127.0.0.1:27017/houseonrent";

main()
.then(() => {
    console.log("Database Connected");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


app.get("/", (req, res) => {
    res.send("Welcome Royal")
});



//Index Route
app.get("/places", async (req, res) => {
   const allplaces = await Place.find({});
   res.render("places/index.ejs", { allplaces });
    });

//New Route
app.get("/places/new", (req, res)=> {
    res.render("places/new.ejs");
});



    // Show Route
    app.get("/places/:id", async (req, res) => {
        let {id} = req.params;
        const place = await Place.findById(id);
        res.render("places/show.ejs", { place });

    });

//Create Route
app.post("/places", async (req, res) => {
    const newPlace = new Place(req.body.place);
    await newPlace.save();
    res.redirect("/places");
});

//Edit Route
app.get("/places/:id/edit", async (req, res) => {
    let { id } = req.params;
    const place = await Place.findById(id); 
    res.render("places/edit.ejs", { place}); 
  })
  
  
    // Update Route
   app.put("/places/:id", async (req, res) => {
      let { id } = req.params;
      await Place.findByIdAndUpdate(id, { ...req.body.place });
          res.redirect(`/places/${id}`);
  });

//Delete Route
app.delete("/places/:id", async (req,res ) =>  {
    let { id } = req.params;
    let deletedPlace = await Place.findByIdAndDelete (id);
    console.log(deletedPlace);
    res.redirect("/places");
});



app.listen(8080, () => {
    console.log("server is listening to port 8080");
    });