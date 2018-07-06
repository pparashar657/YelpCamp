var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment') 
var data = [
		{
			name:"Cloud Camp",
			image :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZzhWXNE4FP9EZ3m6BsE2ms_sSDdtxc8H_SnBnX7z7DAs4-feS",
			description:"These utility classes float an element to the left or right, or disable floating, based on the current viewport size using the CSS float property. !important is included to avoid specificity issues. These use the same viewport breakpoints as our grid system."
		},
		{
			name:"Desert Camp",
			image :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSthll6flqT-KHyj4fB004RDVHPHN99vw5I5sKGWM3R2AAHOhdFOA",
			description:"These utility classes float an element to the left or right, or disable floating, based on the current viewport size using the CSS float property. !important is included to avoid specificity issues. These use the same viewport breakpoints as our grid system."
		},
		{
			name:"Forest Camp",
			image :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGCLIx3_HV6iOi_aE57hE_TEqsEggGFcHkdaQOS0h6_p51vImc",
			description:"These utility classes float an element to the left or right, or disable floating, based on the current viewport size using the CSS float property. !important is included to avoid specificity issues. These use the same viewport breakpoints as our grid system."
		},
		{
			name:"River Camp",
			image :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScywb_dWxB6Ft-OPvyAtx-QOTJ2TliWfjRpqGkju0D_9_UDqkT",
			description:"These utility classes float an element to the left or right, or disable floating, based on the current viewport size using the CSS float property. !important is included to avoid specificity issues. These use the same viewport breakpoints as our grid system."
		}
	];


function seedDb(){
	Campground.remove({},function(err){
	if(err){
		console.log(err)
	}else{
		data.forEach(function(seed){
			Campground.create(seed,function(err,campground){
				if(err){
					console.log(err);
				}else{
					console.log("campground added");
					Comment.create(
						{	
							text:"This place is great,but i wish there was internet",
							author:"Homer"
						},function(err,comment){
							if(err){
								console.log(err);
							}else{
								campground.comments.push(comment);
								campground.save();	
								console.log('created new comment')
							}
						})
				}
			})		
		})
	}
	});
}


module.exports = seedDb;