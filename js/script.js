var bridge = new Bridge();
bridge.on('load', function(){
	console.log('New Content loaded');
	setCarousel();
});

function setRolls(){
	var rolls = document.getElementsByClassName('roll');
	console.log('myRolls');
	console.log(rolls);
	for(var i = 0; i < rolls.length; i++){
		var roll = new Roll({
			parent:rolls[i],
			navigation:'balls'
		});
	}
}

function setCarousel(){
	$(document).ready(function(){
	  $('.roll').slick({
	  	slidesToShow: 1,
		  dots: true,
		  infinite: true,
		  speed: 100,
		  fade: true,
		  cssEase: 'linear',
		  arrows: false
	  });
	});
}