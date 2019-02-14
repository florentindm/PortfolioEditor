function AirVolume(){

	this.element = document.getElementById('airvolume').getElementsByClassName('value')[0];

	this.Get = function(){
		var height = page.getHeight();
		var width = page.getWidth();
		var result = width*height;
		return result;
	}

	this.Set = function(a){
		this.element.innerHTML = a;
	}

	this.Update = function(a){
		this.Set(this.Get());
	}
}

function Page(){
	this.body = document.body;
	this.html = document.documentElement;

	this.getHeight = function(){
		return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	}

	this.getWidth = function(){
		return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);	
	}
}