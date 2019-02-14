function Animator(options, callback){
	var self = this;

	this.options = {
		type:'linear',
		duration:false,
		fps:30,
		loop:false,
		params:false,
		autostart:true
	}

	Animator.prototype.init = function(){
		this.options = this.getOptions(this.options, options);
		if(this.options.autostart) this.Start();
	}

	Animator.prototype.Start = function(params){
		this.params = params;
		this.loop(this.equations[this.options.type]);
	};

	Animator.prototype.Stop = function(){
		 clearTimeout(this.looper);
	};

	Animator.prototype.equations = {
		linear : function(x){
			return x;
		},
		test : function(x) {
			var start = 20;
			var speed = 10;
			var pente = -0.1;
			var shift = self.options.params.start;
			wrap = Math.pow(2,-pente*((-x)+shift));
			sinus = wrap * Math.sin(x*20);
			// var wrap = 1/(start + Math.pow(2, (-pente*(x-shift))));
			sinus = sinus + 50;
			return sinus;
		},
		fadein : function(x){
			return x/18;
		}
	}

	Animator.prototype.loop = function(equation) {
		var interval = this.utils.getInterval();
		var limit = this.utils.getLimit();
		(function loop(x = 0) {          
		   this.looper = setTimeout(function () {
		   		callback(equation(x));
		   		if(limit && x >= limit){
		   			x = 0;
		   			if(self.options.loop) loop(t);
		   			else self.Stop();
		   		}else{
		   			loop(++x);
		   		}
		   }, interval)
		})(0);
	};

	Animator.prototype.utils = {
		getInterval : function(){
			return 1000/self.options.fps;
		},
		getLimit : function(){
			return self.options.duration*self.options.fps;
		}
	}

	Animator.prototype.getOptions = function(first, second) {
		for(var x in second){
			first[x] = second[x];
		}
		return first;
	};

	this.init();

}