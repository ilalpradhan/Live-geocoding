var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/contacts";
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'openstreetmap',
  // Optional depending on the providers
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiaXByYWRoYW4iLCJhIjoiY2tpMXkxN2s3MDU5ODJybzVsMzYxN3o2ciJ9.SPwmcyoXwNfWcuYxn8qiIg' // 'gpx', 'string', ...
};
var geocoder=NodeGeocoder(options);


  
let mailer = function(req, res, next){
    res.render('home', { });
}



let displayContacts = function(req, res, next){
 var contacts=req.db;
  contacts.find({}).toArray( function (err, result) {
    res.render("contacts", {contacts: result });
  }); 
}


let postMailer= async function(req,res,next){
  
    let post = req.body;
    var contact=req.db;
    let fullAddress = post["street"] + ", " + post["city"] + ", " + post["state"] + " " + post["zip"];
    var latlng=[];
    try{
      var rs= await geocoder.geocode(fullAddress);
    }
    catch(error){
        rs.end("error");
    }
      latlng.push(rs[0]["latitude"]);
      latlng.push(rs[0]["longitude"]);
      post["latlng"]=latlng;
    setPostProperty("canMail", post, "checkBoxMail");
    setPostProperty("canCall", post, "checkBoxPhone");
    setPostProperty("canEmail", post, "checkBoxEmail");
    //console.log(post["latlng"]);
    
    var info={
      firstName:post["firstName"],
      lastName:post["lastName"],
      street:post["street"],
      city:post["city"],
      state:post["state"],
      zip:post["zip"],
      phone:post["phone"],
      email: post["email"],
      prefix:post["prefix"],
      canMail:post["canMail"],
      canCall:post["canCall"],
      canEmail:post["canEmail"],
      latlng:post["latlng"]
    };// object to store the contact information
    console.log(info.latlng);
    console.log('ok');

    contact.insertOne(info, function(err, doc) {
    console.log('ID returned: '+ doc.insertedId);
      
    });

    // console.log(contact);
    res.render('thanku', {});
};


function setPostProperty(postProperty, post, checkBoxProperty){
  if( "checkBoxAny" in post || checkBoxProperty in post )
    post[postProperty] = true;
  else
    post[postProperty] = false;
}



let ensureLoggedIn = function(req, res, next) {
	if ( req.user ) {
		next();
	}
	else {
		res.redirect("/login");
	}
}


var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', mailer);
router.get('/mailer', mailer);
router.get('/contact',ensureLoggedIn, displayContacts );
router.post ('/contactdelete', async(req, res)=>{
  var id = req.body.id;
  console.log("enter");
  var contactid = { "_id": ObjectID(id) };
  await contacts.deleteOne(contactid,function(err,obj){
    if (err) throw err;
    res.end();
  });
});
router.post('/mailer', postMailer);
// router.post('/updatecontact',ensureLoggedIn, async(req, res)=>{
//   var id = req.body.id;
//   //console.log("id: ",id);
//   var contactid = { "_id": ObjectID(id) };
//         await contact.findOne(contactid, function(err, obj) {
//           if (err) throw err;
//           //obj.myid = id;
//           console.log("obj; ",obj);
//           res.render('updatecontact',{"object": obj});
//         });

// } );