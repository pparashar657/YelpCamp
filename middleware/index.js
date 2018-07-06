var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middlewareObj = {};

middlewareObj.checkCampgroundOwner = function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,camp){
			if(err){
				req.flash('error',"Campgrounds not found..")
				res.redirect('back');
			}else{
				if(camp.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash('error',"You don't have permission to do that.. ")
					res.redirect('back');
				}
			}
		})	
	}else{
		req.flash('error',"You need to be logged in to do that..");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwner = function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,comment){
			if(err){
				res.redirect('back');
			}else{
				if(comment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash('error',"You don't have enough permissions..");
					res.redirect('back');
				}
			}
		})	
	}else{
		req.flash('error',"You need to be logged in to do that..");
		res.redirect("back");
	}
}


middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('error',"You must be Logged in First!!!");
	res.redirect('/login');
}

module.exports = middlewareObj;