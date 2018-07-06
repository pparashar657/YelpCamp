var mongoose = require('mongoose');
var campgroundSchema = new mongoose.Schema({
	name:String,
	price:String,
	image:String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'User'
		},
		username:String
	},
	description:String,
	comments:[
			{
				type:mongoose.Schema.Types.ObjectId,
				ref:"Comment"
			}
	]
});

module.exports = mongoose.model("Camp",campgroundSchema); 