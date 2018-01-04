var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Hobos Rest",
		image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",
		description: "blah Hobo Killing Devices"
	},
	{
		name: "Metal Fest",
		image: "https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg",
		description: "blah blah blah blah"
	},
	{
		name: "Picnic Table",
		image: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg",
		description: "blah blah blah blah"
	}
];

function seedDB(){
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
							campground.comments.push(comment);
							campground.save();
							console.log("Created new comment");
						}
					});
				}
			});
		});
	});
}

module.exports = seedDB;