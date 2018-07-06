var express = require('express');
var router = express.Router({mergeParams:true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

router.get('/new',middleware.isLoggedIn,function(req,res) {
	Campground.findById(req.params.id,function(err,camp){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{camp:camp});			
		}
	})
})

router.post('/',middleware.isLoggedIn,function(req,res) {
	Campground.findById(req.params.id,function(err,camp){
		if(err){
			console.log(err);
			res.redirect('/campgrounds')
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					req.flash('error',"Something went Wrong. Try Again!!");
					console.log(err);
				}else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					camp.comments.push(comment);
					camp.save();
					req.flash('success',"Comment Added Successfully!!");
					res.redirect('/campgrounds/'+camp._id);
				}
			})
		}
	})
})

router.get('/:comment_id/edit',middleware.checkCommentOwner,function(req,res){
	Comment.findById(req.params.comment_id,function(err,comment){
		if(err){
			res.redirect('back');
		}else{
			res.render('comments/edit',{camp_id:req.params.id,comment:comment});
		}
	})
})

router.put('/:comment_id',middleware.checkCommentOwner,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,comment){
		if(err){
			res.redirect('back');
		}else{
			res.redirect('/campgrounds/'+req.params.id);
		}
	})
})

router.delete('/:comment_id',middleware.checkCommentOwner,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect('back');
		}else{
			req.flash('success',"Comment Deleted Successfully!!");	
			res.redirect('/campgrounds/'+req.params.id);
		}
	})
})

module.exports = router;