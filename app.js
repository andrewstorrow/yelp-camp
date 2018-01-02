var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
//         description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
//     },
//     function(err, campground){
//       if(err) {
//           console.log(campground);
//       } else {
//           console.log("NEWLY CREATED CAMPGROUND: ");
//           console.log(campground);
//       }
//     });

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err) {
           
       } else {
           res.render("index",{campgrounds:allCampgrounds});
       }
    });
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err,newlyCreated){
       if(err) {
           console.log(err);
       } else {
           //redirect back to campgrounds page
           res.redirect("/campgrounds");
       }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
   res.render("new") ;
});

//SHOW - show info for one campground
app.get("/campgrounds/:id", function(req, res){
   //Find campground with id
   Campground.findById(req.params.id, function(err, foundCampground){
       if(err) {
           console.log(err);
       } else {
            //render show template for that campground
            res.render("show", {campground: foundCampground});
       }
   });
});

app.listen("3000", function(){
   console.log("YelpCamp server has started!");
});