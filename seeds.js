var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Hobos Rest",
		image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name: "Metal Fest",
		image: "https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name: "Picnic Table",
		image: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	}
];

function seedDB(){
	//Remove all comments
	// Comment.remove({}, function(err){
	// 	if(err){
	// 		console.log(err);
	// 	} else {
			//Remove all campgrounds
			Campground.remove({}, function(err){
				if(err){
					console.log(err);
				}
				console.log("removed campgrounds!");
				//add a few campgrounds
				data.forEach(function(seed){
					Campground.create(seed, function(err, campground){
						if(err){
							console.log(err);
						} else {
							console.log("added a campground");
							Comment.create(
							{
								text: "This is place is great but I wish there was internet",
								author: "Homer J Simpson"
							}, function(err, comment){
								if(err){
									console.log(err);
								} else {
									campground.comments.push(comment._id);
									campground.save();
									console.log("Created new comment");
								}
							});
						}
					});
				});
			});
	// 	}
	// });
}

module.exports = seedDB;