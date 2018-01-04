var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp")
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

//LANDING
app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err) {
           
       } else {
           res.render("campgrounds/index",{campgrounds:allCampgrounds});
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
   res.render("campgrounds/new") ;
});

//SHOW - show info for one campground
app.get("/campgrounds/:id", function(req, res){
   //Find campground with id
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err) {
           console.log(err);
       } else {
            //render show template for that campground
            res.render("campgrounds/show", {campground: foundCampground});
       }
   });
});

// ======================
// COMMENTS ROUTES
// ======================

//NEW - show form to create new comment
app.get("/campgrounds/:id/comments/new", function(req, res){
  //find campground by id
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

//CREATE - add new comment to db and link it to a campground
app.post("/campgrounds/:id/comments", function(req, res){
  //Look up campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      //Create new comment
      Comment.create(req.body.comment, function(err, comment){
        if(err) {
          console.log(err);
        } else {
          //Connect new comment to campground
          campground.comments.push(comment._id);
          campground.save();
          //Redirect back to campground page
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

app.listen("3000", function(){
   console.log("YelpCamp server has started!");
});