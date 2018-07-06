var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user')
var seedDb = require('./seeds')
var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index');
var methodOverride = require('method-override');
var flash = require('connect-flash');
//seedDb();


app.use(require('express-session')({
	secret:"Baga yaro Komo Yaro",
	resave:false,
	saveUninitialized:false
}));
    
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(express.static(__dirname+"/public"));
mongoose.connect('mongodb://localhost/yelpcamp');
app.use(bodyParser.urlencoded({extended:true}));


app.use(function(req,res,next){
	res.locals.currentuser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
})

app.use(indexRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);
app.use('/campgrounds',campgroundRoutes);

app.set('view engine','ejs');


app.listen(3000,function(){
	console.log('YelpCamp server started');
})