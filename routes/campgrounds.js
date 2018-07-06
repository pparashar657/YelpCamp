var express=require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');



router.get('/',function(req,res){
	Campground.find({},function(err,camps){
		if(err){ 
			console.log(err);
		}else{
			res.render('campgrounds/index',{camps:camps});
		}
	})
});

router.get('/new',middleware.isLoggedIn,function(req,res){
	res.render('campgrounds/new');
})

router.post('/',middleware.isLoggedIn,function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var price = req.body.price;
	var author={
		id: req.user._id,
		username: req.user.username
	}
	var newcamp = {name:name, price:price ,image:image, description:desc, author:author}
	Campground.create(newcamp,function(err,camp){
		if(err){
			console.log(err);
		}else{
			res.redirect('/campgrounds');
		}
	});
})


router.get('/:id',function(req,res){
	
	Campground.findById(req.params.id).populate('comments').exec(function(err,camp){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/show",{camp:camp});
		}
	})
});


router.get('/:id/edit',middleware.checkCampgroundOwner,function(req,res){
	Campground.findById(req.params.id,function(err,camp){
		if(err){
			req.flash('error',"No campground found with that Id...")
		}
		res.render('campgrounds/edit',{camp:camp});
	})
});

router.put('/:id',middleware.checkCampgroundOwner,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.camp,function(err,camp){
		if(err){
			console.log(err);
			res.redirect('/campgrounds');
		}else{
			res.redirect('/campgrounds/'+req.params.id);
		}
	})
})

router.delete('/:id',middleware.checkCampgroundOwner,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect('/campgrounds');
		}else{
			res.redirect('/campgrounds');
		}
	})
})

module.exports = router;