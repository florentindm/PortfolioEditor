var admin = new Admin();
var bridge = new Bridge();
bridge.on('load', function(){
	console.log('New Content loaded');
	setCarousel();
	admin.Set();
});


